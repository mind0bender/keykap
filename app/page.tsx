"use client";
import {
  ChangeEvent,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import Letter from "./components/letter";

export default function Home(): JSX.Element {
  const [typed, setTyped] = useState<string>("");

  const [supposed, setSupposed] = useState("A quick brown fox!");

  const area: RefObject<HTMLTextAreaElement> =
    useRef<HTMLTextAreaElement>(null);
  useEffect((): void => {
    window.addEventListener("focus", (): void => {
      area.current?.focus();
    });
    area.current?.addEventListener("blur", (): void => {
      area.current?.focus();
    });
  }, []);

  useEffect((): void => {
    console.log(typed);
  }, [typed]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div
        className={`text-3xl py-4 px-2 w-full font-semibold text-orange-950`}>
        Typing Test
      </div>
      <div
        className={`flex flex-col justify-center items-center bg-orange-200 rounded-sm shadow-lg px-8 py-6 gap-4 w-full container`}>
        <textarea
          ref={area}
          autoFocus
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
            setTyped(e.target.value)
          }
          className={`scale-0 absolute`}
        />
        <code className={`text-lg text-stone-800 text-justify`}>
          {supposed.split("").map((char: string, idx: number): ReactNode => {
            return (
              <Letter
                active={idx == typed.length}
                passed={idx < typed.length}
                correct={!typed[idx] || char === typed[idx]}
                hint={char}
                key={idx}>
                {((): ReactNode => {
                  const shownChar: string = typed[idx] || char;
                  return shownChar === " " ? <>&nbsp;</> : shownChar;
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
            onClick={(): void => {
              setTyped("");
            }}
            className={`px-4 py-2 border border-orange-400 bg-orange-100 text-sm`}
            type="reset">
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
