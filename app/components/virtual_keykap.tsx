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
  square = true,
  shiftedChildren,
  shifted,
}: VirtualKeyKapProps): JSX.Element {
  return (
    <div
      className={`${pressed ? "border-b-0 translate-y-1" : "border-b-4"} ${
        gaming && "ring"
      } relative border-primary-400 ring-white rounded-md duration-150`}>
      <kbd
        className={`h-8 md:h-12 lg:h-16 p-2 md:p-3 text-lg flex flex-col justify-center items-center sm:text-xl rounded-md ${
          square && "aspect-square"
        } whitespace-pre ${
          pressed
            ? wrong
              ? "bg-error-400"
              : "bg-primary-300"
            : "bg-primary-200"
        }`}>
        <span
          className={`absolute text-xs w-full left-1 top-1 sm:left-1.5 sm:top-1.5`}>
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
