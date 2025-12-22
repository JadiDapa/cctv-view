import Image from "next/image";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="">
      {/* <div className="text-primary justify-center text-3xl font-semibold tracking-wide flex items-center gap-4">
        <figure className="relative size-10">
          <Image
            src={"/logo.png"}
            fill
            className="object-center object-contain"
            alt=""
          />
        </figure>
        <p>FileGear</p>
      </div> */}

      <h1 className="text-primary mt-6 text-center text-3xl font-medium lg:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-2 max-w-sm text-center text-sm">{subtitle}</p>
    </div>
  );
}
