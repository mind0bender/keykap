import {
  AutoGraphRounded,
  SettingsSuggestRounded,
  SpeedRounded,
} from "@mui/icons-material";
import Button from "../components/button";
import Link from "next/link";

function AboutPage(): JSX.Element {
  return (
    <div className={`flex justify-center items-center w-full pt-16`}>
      <div className="flex w-full max-w-4xl lg:max-w-6xl flex-col items-center justify-center py-32 sm:px-8 gap-16">
        <div
          className={`flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 px-8 py-32`}>
          <div
            className={`text-3xl sm:text-4xl lg:text-6xl font-bold sm:w-1/2`}>
            Improve Your Typing Skills with Our Typing Test
          </div>
          <div
            className={`sm:w-1/2 text-primary-800 text-lg sm:text-xl lg:text-2xl`}>
            Our typing test is designed to help you enhance your typing speed
            and accuracy. Whether you&apos;re a student, professional, or just
            someone looking to improve their typing skills, our platform has
            everything you need to reach your goals.
          </div>
        </div>
        <div
          className={`flex flex-col gap-12 p-8 bg-primary-200 py-32 rounded-md`}>
          <div className={`text-3xl sm:text-4xl lg:text-6xl font-bold`}>
            Elevate Your Typing Experience with
          </div>
          <ul className={`flex flex-wrap justify-center items-center gap-6`}>
            <li
              className={`flex flex-col gap-4 border px-10 py-8 hover:ring ring-primary-50 bg-primary-100 rounded-md border-primary-300 duration-200`}>
              <div
                className={`text-5xl w-full flex justify-center items-center`}>
                <SpeedRounded fontSize={"inherit"} />
              </div>
              Accurate Speed and Accuracy tracking
            </li>
            <li
              className={`flex flex-col gap-4 border px-10 py-8 hover:ring ring-primary-50 bg-primary-100 rounded-md border-primary-300 duration-200`}>
              <div
                className={`text-5xl w-full flex justify-center items-center`}>
                <AutoGraphRounded fontSize={"inherit"} />
              </div>
              Comprehensive performance analysis
            </li>
            <li
              className={`flex flex-col gap-4 border px-10 py-8 hover:ring ring-primary-50 bg-primary-100 rounded-md border-primary-300 duration-200`}>
              <div
                className={`text-5xl w-full flex justify-center items-center`}>
                <SettingsSuggestRounded fontSize={"inherit"} />
              </div>
              Customizable test settings
            </li>
          </ul>
          <div className={`flex justify-end text-sm w-full`}>
            <span className={`font-medium`}>Please note:&nbsp;</span>
            <span className={`flex flex-col text-start`}>
              This website is currently under development. Not all features are
              available yet. <br />
              We appreciate your patience as we work to bring you the full
              experience.
            </span>
          </div>
        </div>
        <div
          className={`flex flex-col sm:flex-row justify-center items-start gap-8 sm:gap-12 px-8 py-32`}>
          <div
            className={`flex flex-col gap-8 text-3xl sm:text-4xl lg:text-6xl font-bold sm:w-1/2`}>
            <div>Take the Typing Test Today</div>
            <Link className={`hidden sm:block`} href={`/`}>
              <Button>Start Typing Test</Button>
            </Link>
          </div>
          <div
            className={`sm:w-1/2 text-primary-800 text-lg sm:text-xl lg:text-2xl`}>
            Our typing test is designed to provide you with a comprehensive and
            personalized experience. With advanced tracking, detailed analysis,
            and tailored improvement recommendations, you&apos;ll be able to
            take your typing skills to the next level.
          </div>
          <Link className={`sm:hidden block`} href={`/`}>
            <Button>Start Typing Test</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
