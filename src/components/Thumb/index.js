import React from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

import { Image } from "./Thumb.styled";

const Thumb = ({image, movieId, clickable}) => (
    <div>
        {clickable ? (
            <Link to={`/${movieId}`}>
                <Image src = {image} alt='movie thumbnail image'></Image>
            </Link>
            
        ) : (
            <Image src = {image} alt='movie thumbnail image'></Image>
        )}
    </div>
);

Thumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool
}
export default Thumb;