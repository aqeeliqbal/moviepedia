import React, {Component} from "react";
import { useParams } from "react-router-dom";
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
//components
import BreadCrumb from './BreadCrumb';
import MovieInfo from './MovieInfo';
//hook
//import { useMovieFetch } from "../Hooks/useMovieFetch";   //not used because refectored to class components

import API from '../API'
//image
import NoImage from '../images/no_image.jpg';
import Spinner from "./Spinner";
import MovieInfoBar from "./MovieInfoBar";
import Grid from "./Grid";
import Actor from "./Actor";

class Movie extends Component {
    //const {movieId} = useParams(); // movieId is the name of param used in App.js for rout
    //const {state: movie, loading, error} =  useMovieFetch(movieId);
    state = {
        movie: {},
        loading: true,
        error: false,
    };

    fetchMovie  = async () => {
        const {movieId} = this.props.params;
        try{
            this.setState({error: false, loading: true});
            
            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId)

            //get directors only 
            const directors = credits.crew.filter( member => member.job === 'Director');

            this.setState({
                movie: {
                    ...movie,
                    actors: credits.cast,
                    directors,
                },
                loading: false,
            });
        }
        catch (error){
            this.setState({error: true, loading: false});
        }
    }

    componentDidMount(){
        this.fetchMovie();
    }
    render(){
        const {movie, loading, error} = this.state;

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
    }

};

// React-router 6 doesn't support class components, so "useParams" hook of react-router-dom will not work
// to overcome that we created below functional wrapper component.
const MovieWithParams = props => <Movie {...props} params={useParams()} />
export default MovieWithParams; //

//export default Movie;