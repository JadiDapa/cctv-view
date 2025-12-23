"use client";

import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";

export default function SignAsGuest() {
  const { signIn, setActive } = useSignIn();

  const router = useRouter();

  async function onClick() {
    const { username, password } = {
      username: "guest",
      password: "Guesttam123#",
    };

    try {
      const result = await signIn.create({ identifier: username, password });

      if (result.status === "complete" && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        toast.success("Berhasil Masuk!");

        router.push("/");
      } else {
        toast.error("Kombinasi Username dan Password Salah!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Kombinasi Username dan Password Salah!");
    }
  }

  return (
    <p className="mt-4 text-center lg:mt-6">
      Tamu?{" "}
      <span
        onClick={() => onClick()}
        className="text-primary cursor-pointer underline"
      >
        Masuk Sebagai Tamu!
      </span>
    </p>
  );
}
