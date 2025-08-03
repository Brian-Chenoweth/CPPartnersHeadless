import * as MENUS from 'constants/menus';
import PageContent from 'components/PageContent'; // ⬅️ Add this at the top

import { gql } from '@apollo/client';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { pageTitle } from 'utilities';

import {
  Header,
  Footer,
  Main,
  ContentWrapper,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
} from '../components';

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage } = props?.data?.page ?? { title: '' };

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
          <EntryHeader title={title} image={featuredImage?.node} />
          <div className="container">
            <ContentWrapper content={content} />
            {/* <PageContent html={content} /> */}
          </div>
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


Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $footerSecondaryLocation: MenuLocationEnum
    $footerTertiaryLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
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
