import React from "react";
import { getWebflowData } from "../getWebflow";
import parseHtml from "html-react-parser";

export default async function DynamicPages({
  params,
}: {
  params: { paths: string[] };
}) {
  const { props } = await getWebflowData(params.paths[0]);

  return (
    props && (
      <html suppressHydrationWarning={true}>
        <head>{parseHtml(props?.headContent, { trim: true })}</head>
        <body
          suppressHydrationWarning={true}
          dangerouslySetInnerHTML={{ __html: props?.bodyContent }}
        />
      </html>
    )
  );
}
