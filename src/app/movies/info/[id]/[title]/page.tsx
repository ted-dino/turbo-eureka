import { InfoLayout } from "@/components/custom-ui/InfoLayout";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <main>
      <InfoLayout id={params.id} />
    </main>
  );
}
