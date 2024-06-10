import { auth } from "../auth"

export default async function Dashboard(){
    const session = await auth();
    return (<>
    <h1>Dashboard
        {session?.user?.id}
    </h1>
    </>)
}