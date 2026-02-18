import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const AuthorBio = ({
  specialization,
  description,
}) => {
  const { t } = useTranslation("common");

  const displaySpecialization = specialization || t("authorBio.specialization");
  const displayDescription = description || t("authorBio.description");

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-8 my-12">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/work/author.png"
            alt="Diego Rodriguez"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">Diego Rodriguez</h3>
          <p className="text-accent mb-4">{displaySpecialization}</p>
          <p className="text-white/80 mb-4">
            {displayDescription}
          </p>
          <Link href="/about" className="text-accent hover:text-white transition-colors">
            {t("authorBio.learnMore")} →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
