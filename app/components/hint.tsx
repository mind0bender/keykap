import { PropsWithChildren } from "react";

export interface HintProps extends PropsWithChildren {}

function Hint({ children }: HintProps): JSX.Element {
  return (
    <span className={`absolute bottom-8 left-0 bg-stone-700 text-red-500`}>
      {children}
    </span>
  );
}

export default Hint;
