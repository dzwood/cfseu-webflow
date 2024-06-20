import parseHtml from "html-react-parser";

export async function getWebflowData(pathName: string | null): Promise<{
  props: {
    bodyContent: string | TrustedHTML;
    headContent: string;
  };
}> {
  // Import modules in here that aren't needed in the component
  const cheerio = await import(`cheerio`);
  const axios = (await import(`axios`)).default;

  const baseUrl = process.env.WEBFLOW_URL || "";
  console.log({ baseUrl });

  //const url = pathName ? `${baseUrl}/${pathName}` : baseUrl;

  // Fetch HTML
  let res = await axios(baseUrl).catch((err) => {
    // console.error(err);
  });

  const html = res?.data;

  // Parse HTML with Cheerio
  const $ = cheerio.load(!html ? "<div>Page Not Found</div>" : html);
  const bodyContent = $(`body`).html() || <div>html body not found</div>;
  const headContent = $(`head`).html() || "";

  // Send HTML to component via props
  return {
    props: {
      bodyContent,
      headContent,
    },
  };
}

export default async function Home() {
  const { props } = await getWebflowData(null);

  return (
    <>
      <head>{parseHtml(props?.headContent)}</head>
      <div dangerouslySetInnerHTML={{ __html: props?.bodyContent }} />;
    </>
  );
}
