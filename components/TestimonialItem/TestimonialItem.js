import className from 'classnames/bind';
import { FaQuoteLeft } from 'react-icons/fa';
import Image from 'next/image';

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
export default function TestimonialItem({
  author,
  jobTitle,
  company,
  image,
  children,
}) {
  // Avatar size in CSS is probably ~80–120px; clamp here
  const avatarSize = 96;

  return (
    <div className={cx('container')}>
      <div className={cx('quote-icon-wrap')}>
        <FaQuoteLeft className={cx('quote-icon')} />
      </div>

      {/* Author image */}
      {image?.sourceUrl && (
        <div className={cx('author-image-wrap')}>
          <Image
            src={image.sourceUrl}
            alt={image.altText || author || ''}
            width={avatarSize}
            height={avatarSize}
            className={cx('author-image')}
            sizes="(max-width: 768px) 64px, 96px"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>
      )}

      <div className={cx('content')}>{children}</div>

      {author && <div className={cx('author')}>{author}</div>}

      {jobTitle && company && (
        <div className={cx('jobTitle')}>
          {jobTitle}, {company}
        </div>
      )}
    </div>
  );
}
