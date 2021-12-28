import React from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

import { Wrapper, Content } from "../BreadCrumb/BreadCrumb.styled";

const BreadCrumb = ({movieTitle }) => (
    <Wrapper>
        <Content>
            <Link to='/'>
                <span>Home</span>
            </Link>
        <span> | </span>
        <span>{movieTitle}</span>


        </Content>
    </Wrapper>
);

BreadCrumb.propTypes = {
    movieTitle: PropTypes.string
}

export default BreadCrumb;