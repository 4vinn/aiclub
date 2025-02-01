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
      className="h-screen w-screen overflow-hidden relative bg-white"
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
    >
      <div ref={plane1} className="absolute inset-0 brightness-[1]">
        <img
          src="https://images.unsplash.com/photo-1737229940875-293ed0c4e8af?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          width={300}
          className="absolute left-[80%] top-[60%]"
        />
        <img
          src="https://images.unsplash.com/photo-1737157998574-2a75f0c52a09?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          width={300}
          className="absolute left-[5%] top-[65%]"
        />
        <img
          src="https://images.unsplash.com/photo-1735287367310-2648443f086f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          width={225}
          className="absolute left-[35%] top-[0%]"
        />
      </div>

      <div ref={plane2} className="absolute inset-0 brightness-[0.8]">
        <img
          src="https://images.unsplash.com/photo-1735447814306-8887e953a91f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          width={450}
          className="absolute left-[5%] top-[10%]"
        />
        <img
          src="https://images.unsplash.com/photo-1736695796493-699707480bcf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          width={300}
          className="absolute left-[80%] top-[5%]"
        />
        <img
          src="https://images.unsplash.com/photo-1736774635374-923eec77df57?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          width={325}
          className="absolute left-[60%] top-[60%]"
        />
      </div>

      <div ref={plane3} className="absolute inset-0 brightness-[0.6]">
        <img
          src="https://images.unsplash.com/photo-1735675376752-2e0fb3de9f69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          width={250}
          className="absolute left-[65%] top-[2.5%]"
        />
        <img
          src="https://images.unsplash.com/photo-1535911061633-d2516c0023d4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image"
          width={200}
          className="absolute left-[40%] top-[75%]"
        />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-[#111111] font-normal text-xl">Some Heading</h1>
        <p className="text-[#676767] mt-2">Some text</p>
      </div>
    </main>
  );
}
