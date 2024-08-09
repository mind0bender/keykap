import { PropsWithChildren } from "react";
import Hint from "./hint";

interface LettersProps extends PropsWithChildren {
  active?: boolean;
  passed?: boolean;
  correct?: boolean;
  hint?: string | null;
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
      className={`${active && "border border-b-4 border-orange-900"} ${
        passed && "text-stone-500"
      } ${
        !correct && "underline text-red-500"
      } relative decoration-wavy decoration-red-500`}>
      {children}
      {!correct && <Hint>{hint}</Hint>}
    </span>
  );
}

export default Letter;
