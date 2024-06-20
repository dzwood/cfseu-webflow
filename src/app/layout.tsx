import { Poppins } from "next/font/google";
import parseHtml from "html-react-parser";

import { getWebflowData } from "./getWebflow";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //Grab the head content from Webflow
  const { props } = await getWebflowData(null);

  return (
    <html lang="en">
      <head>{parseHtml(props?.headContent.trim())}</head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
