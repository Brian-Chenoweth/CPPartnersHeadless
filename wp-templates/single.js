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
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage, date, author } = props.data.post;
  const recentPosts = props?.data?.posts?.nodes ?? [];

  // 🔹 Add the date formatter here
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const ordinal =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return date
      .toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
      .replace(/\d+/, `${day}${ordinal}`);
  }

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
      <Main className="singleMain">
        <>
        <div className="container singleContainer twoCol">
          <article className="postArea">
            <h1 className="postTitle">{title}</h1>

            <Image
              src={featuredImage?.node?.sourceUrl}
              width={1200}
              height={675}
              alt={featuredImage?.node?.altText || title}
              layout="responsive"
            />

            <ContentWrapper content={content} />
          </article>

          <aside className="sidebar">
            <h2 className="sidebarHeading">Recent News</h2>
            <ul className="recent-posts">
              {recentPosts.map(post => {
                return (
                  <li key={post.id}>
                    <div className="post-meta">
                      <time dateTime={post.date}>
                          {formatDate(post.date)}
                      </time>
                    </div>
                    <a href={post.uri}>{post.title}</a>
                  </li>
                );
              })}
            </ul>
          </aside>

        </div>
{/* 
          <section className={`${styles.posts} container`}>
            <h2 className={styles.heading}>Recent News</h2>
            <Posts posts={recentPosts} />
          </section> */}


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

    posts(first: 8) {
      nodes {
        ...PostsItemFragment
        date
        excerpt
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
