"use client";
import {
  KeyboardEvent,
  KeyboardEventHandler,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import wordlist from "./helper/wordlist.json";
import { VolumeOffRounded, VolumeUpRounded } from "@mui/icons-material";
import VirtualKeyboard from "./components/virtual_keyboard";
import { clearInterval, setInterval } from "timers";
import TypingArea from "./components/typingarea";

export default function Home(): JSX.Element {
  const [typed, setTyped] = useState<string>("");
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

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
      clearInterval(timerIntervalRef.current);
    }
  }, []);
  const startTimer: () => void = useCallback((): void => {
    timerIntervalRef.current = setInterval((): void => {
      setTimer((pT: number): number => {
        if (pT - 1 <= 0) {
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

  const endTest: () => void = useCallback((): void => {
    stopTimer();
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
    // console.log("s" + supposed + "e");
  }, [supposed]);

  const keyDownHandler: KeyboardEventHandler = useCallback(
    (e: KeyboardEvent): void => {
      // impliment caps and other modifiers
      const caps: boolean =
        e.getModifierState && e.getModifierState("CapsLock");
      console.log(caps);

      setKeysPressed(
        (pKP: Set<string>): Set<string> => new Set([...pKP, e.key])
      );
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
      setKeysPressed((pKP: Set<string>): Set<string> => {
        const a = new Set(pKP);
        a.delete(e.key);
        return a;
      });
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
        {/* typing area */}
        <TypingArea
          ref={area}
          testData={{
            endTest,
            resetTest: reset,
            supposed,
            timerMaxValue,
            typedState: [typed, setTyped],
          }}
          timer={{
            value: timer,
            startTimer,
            stopTimer,
          }}
          value={typed}
          onKeyDown={keyDownHandler}
          onKeyUp={keyUpHandler}
        />
        <VirtualKeyboard
          className={`py-10 hidden sm:block`}
          supposedChar={supposed?.[typed.length - 1]}
          pressed={keysPressed}
          locked={timer <= 0}
        />
        {JSON.stringify(keysPressed)}
      </div>
    </div>
  );
}
