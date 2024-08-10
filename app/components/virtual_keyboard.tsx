import { PropsWithChildren } from "react";
import VirtualKeyKap from "./virtual_keykap";

interface VirtualKeyboardProps extends PropsWithChildren {
  pressed: string[];
}

function VirtualKeyboard({ pressed = [] }: VirtualKeyboardProps): JSX.Element {
  return (
    <div className={`flex flex-col justify-center items-center gap-2 p-8`}>
      <div className={`flex justify-center items-center gap-2`}>
        <VirtualKeyKap pressed={pressed.includes("q")}>q</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("w")} gaming>
          w
        </VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("e")}>e</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("r")}>r</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("t")}>t</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("y")}>y</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("u")}>u</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("i")}>i</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("o")}>o</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("p")}>p</VirtualKeyKap>
      </div>
      <div className={`flex justify-center gap-2`}>
        <VirtualKeyKap pressed={pressed.includes("a")} gaming>
          a
        </VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("s")} gaming>
          s
        </VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("d")} gaming>
          d
        </VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("f")}>f</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("g")}>g</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("h")}>h</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("j")}>j</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("k")}>k</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("l")}>l</VirtualKeyKap>
      </div>
      <div className={`flex justify-center items-center gap-2`}>
        <VirtualKeyKap pressed={pressed.includes("z")}>z</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("x")}>x</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("c")}>c</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("v")}>v</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("b")}>b</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("n")}>n</VirtualKeyKap>
        <VirtualKeyKap pressed={pressed.includes("m")}>m</VirtualKeyKap>
      </div>
    </div>
  );
}

export default VirtualKeyboard;
