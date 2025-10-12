"use client";

import { open_sans } from "@/fer-framework/fe-global/assets";

const themeConfig = {
  token: {
    fontFamily: `${open_sans.style.fontFamily}`,
    colorPrimary: `#00AEEF`,
  },
  components: {
    Card: {
      headerPadding: 16,
      bodyPadding: 16,
    },
  },
};

export default themeConfig;
