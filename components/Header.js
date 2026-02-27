import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Socials from "../components/Socials";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Header = () => {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const router = useRouter();

  useEffect(() => {
    setVisible(true);
    lastY.current = 0;

    // Small delay so the new motion.div has time to mount
    const timer = setTimeout(() => {
      const container = document.querySelector(".overflow-y-auto");
      if (!container) return;

      const handleScroll = () => {
        const currentY = container.scrollTop;
        if (currentY < 20) {
          setVisible(true);
        } else if (currentY > lastY.current) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        lastY.current = currentY;
      };

      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }, 300);

    return () => clearTimeout(timer);
  }, [router.pathname]);

  return (
    <header
      className="absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px] transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8">
          {/* logo */}
          <Link href={"/"}>
            <span className="text-white text-xl md:text-3xl font-light tracking-tight">
              <span className="font-bold">Diego</span> Rodriguez
              <span className="text-red-500 font-bold text-2xl md:text-3xl ml-1">
                .
              </span>
            </span>
          </Link>
          {/* socials + language switcher */}
          <div className="flex items-center gap-x-6">
            <Socials />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
