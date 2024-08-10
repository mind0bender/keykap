import { PropsWithChildren, ReactNode } from "react";

interface VirtualKeyKapProps extends PropsWithChildren {
  pressed?: boolean;
  gaming?: boolean;
  wrong?: boolean;
  square?: boolean;
  shiftedChildren?: ReactNode;
  shifted?: boolean;
}

function VirtualKeyKap({
  children,
  pressed = false,
  gaming = false,
  wrong = false,
  shiftedChildren,
  shifted,
}: VirtualKeyKapProps): JSX.Element {
  return (
    <div
      className={`${pressed ? "border-b-0 translate-y-1" : "border-b-4"} ${
        gaming && "ring"
      } relative border-orange-400 ring-white rounded-md duration-300`}>
      <kbd
        className={`w-12 flex flex-col justify-center items-center text-xl rounded-md aspect-square ${
          pressed ? (wrong ? "bg-red-400" : "bg-orange-300") : "bg-orange-200"
        }`}>
        <span className={`absolute text-sm w-full left-2 top-2`}>
          {shifted ? shiftedChildren && children : shiftedChildren}
        </span>
        <span>
          {shifted
            ? shiftedChildren || children?.toString().toUpperCase()
            : children}
        </span>
      </kbd>
    </div>
  );
}

export default VirtualKeyKap;
