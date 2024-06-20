import React from "react";
import parseHtml from "html-react-parser";
// import GetSitemapLinks from "sitemap-links";
import { getWebflowData } from "../page";

/**
 * ------- TODO: Generate static paths for dynamic pages --------
 */
// export async function generateStaticParams() {
//   const sitemapLink = process.env.WEBFLOW_URL + `/sitemap.xml`;
//   const links = await GetSitemapLinks(sitemapLink).catch((err: any) => {
//     console.error(err);
//   });

//   const paths = [];
//   for (let link of links) {
//     let url = new URL(link);
//     const path = url.pathname.replace(`/`, ``).split(`/`);
//     if (!path.length || !path[0]) continue;
//     paths.push({
//       params: { path },
//     });
//   }

//   return paths;
// }

async function DynamicPages({ params }: { params: { paths: string[] } }) {
  const { props } = await getWebflowData(params.paths[0]);

  return (
    <>
      <head>{parseHtml(props?.headContent)}</head>
      <div dangerouslySetInnerHTML={{ __html: props?.bodyContent }} />
    </>
  );
}

export default DynamicPages;
