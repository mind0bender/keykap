import { PropsWithChildren } from "react";

interface VirtualKeyKapProps extends PropsWithChildren {
  pressed?: boolean;

  gaming?: boolean;
}

function VirtualKeyKap({
  children,
  pressed = false,
  gaming = false,
}: VirtualKeyKapProps): JSX.Element {
  return (
    <div
      className={`${pressed ? "border-b-0 translate-y-1" : "border-b-4"} ${
        gaming && "ring"
      } border-orange-400 ring-white rounded-md duration-300`}>
      <kbd
        className={`w-12 flex justify-center items-center text-xl rounded-md aspect-square ${
          pressed ? "bg-orange-300" : "bg-orange-200"
        }`}>
        {children}
      </kbd>
    </div>
  );
}

export default VirtualKeyKap;
