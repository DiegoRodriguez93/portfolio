// next image
import Image from 'next/image';

// next link
import Link from 'next/link';

// icons
import { HiArrowRight } from 'react-icons/hi2';

import { useTranslation } from 'next-i18next';

const ProjectsBtn = () => {
  const { t } = useTranslation('common');

  return (
    <div className='mx-auto xl:mx-0 z-10'>
      <Link
        href={'/work'}
        className='relative w-[185px] h-[185px] flex justify-center items-center bg-circleStar bg-cover bg-center bg-no-repeat group'
        aria-label={t('projectsBtn.ariaLabel')}
        title="See My Work"
      >
        <Image
          src={'/rounded-text.png'}
          width={141}
          height={148}
          alt={t('projectsBtn.alt')}
          className='animate-spin-slow w-full h-full max-w-[141px] max-h-[148px]'
        />
        <HiArrowRight
          className='absolute text-4xl group-hover:translate-x-2 transition-all duration-300'
          aria-hidden="true"
        />
        <span className="sr-only">{t('projectsBtn.srOnly')}</span>
      </Link>
    </div>
  );
};

export default ProjectsBtn;
