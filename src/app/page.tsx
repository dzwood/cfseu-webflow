import { getWebflowData } from "./getWebflow";

export default async function Home() {
  const { props } = await getWebflowData(null);

  return <div dangerouslySetInnerHTML={{ __html: props?.bodyContent }} />;
}
