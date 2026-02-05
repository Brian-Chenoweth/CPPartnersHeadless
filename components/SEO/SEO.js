import Head from 'next/head';

/**
 * Provide SEO related meta tags to a page.
 *
 * @param {Props} props The props object.
 * @param {string} props.title Used for the page title, og:title, twitter:title, etc.
 * @param {string} props.description Used for the meta description, og:description, twitter:description, etc.
 * @param {string} props.imageUrl Used for the og:image and twitter:image.
 * @param {string} props.url Used for the og:url and twitter:url.
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({ title, description, imageUrl, url, noindex = false }) {
  if (!title && !description && !imageUrl && !url) {
    return null;
  }

  const typekitStylesheets = [
    'https://use.typekit.net/umi1lem.css',
    'https://use.typekit.net/mfv5sni.css',
    'https://use.typekit.net/qnm1phw.css',
    'https://use.typekit.net/ato6pec.css',
  ];
  const googleFontStylesheet =
    'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;500;600;700&display=swap';

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {typekitStylesheets.map((href) => (
          <link key={`${href}-preload`} rel="preload" as="style" href={href} />
        ))}
        {typekitStylesheets.map((href) => (
          <link
            key={`${href}-stylesheet`}
            rel="stylesheet"
            href={href}
            media="print"
            onLoad={(event) => {
              event.currentTarget.media = 'all';
            }}
          />
        ))}
        <noscript>
          {typekitStylesheets.map((href) => (
            <link key={`${href}-noscript`} rel="stylesheet" href={href} />
          ))}
        </noscript>

        <link rel="preload" as="style" href={googleFontStylesheet} />
        <link
          rel="stylesheet"
          href={googleFontStylesheet}
          media="print"
          onLoad={(event) => {
            event.currentTarget.media = 'all';
          }}
        />
        <noscript>
          <link rel="stylesheet" href={googleFontStylesheet} />
        </noscript>
        {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet"/> */}


        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />

        {noindex && <meta name="robots" content="noindex, nofollow" />}

        {title && (
          <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta property="og:title" content={title} />
            <meta property="twitter:title" content={title} />
          </>
        )}

        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />
          </>
        )}

        {imageUrl && (
          <>
            <meta property="og:image" content={imageUrl} />
            <meta property="twitter:image" content={imageUrl} />
          </>
        )}

        {url && (
          <>
            <meta property="og:url" content={url} />
            <meta property="twitter:url" content={url} />
          </>
        )}
      </Head>
    </>
  );
}
