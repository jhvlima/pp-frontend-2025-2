export default function SistemaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-auth">
          {children}
    </div>
  );
}