import React from "react";
import { useParams } from "react-router-dom";
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
//components
import BreadCrumb from './BreadCrumb';
import MovieInfo from './MovieInfo';
//hook
import { useMovieFetch } from "../Hooks/useMovieFetch";

//image
import NoImage from '../images/no_image.jpg';
import Spinner from "./Spinner";
import MovieInfoBar from "./MovieInfoBar";
import Grid from "./Grid";
import Actor from "./Actor";

export const Movie = () => {
    const {movieId} = useParams(); // movieId is the name of param used in App.js for rout
    const {state: movie, loading, error} =  useMovieFetch(movieId);
    if(loading ) return <Spinner/>;
    if(error) return<div>Something Went Wrong...</div>
    return(
    <>
        <BreadCrumb movieTitle={movie.title}/>
        <MovieInfo movie={movie}/>
        <MovieInfoBar 
            time={movie.runtime} 
            budget={movie.budget} 
            revenue={movie.revenue} 
        />
        <Grid header='Actors'>
            {movie.actors.map(actor => (
                <Actor
                    key={actor.credit_id}
                    name={actor.name}
                    character={actor.character}
                    imageUrl = {actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage}
                />
            ))}
        </Grid>
    </>
    );
};


export default Movie;