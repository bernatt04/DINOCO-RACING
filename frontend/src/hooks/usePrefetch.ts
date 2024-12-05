import { useEffect } from 'react';

type PrefetchOptions = {
  url: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

const usePrefetch = ({ url, onSuccess, onError }: PrefetchOptions) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (onSuccess) onSuccess(data);
      } catch (error) {
        if (onError) onError(error);
      }
    };

    fetchData();
  }, [url, onSuccess, onError]);
};

export default usePrefetch;
