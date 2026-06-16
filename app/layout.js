import "./globals.css";

export const metadata = {
  title: "NAWIRI — Find the public aid you're entitled to",
  description:
    "A conversational assistant that helps vulnerable families in West Africa (Benin, Senegal, Ghana) discover public aid programs they are legally entitled to — in English, French, Fɔngbe, Wolof or Twi.",
  openGraph: {
    title: "NAWIRI — Find the public aid you're entitled to",
    description:
      "Public aid exists. NAWIRI helps West African families actually get it — across 25 verified programs in Benin, Senegal and Ghana.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect + direct stylesheet link load fonts faster than @import,
            which matters on the limited connections of our target users. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
        />
        <meta name="theme-color" content="#C05A3C" />
      </head>
      <body>{children}</body>
    </html>
  );
}
