/**
 * Global application config file
 */
const appConfig = {
  /**
   * The number of posts to fetch per 'page'.
   */
  postsPerPage: 9,

  /**
   * The number of projects to fetch per 'page'.
   */
  projectsPerPage: 5,

  /**
   * The number of post featured images that are above the fold for most screen sizes.
   * These images will be considered high priority and preloaded.
   */
  postsAboveTheFold: 6,

  /**
   * The number of project featured images that are above the fold for most screen sizes.
   * These images will be considered high priority and preloaded.
   */
  projectsAboveTheFold: 3,

  /**
   * Displays a default Featured Image when a Post does not have one.
   */
  archiveDisplayFeaturedImage: true,

  /**
   * This app's primary color.
   * @see {@link https://github.com/wpengine/atlas-blueprint-portfolio/blob/main/src/components/ThemeStyles/ThemeStyles.js}
   */
  themeColor: 'green',

  /**
   * @type {[key: 'twitterUrl' | 'facebookUrl' | 'instagramUrl' | 'youtubeUrl' | 'githubUrl' | 'linkedinUrl']: string}
   */
  socialLinks: {
    twitterUrl: 'https://x.com/CalPolyPartners',
    facebookUrl: 'https://www.facebook.com/calpolypartners/',
    instagramUrl: 'https://www.instagram.com/calpoly_partners/',
    linkedinUrl: 'https://www.linkedin.com/company/calpolypartners',
  },
};

export default appConfig;
