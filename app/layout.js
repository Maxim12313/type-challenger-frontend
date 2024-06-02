import "./globals.css";
import Navbar from "./components/Navbar"


export const metadata = {
  title: "Type Challenger",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-dvw h-dvh">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
