import * as MENUS from 'constants/menus';

import { gql } from '@apollo/client';
import {
  Header,
  Footer,
  Main,
  EntryHeader,
  NavigationMenu,
  ContentWrapper,
  FeaturedImage,
  SEO,
  Posts,
} from 'components';
import Image from 'next/image';
import { pageTitle } from 'utilities';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import styles from 'styles/pages/_Home.module.scss';

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage, date, author } = props.data.post;
  const recentPosts = props?.data?.posts?.nodes ?? [];

  return (
    <>
      <SEO
        title={pageTitle(
          props?.data?.generalSettings,
          title,
          props?.data?.generalSettings?.title
        )}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          <div className="container">
            <h1 className="postTitle">{title}</h1>
            <Image
              src={featuredImage?.node?.sourceUrl}
              width={400}
              height={80}
              alt="Cal Poly University logo"
              layout="responsive"
            />
            <ContentWrapper content={content} />
          </div>

          {/* ✅ Recent Posts Section */}
          <section className={`${styles.posts} container`}>
            <h2 className={styles.heading}>Recent Posts</h2>
            <Posts posts={recentPosts} />
          </section>
        </>
      </Main>
      <Footer
        title={siteTitle}
        menuItems={footerMenu}
        navOneMenuItems={props?.data?.footerSecondaryMenuItems?.nodes ?? []}
        navTwoMenuItems={props?.data?.footerTertiaryMenuItems?.nodes ?? []}
      />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  ${Posts.fragments.entry}

  query GetPost(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $footerSecondaryLocation: MenuLocationEnum
    $footerTertiaryLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      author {
        node {
          name
        }
      }
      tags {
        edges {
          node {
            name
            uri
          }
        }
      }
      categories {
        edges {
          node {
            name
            uri
          }
        }
      }
      ...FeaturedImageFragment
    }

    posts(first: 3) {
      nodes {
        ...PostsItemFragment
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

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    footerSecondaryLocation: MENUS.FOOTER_SECONDARY_LOCATION,
    footerTertiaryLocation: MENUS.FOOTER_TERTIARY_LOCATION,
    asPreview: ctx?.asPreview,
  };
};
