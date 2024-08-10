import Link from "next/link";

function Navbar(): JSX.Element {
  return (
    <nav
      className={`w-full p-6 flex justify-between items-center border-b border-b-orange-700`}>
      <span className={`text-2xl font-semibold`}>keykap</span>
      <Link
        target={"_blank"}
        href={`https://www.github.com/mind0bender/keykap.git`}>
        Github
      </Link>
    </nav>
  );
}

export default Navbar;
