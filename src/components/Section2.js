import { useRef } from "react";
import { gsap } from "gsap";
export default function Section2() {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId = null;

  let xForce = 0;

  let yForce = 0;

  const easing = 0.08;

  const speed = 0.01;

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;

    xForce += movementX * speed;

    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start, target, amount) =>
    start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(plane2.current, {
      x: `+=${xForce * 0.5}`,
      y: `+=${yForce * 0.5}`,
    });
    gsap.set(plane3.current, {
      x: `+=${xForce * 0.25}`,
      y: `+=${yForce * 0.25}`,
    });

    if (Math.abs(xForce) < 0.01) xForce = 0;

    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);

      requestAnimationFrameId = null;
    }
  };

  return (
    // <div className="h-screen flex items-center justify-center relative">
    <main
      className="h-[105vh] mt-20 w-screen overflow-hidden relative bg-white"
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
    >
      <div ref={plane1} className="absolute inset-0 opacity-80">
        <img
          src="./photos/20.webp"
          alt="image"
          // width={300}
          className="absolute w-[220px] md:w-[300px] left-[70%] md:left-[75%] top-[50%] md:top-[50%] rounded-2xl"
        />
        <img
          src="./photos/6.webp"
          alt="image"
          // width={300}
          className="absolute w-[300px] md:w-[300px] left-[60%] md:left-[5%] top-[75%] md:top-[65%] rounded-2xl"
        />
        <img
          src="./photos/10.webp"
          alt="image"
          // width={225}
          className="absolute w-[200px] md:w-[225px] left-[20%] md:left-[30%] -top-[8%] rounded-2xl"
        />
      </div>

      <div ref={plane2} className="absolute inset-0 opacity-85">
        <img
          src="./photos/8.webp"
          alt="image"
          // width={400}
          className="absolute w-[300px] md:w-[400px] -left-[4%] md:left-[1%] top-[18%] md:top-[13%] rounded-2xl"
        />
        <img
          src="./photos/22.webp"
          alt="image"
          // width={300}
          className="absolute w-[200px] md:w-[300px] left-[71%] top-[25%] md:top-[7%] rounded-2xl"
        />
        <img
          src="./photos/1.webp"
          alt="image"
          // width={325}
          className="absolute w-[300px] md:w-[325px] left-[6%] md:left-[50%] top-[75%] md:top-[63%] rounded-2xl"
        />
      </div>

      <div ref={plane3} className="absolute inset-0  opacity-70">
        <img
          src="./photos/3.webp"
          alt="image"
          width={250}
          className="absolute left-[50%] top-[2.5%] rounded-2xl"
        />
        <img
          src="./photos/11.webp"
          alt="image"
          // width={200}
          className="absolute w-[200px] md:w-[200px] md:left-[30%] top-[55%] md:top-[64%] rounded-2xl"
        />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-black font-normal text-4xl">
          A Home for AI Pioneers.
        </h1>
        {/* <p className="text-[#676767] mt-2">Some text</p> */}
      </div>
    </main>
  );
}
