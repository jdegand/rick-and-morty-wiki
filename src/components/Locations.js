import { useQuery } from 'react-query';

const fetchLocations = async () => {
    const res = await fetch('https://rickandmortyapi.com/api/location');
    if (!res.ok) {
        throw new Error('Network response failed')
    }
    return res.json();
};

const Locations = () => {

    const {isLoading, isError, data, isFetching } = useQuery('locations', fetchLocations)
    /* add staleTime etc */
  
    if (isLoading || isFetching) {
      return <h2>Loading...</h2>
    }
  
    if (isError) {
        return <h2>Error occured.</h2>
    }

    /*Pass location as prop to a different component */
    return (
        <>
            <h1>Locations</h1>
            <ul>
                {data?.results.map(location => {
                    return (
                        <li key={location.id}>{location.name}</li>
                    )
                })}
            </ul>
        </>
    )
}

export default Locations;

/*
import { useQuery } from 'react-query';

const fetchLocations = async () => {
    const res = await fetch('https://rickandmortyapi.com/api/location');
    if (!res.ok) {
        throw new Error('Network response failed')
    }
    return res.json();
};

const Locations = () => {

    const {isLoading, isError, data, isFetching } = useQuery('locations', fetchLocations)
    // add staleTime etc 
  
    if (isLoading || isFetching) {
        return <h2>Loading...</h2>
      }
    
      if (isError) {
          return <h2>Error occured.</h2>
      }
  
      //Pass location as prop to a different component 
      return (
          <ul>
          {data?.results.map(location => {
                  return (
                      <li key={location.id}>{location.name}</li>
                  )
              })}
          </ul>
      )
  }
  
  export default Locations;
  */