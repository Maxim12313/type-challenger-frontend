import Link from "next/link"

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 mb-10 w-full helper">
      <div className="flex flex-col items-center h-12 p-2 w-full">
        <Link href="/">Type Challenger</Link>
        <div className="flex flex-row w-full items-start space-x-10 mx-10">
          <Link href="/singleplayer">Singleplayer</Link>
          <Link href="/multiplayer">Multiplayer</Link>
        </div>
      </div>
    </div>
  );
}