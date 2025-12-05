"use client";

import React, { createContext, useContext, useState } from "react";

// Tạo context
const CollapsedContext = createContext<{
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCollapsed: () => void;
}>({
  collapsed: false,
  setCollapsed: () => {},
  toggleCollapsed: () => {},
});

// Provider để bọc toàn bộ app
export const CollapsedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // Toggle trạng thái collapsed
  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <CollapsedContext.Provider
      value={{ collapsed, setCollapsed, toggleCollapsed }}>
      {children}
    </CollapsedContext.Provider>
  );
};

export const useCollapsed = () => {
  const context = useContext(CollapsedContext);
  if (!context) {
    throw new Error("useCollapsed phải được dùng trong CollapsedProvider");
  }
  return context;
};
