import { PropsWithChildren } from "react";
import Hint, { HintProps } from "./hint";

interface LettersProps extends PropsWithChildren {
  active?: boolean;
  passed?: boolean;
  correct?: boolean;
  hint?: HintProps;
}

function Letter({
  active = false,
  passed = false,
  correct = true,
  hint,
  children,
}: LettersProps): JSX.Element {
  return (
    <span
      className={`${active && "border border-b-4 border-primary-900"} ${
        passed && "text-stone-500"
      } ${
        !correct && "underline text-error-500"
      } relative decoration-wavy decoration-error-500`}>
      {children}
      {!correct && <Hint {...hint} />}
    </span>
  );
}

export default Letter;
