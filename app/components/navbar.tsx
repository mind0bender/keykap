"use client";

import { GitHub, ShareRounded } from "@mui/icons-material";
import Link from "next/link";

type ReactNavElement = JSX.IntrinsicElements["nav"];

interface NavbarProps extends ReactNavElement {}

function Navbar({ ...restNavbarProps }: NavbarProps): JSX.Element {
  return (
    <nav
      {...restNavbarProps}
      className={`w-full p-6 flex justify-between items-center border-b border-b-primary-700 ${restNavbarProps.className}`}>
      <Link href={"/"} className={`text-2xl font-semibold`}>
        keykap
      </Link>
      <div className={`flex justify-between items-center gap-4`}>
        <Link
          title={`view project`}
          className={`flex relative flex-col justify-center items-start peer text-center`}
          target={"_blank"}
          href={`https://www.github.com/mind0bender/keykap.git`}>
          <div className={`flex peer justify-center items-center gap-1`}>
            <GitHub className={`text-primary-950`} />
            <span>GitHub</span>
          </div>
          <hr
            className={`absolute -bottom-1 border-t-2 border-dashed w-0 peer-hover:w-full border-primary-500 duration-200`}
          />
        </Link>
        <button
          title={`Share`}
          className={`bg-primary-50 hover:bg-white rounded-full p-2 border border-primary-200 duration-200 flex justify-center items-center`}
          onClick={(): void => {
            navigator
              .share({
                title: "keykap",
                url: "https://keykap.vercel.app/",
                text: "Can you beat my high score?",
              })
              .then((): void => {
                console.log("thanks for sharing");
              })
              .catch((err: any): void => {
                console.log("Failed to share");
                console.error(err);
              });
          }}>
          <ShareRounded />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
