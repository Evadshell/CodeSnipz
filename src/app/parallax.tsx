"use client"
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
export default function ParallaxComponenet() {
  return (
    <div >
      <Parallax pages={4} >
<ParallaxLayer speed={1}>
<h2>hello</h2>
</ParallaxLayer>
<ParallaxLayer offset={1} speed={0.5} ><div color="red" >

  <h2>hifwegfuwegfgwfgefiubkboibkib</h2>
</div>
</ParallaxLayer>
      </Parallax>
    </div>
  );
}
