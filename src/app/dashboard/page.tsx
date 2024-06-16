// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { auth } from "../auth";
import DashboardClient from './dashboardClient';
import Navbar from './navbar';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
   
export default async function Dashboard() {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/");
        return null;
    }

    return (
    <>
    
    <Navbar user={session?.user} />
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
                            value="password" 
                            className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-200"
                        >
                            Password
                        </TabsTrigger>
                        <TabsTrigger 
                            value="history" 
                            className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-200"
                        >
                            History
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="save-code-snip" className="w-full bg-white p-6 rounded-lg shadow-md">
                        <DashboardClient user={session?.user} />
                    </TabsContent>
                    <TabsContent value="password" className="w-full bg-white p-6 rounded-lg shadow-md">
                        Change your password here.
                    </TabsContent>
                    <TabsContent value="history" className="w-full bg-white p-6 rounded-lg shadow-md">
                       History
                    </TabsContent>
                </Tabs>
            </div>

    </>);
}
