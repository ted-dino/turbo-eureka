import AuthContainer from "@/components/custom-ui/Common/AuthContainer";
import Link from "next/link";

type Props = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Page({ searchParams }: Props) {
  return (
    <main className="grid gap-y-5 mt-[85px] lg:container mx-auto min-h-screen text-white">
      <h1 className="text-xl lg:text-4xl capitalize font-bold">
        Terms of Service
      </h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">1. Use of the App</h2>
        <ul className="list-disc pl-8">
          <li>
            You must be at least 13 years old to use the App. If you are under
            13, please do not use the App.
          </li>
          <li>
            You are responsible for maintaining the security and confidentiality
            of your account credentials.
          </li>
          <li>
            You agree not to use the App for any illegal or unauthorized
            purpose.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">2. User Content</h2>
        <p>
          The App allows you to save and manage playlists of movies. You are
          solely responsible for the content you save in your playlists.
        </p>
        <p>
          You may not use the App to store or share any content that is illegal,
          infringes upon the rights of others, or is offensive or harmful.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">3. Intellectual Property</h2>
        <p>
          The App, including its content and features, is protected by copyright
          and other intellectual property laws. You may not reproduce,
          distribute, or create derivative works based on the App without our
          permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">4. Termination</h2>
        <p>
          We reserve the right to terminate your access to the App at our
          discretion, without notice, for any reason, including a breach of
          these Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">5. Disclaimer</h2>
        <p>
          The App is provided &quot;as is&quot; without any warranty. We do not
          guarantee the accuracy, availability, or reliability of the App.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
        <p>
          We are not liable for any direct, indirect, incidental, special, or
          consequential damages that may result from your use of the App.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">7. Changes to the Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the App
          after such changes constitutes your acceptance of the new Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">8. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding these Terms, please
          contact us at{" "}
          <Link
            href="mailto:lxuscv915@relay.firefox.com"
            className="hover:underline"
          >
            <span className="hidden" aria-hidden="true">
              PLEASE GO AWAY!
            </span>
            lxuscv915@{/* sdfjsdhfkjypcs  */}relay.firefox.com
          </Link>
          .
        </p>
      </section>
      <AuthContainer searchParams={searchParams} />
    </main>
  );
}
