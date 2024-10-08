import {
  ChangeEvent,
  Dispatch,
  forwardRef,
  HtmlHTMLAttributes,
  KeyboardEvent,
  MutableRefObject,
  ReactNode,
  Ref,
} from "react";
import Letter from "./letter";
import {
  AllInclusiveRounded,
  ArrowRightAltRounded,
  GradingRounded,
  RestartAltRounded,
  SpeedRounded,
  TimerRounded,
} from "@mui/icons-material";
import Button from "./button";

interface TypingAreaProps extends HtmlHTMLAttributes<HTMLTextAreaElement> {
  timer: TimerInterface;
  value: string | number | readonly string[] | undefined;
  testData: TestData;
}

type TypedState = [string, Dispatch<string>];

interface TestData {
  typedState: TypedState;
  endTest: () => void;
  resetTest: () => void;
  timerMaxValue: MutableRefObject<number>;
  supposed: string | undefined;
  accuracy: number;
  wpm: number;
}

interface TimerInterface {
  value: number;
  startTimer: () => void;
  stopTimer: () => void;
}

function TypingArea(
  {
    timer: { value: timer, startTimer, stopTimer },
    testData: {
      typedState: [typed, setTyped],
      endTest,
      resetTest,
      timerMaxValue,
      supposed,
      accuracy,
      wpm,
    },
    ...rest
  }: TypingAreaProps,
  ref: Ref<HTMLTextAreaElement>
): JSX.Element {
  return (
    <div
      className={`flex flex-col justify-center items-center bg-primary-200 rounded-sm shadow-md shadow-primary-300 px-8 sm:px-10 py-6 sm:py-8 gap-4 sm:gap-6 w-full container`}>
      <textarea
        ref={ref}
        autoFocus
        onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
          rest.onChange && rest.onChange(e);
          if (!typed && e.target.value) {
            startTimer();
          }
          if (typed.length === supposed?.length) {
            stopTimer();
          }
          // checking for max-incorrect-word-length-allowed (16)
          const newTypedWordList: string[] = e.target.value.split(" ");
          const lastWord: string =
            newTypedWordList[newTypedWordList.length - 1];
          if (
            lastWord.length > 16 &&
            e.target.value[e.target.value.length - 1] !== " "
          ) {
            return;
          }
          if (!timer) {
            return;
          }
          if (typed.length === supposed?.length) {
            endTest();
          }
          setTyped(e.target.value);
        }}
        className={`scale-0 absolute ${rest.className}`}
        {...rest}
      />
      <code
        className={`text-base sm:text-lg font-mono text-stone-800 text-start whitespace-break-spaces`}>
        {supposed?.split("").map((char: string, idx: number): ReactNode => {
          return (
            <Letter
              active={idx == typed.length}
              passed={idx < typed.length}
              correct={!typed[idx] || char === typed[idx]}
              hint={{
                children: char === " " ? <div>∙</div> : char,
              }}
              key={idx}>
              {((): ReactNode => {
                const renderedChar: string = typed[idx] || char;
                return renderedChar === " " ? <span> </span> : renderedChar;
              })()}
            </Letter>
          );
        })}
        <ArrowRightAltRounded titleAccess={`Enter`} />
      </code>
      <div className={`w-full`}>
        <div className={`w-full relative`}>
          <hr className={`border-1 w-full border-primary-400 border-dashed`} />
          <div
            className={`w-4 sm:w-6 aspect-square absolute bg-primary-100 border border-primary-400 rounded-full shadow-inner shadow-primary-400 top-0 left-0 -translate-x-1/2 -translate-y-1/2`}
          />
          <div
            className={`w-4 sm:w-6 aspect-square absolute bg-primary-100 border border-primary-400 rounded-full shadow-inner shadow-primary-400 top-0 right-0 translate-x-1/2 -translate-y-1/2`}
          />
        </div>
        <div
          className={`flex justify-between w-full text-primary-950 pt-4 sm:pt-6`}>
          <div className={`flex flex-col justify-center items-start`}>
            <div
              className={`flex justify-center items-center gap-1`}
              title={`speed`}>
              <SpeedRounded fontSize={"small"} />
              <span className={`flex justify-center items-baseline gap-1`}>
                <span className={`font-bold text-lg sm:text-xl lg:text-2xl`}>
                  {wpm === Infinity ? <AllInclusiveRounded /> : Math.round(wpm)}
                </span>
                <abbr
                  className={`no-underline text-sm sm:text-sm`}
                  title={"Words per minute"}>
                  WPM
                </abbr>
              </span>
            </div>
            <div
              className={`flex justify-center items-center gap-1`}
              title={`accuracy`}>
              <GradingRounded fontSize={"small"} />
              <span className={`flex justify-center items-baseline gap-1`}>
                <span className={`font-bold text-lg sm:text-xl lg:text-2xl`}>
                  {Math.round(accuracy)}
                </span>
                <abbr
                  className={`no-underline text-sm sm:text-sm`}
                  title={"Words per minute"}>
                  %
                </abbr>
              </span>
            </div>
          </div>
          <div className={`flex justify-center items-cente`}>
            <div title={`timer`} className={`flex justify-center items-center`}>
              <TimerRounded fontSize={"small"} className={`-translate-y-0.5`} />{" "}
              &nbsp;
              <span className={`font-bold text-2xl font-mono`}>
                {timer
                  .toString()
                  .padStart(timerMaxValue.current.toString().length, "0")}
              </span>
              <abbr className={`no-underline`} title={"seconds"}>
                s
              </abbr>
            </div>
          </div>
        </div>
        <div className={`flex justify-end w-full`}>
          <Button onClick={resetTest}>
            <RestartAltRounded fontSize={"small"} />
            <span>Reset</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(TypingArea);
