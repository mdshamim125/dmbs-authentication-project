import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-4xl font-semibold text-red-600 dark:text-white lg:text-4xl">
                <Typewriter
                  words={["Hello Everyone!"]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />{" "}
                <br />
              </h1>

              <h3 className="text-3xl font-semibold mt-3">
                <span className="text-blue-500">
                  <Typewriter
                    words={[" Welcome to Our Authentication Project..."]}
                    loop={1}
                    cursor
                    cursorStyle="_"
                    typeSpeed={150}
                    deleteSpeed={50}
                    delaySpeed={1000}
                    // onLoopDone={handleDone}
                    // onType={handleType}
                  />
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img
              className="w-full h-full lg:max-w-3xl"
              src="https://merakiui.com/images/components/Catalogue-pana.svg"
              alt="Catalogue-pana.svg"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Banner;
