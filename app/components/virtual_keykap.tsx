import { HTMLAttributes, ReactNode } from "react";

interface VirtualKeyKapProps extends HTMLAttributes<HTMLDivElement> {
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
  ...rest
}: VirtualKeyKapProps): JSX.Element {
  return (
    <div
      {...rest}
      className={`${pressed ? "border-b-0 translate-y-1" : "border-b-4"} ${
        gaming && "ring"
      } ${
        pressed ? (wrong ? "bg-error-400" : "bg-primary-300") : "bg-primary-200"
      } relative border-primary-400 ring-white rounded-md duration-150 ${
        rest.className
      }`}>
      <kbd
        className={`h-6 md:h-8 lg:h-12 p-2 md:p-3 text-base sm:text-l flex flex-col justify-center items-center rounded-md ${
          square ? "aspect-square" : "min-w-6 md:min-w-8 lg:min-w-12"
        } whitespace-pre flex justify-center items-center text-center`}>
        <span
          className={`absolute text-[0.5rem] w-full left-1 top-1 sm:top-[0.01rem]`}>
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
