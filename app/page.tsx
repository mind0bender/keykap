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

export default function Home(): JSX.Element {
  const [typed, setTyped] = useState<string>("");

  const [supposed, setSupposed] = useState<string>();

  const [timer, setTimer] = useState<number>(0);
  const timerIntervalRef: MutableRefObject<NodeJS.Timeout | null> =
    useRef<NodeJS.Timeout | null>(null);

  const DEFAULT_MAX_WORD_COUNT: number = 16;

  function getRandomSentence(
    wordCount: number = Math.floor(Math.random() * DEFAULT_MAX_WORD_COUNT + 1)
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
    window.addEventListener("focus", (): void => {
      area.current?.focus();
    });
    area.current?.addEventListener("blur", (): void => {
      area.current?.focus();
    });
    reset();
  }, [reset]);

  useEffect((): void => {
    console.log(typed);
  }, [typed]);

  const keyDownHandler: KeyboardEventHandler = useCallback(
    (e: KeyboardEvent): void => {
      // impliment caps and other modifiers
      // const caps:boolean = e.getModifierState && e.getModifierState("CapsLock");
      // console.log(caps);
      switch (e.key) {
        case "Tab":
          reset();
        case "ArrowUp":
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
        default:
          console.log(e.key);
      }
    },
    [reset]
  );

  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center justify-center p-16">
        <div
          className={`text-3xl py-4 px-2 w-full font-semibold text-orange-950`}>
          Typing Test
        </div>
        <div
          className={`flex flex-col justify-center items-center bg-orange-200 rounded-sm shadow-lg px-10 py-8 gap-4 w-full container`}>
          <textarea
            onKeyDown={keyDownHandler}
            ref={area}
            autoFocus
            value={typed}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
              const newTypedWordList: string[] = e.target.value.split(" ");
              const lastWord: string =
                newTypedWordList[newTypedWordList.length - 1];
              console.log(newTypedWordList, lastWord);
              if (lastWord.length > 16) {
                return;
              }
              setTyped(e.target.value);
            }}
            className={`scale-0 absolute`}
          />
          <code
            className={`flex flex-wrap text-lg text-stone-800 text-justify whitespace-break-spaces`}>
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
                    return renderedChar === " " ? <div>∙</div> : renderedChar;
                  })()}
                </Letter>
              );
            })}
          </code>
          <div className={`flex justify-between w-full text-orange-950`}>
            <div>
              <span className={`font-bold text-2xl`}>120</span>
              <span>WPM</span>
            </div>
            <div>
              <span className={`font-bold text-2xl`}>30</span>
              <span>s</span>
            </div>
          </div>
          <div className={`flex justify-end w-full`}>
            <button
              onClick={reset}
              className={`px-4 py-2 border border-orange-400 bg-orange-100 text-sm`}
              type="reset">
              Reset
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
