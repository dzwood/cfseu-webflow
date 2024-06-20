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
      <>
        <head>{parseHtml(props?.headContent)}</head>
        <div dangerouslySetInnerHTML={{ __html: props?.bodyContent }} />
      </>
    )
  );
}
