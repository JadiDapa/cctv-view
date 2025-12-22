import AuthCarousel from "@/components/auth/AuthCarousel";
import SignInForm from "@/components/auth/sign-in/SignInForm";
import AuthHeader from "@/components/auth/AuthHeader";
import Link from "next/link";

export default function SignInPage() {
  return (
    <section className="flex min-h-screen overflow-hidden ">
      <AuthCarousel />

      <main className="flex flex-col w-[45%] items-center justify-center bg-card p-8 lg:px-40 rounded-e-4xl shadow-2xl">
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
