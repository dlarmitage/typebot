import { useRouter } from "next/router";
import { Seo } from "@/components/Seo";
import { SignInForm } from "./SignInForm";

type Props = {
  type: "signin" | "signup";
  defaultEmail?: string;
};

export const SignInPage = ({ type: _type }: Props) => {
  const { query } = useRouter();

  return (
    <div className="cftk-signin-bg flex flex-col h-dvh justify-center items-center relative overflow-hidden">
      <Seo title="Welcome" />

      {/* Decorative background shapes */}
      <div className="cftk-blob cftk-blob-coral" />
      <div className="cftk-blob cftk-blob-teal" />
      <div className="cftk-blob cftk-blob-peach" />

      <div className="cftk-signin-card relative z-10 flex flex-col p-10 rounded-2xl gap-6 w-full max-w-[420px] mx-4">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <img
            src="/images/cftk-logo.png"
            alt="Care for the Kids"
            className="w-20 h-20 rounded-2xl"
          />
          <p className="text-sm cftk-text-muted font-medium tracking-wide uppercase">
            Typebot Admin Interface
          </p>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <h2 className="cftk-text-dark text-2xl font-semibold">Welcome</h2>
          <p className="cftk-text-muted text-sm">
            Enter your email to sign in or create an account
          </p>
        </div>

        <SignInForm defaultEmail={query.g?.toString()} />
      </div>
    </div>
  );
};
