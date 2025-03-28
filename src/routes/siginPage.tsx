import { SigninForm } from "@components/login/SigninForm";

export default function SigninPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SigninForm />
      </div>
    </div>
  );
}
