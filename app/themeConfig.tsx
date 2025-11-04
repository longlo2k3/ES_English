"use client";

import { saira } from "@/fer-framework/fe-global/assets";

const themeConfig = {
  token: {
    fontFamily: `${saira.style.fontFamily}`,
    colorPrimary: `#6a11cb`, //linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)
    secondaryColor: "#2575fc",
  },
  components: {
    Card: {
      headerPadding: 16,
      bodyPadding: 16,
    },
    Menu: {
      itemActiveBg: "#6a11cb",
      itemSelectedBg: "#3868eb13",
      itemSelectedColor: "#6a11cb",
      itemHoverBg: "#3868eb13",
      itemActiveColor: "#6a11cb",
    },
    // Button: {
    //   colorPrimary: "#2575fc",
    //   colorPrimaryHover: "#2574fcb0",
    // },
  },
};

export default themeConfig;
