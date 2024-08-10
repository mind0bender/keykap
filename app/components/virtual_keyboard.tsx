import { PropsWithChildren } from "react";
import VirtualKeyKap from "./virtual_keykap";

interface VirtualKeyboardProps extends PropsWithChildren {
  pressed: string[];
  supposedChar?: string;
  className?: string;
}

function VirtualKeyboard({
  pressed = [],
  supposedChar,
  className,
}: VirtualKeyboardProps): JSX.Element {
  return (
    <div className={className}>
      <div className={`flex flex-col justify-center items-center gap-2 p-8`}>
        <div className={`flex justify-center items-center gap-2`}>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("q")}
            wrong={supposedChar !== "q"}>
            q
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("w")}
            wrong={supposedChar !== "w"}
            gaming>
            w
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("e")}
            wrong={supposedChar !== "e"}>
            e
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("r")}
            wrong={supposedChar !== "r"}>
            r
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("t")}
            wrong={supposedChar !== "t"}>
            t
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("y")}
            wrong={supposedChar !== "y"}>
            y
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("u")}
            wrong={supposedChar !== "u"}>
            u
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("i")}
            wrong={supposedChar !== "i"}>
            i
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("o")}
            wrong={supposedChar !== "o"}>
            o
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("p")}
            wrong={supposedChar !== "p"}>
            p
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("[")}
            wrong={supposedChar !== "["}
            shiftedChildren={"{"}>
            [
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("]")}
            wrong={supposedChar !== "]"}
            shiftedChildren={"}"}>
            ]
          </VirtualKeyKap>
        </div>
        <div className={`flex justify-center gap-2`}>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("a")}
            wrong={supposedChar !== "a"}
            gaming>
            a
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("s")}
            wrong={supposedChar !== "s"}
            gaming>
            s
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("d")}
            wrong={supposedChar !== "d"}
            gaming>
            d
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("f")}
            wrong={supposedChar !== "f"}>
            f
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("g")}
            wrong={supposedChar !== "g"}>
            g
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("h")}
            wrong={supposedChar !== "h"}>
            h
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("j")}
            wrong={supposedChar !== "j"}>
            j
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("k")}
            wrong={supposedChar !== "k"}>
            k
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("l")}
            wrong={supposedChar !== "l"}>
            l
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes(";")}
            wrong={supposedChar !== ";"}
            shiftedChildren={":"}>
            ;
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("'")}
            wrong={supposedChar !== "'"}
            shiftedChildren={'"'}>
            &apos;
          </VirtualKeyKap>
        </div>
        <div className={`flex justify-center items-center gap-2`}>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("z")}
            wrong={supposedChar !== "z"}>
            z
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("x")}
            wrong={supposedChar !== "x"}>
            x
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("c")}
            wrong={supposedChar !== "c"}>
            c
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("v")}
            wrong={supposedChar !== "v"}>
            v
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("b")}
            wrong={supposedChar !== "b"}>
            b
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("n")}
            wrong={supposedChar !== "n"}>
            n
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("m")}
            wrong={supposedChar !== "m"}>
            m
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes(",")}
            wrong={supposedChar !== ","}
            shiftedChildren={"<"}>
            ,
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes(".")}
            wrong={supposedChar !== "."}
            shiftedChildren={">"}>
            .
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("/")}
            wrong={supposedChar !== "/"}
            shiftedChildren={"?"}>
            /
          </VirtualKeyKap>
        </div>
      </div>
    </div>
  );
}

export default VirtualKeyboard;
