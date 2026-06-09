import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData = null,
}) => {
  console.log("SEO structuredData:", structuredData);

  const siteName = "Webix Infotech";

  const fullTitle = title?.includes(siteName)
    ? title
    : `${title} | ${siteName}`;

  const defaultImage = "https://webixinfotech.vercel.app/og-image.jpg";

  const url = canonical || "https://webixinfotech.vercel.app/";

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>

      <meta name="description" content={description} />

      {keywords && (
        <meta
          name="keywords"
          content={keywords}
        />
      )}

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* Hardcoded Test Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Webix Infotech",
            url: "https://webixinfotech.vercel.app/",
          }),
        }}
      />

      {/* Dynamic Structured Data */}
      {structuredData &&
        (Array.isArray(structuredData)
          ? structuredData.map((data, index) => (
              <script
                key={`schema-${index}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(data),
                }}
              />
            ))
          : (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(structuredData),
                }}
              />
            ))}
    </Helmet>
  );
};

export default SEO;