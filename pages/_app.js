import "../styles/globals.css";
import { createContext, useState, useRef, useCallback, useEffect } from "react";

// components
import Layout from "../components/Layout";
import Transition from "../components/Transition";

// router
import { useRouter } from "next/router";
import Head from "next/head";

// framer motion
import { AnimatePresence, motion } from "framer-motion";

// i18n
import { appWithTranslation } from "next-i18next";

export const HeaderVisibilityContext = createContext(true);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastY = useRef(0);

  // Reset header visibility on every route change
  useEffect(() => {
    setHeaderVisible(true);
    lastY.current = 0;
  }, [router.pathname]);

  const handleScroll = useCallback((e) => {
    const currentY = e.currentTarget.scrollTop;
    if (currentY < 20) {
      setHeaderVisible(true);
    } else if (currentY > lastY.current) {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }
    lastY.current = currentY;
  }, []);

  if (Component.noLayout) {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <HeaderVisibilityContext.Provider value={headerVisible}>
      <>
        <Head>
          {/* Metadatos globales básicos */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#7c3aed" />

          {/* Favicons globales */}
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#7c3aed" />

          {/* DNS Prefetch para optimización */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />

          {/* Global SEO */}
          <meta name="author" content="Diego Rodriguez" />
          <meta name="robots" content="index, follow" />
          <link
            rel="canonical"
            href={`https://www.diego-rodriguez.work${router.asPath}`}
          />
        </Head>

        <Layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              className="overflow-y-auto h-full"
              onScroll={handleScroll}
            >
              <Transition />
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </>
    </HeaderVisibilityContext.Provider>
  );
}

export default appWithTranslation(MyApp);
