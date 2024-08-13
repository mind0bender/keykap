import { GitHub, InfoRounded } from "@mui/icons-material";
import Link from "next/link";
import { JSX } from "react";

type ReactFooterElement = JSX.IntrinsicElements["footer"];

interface FooterPorps extends ReactFooterElement {}

function Footer({ ...restFooterProps }: FooterPorps): JSX.Element {
  return (
    <footer
      {...restFooterProps}
      className={`w-full p-6 flex justify-between items-center border-t border-t-primary-700 ${restFooterProps.className}`}>
      <Link href={"/"} className={`font-semibold`}>
        keykap
      </Link>
      <ul className={`flex gap-4`}>
        <li>
          <Link
            href={"/about"}
            className={`flex gap-2 justify-center items-center`}>
            <InfoRounded />
            About
          </Link>
        </li>
        <li>
          <Link
            target={"_blank"}
            href={"https://github.com/mind0bender/keykap.git"}
            className={`flex gap-2 justify-center items-center`}>
            <GitHub />
            GitHub
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
