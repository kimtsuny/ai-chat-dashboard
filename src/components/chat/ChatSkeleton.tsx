import { Skeleton } from "@/components/ui/skeleton";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 max-w-3xl mx-auto w-full">

      {/* AI */}
      <Skeleton className="h-6 w-2/3 rounded-2xl" />

      {/* User */}
      <Skeleton className="h-6 w-1/2 rounded-2xl ml-auto" />

      {/* AI */}
      <Skeleton className="h-6 w-3/4 rounded-2xl" />

      {/* User */}
      <Skeleton className="h-6 w-1/3 rounded-2xl ml-auto" />

    </div>
  );
};

export default ChatSkeleton;