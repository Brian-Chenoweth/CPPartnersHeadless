import Link from 'next/link';

import styles from './HomepageAdvancing.module.scss';


export default function HomepageAdvancing() {
  return (
    <div className={styles.cta}>
      <div class="wp-block-group intro-text bg-green-dark has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
        <h2 class="wp-block-heading">Advancing Learn by Doing
        </h2>
        <p>We are an active supporter of Cal Poly’s “Learn by Doing” philosophy. Cal Poly Partners provides fiscal and administrative services to commercial units that involve student staffing and learning. From Swanton Pacific Ranch to the Center for Innovation and Entrepreneurship, University Graphic Systems, and various agricultural enterprise operations, we facilitate hands-on learning experiences that prepare students for the real world.</p>
        <p>
        <Link legacyBehavior href="https://vimeopro.com/user3345556/cal-poly-corporation-2022-23-impact-report" target="_blank" rel="noopener">
        <a title="Partnering in Mustang Success">
        Partnering in Mustang Success
        </a>
        </Link>
        </p>
      </div>
    </div>
  );
}
