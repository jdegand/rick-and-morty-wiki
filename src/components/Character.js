import { useParams } from "react-router";
import { useQuery, useQueryClient } from "react-query";

const fetchCharacter = async ({queryKey}) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${queryKey[1]}`);
    if (!res.ok) {
        throw new Error('Network response failed')
    }
    return res.json();
};

function Character() {
    const { characterId } = useParams();

    //console.log(characterId)

    const queryClient = useQueryClient();
  
    const { isLoading, isError, data } = useQuery(['character', characterId], fetchCharacter, {
        /* initialData vs placeholderData - did the api give you everything you need after first response  */
        initialData: () => {
            const character = queryClient.getQueryData('characters')?.results.find(character => character.id ===  parseInt(characterId));

            if(character){
                return {
                    data: character
                }
            } else {
                return undefined;
            }
        }
       
    });

    //console.log(data)
    
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error :(</p>;

    return (
        <article key={data.id}>
            <img src={data.image} alt={data.name} />
            <h1>{data.name}</h1>
            <h2>{data.gender}: {data.species}</h2>
            <h3>{data.status}</h3>
            <h4>Origin: {data.origin.name}</h4>
            <h5>Appeared in {data.episode?.length} episode{data.episode?.length === 1 ? null : 's'} </h5>
        </article>
    )
}

export default Character;