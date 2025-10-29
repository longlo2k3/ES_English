"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { items } from "@/app/menu";
import { useTheme } from "@/fer-framework/fe-global/themes";
import { useCollapsed } from "../GlobalLayoutBase/CollapsedProvider";
import { useRouter, usePathname } from "next/navigation";

function MenuBase() {
  const { mode } = useTheme();
  const { collapsed } = useCollapsed();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    const findBestMatchingKey = (path, menuItems) => {
      let bestMatch = { key: null, length: -1 };

      const search = (items) => {
        for (const item of items) {
          if (item.link && path.startsWith(item.link)) {
            if (item.link.length > bestMatch.length) {
              bestMatch = { key: item.key, length: item.link.length };
            }
          }

          if (item.children) {
            search(item.children);
          }
        }
      };

      search(menuItems);
      return bestMatch.key;
    };

    const currentKey = findBestMatchingKey(pathname, items);

    if (currentKey) {
      setSelectedKeys([currentKey]);
    }
  }, [pathname, items]);

  const handleClick = (e) => {
    const findLink = (key, items) => {
      for (const item of items) {
        if (item.key === key) return item.link;
        if (item.children) {
          const result = findLink(key, item.children);
          if (result) return result;
        }
      }
      return null;
    };

    const link = findLink(e.key, items);
    if (link) {
      router.push(link);
    }
  };

  return (
    <Menu
      style={{ height: "100%" }}
      mode="inline"
      theme={mode === "dark" ? "dark" : "light"}
      items={items}
      inlineCollapsed={collapsed}
      selectedKeys={selectedKeys}
      onClick={handleClick}
    />
  );
}

export default MenuBase;
