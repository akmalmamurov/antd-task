import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Container = ({ children, className }: Props) => {
  return (
    <div className={twMerge("max-w-[1440px] mx-auto px-[15px]", className)}>
      {children}
    </div>
  );
};

export default Container;
