import React from "react";
import PropTypes from 'prop-types'
import searchIcon from '../../images/search-icon.svg';

import { Wrapper,Content } from "../SearchBar/SearchBar.styled";
//import { render } from "@testing-library/react";

class SearchBar extends React.Component {
    
    state = {value: ''};
    timeout = null;

    //component life cycle method: componentDidUpdate triggers everytime component updates
    componentDidUpdate(_prevProps, prevState){
        if(this.state.value !== prevState.value){
            const {setSearchTerm} = this.props;

            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                    const {value} = this.state
                    setSearchTerm(value);
            }, 500);
        }
    }

    render(){
        return (
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt="search icon"/>
                    <input 
                        type='text'
                        placeholder="Seach Movie"
                        onChange={event => this.setState({value: event.currentTarget.value})}
                        value= {this.state.value}/>
                </Content>
            </Wrapper>
        );   
    } 
};

    //alternate way to set onChange inseated of inLine function like above.
    //Use this function like this: "onClick = {keyHitEvent}"
    /* 
    function keyHitEvent(e){
        setState(e.currentTarget.value);
    } */
SearchBar.propTypes = {
    callback: PropTypes.func,
}
export default SearchBar;