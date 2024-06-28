import PostedItem from "@/components/PostedItem";
import type { Entity_Post } from "../../../../../api/@types";
type PanelProps = {
  jwtToken: string;
  postedItems: Entity_Post[];
};
export default function DashboardPeopleLayer({
  jwtToken,
  postedItems,
}: PanelProps) {
  return (
    <div className="flex-1 flex-col gap-4 container">
      <h1 className="text-4xl">投稿一覧</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {postedItems.map((data) => (
          <PostedItem key={data.id} postedItem={data} jwtToken={jwtToken} />
        ))}
      </div>
    </div>
  );
}
