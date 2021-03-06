/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useMemo } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useFetch } from "../hooks/useFetch";

const useStopwatch = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return count;
};

const Home: NextPage = () => {
  const [url, setUrl] = useState<String>();

  const count = useStopwatch();

  // Optional way. useMemo if you don't use options.url in useeffect dep array
  // creates a single exact same reference to the object
  // const myOptions = useMemo(() => {
  //   return {
  //     url,
  //   };
  // }, [url]);

  const { data } = useFetch({
    url,
    onSuccess: () => {
      console.log("success");
    },
  });

  console.log("rendering");

  return (
    <div className={styles.container}>
      <Head>
        <title>Jack Herrington | Mastering React's useEffect</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div> Hello world </div>
      <div>Count: {count}</div>

      <div>{JSON.stringify(data)}</div>
      <div>
        <button title="jack" onClick={() => setUrl("data/jack.json")}>
          Jack
        </button>
        <button title="sally" onClick={() => setUrl("data/sally.json")}>
          sally
        </button>
      </div>
    </div>
  );
};

export default Home;
