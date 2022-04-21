import { useQuery } from "react-query";
import { Link } from "react-router-dom";

/* queryKey is an array */
const fetchCharacters = async ({queryKey}) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`);
    if (!res.ok) {
        throw new Error('Network response failed')
    }
    return res.json();
};

export default function Characters({page, setPage}) {

  const { isLoading, isError, data } = useQuery(["characters", page], fetchCharacters, {
    keepPreviousData: true
  })

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error :(</p>;

  //console.info(data);

  return (
    <div>
      <h1>Characters</h1>
      {data?.results.map(person => {
        return (
          <article key={person.id}>
            <Link to={`/characters/${person.id}`}>
              <p>
                {person.name} - {person.gender}: {person.species}
              </p>
            </Link>
          </article>
        );
      })}
      <button disabled={page === 1} onClick={()=> setPage(prev => prev - 1)}>Prev</button>
      <button disabled={!data.info.next} onClick={()=> setPage(prev => prev + 1)}>Next</button>
    </div>
  );
}