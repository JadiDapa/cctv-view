import { Button } from "../ui/button";

export default function MiddleHeader({
  section,
  title,
  description,
  buttonText,
}: {
  section: string;
  title: string;
  description: string;
  buttonText?: string;
}) {
  return (
    <header className="flex flex-col items-center   pt-64">
      <h2 className="text-3xl">{section}</h2>
      <h1 className="text-5xl font-medium md:text-7xl">{title}</h1>
      <p className="mt-6 max-w-3xl text-center text-2xl leading-relaxed">
        {description}
      </p>
      {buttonText && (
        <Button className="mt-12  px-6 py-2 text-white">{buttonText}</Button>
      )}
    </header>
  );
}
