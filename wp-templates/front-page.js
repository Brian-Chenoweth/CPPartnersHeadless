import * as MENUS from 'constants/menus';

import { useQuery, gql } from '@apollo/client';
import { FaArrowRight } from 'react-icons/fa';
import styles from 'styles/pages/_Home.module.scss';
import {
  EntryHeader,
  Main,
  Button,
  Heading,
  CTA,
  NavigationMenu,
  SEO,
  Header,
  Footer,
  Posts,
  Testimonials,
  HomepageCampusLife,
  HomepageIntro,
  HomepageNonprofit,
  HomepageTestimonials,
  HomepageTicker,
  HomepageAdvancing,
  HomepageAttainableHousing,
  HomepageEmpowering,
  HomepageFoodInsecurity,
} from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';

const postsPerPage = 4;

export default function Component() {
  const { data, loading } = useQuery(Component.query, {
    variables: Component.variables(),
  });
  if (loading) {
    return null;
  }

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const mainBanner = {
    sourceUrl: '/static/banner.jpeg',
    mediaDetails: { width: 1200, height: 600 },
    altText: 'Portfolio Banner',
  };
  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />

      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />

      <Main className={styles.home}>
        <EntryHeader image={mainBanner} />
        <div className="container">
          <HomepageIntro />
          <HomepageNonprofit />
          <HomepageTicker />
          <HomepageCampusLife />
          <HomepageAdvancing />
          <HomepageTestimonials />
          <HomepageAttainableHousing />
          {/* <HomepageFoodInsecurity /> */}
          <section className={styles.testimonials}>
            <Heading className={styles.heading} level="h2">
              Testimonials
            </Heading>
            <Testimonials testimonials={data?.testimonials?.nodes} />
          </section>
          <HomepageEmpowering />
          <HomepageFoodInsecurity />
          <section className={styles.posts}>
            <Heading className={styles.heading} level="h2">
              News
            </Heading>
            <Posts posts={data.posts?.nodes} id="posts-list" />
          </section>
        </div>
      </Main>
      <Footer
        title={siteTitle}
        menuItems={footerMenu}
        navOneMenuItems={data?.footerSecondaryMenuItems?.nodes ?? []}
        navTwoMenuItems={data?.footerTertiaryMenuItems?.nodes ?? []}
      />


    </>
  );
}

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    footerSecondaryLocation: MENUS.FOOTER_SECONDARY_LOCATION,
    footerTertiaryLocation: MENUS.FOOTER_TERTIARY_LOCATION,
    first: postsPerPage,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${Posts.fragments.entry}
  ${Testimonials.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $footerSecondaryLocation: MenuLocationEnum
    $footerTertiaryLocation: MenuLocationEnum
    $first: Int
  ) {
    posts(first: $first) {
      nodes {
        ...PostsItemFragment
      }
    }
    testimonials {
      nodes {
        ...TestimonialsFragment
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }, first: 100) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
   footerMenuItems: menuItems(where: { location: $footerLocation }) {
  nodes {
    ...NavigationMenuItemFragment
  }
}
footerSecondaryMenuItems: menuItems(where: { location: $footerSecondaryLocation }) {
  nodes {
    ...NavigationMenuItemFragment
  }
}
footerTertiaryMenuItems: menuItems(where: { location: $footerTertiaryLocation }) {
  nodes {
    ...NavigationMenuItemFragment
  }
}
  }
`;
