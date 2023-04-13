import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BannerIcons from "../components/BannerIcons";
import Places from "../components/places/Places";

const Home: NextPage = () => {
  return (
    <div className=" min-h-screen flex-col items-center justify-center py-50">
      <Head>
        <title>Airbnb</title>
        <link
          rel="icon"
          href="https://tse4.mm.bing.net/th?id=OIP.f7ctSaWM4RwDskyegfhZYQHaG1&pid=Api&P=0"
        />
      </Head>

      <Header />
      <BannerIcons />
      <Places />
      <Footer />
    </div>
  );
};

export default Home;
