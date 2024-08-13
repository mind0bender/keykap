import { GitHub, ShareRounded } from "@mui/icons-material";
import Link from "next/link";

function Navbar(): JSX.Element {
  return (
    <nav
      className={`w-full p-6 flex justify-between items-center border-b border-b-primary-700`}>
      <Link href={"/"} className={`text-2xl font-semibold`}>
        keykap
      </Link>
      <div className={`flex justify-between items-center gap-4`}>
        <Link
          title={`view project`}
          className={`flex justify-center items-center text-center gap-1`}
          target={"_blank"}
          href={`https://www.github.com/mind0bender/keykap.git`}>
          <GitHub className={`text-primary-950`} />
          <span>Github</span>
        </Link>
        <button
          title={`Share`}
          onClick={(): void => {
            navigator.share({
              title: "keykap",
              url: "https://keykap.vercel.app/",
              text: "Can you beat my high score?",
            });
          }}>
          <ShareRounded />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
