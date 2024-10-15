//import { createClient } from "@/lib/supabase/supabase-server";

import NavbarDashboard from "@/components/global/navbar/navbar";
import SideBar from "@/components/global/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";


export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    /* const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
    
        if (!user) {
            redirect('/login');
        } */



    return (
      <>
        <NavbarDashboard/>
          <div className="mt-16">
          {children}
          </div>
        </>
    );
  }