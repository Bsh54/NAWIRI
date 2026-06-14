export const metadata = {
  title: "NAWIRI — Trouvez l'aide publique à laquelle vous avez droit",
  description:
    "Assistant conversationnel qui aide les familles d'Afrique de l'Ouest (Bénin, Sénégal, Ghana) à découvrir les programmes d'aide publique auxquels elles ont droit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "'Source Sans 3', 'Segoe UI', system-ui, sans-serif",
          background: "#ECFEFF",
          color: "#164E63",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {children}
      </body>
    </html>
  );
}
