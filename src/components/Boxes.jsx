"use client";
import React, { useEffect, useState } from "react";
import Box from "./Box";

function initialThreeSets(numbers){
    const set1 = numbers.slice(0, 7);
    const set2 = numbers.slice(7, 14);
    const set3 = numbers.slice(14, 21);
  return [set1,set2,set3]
}

function createThreeSets(numbers) {
  const sets = [[], [], []];

  for (let i = 0; i < numbers.length; i++) {
    const setIndex = i % 3;
    sets[setIndex].push(numbers[i]);
  }

  return sets;
}

function rearrangeSets(order, numbersSet) {
    const [set1, set2, set3] = numbersSet;
    let sets = [];
  
    if (order === 0) {
      sets = [set3, set1, set2];
    } else if (order === 1) {
      sets = [set3, set2, set1];
    } else if (order === 2) {
      sets = [set2, set3, set1];
    }
  
    // Combine all sets into a single set
    const mergedSet = [].concat(...sets);
  console.log(mergedSet)
    return mergedSet;
  }
  
  
  

function Boxes({ random }) {
  //const [randomNumbers, setRandomNumbers] = useState(random);
  //console.log(randomNumbers)
  const [numbersSet, setNumbersSet] = useState(initialThreeSets(random));
  //console.log(numbersSet)
const[tries, setTries]=useState(0);
const[finalNumber,setFinalNumber]=useState("");

  useEffect(() => {
if (tries==3){
        //const middleIndex = numbersSet[1][4];
//const middleNumber = randomNumbers[middleIndex];
setFinalNumber(numbersSet[1][3]);
setTries(0)
    }
    
    
  }, [numbersSet, tries]);

  const onSelect=(id)=>{

    //console.log(id)
    const newNumbers=rearrangeSets(id,numbersSet);
    //setRandomNumbers(newNumbers);
    setNumbersSet(createThreeSets(newNumbers))
    setTries(tries+1)
    }
  
  return (
    <div>
        <div className="flex justify-center items-center">Number of Selection:{tries}</div>
       { finalNumber!="" && <div className="fixed inset-0 z-50  flex justify-center items-center backdrop-blur-md">
  <div className="w-[300px] h-[200px] border border-violet-400 flex flex-col p-2 ">
    <div className="flex flex-row-reverse cursor-pointer hover:animate-bounce" onClick={()=>setFinalNumber("")}>X</div>
    <div className="flex-1 flex flex-col justify-center items-center">
    <div>Your Number</div>
    <div
          className='w-[50px] h-[50px] m-3 shadow-2xl shadow-teal-400 flex justify-center items-center rounded-full border border-teal-300'
        >
          {finalNumber}
        </div>
        </div></div>
</div> } 

        {numbersSet.length>0 && <div className="flex flex-col gap-5 md:flex-row p-4">
      <Box numbers={numbersSet[0]} onSelect={onSelect} index={0} />
      <Box numbers={numbersSet[1]} onSelect={onSelect} index={1}/>
      <Box numbers={numbersSet[2]} onSelect={onSelect} index={2}/>
    </div> }
    
    </div>
  );
}

export default Boxes;
