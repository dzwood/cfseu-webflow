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
  const url = pathName ? `${baseUrl}/${pathName}` : baseUrl;

  // Fetch HTML
  let res = await axios(url).catch((err) => {
    // console.error(err);
  });

  const html = res?.data;

  // Parse HTML with Cheerio
  const $ = cheerio.load(!html ? "<div>Page Not Found</div>" : html);
  const bodyContent = $(`body`).html() || "<div>html body not found</div>";
  const headContent = $(`head`).html() || "";

  // Send HTML to component via props
  return {
    props: {
      bodyContent,
      headContent,
    },
  };
}
