"use client";
import {
  FocusEvent,
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
import TypingArea from "./components/typingarea";
import { KeyboardModifiers } from "./components/modifiers";

interface AccuracyCount {
  correct: number;
  incorrect: number;
}

export default function Home(): JSX.Element {
  const [typed, setTyped] = useState<string>("");
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const [KeyboardModifiers, setKeyboardModifiers] = useState<KeyboardModifiers>(
    {
      capsLock: false,
      numLock: false,
      shift: false,
      ctrl: false,
      alt: false,
      arrow: {
        up: false,
        right: false,
        down: false,
        left: false,
      },
    }
  );

  const [accuracyCounter, setAccuracyCounter] = useState<AccuracyCount>({
    correct: 0,
    incorrect: 0,
  });
  const [WPM, setWPM] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);

  const getAccuracy: () => number = useCallback((): number => {
    if (!(accuracyCounter.correct + accuracyCounter.incorrect)) {
      return 0;
    }
    const acc: number =
      (accuracyCounter.correct * 100) /
      (accuracyCounter.correct + accuracyCounter.incorrect);
    return acc;
  }, [accuracyCounter]);

  const [supposed, setSupposed] = useState<string>();

  const tapAudio: MutableRefObject<HTMLAudioElement | null> = useRef(
    typeof Audio === "undefined"
      ? null
      : new Audio("/assets/single-key-type.wav")
  );

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(true);

  const timerMaxValue: MutableRefObject<number> = useRef<number>(30);
  const [timer, setTimer] = useState<number>(timerMaxValue.current);
  const timerIntervalRef: MutableRefObject<NodeJS.Timeout | null> =
    useRef<NodeJS.Timeout | null>(null);

  const getWPM: () => number = useCallback((): number => {
    const keyStrokeCount: number = typed.length;
    const wordCount: number = keyStrokeCount / 5;
    const accuracy: number = getAccuracy();
    const correctWordCount: number = (wordCount * accuracy) / 100;
    return correctWordCount / ((timerMaxValue.current - timer) / 60); // `timer` is the time left for test to end, normally 0 if test has ended
  }, [getAccuracy, timer, typed]);

  const stopTimer: () => void = useCallback((): void => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  useEffect((): void => {
    if (timerIntervalRef.current) {
      setWPM(getWPM());
      if (!timer) {
        console.log("Stopping");
        stopTimer();
      }
    }
    // I only want the wpm state to update at 1 Hz, not on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const startTimer: () => void = useCallback((): void => {
    timerIntervalRef.current = setInterval((): void => {
      if (timer - 1 <= 0) {
        stopTimer();
      }
      setTimer((pT: number): number => pT - 1);
    }, 1000);
  }, [timer, stopTimer]);

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

  const endTest: () => void = useCallback((): void => {
    stopTimer();
  }, [stopTimer]);

  const reset: () => void = useCallback((): void => {
    endTest();
    setTimer(timerMaxValue.current);
    setAccuracyCounter({
      correct: 0,
      incorrect: 0,
    });
    setAccuracy(0);
    setWPM(0);
    setTyped("");
    setSupposed(getRandomSentence());
  }, [endTest]);

  const area: RefObject<HTMLTextAreaElement> =
    useRef<HTMLTextAreaElement>(null);

  useEffect((): void => {
    tapAudio.current!.volume = 0.5;
  }, []);

  useEffect((): void => {
    tapAudio.current!.muted = isMuted;
  }, [isMuted]);

  useEffect((): (() => void) => {
    window.addEventListener("focus", (): void => {
      area.current?.focus();
    });
    area.current?.addEventListener("blur", (): void => {
      area.current?.focus();
    });
    // start everything on mount
    reset();
    // stop everything on unmount
    return (): void => {
      endTest();
    };
  }, [reset, stopTimer, endTest]);

  const keyDownHandler: KeyboardEventHandler = useCallback(
    (e: KeyboardEvent): void => {
      let caps: boolean = e.getModifierState("CapsLock");
      if (e.code === "CapsLock") {
        caps = !caps;
      }
      setKeyboardModifiers(
        (pKM: KeyboardModifiers): KeyboardModifiers => ({
          ...pKM,
          capsLock: caps,
        })
      );

      setKeysPressed(
        (pKP: Set<string>): Set<string> => new Set([...pKP, e.key])
      );
      if (tapAudio.current!.readyState > tapAudio.current!.HAVE_CURRENT_DATA)
        tapAudio.current!.currentTime = 0;
      try {
        tapAudio.current!.play();
      } catch (err: unknown) {
        console.error("cannot play audio");
        console.error(err);
      }
      switch (e.key) {
        case "Tab":
          reset();
          break;
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          break;
        default:
          if (!timerIntervalRef.current) {
            // if test ended
            return; // do not change accuracy counters.
          }
          if (supposed && e.key.length === 1) {
            if (supposed && e.key === supposed[typed.length]) {
              setAccuracyCounter(
                (pAcc: AccuracyCount): AccuracyCount => ({
                  correct: pAcc.correct + 1,
                  incorrect: pAcc.incorrect,
                })
              );
            } else {
              setAccuracyCounter(
                (pAcc: AccuracyCount): AccuracyCount => ({
                  correct: pAcc.correct,
                  incorrect: pAcc.incorrect + 1,
                })
              );
            }
            setAccuracy(getAccuracy());
          }
          // console.log(e.key);
          break;
      }
    },
    [reset, supposed, typed.length, getAccuracy]
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

  useEffect((): (() => void) => {
    if (isFocused) {
      if (!timerIntervalRef.current && timer !== timerMaxValue.current) {
        startTimer();
      }
      if (document.activeElement !== area.current) {
        area.current?.focus();
        console.log("trying to focus");
      }
    } else {
      stopTimer();
      setKeysPressed(new Set());
    }

    return (): void => {};
  }, [isFocused, timer, startTimer, stopTimer]);

  const onFocusChangeHandler: (e: FocusEvent) => void = useCallback(
    (e: FocusEvent): void => {
      setIsFocused(document.hasFocus());
    },
    []
  );

  return (
    <div className={`w-full flex justify-center items-center`}>
      <div className="flex w-full max-w-4xl lg:max-w-6xl flex-col items-center justify-center p-8 gap-8">
        <div
          className={`sm:text-2xl text-lg flex items-center justify-between p-2 w-full font-semibold text-primary-950`}>
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
        <TypingArea
          ref={area}
          testData={{
            endTest,
            resetTest: reset,
            supposed,
            timerMaxValue,
            typedState: [typed, setTyped],
            accuracy,
            wpm: isNaN(WPM) ? 0 : WPM,
          }}
          timer={{
            value: timer,
            startTimer,
            stopTimer,
          }}
          value={typed}
          onKeyDown={keyDownHandler}
          onKeyUp={keyUpHandler}
          onFocus={onFocusChangeHandler}
          onBlur={onFocusChangeHandler}
        />
        <VirtualKeyboard
          className={`hidden sm:block`}
          supposedChar={supposed?.[typed.length - 1]}
          pressed={keysPressed}
          locked={!timerIntervalRef.current || !isFocused}
          keyboardModifierStates={KeyboardModifiers}
        />
        {timerIntervalRef.current + ""}
        {isFocused + ""}
      </div>
    </div>
  );
}
