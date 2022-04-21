import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const fetchEpisodes = async ({queryKey}) => {
    const res = await fetch(`https://rickandmortyapi.com/api/episode?page=${queryKey[1]}`);
    if (!res.ok) {
        throw new Error('Network response failed')
    }
    return res.json();
};

export default function Episodes({page, setPage}) {
  const { isLoading, isError, data } = useQuery(["episodes", page], fetchEpisodes)

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :(</p>;

  //console.info(data);

  return (
    <div>
      <h1>Episodes</h1>
      {data?.results.map(episode => {
        return (
          <article key={episode.id}>
            <Link to={`/episodes/${episode.id}`}>
              {episode.episode} - {episode.name}
            </Link>
          </article>
        );
      })}
      <button disabled={page === 1} onClick={()=> setPage(prev => prev - 1)}>Prev</button>
      <button disabled={!data.info.next} onClick={()=> setPage(prev => prev + 1)}>Next</button>
    </div>
  );
}

/* before pagination 

import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const fetchEpisodes = async () => {
    const res = await fetch('https://rickandmortyapi.com/api/episode');
    if (!res.ok) {
        throw new Error('Network response failed')
    }
    return res.json();
};

export default function Episodes() {
  const { isLoading, isError, data } = useQuery("episodes", fetchEpisodes)

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :(</p>;

  console.info(data);

  return (
    <div>
      <h1>Episodes</h1>
      {data?.results.map(episode => {
        return (
          <article key={episode.id}>
            <Link to={`/episodes/${episode.id}`}>
              {episode.episode} - {episode.name}
            </Link>
          </article>
        );
      })}
    </div>
  );
}
*/