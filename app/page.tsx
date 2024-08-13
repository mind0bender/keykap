"use client";
import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  MutableRefObject,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Letter from "./components/letter";
import Navbar from "./components/navbar";
import wordlist from "./helper/wordlist.json";
import {
  RestartAltRounded,
  SpeedRounded,
  TimerRounded,
  VolumeOffRounded,
  VolumeUpRounded,
} from "@mui/icons-material";
import VirtualKeyboard from "./components/virtual_keyboard";
import Button from "./components/button";

export default function Home(): JSX.Element {
  const [typed, setTyped] = useState<string>("");
  const [keysPressed, setKeysPressed] = useState<string[]>([]);

  const [supposed, setSupposed] = useState<string>();

  const tapAudio: MutableRefObject<HTMLAudioElement | null> = useRef(
    typeof Audio === "undefined"
      ? null
      : new Audio("/assets/single-key-type.wav")
  );

  const [isMuted, setIsMuted] = useState<boolean>(false);

  const timerMaxValue: MutableRefObject<number> = useRef<number>(30);
  const [timer, setTimer] = useState<number>(timerMaxValue.current);
  const timerIntervalRef: MutableRefObject<NodeJS.Timeout | null> =
    useRef<NodeJS.Timeout | null>(null);

  const stopTimer: () => void = useCallback((): void => {
    if (timerIntervalRef.current) {
      console.log(timerIntervalRef.current);
      clearInterval(timerIntervalRef.current);
    }
  }, []);
  const startTimer: () => void = useCallback((): void => {
    timerIntervalRef.current = setInterval((): void => {
      setTimer((pT: number): number => {
        if (!(pT - 1)) {
          stopTimer();
        }
        return pT - 1;
      });
    }, 1000);
  }, [stopTimer]);

  const DEFAULT_MIN_WORD_COUNT: number = 12;
  const DEFAULT_MAX_WORD_COUNT: number = 18;

  function getRandomSentence(
    wordCount: number = Math.floor(
      Math.random() * (DEFAULT_MAX_WORD_COUNT - DEFAULT_MIN_WORD_COUNT) +
        1 +
        DEFAULT_MIN_WORD_COUNT
    )
  ): string {
    let randomWords: string[] = [];
    for (let i: number = 0; i < wordCount; i++) {
      randomWords.push(wordlist[Math.floor(Math.random() * wordlist.length)]);
    }
    return randomWords.join(" ");
  }
  const reset: () => void = useCallback((): void => {
    stopTimer();
    setTimer(timerMaxValue.current);
    setTyped("");
    setSupposed(getRandomSentence());
  }, [stopTimer]);

  const area: RefObject<HTMLTextAreaElement> =
    useRef<HTMLTextAreaElement>(null);

  useEffect((): void => {
    tapAudio.current!.volume = 0.5;
  }, []);

  useEffect((): void => {
    tapAudio.current!.muted = isMuted;
  }, [isMuted]);

  useEffect((): void => {
    window.addEventListener("focus", (): void => {
      area.current?.focus();
    });
    area.current?.addEventListener("blur", (): void => {
      area.current?.focus();
    });
    reset();
  }, [reset]);

  useEffect((): void => {
    // console.log(typed);
  }, [typed]);

  const keyDownHandler: KeyboardEventHandler = useCallback(
    (e: KeyboardEvent): void => {
      // impliment caps and other modifiers
      // const caps:boolean = e.getModifierState && e.getModifierState("CapsLock");
      // console.log(caps);
      setKeysPressed((pKP: string[]): string[] => [...pKP, e.key]);
      if (tapAudio.current!.readyState > tapAudio.current!.HAVE_CURRENT_DATA)
        tapAudio.current!.currentTime = 0;
      tapAudio.current!.play();
      switch (e.key) {
        case "Tab":
          reset();
          break;
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
        default:
          // console.log(e.key);
          break;
      }
    },
    [reset]
  );

  const keyUpHandler: KeyboardEventHandler = useCallback(
    (e: KeyboardEvent): void => {
      setKeysPressed((pKP: string[]): string[] =>
        pKP.filter((key: string): boolean => e.key != key)
      );
    },
    []
  );

  return (
    <div className={`w-full flex justify-center items-center`}>
      <div className="flex w-full max-w-4xl lg:max-w-6xl flex-col items-center justify-center p-16">
        <div
          className={`text-3xl flex items-center justify-between py-4 px-2 w-full font-semibold text-primary-950`}>
          <span>Typing Test</span>
          <button
            title={isMuted ? "unmute" : "mute"}
            className={`flex justify-center items-center active:scale-95 hover:bg-primary-50 rounded-full aspect-square px-3 duration-200 border border-dashed hover:border-primary-500`}
            onClick={(): void => {
              setIsMuted((pIM: boolean): boolean => !pIM);
            }}>
            {isMuted ? <VolumeOffRounded /> : <VolumeUpRounded />}
          </button>
        </div>
        <div
          className={`flex flex-col justify-center items-center bg-primary-200 rounded-sm shadow-lg px-10 py-8 gap-4 w-full container`}>
          <textarea
            onKeyDown={keyDownHandler}
            onKeyUp={keyUpHandler}
            ref={area}
            autoFocus
            value={typed}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
              // checking for max-incorrect-word-length-allowed
              if (!typed && e.target.value) {
                startTimer();
              }
              if (typed.length === supposed?.length) {
                stopTimer();
              }
              const newTypedWordList: string[] = e.target.value.split(" ");
              const lastWord: string =
                newTypedWordList[newTypedWordList.length - 1];
              if (
                lastWord.length > 16 &&
                e.target.value[e.target.value.length - 1] !== " "
              ) {
                return;
              }
              setTyped(e.target.value);
            }}
            className={`scale-0 absolute`}
          />
          <code
            className={`text-lg font-mono text-stone-800 text-start whitespace-break-spaces`}>
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
                    return renderedChar === " " ? <> </> : renderedChar;
                  })()}
                </Letter>
              );
            })}
          </code>
          <div className={`flex justify-between w-full text-primary-950`}>
            <div className={`flex justify-center items-center gap-1`}>
              <SpeedRounded fontSize={"small"} />
              <span className={`font-bold text-2xl`}>120</span>
              <abbr className={`no-underline`} title={"Words per minute"}>
                WPM
              </abbr>
            </div>
            <div className={`flex justify-center items-center`}>
              <TimerRounded fontSize={"small"} /> &nbsp;
              <span className={`font-bold text-2xl`}>{timer}</span>
              <abbr className={`no-underline`} title={"seconds"}>
                s
              </abbr>
            </div>
          </div>
          <div className={`flex justify-end w-full`}>
            <Button onClick={reset}>
              <RestartAltRounded fontSize={"small"} />
              <span>Reset</span>
            </Button>
          </div>
        </div>
        <VirtualKeyboard
          className={`py-10 hidden sm:block`}
          supposedChar={supposed?.[typed.length - 1]}
          pressed={keysPressed}
        />
      </div>
    </div>
  );
}
