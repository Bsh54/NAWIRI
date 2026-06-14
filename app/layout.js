import "./globals.css";

export const metadata = {
  title: "NAWIRI — Find the public aid you're entitled to",
  description:
    "A conversational assistant that helps vulnerable families in West Africa (Benin, Senegal, Ghana) discover public aid programs they are legally entitled to.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
