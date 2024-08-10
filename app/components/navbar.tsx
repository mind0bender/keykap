import { GitHub } from "@mui/icons-material";
import Link from "next/link";

function Navbar(): JSX.Element {
  return (
    <nav
      className={`w-full p-6 flex justify-between items-center border-b border-b-orange-700`}>
      <span className={`text-2xl font-semibold`}>keykap</span>
      <Link
        title={`view project`}
        className={`flex justify-center items-center text-center gap-1`}
        target={"_blank"}
        href={`https://www.github.com/mind0bender/keykap.git`}>
        <GitHub className={`text-orange-950`} />
        <span>Github</span>
      </Link>
    </nav>
  );
}

export default Navbar;
