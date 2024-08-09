import { PropsWithChildren } from "react";

interface HintProps extends PropsWithChildren {}

function Hint({ children }: HintProps): JSX.Element {
  return (
    <span className={`absolute top-6 left-0 bg-stone-700`}>{children}</span>
  );
}

export default Hint;
