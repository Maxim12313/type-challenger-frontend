import Link from "next/link"

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 mb-10">
      <div className="flex p-2">
        <Link href="/">
          Type Challenger
        </Link>
      </div>
    </div>
  );
}