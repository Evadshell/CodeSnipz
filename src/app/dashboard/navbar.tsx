import React from "react";
 import { Button } from "@/components/ui/button";  
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FiLogOut } from "react-icons/fi";  
import { signOut } from "../auth";

import SaveCodeSnips from "./save-code-snippets/SaveCodeSnips";
import Image from "next/image";
interface User {
  name: string;
  email: string;
  image: string ;  
}

interface NavbarProps {
  user: User;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <div className="fixed left-4 top-4 h-[calc(100%-32px)] w-16 bg-gray-900 text-white shadow-lg rounded-lg flex flex-col items-center py-4 space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <Image
          src={user?.image}
          alt="User Profile"
          width={40}
          height={40}
          className="rounded-full border-2 border-black"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button type="submit" >
                  <FiLogOut />
                </Button>
              </form>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sign Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
