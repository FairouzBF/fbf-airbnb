import { GlobalContextProvider } from "../context/GlobalContext";
import { AuthContextProvider } from "../context/AuthContext";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </GlobalContextProvider>
  );
}

export default MyApp;
