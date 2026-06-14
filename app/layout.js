export const metadata = {
  title: "NAWIRI — Trouvez l'aide à laquelle vous avez droit",
  description:
    "Assistant conversationnel qui aide les familles d'Afrique de l'Ouest (Bénin, Sénégal, Ghana) à découvrir les programmes d'aide publique auxquels elles ont droit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          background: "#ECFEFF",
          color: "#164E63",
        }}
      >
        {children}
      </body>
    </html>
  );
}
