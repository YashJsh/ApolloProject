import Content from "@/components/Content";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Doctor Finder App</title>
        <meta name="description" content="Find top doctors across cities, filter by experience, fees, and more." />
        <meta property="og:title" content="Find Your Doctor | Doctor Finder" />
        <meta property="og:description" content="Book online consults or hospital visits with top doctors." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://your-deployed-site.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Navbar />
      <Content />
    </div>
  );
}
