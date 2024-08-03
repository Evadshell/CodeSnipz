
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInButton from "./signButton";
// import SignInButton from "@/components/SignInButton";
import {Parallax , ParallaxLayer} from '@react-spring/parallax';
import ParallaxComponenet from "./parallax";
export default function LandingPage() {
  return (
    <>
    {/* <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="absolute top-4 right-4">
        <SignInButton />
      </div>
      <Card className="w-[350px] shadow-lg rounded-lg bg-white">
        <CardHeader>
          <CardTitle>CodeSnipz</CardTitle>
          <CardDescription>
            Keep track of your learning in your hands now
          </CardDescription>
        </CardHeader>
      </Card>
    
    </div> */}
   <ParallaxComponenet />
    </>
  );
}
