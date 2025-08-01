import parse, { domToReact } from 'html-react-parser';
import className from 'classnames/bind';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import styles from './ContentWrapper.module.scss';

const cx = className.bind(styles);

export default function ContentWrapper({ content, className, children }) {
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
          infiniteLoop={false}      // ❌ Don't loop back to the beginning
          interval={3000}
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          stopOnHover={true}
          centerMode={true}
          centerSlidePercentage={33}
          swipeable={true}
          emulateTouch={true}
          transitionTime={700}      // optional: slow down transition
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
