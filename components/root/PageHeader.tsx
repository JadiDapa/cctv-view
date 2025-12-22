export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="hidden md:block">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
}
