import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../api';
import Trending from '../../components/Trending/Trending';

export default function HomePage() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await getTrendingMovies();
        setTrending(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrending();
  }, []);

  return <Trending films={trending}/>
}
