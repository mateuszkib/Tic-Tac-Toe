import React from "react";
import PropTypes from "prop-types";

const Square = ({ value, onClick }) => {
    return (
        <div className="square" onClick={onClick}>
            {value}
        </div>
    );
};

Square.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default Square;
