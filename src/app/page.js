import Image from "next/image";
import React from 'react';
import {Counter} from "@/components/Counter";

export default function Home() {
  return (
      <div>
          <h1>My Hook Test App</h1>
          <Counter/>
      </div>
  );
}
