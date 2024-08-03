import Image from "next/image";
import { signOut, signIn, auth } from "./auth";
import { Button } from "@/components/ui/button"
import LandingPage from "./landingpage";
// import {Button}
export default async function Home() {
  const session = await auth();
  console.log(session?.user);
  return (
    <div  >
    <LandingPage />
      {/* {session?.user ? (
        <>
          <h1>{session?.user?.name}</h1>
          <Image
            src={session?.user?.image || ""}
            width={100}
            height={100}
            alt="User Image"
          />{" "}
          <form
            action={async () => {
              "use server";
              await signOut();  
            }}
          >
            <button type="submit">Sign Out</button>
            <Button type="submit">Sign Out</Button>
          </form>
        </>
      ) : (
        <>
          <form
            action={async () => {
              "use server";
              await signIn("", { redirectTo: "/dashboard" })
              //dont put anything in bracket so that every option can be shown
            }}
          >
            <button type="submit">Signin</button>
          </form>
        </>
      )} */}
    </div>
  );
}
