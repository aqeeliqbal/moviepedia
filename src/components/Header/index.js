import React from "react";
import { Link } from "react-router-dom"; 

import MoviepediaLogo from '../../images/logo.png';
import TMDBLogo from '../../images/tmdb_logo.svg';

import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";

const Header = () => (
    <Wrapper>
        <Content>
            <Link to='/'>
                <LogoImg src={MoviepediaLogo} alt='moviepedia log'/>
            </Link>            
            <TMDBLogoImg src={TMDBLogo} alt='TMDB Logo'/>
        </Content>
    </Wrapper>
);

export default Header;