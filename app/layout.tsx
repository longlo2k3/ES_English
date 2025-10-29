import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import viVN from "antd/lib/locale/vi_VN";
import { ThemeProvider } from "@/fer-framework/fe-global/themes";
import themeConfig from "./themeConfig";
import { open_sans } from "@/fer-framework/fe-global/assets";
import { ProviderRedux } from "./stores/providers";
import { MessageProvider } from "@/fer-framework/fe-cores/components/MessageProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <AntdRegistry>
          <ThemeProvider theme={themeConfig} locale={viVN}>
            <MessageProvider>
              <ProviderRedux>{children}</ProviderRedux>
            </MessageProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
