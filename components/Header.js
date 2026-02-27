import { useContext } from "react";
import Link from "next/link";
import Socials from "../components/Socials";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { HeaderVisibilityContext } from "../pages/_app";

const Header = () => {
  const visible = useContext(HeaderVisibilityContext);

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
