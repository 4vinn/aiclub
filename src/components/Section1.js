import React, { useEffect } from "react";

const COSMOS_COUNT = 6;
const ITEMS_PER_COSMOS = 10;

function Section1() {
  useEffect(() => {
    const cosmos = document.querySelectorAll(".cosmos");
    cosmos.forEach((element, index) => {
      const angle = (360 / COSMOS_COUNT) * index;
      element.style.transform = `rotate(${angle}deg) translate(60vh)`;

      const cosmosItems = element.querySelectorAll(".cosmos-item");
      cosmosItems.forEach((item, j) => {
        item.style.animationDelay = `${j * 0.8}s`;
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0c0c] overflow-hidden relative">
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white uppercase text-center z-10">
        Ai Club
      </h1>

      <div className="absolute top-0 h-screen w-screen flex justify-center items-center">
        {[...Array(COSMOS_COUNT)].map((_, index) => (
          <div key={index} className="cosmos absolute w-28 h-[200px]">
            {[...Array(ITEMS_PER_COSMOS)].map((_, itemIndex) => (
              <div
                key={itemIndex}
                className="cosmos-item absolute top-0 left-0 w-full h-full origin-bottom scale-0 animate-[fall-and-disappear_6s_ease-in-out_infinite]"
              >
                <img
                  src="https://placehold.co/600x300/white/white"
                  alt="Placeholder"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section1;
