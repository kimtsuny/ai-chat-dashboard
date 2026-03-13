import { Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
    username?: string;
    email?: string;
    avatarUrl?: string;
    coverUrl?: string;
    onChangeAvatar?: () => void;
    onChangeCover?: () => void;
      messages?: number;
  conversations?: number;
}

export function ProfileHeader({
    username = "shadcn",
    email = "user@example.com",
    avatarUrl = "https://github.com/shadcn.png",
    coverUrl,
    onChangeAvatar = () => console.log("Change avatar clicked"),
    onChangeCover = () => console.log("Change cover clicked"),
    messages = 0,
    conversations = 0,
}: ProfileHeaderProps) {
    return (
        <div className="relative">
            {/* Cover Image */}
            <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt="Cover"
                        className="h-full w-full object-cover pointer-events-none"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-[#8b5cf6]/40 via-[#2e2e36] to-[#1e1e24]" />
                )}

                {/* Cover camera button */}
               <Button
    variant="ghost"
    size="icon"
    onClick={onChangeCover}
    className="absolute bottom-3 right-3 z-20 pointer-events-auto h-8 w-8 rounded-full bg-black/50 text-white"
>
    <Camera className="h-4 w-4" />
</Button>
            </div>

            {/* Avatar overlapping cover */}
            <div className="flex flex-col items-center -mt-12 relative z-10">
                <div className="relative">
                    <Avatar className="h-24 w-24 ring-4 ring-[#1e1e24] shadow-xl">
                        <AvatarImage src={avatarUrl} alt={username} />
                        <AvatarFallback className="bg-[#24242b] text-[#f3f4f6] text-2xl">
                            {username?.charAt(0).toUpperCase() ?? "U"}
                        </AvatarFallback>
                    </Avatar>

                    {/* Avatar camera button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onChangeAvatar}
                        className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[#8b5cf6] text-white shadow-lg hover:bg-[#7c3aed] hover:text-white transition-all"
                    >
                        <Camera className="h-3.5 w-3.5" />
                    </Button>
                </div>

                {/* Username & Email */}
                <div className="mt-4 text-center">
                    <h2 className="text-xl font-semibold text-[#f3f4f6]">{username}</h2>
                    <p className="mt-1 text-sm text-[#9ca3af]">{email}</p>
                </div>
            </div>
        </div>
    );
}
