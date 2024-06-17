import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url, limit = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url, {
        params: {
          limit,
          page,
        },
      });
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url, page]);

  const reFetch = () => {
    fetchData();
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return { data, loading, error, reFetch, nextPage, prevPage };
};

export default useFetch;
