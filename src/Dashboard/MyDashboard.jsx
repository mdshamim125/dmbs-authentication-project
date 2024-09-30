import React from "react";
import { Typewriter } from "react-simple-typewriter";

const MyDashboard = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-5xl font-bold text-green-600">
        <Typewriter
          words={[" Welcome to Admin's Dashboard!"]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>
    </div>
  );
};

export default MyDashboard;
