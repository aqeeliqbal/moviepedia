import React from "react";
import PropTypes from 'prop-types'
import { Wrapper } from "../Button/Button.styled";

const Button = (props) => 
(    <Wrapper type='button' onClick={props.callback}>
    {props.text}
    </Wrapper>
);
Button.propTypes = {
    text: PropTypes.string,
    callback: PropTypes.func,
}

export default Button;