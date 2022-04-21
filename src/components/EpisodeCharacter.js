import { useQueries } from "react-query";

const fetchEpisodeCharacter = async (id) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) {
        throw new Error('Network response failed')
    }
    return res.json();
};

function EpisodeCharacter({ids}) {
  
    const queryResults = useQueries(ids.map(id => {
        return {
            queryKey: ['episode-character', id],
            queryFn: () => fetchEpisodeCharacter(id)
        }
    }));

    if (queryResults.isLoading) return <p>Loading...</p>;
    if (queryResults.isError) return <p>Error :(</p>; 

    return (
        queryResults?.map((character, index) => {
                return (
                    <section key={index}>
                    <img src={character.data?.image} alt={character.data?.name} />
                    <h1>{character.data?.name}</h1>
                    <h2>{character.data?.gender}: {character.data?.species}</h2>
                    <h3>{character.data?.status}</h3>
                    <h4>Origin: {character.data?.origin.name}</h4>
                    <h5>Appeared in {character.data?.episode?.length} episode{character.data?.episode?.length === 1 ? null : 's'} </h5>
                </section>
                )
        })
    )
}

export default EpisodeCharacter;

/*
    return (
        queryResults?.map((character, index) => {
                return (
                    <section key={index}>
                    <img src={character.data?.image} alt={character.data?.name} />
                    <h1>{character.data?.name}</h1>
                    <h2>{character.data?.gender}: {character.data?.species}</h2>
                    <h3>{character.data?.status}</h3>
                    <h4>{character.data?.location?.name}</h4>
                    <h5>Appeared in {character.data?.episode?.length} episode{character.data?.episode?.length === 1 ? null : 's'} </h5>
                </section>
                )
        })
    )

*/