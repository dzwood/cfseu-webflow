import Head from "next/head";
import parseHtml from "html-react-parser";
import get from "lodash/get";
import React from "react";

// Replaces DOM nodes with React components
function replace(node) {
  const attribs = node.attribs || {};

  // replace HTML here...
}

const parseOptions = { replace };

export default function Home(props) {
  return (
    <>
      <Head>{parseHtml(props.headContent, parseOptions)}</Head>
      {parseHtml(props.bodyContent, parseOptions)}
    </>
  );
}

export async function getStaticProps(ctx) {
  // Import modules in here that aren't needed in the component
  const cheerio = await import(`cheerio`);
  const axios = (await import(`axios`)).default;

  // Use path to determine Webflow path
  let url = get(ctx, `params.path`, []);
  url = url.join(`/`);
  if (url.charAt(0) !== `/`) {
    url = `/${url}`;
  }
  const fetchUrl = process.env.WEBFLOW_URL + url;

  // Fetch HTML
  let res = await axios(fetchUrl).catch((err) => {
    console.error(err);
  });
  const html = res.data;

  // Parse HTML with Cheerio
  const $ = cheerio.load(html);

  // Convert back to HTML strings
  const bodyContent = $(`body`).html();
  const headContent = $(`head`).html();

  // Send HTML to component via props
  return {
    props: {
      bodyContent,
      headContent,
    },
  };
}
