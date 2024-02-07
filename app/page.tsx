// Imports for supabase
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

// Components
import AuthButton from "../components/AuthButton";
import UniversalCardComponent from "@/components/(CardComponents)/UniversalCardComponent";
import ListVehicles from "@/components/(CardComponents)/ListVehicles";

// Actions
import { getVehicles } from "./lib/actions";

// Main component
export default async function Index() {
  const cookieStore = cookies();

  // Check if the Supabase client can be initialized
  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Get the data from the vehicles
  const data = await getVehicles();
  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <h1 className="font-extrabold text-lg capitalize">Meishi Vehicles</h1>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        {/* <Header /> */}
        <main className="flex-1 flex flex-col gap-6">
          <section>
            <h2 className="font-bold text-4xl mb-4">Add a new vehicle!</h2>
            <div className="md:px-10">
              <UniversalCardComponent type="create" />
            </div>
          </section>
          <section>
            <h2 className="font-bold text-4xl mb-4">List of vehicles</h2>
            <ListVehicles data={data} />
          </section>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p className="text-lg">
          Made with ❤️ by {' '}
          <a
            href="https://linkedin.com/in/johnatanortizs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            ✅ Johnatan Ortiz
          </a>
        </p>
      </footer>
    </div>
  );
}
