import AuthContainer from "@/components/custom-ui/Common/AuthContainer";
import Link from "next/link";

type Props = {
  searchParams: Record<string, string> | null | undefined;
};
export default async function Page({ searchParams }: Props) {
  return (
    <main className="grid gap-y-5 mt-[85px] lg:container mx-auto min-h-screen text-white">
      <h1 className="text-xl lg:text-4xl capitalize font-bold">
        Privacy Policy
      </h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Effective Date</h2>
        <p>October 20, 2023</p>
      </section>

      <section className="mb-6">
        <p>
          Thank you for using <em>TedFlix</em> (&quot;the App&quot;). This
          Privacy Policy is designed to help you understand how we collect, use,
          disclose, and safeguard your personal information.
        </p>
        <p>
          By using the App, you consent to the practices described in this
          Privacy Policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <ul className="list-disc pl-8">
          <li>
            <strong>User Account Information:</strong> When you create an
            account with the App, we collect your email address and password to
            provide you with access to your personalized playlist and to secure
            your account.
          </li>
          <li>
            <strong>Usage Information:</strong> We may collect information about
            how you use the App, including the movies you&apos;ve saved to your
            playlist.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-8">
          <li>
            To provide and personalize the services you request, including
            saving and managing playlists.
          </li>
          <li>
            To communicate with you about your account, updates, and new
            features of the App.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">3. Disclosure of Information</h2>
        <ul className="list-disc pl-8">
          <li>With trusted service providers who help us operate the App.</li>
          <li>
            When required by law, to protect our rights, or to comply with a
            judicial proceeding, court order, or legal process.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">4. Security</h2>
        <p>
          We take reasonable measures to protect your personal information.
          However, please be aware that no method of transmission over the
          internet or electronic storage is 100% secure. We cannot guarantee the
          absolute security of your information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">5. Your Choices</h2>
        <p>
          You can review and update your personal information by logging into
          your account. You may also request the deletion of your account at any
          time.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">
          6. Changes to this Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. If we make
          significant changes, we will notify you either through the App or by
          other means.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">7. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at{" "}
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
