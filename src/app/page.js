import Box from "@/components/Box";
import Boxes from "@/components/Boxes";
import React from "react";
function getRandomOrderNumbers() {
  const numbers = Array.from({ length: 21 }, (_, index) => index + 1); // Create an array from 1 to 21
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap elements to shuffle the array
  }
  return numbers;
}

export default function Home() {
  return (
    <main className="h-screen w-screen p-4 bg-black text-white">
      <div className="flex flex-col gap-5 justify-center items-center border border-violet-400 mx-auto">
        <div className="flex justify-center items-center border border-teal-400 rounded-md shadow-md shadow-teal-300 m-2 w-[300px] p-2">
          Think of any number from below container. Select respective container
          which has your number three times.
        </div>
        <Boxes random={getRandomOrderNumbers()} />
        <div className="flex justify-center items-center">
          © 2023 Created by Kowshalya
        </div>
      </div>
    </main>
  );
}
