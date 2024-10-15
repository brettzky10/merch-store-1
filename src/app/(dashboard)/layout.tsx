import { createClient } from "@/lib/supabase/supabase-server";

import SideBar from "@/components/global/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
    
        if (!user) {
            redirect('/login');
        }



    return (
      <>
        <div className="relative">
        
                {/* <Navbar /> */}
                <div className="absolute h-full hidden md:flex min-h-[91vh] max-h-screen z-50">
                    <SideBar />
                </div>
                <ScrollArea className="h-[100vh] bg-ghost ml-5">
                    {children}
                </ScrollArea>
                
            </div>
        </>
    );
  }