import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/lib/types/supabase.types";
import { Login } from "@/components/auth/Login";
import LoginQuoteSection from "@/components/auth/login-quote";
import LoginClientsSection from "@/components/auth/login-clients-section";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  const headersList = headers();
  const host = headersList.get("host");

  return (
    <>
    {/* Hero */}
    <div className="relative z-10">
      <div className="container py-8 sm:py-12">
        {/* Grid */}
        <div className="flex items-center md:flex-row gap-8 lg:gap-12 ">
          <LoginQuoteSection/>
          {/* End Col */}
          <div>
            {/* Form */}
            
              <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
                {/* Card */}
                <Login host={host} searchParams={searchParams} />
                {/* End Card */}
              </div>
            
            {/* End Form */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
        <LoginClientsSection/>
      </div>
      {/* End Clients Section */}
    </div>
    <CornerGrid />
    {/* End Hero */}
  </>
  );
}



const CornerGrid = () => {
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
      className="absolute right-0 top-0 -z-5 size-[50vw]"
    >
      <div
        style={{
          backgroundImage:
            "radial-gradient(100% 100% at 100% 0%, rgba(9,9,11,0), rgba(9,9,11,1))",
        }}
        className="absolute inset-0"
      />
    </div>
  );
};
