import AuthCarousel from "@/components/auth/AuthCarousel";
import SignInForm from "@/components/auth/sign-in/SignInForm";
import AuthHeader from "@/components/auth/AuthHeader";
import Link from "next/link";

export default function SignInPage() {
  return (
    <section className="flex min-h-screen overflow-hidden">
      <AuthCarousel />

      <main className="bg-card flex w-full flex-col items-center justify-center rounded-e-4xl p-8 shadow-2xl lg:w-[45%] lg:px-40">
        <AuthHeader
          title="Sign In Now!"
          subtitle="Sebelum melangkah lebih lanjut, silahkan masuk terlebih dahulu!"
        />
        <SignInForm />
        <p className="mt-4 text-center lg:mt-6">
          Belum memiliki akun?{" "}
          <Link className="text-primary underline" href="/sign-up">
            Daftar Sekarang!
          </Link>
        </p>
      </main>
    </section>
  );
}
