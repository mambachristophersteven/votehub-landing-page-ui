import Head from "next/head";

export default function Headd({ title, image }) {
  const dash = title == "" ? "" : " |";
  return (
    <Head>
      <title>{title + dash + " Discover and Manage Events"} </title>
      <meta
        name="title"
        content={title + dash + " Discover and Manage Events"}
      ></meta>
      <meta
        name="og:title"
        content={title + dash + " Discover and Manage Events"}
      ></meta>

      <meta property="og:type" content="website"></meta>
      <meta property="og:url" content="https://VoteHub.africa/"></meta>
      <meta
        name="description"
        content="With VoteHub you can discover events in your city, buy tickets to music or games, create and manage your own event and sell tickets to other users."
      />
      <meta
        name="og:description"
        content="With VoteHub you can discover events in your city, buy tickets to music or games, create and manage your own event and sell tickets to other users."
      />
      <link rel="icon" href="/vote.png" />
      <meta
        property="og:image"
        content={image ? image : "https://VoteHub.netlify.app/1.png"}
      ></meta>

      <meta
        name="twitter:title"
        content={title + dash + " Discover and Manage Events"}
      ></meta>
      <meta
        content="With VoteHub you can discover events in your city, buy tickets to music or games, create and manage your own event and sell tickets to other users."
        name="twitter:description"
      ></meta>
      <meta name="twitter:url" content="https://VoteHub.africa/"></meta>
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:site" content="@VoteHub"></meta>
      <meta name="twitter:creator" content="@VoteHub"></meta>
      <meta
        name="twitter:image"
        content={image ? image : "https://VoteHub.netlify.app/1.png"}
      ></meta>

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-Y5P4TVP212"
      ></script>

      <script
        dangerouslySetInnerHTML={{
          __html: `    window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', 'G-Y5P4TVP212')`,
        }}
      />
    </Head>
  );
}
