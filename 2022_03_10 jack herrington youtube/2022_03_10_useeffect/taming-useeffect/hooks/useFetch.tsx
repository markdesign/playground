import React, { useEffect, useState, useRef, useLayoutEffect } from "react";

const useCallbackRef = (callback: any) => {
  const callbackRef = useRef(callback);
  // This is same as useRef, except it is synchronous
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  return callbackRef;
};

export const useFetch = (options: any) => {
  const [data, setData] = useState(null);

  const savedOnSuccess = useCallbackRef(options.onSuccess);

  useEffect(() => {
    if (!options.url) return;
    let isCancelled = false;
    fetch(options.url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        if(isCancelled) return;
        savedOnSuccess.current?.(json);
        setData(json);
      });
      return () => {
        isCancelled = true;
      }
  }, [options.url, savedOnSuccess]);

  return {
    data,
  };
};
