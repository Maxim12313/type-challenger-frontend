import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export const metadata = {
  title: "Type Challenger",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-dvw h-dvh">
        <Navbar />
        <div className="py-16 flex flex-col items-center h-full w-full">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
