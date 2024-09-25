import { PropsWithChildren } from "react";
import VirtualKeyKap from "./virtual_keykap";
import { LockRounded } from "@mui/icons-material";
import VirtualModifierKaps, { KeyboardModifiers } from "./modifiers";

interface VirtualKeyboardProps extends PropsWithChildren {
  pressed: Set<string>;
  supposedChar?: string;
  className?: string;
  locked?: boolean;
  keyboardModifierStates: KeyboardModifiers;
}

function VirtualKeyboard({
  pressed = new Set(),
  supposedChar,
  className,
  locked = true,
  keyboardModifierStates,
}: VirtualKeyboardProps): JSX.Element {
  return (
    <div className={className}>
      <div
        className={`relative flex flex-col justify-center items-center gap-2 px-8 py-4`}>
        <div className={`pb-4`}>
          <VirtualModifierKaps
            keyboardModifierStates={keyboardModifierStates}
          />
        </div>
        <div
          className={`absolute z-10 flex-col cursor-not-allowed shadow-inner shadow-white justify-center items-center rounded-md top-0 left-0 w-full h-full backdrop-blur-sm bg-opacity-50 border border-primary-400 ${
            locked ? "flex" : "hidden"
          } ${
            pressed.size
              ? "border-b-1 translate-y-1 bg-primary-300"
              : "border-b-8 bg-primary-200"
          } duration-200`}>
          <LockRounded fontSize={"large"} />
          Locked
        </div>
        <div className={`flex justify-center items-center gap-2`}>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("q") || pressed.has("q".toUpperCase())}
            wrong={locked || supposedChar !== "q"}>
            q
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("w") || pressed.has("w".toUpperCase())}
            wrong={locked || supposedChar !== "w"}
            gaming>
            w
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("e") || pressed.has("e".toUpperCase())}
            wrong={locked || supposedChar !== "e"}>
            e
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("r") || pressed.has("r".toUpperCase())}
            wrong={locked || supposedChar !== "r"}>
            r
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("t") || pressed.has("t".toUpperCase())}
            wrong={locked || supposedChar !== "t"}>
            t
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("y") || pressed.has("y".toUpperCase())}
            wrong={locked || supposedChar !== "y"}>
            y
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("u") || pressed.has("u".toUpperCase())}
            wrong={locked || supposedChar !== "u"}>
            u
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("i") || pressed.has("i".toUpperCase())}
            wrong={locked || supposedChar !== "i"}>
            i
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("o") || pressed.has("o".toUpperCase())}
            wrong={locked || supposedChar !== "o"}>
            o
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("p") || pressed.has("p".toUpperCase())}
            wrong={locked || supposedChar !== "p"}>
            p
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("[") || pressed.has("{")}
            shiftedChildren={"{"}
            wrong={locked || supposedChar !== "["}>
            [
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("]") || pressed.has("}")}
            shiftedChildren={"}"}
            wrong={locked || supposedChar !== "]"}>
            ]
          </VirtualKeyKap>
        </div>
        <div className={`flex justify-center gap-2`}>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("a") || pressed.has("a".toUpperCase())}
            wrong={locked || supposedChar !== "a"}
            gaming>
            a
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("s") || pressed.has("s".toUpperCase())}
            wrong={locked || supposedChar !== "s"}
            gaming>
            s
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("d") || pressed.has("d".toUpperCase())}
            wrong={locked || supposedChar !== "d"}
            gaming>
            d
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("f") || pressed.has("f".toUpperCase())}
            wrong={locked || supposedChar !== "f"}>
            f
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("g") || pressed.has("g".toUpperCase())}
            wrong={locked || supposedChar !== "g"}>
            g
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("h") || pressed.has("h".toUpperCase())}
            wrong={locked || supposedChar !== "h"}>
            h
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("j") || pressed.has("j".toUpperCase())}
            wrong={locked || supposedChar !== "j"}>
            j
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("k") || pressed.has("k".toUpperCase())}
            wrong={locked || supposedChar !== "k"}>
            k
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("l") || pressed.has("l".toUpperCase())}
            wrong={locked || supposedChar !== "l"}>
            l
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has(";") || pressed.has(":")}
            shiftedChildren={":"}
            wrong={locked || supposedChar !== ";"}>
            ;
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("'") || pressed.has('"')}
            shiftedChildren={'"'}
            wrong={locked || supposedChar !== "'"}>
            &apos;
          </VirtualKeyKap>
        </div>
        <div className={`flex justify-center items-center gap-2`}>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("z") || pressed.has("z".toUpperCase())}
            wrong={locked || supposedChar !== "z"}>
            z
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("x") || pressed.has("x".toUpperCase())}
            wrong={locked || supposedChar !== "x"}>
            x
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("c") || pressed.has("c".toUpperCase())}
            wrong={locked || supposedChar !== "c"}>
            c
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("v") || pressed.has("v".toUpperCase())}
            wrong={locked || supposedChar !== "v"}>
            v
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("b") || pressed.has("b".toUpperCase())}
            wrong={locked || supposedChar !== "b"}>
            b
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("n") || pressed.has("n".toUpperCase())}
            wrong={locked || supposedChar !== "n"}>
            n
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("m") || pressed.has("m".toUpperCase())}
            wrong={locked || supposedChar !== "m"}>
            m
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has(",") || pressed.has("<")}
            shiftedChildren={"<"}
            wrong={locked || supposedChar !== ","}>
            ,
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has(".") || pressed.has(">")}
            shiftedChildren={">"}
            wrong={locked || supposedChar !== "."}>
            .
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.has("Shift")}
            pressed={pressed.has("/") || pressed.has("?")}
            shiftedChildren={"?"}
            wrong={locked || supposedChar !== "/"}>
            /
          </VirtualKeyKap>
        </div>
        <div className={`flex justify-center gap-2`}>
          <VirtualKeyKap
            shifted={false}
            pressed={pressed.has(" ")}
            square={false}
            wrong={locked || supposedChar !== " "}>
            {"      _____      "}
          </VirtualKeyKap>
        </div>
      </div>
    </div>
  );
}

export default VirtualKeyboard;
