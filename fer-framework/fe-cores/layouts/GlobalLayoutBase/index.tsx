"use client";

import { CollapsedProvider } from "./CollapsedProvider";
import LayoutCore from "./LayoutCore";

interface IProps {
  children: React.ReactNode;
}

const LayoutBase: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <CollapsedProvider>
      <LayoutCore children={children} />
    </CollapsedProvider>
  );
};

export default LayoutBase;
