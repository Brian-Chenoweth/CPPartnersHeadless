import Marquee from "react-fast-marquee";

import styles from './HomepageTicker.module.scss';


export default function HomepageTicker() {
  return (
    <div className={styles.homepageTicker}>
      <Marquee
        autofill
        pauseOnHover>
        <h2><span className="line">—</span>Partners in <span className={styles.mustangSuccess}>Mustang Success</span></h2>
        <h2><span className="line">—</span>Partners in <span className={styles.mustangSuccess}>Mustang Success</span></h2>
        <h2><span className="line">—</span>Partners in <span className={styles.mustangSuccess}>Mustang Success</span></h2>
        <h2><span className="line">—</span>Partners in <span className={styles.mustangSuccess}>Mustang Success</span></h2>
        <h2><span className="line">—</span>Partners in <span className={styles.mustangSuccess}>Mustang Success</span></h2>
        <h2><span className="line">—</span>Partners in <span className={styles.mustangSuccess}>Mustang Success</span></h2>
        <h2><span className="line">—</span>Partners in <span className={styles.mustangSuccess}>Mustang Success</span></h2>
      </Marquee>
    </div>
  );
}
