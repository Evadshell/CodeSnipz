"use client";
import { useRouter } from 'next/navigation'
import { signOut, signIn, auth } from "./auth";
import { Button } from "@/components/ui/button";
export default function GoToDashboard() {
    const router = useRouter()
    const handleDashboardRedirect = () => {
        router.push("/dashboard");
      };
  return (
    <>
     
        <Button  onClick={handleDashboardRedirect}>

          Dashboard
        </Button>
     
    </>
  );
}
