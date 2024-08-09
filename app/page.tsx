"use client";

import Image from "next/image";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";

export default function Home(): JSX.Element {
  const [typed, setTyped] = useState<string>("");

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
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div
        className={`flex flex-col justify-center items-center bg-orange-200 rounded-sm shadow-lg px-8 py-6 gap-4 w-full container`}>
        <div className={`text-2xl w-full font-semibold text-orange-950`}>
          Typing Test
        </div>
        <textarea
          ref={area}
          autoFocus
          onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
            setTyped(e.target.value)
          }
          className={`scale-0 absolute`}
        />
        <code className={`text-lg text-stone-800 break-words text-justify`}>
          {typed}
        </code>
        <div>
          <button
            className={`px-4 py-2 border border-orange-400 bg-orange-100 text-sm`}
            type="reset">
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
