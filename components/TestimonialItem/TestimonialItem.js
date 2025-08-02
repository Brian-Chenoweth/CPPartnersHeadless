import className from 'classnames/bind';
import { FaQuoteLeft } from 'react-icons/fa';

import styles from './TestimonialItem.module.scss';
const cx = className.bind(styles);

/**
 * Render the testimonial item component
 *
 * @param {Props} props The props object.
 * @param {string} props.author The author of the testimonial.
 * @param {React.ReactElement} props.children The content of the testimonial.
 * @returns {React.ReactElement} The testimonial item component.
 */
export default function TestimonialItem({ author, jobTitle, company, image, children }) {
  return (
    <div className={cx('container')}>
      
      <div className={cx('quote-icon-wrap')}>
        <FaQuoteLeft className={cx('quote-icon')} />
      </div>


      {/* Author image */}
      {image?.sourceUrl && (
        <img
          src={image.sourceUrl}
          alt={image.altText || author}
          className={cx('author-image')}
          width={image.mediaDetails?.width}
          height={image.mediaDetails?.height}
        />
      )}

      
      <div className={cx('content')}>{children}</div>

      
      {author && <div className={cx('author')}>{author}</div>}

      {jobTitle && company && 
        <div className={cx('jobTitle')}>{jobTitle}, {company}</div>
      }


    </div>
  );
}
