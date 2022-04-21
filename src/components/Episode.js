import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import EpisodeCharacter from './EpisodeCharacter';

const fetchEpisode = async ({queryKey}) => {
    const res = await fetch(`https://rickandmortyapi.com/api/episode/${queryKey[1]}`);
    if (!res.ok) {
        throw new Error('Network response failed')
    }
    return res.json();
};


export default function Episode(){

    const { episodeId } = useParams();

    const queryClient = useQueryClient();
  
    const { isLoading, isError, data } = useQuery(['episode', episodeId], fetchEpisode, {
        
        placeholderData: () => {
            const episode = queryClient.getQueryData('episodes')?.results.find(episode => episode.id ===  parseInt(episodeId));

            if(episode){
                return {
                    data: episode
                }
            } else {
                return undefined;
            }
        }
       
    });

    //console.log(data)
    
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error :(</p>;

    const episodeCharacterIds = []; // need state ? 

    data.characters?.map((character,index) => {
        const characterUrlParts = character.split("/").filter(Boolean);
        const characterId = characterUrlParts[characterUrlParts.length - 1];
        return episodeCharacterIds.push(parseInt(characterId));
    })

    return (
        <article key={data.id}>
            <h1>{data.episode} - {data.name}</h1>
            <h2>{data.air_date}</h2>
            <h3>Characters Appearing in this Episode: </h3>
            <EpisodeCharacter ids={episodeCharacterIds} key={data.id} />   
        </article>
    )
}



/* <pre>{JSON.stringify(data.characters, null, 2)}</pre> */

/*
    {data.characters?.map(character => {
        const characterUrlParts = character.split("/").filter(Boolean);
        const characterId = characterUrlParts[characterUrlParts.length - 1];
        return <h3>{characterId}</h3>
    })}

*/

/* idea - useState and push all characterIds to it then create another component and pass the ids to useQuery inside that component */

/* implemented-above - transform the data to get ids - pass ids as props to new component - pass the ids to useQueries - map the data - return data */