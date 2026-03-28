import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin login",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-xl font-bold text-stone-900">Admin sign in</h1>
        <p className="mt-2 text-center text-sm text-stone-600">
          Use your Supabase Auth email and password.
        </p>
        <Suspense
          fallback={
            <p className="mt-6 text-center text-sm text-stone-500">Loading…</p>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
