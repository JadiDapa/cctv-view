export default function LeftHeader({
  section,
  title,
}: {
  section: string;
  title: string;
}) {
  return (
    <header className="flex flex-col border-b-2    px-44 pt-52 pb-2">
      <h2 className="text-lg text-gray-600">{section}</h2>
      <h1 className="text-5xl font-medium md:text-4xl">{title}</h1>
    </header>
  );
}
