// links
import Link from "next/link";

// icons
import { RiLinkedinLine, RiMailLine } from "react-icons/ri";

import { useTranslation } from "next-i18next";

const Socials = () => {
  const { t } = useTranslation("common");

  const mailtoLink = `mailto:Diego Rodriguez <diegorodriguezpaiva1993@gmail.com>?subject=${encodeURIComponent(
    t("socials.emailSubject")
  )}&body=${encodeURIComponent(
    t("socials.emailBody")
  )}`;

  return (
    <div className="flex items-center gap-x-5 text-lg">
      <Link
        href={"https://linkedin.com/in/diego-rodriguez-paiva"}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-accent transition-all duration-300"
        aria-label={t("socials.linkedinAria")}
        title="LinkedIn Profile"
      >
        <RiLinkedinLine className="text-2xl" aria-hidden="true" />
      </Link>
      <Link
        href={mailtoLink}
        className="hover:text-accent transition-all duration-300"
        aria-label={t("socials.emailAria")}
        title="Send Email"
      >
        <RiMailLine className="text-2xl" aria-hidden="true" />
      </Link>
    </div>
  );
};

export default Socials;
