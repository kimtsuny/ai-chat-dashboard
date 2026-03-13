import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStats } from "./ProfileStats";
import { ProfileInfo } from "./ProfileInfo";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { getUserStats } from "@/features/dashboard/services/dashboardService"
interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileDialog({
  open,
  onOpenChange,
}: ProfileDialogProps) {

    const [stats, setStats] = useState({
  messages: 0,
  conversations: 0
})

const { user, setUser } = useAuth();

useEffect(() => {

  if (!user) return

  const loadStats = async () => {
    const data = await getUserStats(user.id, user.role)
    setStats(data)
  }

  loadStats()

}, [user])


  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const [currentCover, setCurrentCover] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setCurrentAvatar(user.avatar_url);
      setCurrentCover(user.cover_url);
    }
  }, [user]);

  const handleChangeAvatar = () => {
    avatarInputRef.current?.click();
  };

  const handleChangeCover = () => {
    coverInputRef.current?.click();
  };

  const handleAvatarFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file || !user) return;

    const filePath = `${user.id}-${Date.now()}.png`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error(error);
      return;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);

    setCurrentAvatar(`${publicUrl}?t=${Date.now()}`);

    setUser({
      ...user,
      avatar_url: publicUrl,
    });
  };

  const handleCoverFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file || !user) return;

    const filePath = `${user.id}-cover-${Date.now()}.png`;

    const { error } = await supabase.storage
      .from("covers")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error(error);
      return;
    }

    const { data } = supabase.storage
      .from("covers")
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    await supabase
      .from("profiles")
      .update({ cover_url: publicUrl })
      .eq("id", user.id);

    setCurrentCover(`${publicUrl}?t=${Date.now()}`);

    setUser({
      ...user,
      cover_url: publicUrl,
    });
  };

  const memberSince = user
  ? new Date(user.created_at).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  : ""
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-2xl overflow-hidden rounded-xl border-[#2e2e36] bg-[#1e1e24] p-0 gap-0">

        <DialogTitle className="sr-only">User Profile</DialogTitle>

        <ProfileHeader
          username={user?.email}
          email={user?.email}
          avatarUrl={currentAvatar ?? undefined}
          coverUrl={currentCover ?? undefined}
          onChangeAvatar={handleChangeAvatar}
          onChangeCover={handleChangeCover}
        />

        <div className="px-6 pt-2">
          <ProfileStats
            messages={stats.messages}
            conversations={stats.conversations}
          />
        </div>

        <div className="px-6">
          <Separator className="bg-[#2e2e36]" />
        </div>

        <div className="px-6 py-5">
          <ProfileInfo
            memberSince={memberSince}
            role={user?.role}
          />
        </div>

        <input
          type="file"
          ref={avatarInputRef}
          accept="image/*"
          hidden
          onChange={handleAvatarFileChange}
        />

        <input
          type="file"
          ref={coverInputRef}
          accept="image/*"
          hidden
          onChange={handleCoverFileChange}
        />

      </DialogContent>
    </Dialog>
  );
}