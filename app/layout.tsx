import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import viVN from "antd/lib/locale/vi_VN";
import { ThemeProvider } from "@/fer-framework/fe-global/themes";

import { open_sans } from "@/fer-framework/fe-global/assets";

import { MessageProvider } from "@/fer-framework/fe-cores/components/MessageProvider";
import "@ant-design/v5-patch-for-react-19";
import { ProviderRedux } from "./stores/providers";
import themeConfig from "./themeConfig";
import { I18nProvider } from "@/fer-framework/fe-cores/components/I18nProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <I18nProvider>
          <AntdRegistry>
            <ThemeProvider theme={themeConfig} locale={viVN}>
              <MessageProvider>
                <ProviderRedux>{children}</ProviderRedux>
              </MessageProvider>
            </ThemeProvider>
          </AntdRegistry>
        </I18nProvider>
      </body>
    </html>
  );
}
