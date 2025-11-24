import { useState, useEffect } from 'react';
import parse, { domToReact } from 'html-react-parser';
import className from 'classnames/bind';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import styles from './ContentWrapper.module.scss';

const cx = className.bind(styles);

export default function ContentWrapper({ content, className, children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Adjust breakpoint as needed (e.g., 768px)
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // run on mount
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const transform = (node) => {
    const isTickerGroup =
      node.name === 'div' &&
      node.attribs?.class?.includes('wp-block-group') &&
      node.attribs?.class?.includes('ticker');

    if (isTickerGroup) {
      const figures = node.children?.filter(
        (child) =>
          child.name === 'figure' &&
          child.attribs?.class?.includes('wp-block-image')
      );

      return (
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          showArrows={!isMobile}        // optionally hide arrows on mobile
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          stopOnHover
          centerMode={!isMobile}        // no centerMode on mobile
          centerSlidePercentage={isMobile ? 100 : 33} // 1 slide vs ~3 slides
          swipeable
          emulateTouch
          transitionTime={700}
        >
          {figures.map((fig, index) => (
            <div key={index}>{domToReact([fig])}</div>
          ))}
        </Carousel>
      );
    }
  };

  return (
    <article className={cx('content', className)}>
      {parse(content ?? '', { replace: transform })}
      {children}
    </article>
  );
}
