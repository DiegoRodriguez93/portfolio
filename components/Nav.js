// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
  HiDocumentText,
  HiCalendar,
} from "react-icons/hi2";

// next link
import Link from "next/link";

// next router
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

const navData = [
  { nameKey: "home", path: "/", icon: <HiHome /> },
  { nameKey: "about", path: "/about", icon: <HiUser /> },
  { nameKey: "services", path: "/services", icon: <HiRectangleGroup /> },
  { nameKey: "work", path: "/work", icon: <HiViewColumns /> },
  { nameKey: "blog", path: "/blog", icon: <HiDocumentText /> },
  { nameKey: "schedule", path: "/schedule", icon: <HiCalendar /> },
  {
    nameKey: "contact",
    path: "/contact",
    icon: <HiEnvelope />,
  },
];

const Nav = () => {
  const router = useRouter();
  const pathname = router.pathname;
  const { t } = useTranslation("common");

  return (
    <nav
      className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* inner */}
      <div
        className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[80px] xl:h-max py-8 bg-white/10
      backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full"
      >
        {navData.map((link, index) => {
          const name = t(`nav.${link.nameKey}`);
          return (
            <Link
              className={`${
                link.path === pathname && "text-accent"
              } relative flex items-center group hover:text-accent transition-all duration-300`}
              href={link.path}
              key={index}
              aria-label={`Navigate to ${name} page`}
              title={`Go to ${name}`}
            >
              {/* tooltip */}
              <div className="absolute pr-14 right-0 hidden xl:group-hover:flex">
                <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
                  <div className="text-[12px] leading-none font-semibold capitalize">
                    {name}
                  </div>
                  {/* triangle */}
                  <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"></div>
                </div>
              </div>
              {/* icon */}
              <div aria-hidden="true">{link.icon}</div>
              <span className="sr-only">{name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
