import { KeyboardCapslockRounded } from "@mui/icons-material";
import Letter from "./letter";
import VirtualKeyKap from "./virtual_keykap";
import { HTMLAttributes } from "react";
interface ArrowKeys {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
}

export interface KeyboardModifiers {
  capsLock: boolean;
  numLock: boolean;
  shift: boolean;
  ctrl: boolean;
  alt: boolean;
  arrow: ArrowKeys;
}

interface VirtualModifierKapsProps extends HTMLAttributes<HTMLDivElement> {
  keyboardModifierStates: KeyboardModifiers;
}

function VirtualModifierKaps({
  keyboardModifierStates,
  ...rest
}: VirtualModifierKapsProps): JSX.Element {
  return (
    <div {...rest}>
      <div className={`flex flex-col justify-center items-center`}>
        <VirtualKeyKap pressed={keyboardModifierStates.capsLock} square={false}>
          <KeyboardCapslockRounded className={`text-base sm:text-2xl`} />
          <br />
        </VirtualKeyKap>
        <span className={`text-sm`}>CapsLock</span>
      </div>
    </div>
  );
}

export default VirtualModifierKaps;
