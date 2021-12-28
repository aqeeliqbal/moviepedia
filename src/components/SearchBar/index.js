import React, {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types'
import searchIcon from '../../images/search-icon.svg';

import { Wrapper,Content } from "../SearchBar/SearchBar.styled";

const SearchBar = (props) => {

    const [state, setState] = useState('');
    const initial = useRef(true);

    useEffect (() => {
        if(initial.current){
            initial.current = false;
            return;
        }
        const  timer = setTimeout(() => {
            props.setSearchTerm(state);
        }, 500) 
        return () => clearTimeout(timer); 
    },[props.setSearchTerm, state])
    //alternate way to set onChange inseated of inLine function like below.
    //Use this function like this: "onClick = {keyHitEvent}"
    /* 
    function keyHitEvent(e){
        setState(e.currentTarget.value);
    } */
    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="search icon"/>
                <input 
                    type='text'
                    placeholder="Seach Movie"
                    onChange={event => setState(event.currentTarget.value)}
                    value= {state}/>
            </Content>
        </Wrapper>
    );
};

SearchBar.propTypes = {
    callback: PropTypes.func,
}
export default SearchBar;