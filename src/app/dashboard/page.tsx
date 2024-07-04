// src/app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../auth";
import Navbar from "./navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SnippetHistory from "./snippet-history/SnippetHistory";
import SaveCodeSnips from "./save-code-snippets/SaveCodeSnips";
import EnchanceCode from "./enhance-code/EnchanceCode";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
    return null;
  }
  const user = session.user as { 
    id: string;

    name: string; 
    email: string; 
    image: string; // Ensure that image is not undefined or handle it appropriately 
  };

  return (
    <>
      <Navbar user={user} />
      {/* <DashboardClient user={session?.user} />; */}

      <div className="flex-1 flex flex-col items-center justify-center p-8 ">
        <Tabs defaultValue="save-code-snip" className="w-full max-w-6xl">
          <TabsList className="flex justify-center space-x-4 mb-6 border-b-2 border-gray-200">
            <TabsTrigger
              value="save-code-snip"
              className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-200"
            >
              Save Snip
            </TabsTrigger>
            <TabsTrigger
              value="enhance-code"
              className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-200"
            >
              Enhance Code
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-200"
            >
              History
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="save-code-snip"
            className="w-full bg-white p-6 rounded-lg shadow-md"
          >
            <SaveCodeSnips user={user} />
          </TabsContent>
          <TabsContent
            value="enhance-code"
            className="w-full bg-white p-6 rounded-lg shadow-md"
          >
            <EnchanceCode />
          </TabsContent>
          <TabsContent
            value="history"
            className="w-full bg-white p-6 rounded-lg shadow-md"
          >
            <SnippetHistory user={session?.user} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
