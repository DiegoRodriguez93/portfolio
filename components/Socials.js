// links
import Link from "next/link";

// icons
import { RiLinkedinLine, RiMailLine } from "react-icons/ri";

const Socials = () => {
  const mailtoLink = `mailto:Diego Rodriguez <diegorodriguezpaiva1993@gmail.com>?subject=${encodeURIComponent(
    "Freelance Services Inquiry"
  )}&body=${encodeURIComponent(
    "Hi Diego,\n\nI'm interested in hiring your freelance services.\n\nI'd like to discuss:\n- \n\nLooking forward to your response.\n\nBest regards."
  )}`;

  return (
    <div className="flex items-center gap-x-5 text-lg">
      <Link
        href={"https://linkedin.com/in/diego-rodriguez-paiva"}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-accent transition-all duration-300"
        aria-label="Visit Diego Rodriguez's LinkedIn profile"
        title="LinkedIn Profile"
      >
        <RiLinkedinLine className="text-2xl" aria-hidden="true" />
      </Link>
      <Link
        href={mailtoLink}
        className="hover:text-accent transition-all duration-300"
        aria-label="Send email to Diego Rodriguez"
        title="Send Email"
      >
        <RiMailLine className="text-2xl" aria-hidden="true" />
      </Link>
    </div>
  );
};

export default Socials;