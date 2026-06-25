import AdminSidebar from "@/components/layout/AdminSidebar";
import TopNav from "@/components/layout/TopNav";
import PageTransition from "@/components/layout/PageTransition";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex flex-1 flex-col md:pl-[280px]">
        <TopNav />
        <main className="flex-1 pt-20 px-4 md:pr-6 pb-10">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
