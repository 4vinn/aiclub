// import { motion } from "framer-motion";
import { Calendar, Linkedin, Mail } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const CONTACT_CARDS = [
  {
    icon: Calendar,
    title: "Events & Meetups",
    description: "Watch out for upcoming events and networking opportunities",
    link: "https://lu.ma/myaiclub",
    delay: 0.2,
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "Connect with us and grow your professional network",
    link: "https://www.linkedin.com/company/myaiclub/",
    delay: 0.35,
  },
  {
    icon: Mail,
    title: "Email",
    description: "Have questions? Reach out to our team directly",
    link: "mailto:team@myaiclub.com",
    delay: 0.5,
  },
];

const Contact = () => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove(event) {
    let { left, top } = event.currentTarget.getBoundingClientRect();

    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  }
  return (
    <div className="min-h-screen md:h-screen items-center justify-center flex md:pt-16 pb-40 px-10 md:px-4 font-inter bg-[#121212]">
      <div className="max-w-4xl mx-auto pt-20 pb-16 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="mt-6 text-4xl font-semibold text-white font-poppins">
            Stay Connected
          </h1>
          <p className="mt-4 text-xl text-[#808080] font-poppins">
            Join our community and never miss an update.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {CONTACT_CARDS.map((card) => (
            <motion.div
              initial={{ opacity: 0, y: 20, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: card.delay, duration: 0.8, ease: "easeOut" }}
              className="group relative max-w-md rounded-xl border border-white/10 bg-[#121212] shadow-2xl"
              onMouseMove={handleMouseMove}
            >
              {/* glow */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-all duration-500 group-hover:opacity-100"
                style={{
                  background: useMotionTemplate`
              radial-gradient(
                480px circle at ${mouseX}px ${mouseY}px,
                rgba(218, 231, 237, 0.15),
                transparent 99%
              )
            `,
                }}
              />
              <a
                key={card.title}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center px-8 py-10 "
              >
                <div className="w-12 h-12 rounded-full bg-[#1e1e1e] flex items-center justify-center mb-8 group-hover:bg-[#3d3d3d] transition-all duration-300">
                  <card.icon
                    className="w-6 h-6 text-gray-200"
                    strokeWidth={1.2}
                  />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-[#808080] group-hover:text-white text-base transition-all duration-300">
                  {card.description}
                </p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
