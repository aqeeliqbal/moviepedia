import { useState, useEffect, useRef } from "react";

//API
import API from '../API';

import { isPersistedState } from "../helpers";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const fetchMovie = async (page, searchTerm = "") =>{
        try{
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);
            
            setState(prev =>({
                ...movies,
                results: page > 1 ? [...prev.results, ...movies.results] : [...movies.results] 
            }) )
        }
        catch(error){
            setError(true);
        }
        setLoading(false);
    };

    //initial render and search 
    useEffect(() => {
        if(!searchTerm){
            const sessionState = isPersistedState('homeState');
            if(sessionState){
                setState(sessionState)
                return;
            }
        }
        setState(initialState);
        fetchMovie(1, searchTerm)   //to fetch first page, initially searchTerm is empty string so it will not effect
    },[searchTerm]);// [] is a dependency array, to specify different dependencies on which we want to this useEffect to trigger. 
            //empty dependancy array meant it will only run once on the inital render.

    //load more 
    useEffect(()=>{
        if(!isLoadingMore) return;
        fetchMovie(state.page + 1, searchTerm)
        setIsLoadingMore(false);
    },[isLoadingMore, searchTerm, state.page])

    //write to session storage
    useEffect(() => {
        if(!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state))
    },[searchTerm, state])
    
    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore};        
}
