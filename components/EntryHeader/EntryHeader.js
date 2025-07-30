import className from 'classnames/bind';
import { FeaturedImage, Heading } from 'components';

import styles from './EntryHeader.module.scss';
const cx = className.bind(styles);
/**
 * A Page or Post entry header component
 * @param {Props} props The props object.
 * @param {MediaItem} props.image The image node..
 * @param {string} props.className An optional className to be added to the EntryHeader.
 * @return {React.ReactElement} The EntryHeader component.
 */
export default function EntryHeader({ title, image, date, author, className }) {

  return (
    <div className={cx(['entry-header', className])}>
      {image && (
        <div className={cx('image')}>
          {/* <div className="container"> */}
            <Heading className={cx('heading-home')} level="h1">
              Shaping<br/>Tomorrow,<br/>Together
            </Heading>
            <FeaturedImage
              className={cx('featured-image')}
              image={image}
              priority
            />
          {/* </div> */}
        </div>
      )}
    </div>
  );
}
