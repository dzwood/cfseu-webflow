import { getWebflowData } from "./getWebflow";

export default async function Home() {
  const { props } = await getWebflowData(null);

  return (
    <div
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{ __html: props?.bodyContent }}
    />
  );
}
