import { motion } from "framer-motion";
import { Calendar, Linkedin, Mail } from "lucide-react";

const ContactCard = ({ icon: Icon, title, description, link, delay }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 0 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
  >
    <div className="w-12 h-12 rounded-full bg-[#f4f4f4] flex items-center justify-center mb-4 group-hover:bg-[#e4e4e4] transition-colors">
      <Icon className="w-6 h-6 text-gray-600" strokeWidth={1.2} />
    </div>
    <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-base">{description}</p>
  </motion.a>
);

const Contact = () => {
  return (
    <div className="min-h-screen md:h-screen items-center justify-center flex md:pt-16 pb-40 px-10 md:px-4 font-inter bg-[#f7f7f7]">
      <div className="max-w-4xl mx-auto pt-20 pb-16 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="mt-6 text-4xl font-semibold text-gray-900 font-poppins">
            Stay Connected
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-poppins">
            Join our community and never miss an update.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          <ContactCard
            icon={Calendar}
            title="Events & Meetups"
            description="Watch out for upcoming events and networking opportunities"
            link="https://lu.ma/myaiclub"
            delay={0.2}
          />
          <ContactCard
            icon={Linkedin}
            title="LinkedIn"
            description="Connect with us and grow your professional network"
            link="https://www.linkedin.com/company/myaiclub/"
            delay={0.4}
          />
          <ContactCard
            icon={Mail}
            title="Email"
            description="Have questions? Reach out to our team directly"
            link="mailto:team@myaiclub.com"
            delay={0.6}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
