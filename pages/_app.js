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
  // ---- Parallax Scroll Effect ----
  const handleScroll = () => {
    const parallaxEls = document.querySelectorAll('.wp-block-image.parallax img');

    parallaxEls.forEach((el) => {
      const container = el.closest('.parallax');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - Math.min(Math.max(rect.top / windowHeight, 0), 1);
      const maxOffset = 130;
      const offset = Math.max(Math.min((progress - 0.5) * 2 * maxOffset, maxOffset), -maxOffset);

      el.style.transform = `translateY(${offset}px)`;
    });
  };

  const checkStandaloneLinks = () => {
    const links = document.querySelectorAll(
      '.bg-green a, .bg-white a, .bg-yellow a, .green-image-right a, .white-image-left a, .white-image-right a, .yellow-image-left a, .intro-text a'
    );

    links.forEach((link) => {
      const parent = link.parentElement;
      if (!parent) return;

      const visualChildren = Array.from(parent.childNodes).filter((node) => {
        return (
          node.nodeType === Node.ELEMENT_NODE ||
          (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
        );
      });

      const isOnlyChild = visualChildren.length === 1 && visualChildren[0] === link;

      const rect = link.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      const isFullBlock =
        Math.abs(rect.top - parentRect.top) < 2 &&
        Math.abs(rect.bottom - parentRect.bottom) < 2;

      const parentText = parent.innerText.trim();
      const linkText = link.innerText.trim();
      const isOnlyTextMatch = parentText === linkText;

      const isStandalone = isOnlyChild && isFullBlock && isOnlyTextMatch;

      link.classList.toggle('standalone-link', isStandalone);
    });
  };

  // Delay initial run until after DOM paints
  const delayCheck = setTimeout(() => {
    handleScroll();
    checkStandaloneLinks();
  }, 100); // can drop to 50ms if needed

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', checkStandaloneLinks);

  return () => {
    clearTimeout(delayCheck);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', checkStandaloneLinks);
  };
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
