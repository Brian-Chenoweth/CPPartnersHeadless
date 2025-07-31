import '../faust.config';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import 'normalize.css/normalize.css';
import '../styles/main.scss';
import ThemeStyles from 'components/ThemeStyles/ThemeStyles';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const parallaxEls = document.querySelectorAll('.wp-block-image.parallax img');

      parallaxEls.forEach((el) => {
        const container = el.closest('.parallax');
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Scroll progress from 0 (bottom) to 1 (top)
        const progress = 1 - Math.min(Math.max(rect.top / windowHeight, 0), 1);

        // Clamp between -30px and +30px
        const maxOffset = 130;
        const offset = Math.max(Math.min((progress - 0.5) * 2 * maxOffset, maxOffset), -maxOffset);

        el.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ThemeStyles />
      <FaustProvider pageProps={pageProps}>
        <Component {...pageProps} key={router.asPath} />
      </FaustProvider>
    </>
  );
}
