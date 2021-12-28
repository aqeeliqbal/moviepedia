import React from 'react'; //useState hook is the hook we use in functional components in react to create a state.

import {useHomeFetch} from '../Hooks/useHomeFetch';

//config
import { POSTER_SIZE, IMAGE_BASE_URL, BACKDROP_SIZE } from "../config";

//components 
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';

//image
import NoImage from '../images/no_image.jpg';
import { Fragment } from 'react/cjs/react.production.min';

const Home = () =>{

    const {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore} = useHomeFetch();
    if(error) return <div>Something went wrong...</div>

    console.log(state)

    return (
        <>  {/*fragment*/}
        {!searchTerm && state.results[0] ? (
            <HeroImage 
            image = {`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`} /* template litral used here to merge strings */
            title = {state.results[0].title}
            text = {state.results[0].overview }
            />   
            ) : null
        }
        <SearchBar setSearchTerm={setSearchTerm}/>
        <Grid header={searchTerm ? 'Search Results' : 'Popular movies'}>
            {state.results.map(movie => (
                <Thumb
                    key={movie.id}
                    clickable
                    image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}
                    movieId={movie.id}
                />
            ))}
        </Grid>
        
        {loading && <Spinner/>}
        {state.page < state.total_pages && !loading && (
            <Button text='Load More' callback={()=> setIsLoadingMore(true)}/>
        
        )}
        </>
    );
};
export default Home;