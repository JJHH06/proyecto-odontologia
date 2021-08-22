import React from "react";
import PropTypes from "prop-types";
import './Tooth.css';

function Tooth(props) {
  return (
    <svg class="tooth">
        {/* transform="translate(0,0)" */}
      <g transform ="scale(1.5)">
        <polygon points="0,0 20,0 15,5 5,5" class=""></polygon>
        <polygon points="5,15 15,15 20,20 0,20" class=""></polygon>
        <polygon points="15,5 20,0 20,20 15,15" class=""></polygon>
        <polygon points="0,0 5,5 5,15 0,20" class=""></polygon>
        <polygon points="5,5 15,5 15,15 5,15" class=""></polygon>
        <text
          x="6"
          y="30"
          stroke="navy"
          fill="navy"
          stroke-width="0.1"
          class="tooth"
        >
          {props.tooth_id}
        </text>
      </g>
    </svg>
  );
}

Tooth.propTypes = {
    tooth_id: PropTypes.number.isRequired,
};

export default Tooth;
