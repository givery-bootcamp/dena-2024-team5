export default function Home({ params }: { params: { id: string } }) {
  return (
    <div>
      投稿詳細画面<div>{params.id}</div>
    </div>
  );
}
