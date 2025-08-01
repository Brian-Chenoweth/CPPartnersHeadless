import styles from './HomepageIntro.module.scss';

/**
 * Render the CTA component.
 *
 * @param {Props} props The props object.
 * @param {() => React.ReactElement} props.Button The button component to be rendered.
 * @param {React.ReactElement} props.children The children to be rendered.
 * @returns {React.ReactElement} The CTA component.
 */
export default function HomepageIntro({ Button, children }) {
  return (
    <div className={styles.cta}>
      <div className={styles.content}><h1>sjhdsdjhhjds</h1></div>
    </div>
  );
}
