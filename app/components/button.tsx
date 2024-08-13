import { HTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLButtonElement> {}

function Button({ children, onClick }: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      type="reset"
      className={`active:translate-y-1 group flex flex-col justify-center items-center`}>
      <div
        className={`border-b peer group-hover:bg-primary-50 flex justify-center items-center text-center gap-1 px-4 py-2 border border-primary-400 bg-primary-100 text-sm duration-100`}>
        {children}
      </div>
      <div
        className={`w-full border-primary-500 peer-active:border-transparent border-t-[3px] duration-100`}
      />
    </button>
  );
}
export default Button;
