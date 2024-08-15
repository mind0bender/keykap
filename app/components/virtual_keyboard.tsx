import { PropsWithChildren } from "react";
import VirtualKeyKap from "./virtual_keykap";
import { LockRounded } from "@mui/icons-material";

interface VirtualKeyboardProps extends PropsWithChildren {
  pressed: string[];
  supposedChar?: string;
  className?: string;
  locked?: boolean;
}

function VirtualKeyboard({
  pressed = [],
  supposedChar,
  className,
  locked = true,
}: VirtualKeyboardProps): JSX.Element {
  return (
    <div className={className}>
      <div
        className={`relative flex flex-col justify-center items-center gap-2 p-8`}>
        <div
          className={`absolute z-10 flex-col cursor-not-allowed shadow-inner shadow-white justify-center items-center rounded-md top-0 left-0 w-full h-full backdrop-blur-sm bg-opacity-50 border border-primary-400 ${
            locked ? "flex" : "hidden"
          } ${
            pressed.length
              ? "border-b-1 translate-y-1 bg-primary-300"
              : "border-b-8 bg-primary-200"
          } duration-200`}>
          <LockRounded fontSize={"large"} />
          Locked
        </div>
        <div className={`flex justify-center items-center gap-2`}>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("q") || pressed.includes("q".toUpperCase())
            }
            wrong={supposedChar !== "q"}>
            q
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("w") || pressed.includes("w".toUpperCase())
            }
            wrong={supposedChar !== "w"}
            gaming>
            w
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("e") || pressed.includes("e".toUpperCase())
            }
            wrong={supposedChar !== "e"}>
            e
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("r") || pressed.includes("r".toUpperCase())
            }
            wrong={supposedChar !== "r"}>
            r
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("t") || pressed.includes("t".toUpperCase())
            }
            wrong={supposedChar !== "t"}>
            t
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("y") || pressed.includes("y".toUpperCase())
            }
            wrong={supposedChar !== "y"}>
            y
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("u") || pressed.includes("u".toUpperCase())
            }
            wrong={supposedChar !== "u"}>
            u
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("i") || pressed.includes("i".toUpperCase())
            }
            wrong={supposedChar !== "i"}>
            i
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("o") || pressed.includes("o".toUpperCase())
            }
            wrong={supposedChar !== "o"}>
            o
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("p") || pressed.includes("p".toUpperCase())
            }
            wrong={supposedChar !== "p"}>
            p
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("[") || pressed.includes("{")}
            shiftedChildren={"{"}
            wrong={supposedChar !== "["}>
            [
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("]") || pressed.includes("}")}
            shiftedChildren={"}"}
            wrong={supposedChar !== "]"}>
            ]
          </VirtualKeyKap>
        </div>
        <div className={`flex justify-center gap-2`}>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("a") || pressed.includes("a".toUpperCase())
            }
            wrong={supposedChar !== "a"}
            gaming>
            a
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("s") || pressed.includes("s".toUpperCase())
            }
            wrong={supposedChar !== "s"}
            gaming>
            s
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("d") || pressed.includes("d".toUpperCase())
            }
            wrong={supposedChar !== "d"}
            gaming>
            d
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("f") || pressed.includes("f".toUpperCase())
            }
            wrong={supposedChar !== "f"}>
            f
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("g") || pressed.includes("g".toUpperCase())
            }
            wrong={supposedChar !== "g"}>
            g
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("h") || pressed.includes("h".toUpperCase())
            }
            wrong={supposedChar !== "h"}>
            h
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("j") || pressed.includes("j".toUpperCase())
            }
            wrong={supposedChar !== "j"}>
            j
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("k") || pressed.includes("k".toUpperCase())
            }
            wrong={supposedChar !== "k"}>
            k
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("l") || pressed.includes("l".toUpperCase())
            }
            wrong={supposedChar !== "l"}>
            l
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes(";") || pressed.includes(":")}
            shiftedChildren={":"}
            wrong={supposedChar !== ";"}>
            ;
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("'") || pressed.includes('"')}
            shiftedChildren={'"'}
            wrong={supposedChar !== "'"}>
            &apos;
          </VirtualKeyKap>
        </div>
        <div className={`flex justify-center items-center gap-2`}>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("z") || pressed.includes("z".toUpperCase())
            }
            wrong={supposedChar !== "z"}>
            z
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("x") || pressed.includes("x".toUpperCase())
            }
            wrong={supposedChar !== "x"}>
            x
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("c") || pressed.includes("c".toUpperCase())
            }
            wrong={supposedChar !== "c"}>
            c
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("v") || pressed.includes("v".toUpperCase())
            }
            wrong={supposedChar !== "v"}>
            v
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("b") || pressed.includes("b".toUpperCase())
            }
            wrong={supposedChar !== "b"}>
            b
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("n") || pressed.includes("n".toUpperCase())
            }
            wrong={supposedChar !== "n"}>
            n
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={
              pressed.includes("m") || pressed.includes("m".toUpperCase())
            }
            wrong={supposedChar !== "m"}>
            m
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes(",") || pressed.includes("<")}
            shiftedChildren={"<"}
            wrong={supposedChar !== ","}>
            ,
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes(".") || pressed.includes(">")}
            shiftedChildren={">"}
            wrong={supposedChar !== "."}>
            .
          </VirtualKeyKap>
          <VirtualKeyKap
            shifted={pressed.includes("Shift")}
            pressed={pressed.includes("/") || pressed.includes("?")}
            shiftedChildren={"?"}
            wrong={supposedChar !== "/"}>
            /
          </VirtualKeyKap>
        </div>
        <div className={`flex justify-center gap-2`}>
          <VirtualKeyKap
            shifted={false}
            pressed={pressed.includes(" ")}
            square={false}
            wrong={supposedChar !== " "}>
            {"      _____      "}
          </VirtualKeyKap>
        </div>
      </div>
    </div>
  );
}

export default VirtualKeyboard;
