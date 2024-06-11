import { redirect } from 'next/navigation';
import { auth } from "../auth";
import Navbar from './navbar';

export default async function Dashboard() {
    const session = await auth();

   
        if (!session) {
            redirect("/");
        }
 

    if (!session || !session.user) {
        return <div>Loading...</div>; // Or any other loading indicator or fallback UI
    }

    return (
        <>
            <Navbar user={session.user} />
        </>
    );
}
