export default function Watch({ params }: { params: { id: number } }) {
  const { id } = params;
  return <main className="pt-16">SeriesPlayer {id}</main>;
}
