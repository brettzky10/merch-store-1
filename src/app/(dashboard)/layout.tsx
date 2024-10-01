export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="">
        <div className="">
          {children}
        </div>
      </section>
    );
  }