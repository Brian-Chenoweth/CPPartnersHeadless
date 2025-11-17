import Head from 'next/head';

/**
 * Provide SEO related meta tags to a page.
 */
export default function SEO({ title, description, imageUrl, url }) {
  if (!title && !description && !imageUrl && !url) {
    return null;
  }

  const typekitStylesheets = [
    'https://use.typekit.net/umi1lem.css',
    'https://use.typekit.net/mfv5sni.css',
    'https://use.typekit.net/qnm1phw.css',
    'https://use.typekit.net/ato6pec.css',
  ];

  return (
    <>
      <Head>
        {/* Preconnect for Adobe Typekit */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />

        {/* Load Typekit CSS asynchronously to avoid render blocking */}
        {typekitStylesheets.map((href) => (
          <link key={`${href}-preload`} rel="preload" href={href} as="style" />
        ))}

        {typekitStylesheets.map((href) => (
          <link
            key={href}
            rel="stylesheet"
            href={href}
            media="print"
            onLoad={(e) => {
              e.currentTarget.media = 'all';
            }}
          />
        ))}

        {/* Fallback for no-JS users */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: typekitStylesheets
              .map((href) => `<link rel="stylesheet" href="${href}">`)
              .join('\n'),
          }}
        />

        {/* Google Fonts (already display=swap, fine to keep) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />

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
