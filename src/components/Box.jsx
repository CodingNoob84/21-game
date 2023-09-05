"use client"
import React, { useState, useEffect } from 'react';

function Box({ numbers, onSelect,index }) {
  const ballSize = 40; // Size of each ball in pixels
  const boxWidth = 250; // Width of the container in pixels
  const boxHeight = 300; // Height of the container in pixels
  const numBalls = numbers.length;

  // State to store the positions of the balls
  const [ballPositions, setBallPositions] = useState([]);

  // Function to check if a ball overlaps with another ball
  const isOverlap = (x1, y1, r1, x2, y2, r2) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < r1 + r2;
  };

  // Function to generate random non-overlapping positions for the balls
  const generateRandomPositions = () => {
    const newBallPositions = [];
    for (let i = 0; i < numBalls; i++) {
      let left, top;
      let isOverlapping = true;
      while (isOverlapping) {
        left = Math.random() * (boxWidth - ballSize);
        top = Math.random() * (boxHeight - ballSize);
        isOverlapping = false;

        // Check for overlap with other balls
        for (let j = 0; j < i; j++) {
          const otherPosition = newBallPositions[j];
          if (isOverlap(left, top, ballSize / 2, otherPosition.left, otherPosition.top, ballSize / 2)) {
            isOverlapping = true;
            break;
          }
        }

        // Check for overlap with the box border
        if (
          left < ballSize / 2 || left + ballSize > boxWidth - ballSize / 2 ||
          top < ballSize / 2 || top + ballSize > boxHeight - ballSize / 2
        ) {
          isOverlapping = true;
        }
      }
      newBallPositions.push({ left, top });
    }
    setBallPositions(newBallPositions);
  };

  // Generate random positions when the component mounts
  useEffect(() => {
    generateRandomPositions();
  }, []);

  return (
    <div
      className='border border-violet-400 rounded-md p-5 hover:shadow-2xl hover:shadow-violet-400 hover:cursor-pointer relative'
      style={{ width: `${boxWidth}px`, height: `${boxHeight}px` }}
      onClick={()=>onSelect(index)}
    >
      {ballPositions.map((position, index) => (
        <div
          key={numbers[index]}
          className='m-3 flex justify-center items-center rounded-full border border-teal-300 absolute'
          style={{ left: `${position.left}px`, top: `${position.top}px`, width: `${ballSize}px`, height: `${ballSize}px` }}
        >
          {numbers[index]}
        </div>
      ))}
    </div>
  );
}

export default Box;
