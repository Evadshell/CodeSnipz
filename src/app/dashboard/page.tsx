import { redirect } from 'next/navigation'
import { auth } from "../auth"
import { use, useEffect } from "react";
export default async function Dashboard(){
    const session = await auth();
    const checkAuth =()=>{
if(!session){
redirect("/")
}
}
checkAuth();

    return (<>
    <h1>Dashboard
        {session?.user?.id}
    </h1>
    </>)
}