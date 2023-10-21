import Link from "next/link";

export default function Page() {
  return (
    <main className="mt-[85px] lg:container mx-auto min-h-screen">
      <section className="h-96 grid place-content-center text-center">
        <h1 className="text-xl lg:text-4xl capitalize font-bold">404</h1>
        <p className="text-lg lg:text-3xl">
          Sorry, we were unable to find that page
        </p>
        <Link className="mt-5 hover:underline" href="/">
          Go to the home page
        </Link>
      </section>
    </main>
  );
}
