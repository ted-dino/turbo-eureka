import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <main className="flex items-center">
      <Button variant="secondary">Button</Button>
      <ModeToggle />
    </main>
  );
}
