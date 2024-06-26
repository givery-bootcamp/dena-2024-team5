type PanelProps = {
  comment: string;
  element: React.ReactNode;
};
export default function ElementWithComment({ comment, element }: PanelProps) {
  return (
    <div className="flex">
      <div className="nes-container with-title is-centered bg-white">
        <p className="text-3xl text-black">{comment}</p>
      </div>
      <div className="">{element}</div>
    </div>
  );
}
