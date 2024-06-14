// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { auth } from "../auth";
import DashboardClient from './dashboardClient';
import Navbar from './navbar';

export default async function Dashboard() {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/");
        return null;
    }

    return (
    <>
    <Navbar user={session?.user} />
    <DashboardClient user={session?.user} />;
    
    </>);
}
