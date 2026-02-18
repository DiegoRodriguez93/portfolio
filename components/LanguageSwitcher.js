import { useRouter } from "next/router";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale, locales } = router;

  const switchLocale = (newLocale) => {
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2 py-1 rounded transition-all duration-300 uppercase text-xs font-medium ${
            locale === loc
              ? "bg-accent text-white"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
          aria-label={`Switch to ${loc === "en" ? "English" : "Spanish"}`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
