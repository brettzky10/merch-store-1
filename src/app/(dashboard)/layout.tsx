//import { createClient } from "@/lib/supabase/supabase-server";

import SideBar from "@/components/global/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notFound, redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export default async function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    //Supabase Auth
    /* const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();
    
        if (!user) {
            redirect('/login');
        } */

    //Kinde Auth
    const { getUser } = getKindeServerSession()
    const user = await getUser()
  /* 
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL
  
    if (!user || user.email !== ADMIN_EMAIL) {
      return notFound()
    } */

    console.log("user Id", user.id)

    /* if (!user || !user.id) {
      console.log('User on layout page is null or missing id'); // Add this line
      throw new Error('Unauthorized');
    } */

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