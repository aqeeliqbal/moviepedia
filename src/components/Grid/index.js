import React from "react";
import PropTypes from 'prop-types'
import { Wrapper, Content } from "../Grid/Grid.styled";

const Grid = (props) => (
    <Wrapper>
        <h1>{props.header}</h1>
        <Content>{props.children}</Content>
    </Wrapper>
)

Grid.propTypes = {
    header: PropTypes.string,
}
export default Grid;