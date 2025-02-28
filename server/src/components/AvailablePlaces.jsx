import { useState ,useEffect} from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

  

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  
  const[availablePlaces,setAvailablePlaces]=useState([]);

  useEffect(()=>{
    async function fetchPlaces(){
      setIsFetching(true);
      try {
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
     
      if (!response.ok) {
        throw new Error( 'Could not fetch places.');

      }
      setAvailablePlaces(resData.places);
    }catch (error) {
      setError({message:error.message ||'Could not fetch places.Pleses try again later.'});
    }

     
      setIsFetching(false);
    }
    fetchPlaces();
  }
  ,[]);
   if (error) {
    return  <Error title="An error occured" message={error.message}/>
  }
     
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isloading={isFetching}
      loadingText="Loading placess..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
