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
import wordlist from "./components/helper/wordlist.json";
import {
  RestartAltRounded,
  SpeedRounded,
  TimerRounded,
  VolumeMuteRounded,
  VolumeOffRounded,
  VolumeUpRounded,
} from "@mui/icons-material";

export default function Home(): JSX.Element {
  const [typed, setTyped] = useState<string>("");

  const [supposed, setSupposed] = useState<string>();

  const tapAudio: MutableRefObject<HTMLAudioElement | null> = useRef(
    typeof Audio === "undefined"
      ? null
      : new Audio("/assets/single-key-type.wav")
  );

  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [timer, setTimer] = useState<number>(0);
  const timerIntervalRef: MutableRefObject<NodeJS.Timeout | null> =
    useRef<NodeJS.Timeout | null>(null);

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
    setTyped("");
    setSupposed(getRandomSentence());
  }, []);

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

  return (
    <main className={`min-h-screen`}>
      <Navbar />
      <div className={`w-full flex justify-center items-center`}>
        <div className="flex max-w-4xl lg:max-w-6xl flex-col items-center justify-center p-16">
          <div
            className={`text-3xl flex items-center justify-between py-4 px-2 w-full font-semibold text-orange-950`}>
            <span>Typing Test</span>
            <button
              onClick={(): void => {
                setIsMuted((pIM: boolean): boolean => !pIM);
              }}>
              {isMuted ? (
                <VolumeOffRounded titleAccess={`unmute`} />
              ) : (
                <VolumeUpRounded titleAccess={`mute`} />
              )}
            </button>
          </div>
          <div
            className={`flex flex-col justify-center items-center bg-orange-200 rounded-sm shadow-lg px-10 py-8 gap-4 w-full container`}>
            <textarea
              onKeyDown={keyDownHandler}
              ref={area}
              autoFocus
              value={typed}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
                // checking for max-incorrect-word-length-allowed
                const newTypedWordList: string[] = e.target.value.split(" ");
                const lastWord: string =
                  newTypedWordList[newTypedWordList.length - 1];
                if (lastWord.length > 16) {
                  return;
                }
                setTyped(e.target.value);
              }}
              className={`scale-0 absolute`}
            />
            <code
              className={`text-lg text-stone-800 text-start whitespace-break-spaces`}>
              {supposed
                ?.split("")
                .map((char: string, idx: number): ReactNode => {
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
            <div className={`flex justify-between w-full text-orange-950`}>
              <div className={`flex justify-center items-center gap-1`}>
                <SpeedRounded fontSize={"small"} />
                <span className={`font-bold text-2xl`}>120</span>
                <span>WPM</span>
              </div>
              <div className={`flex justify-center items-center`}>
                <TimerRounded fontSize={"small"} /> &nbsp;
                <span className={`font-bold text-2xl`}>30</span>
                <span>s</span>
              </div>
            </div>
            <div className={`flex justify-end w-full`}>
              <button
                onClick={reset}
                className={`flex justify-center items-center text-center gap-1 px-4 py-2 border border-orange-400 bg-orange-100 text-sm`}
                type="reset">
                <RestartAltRounded fontSize={"small"} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
