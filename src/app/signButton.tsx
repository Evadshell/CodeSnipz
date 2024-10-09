
import { signOut, signIn, auth } from "./auth";
import { Button } from "@/components/ui/button";
import GoToDashboard from "./gotoDashboard";
export default async function SignInButton() {
  const session = await auth();
  console.log(session?.user);
  return (
    <>
      {session?.user ? (
        <>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
          <GoToDashboard />
        </>
      ) : (
        <>
          <form
            action={async () => {
              "use server";
              await signIn("", { redirectTo: "/dashboard" });
              //dont put anything in bracket so that every option can be shown
            }}
          >
            <Button type="submit">Signin</Button>
          </form>
        </>
      )}
    </>
  );
}
