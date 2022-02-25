import React from "react";
import classNames from "classnames";

import 'components/DayListItem.scss';

const formatSpots = (spots) => {
  let spotsRemainingString = ""

  if (spots === 0) {
    spotsRemainingString += "no ";
  } else {
    spotsRemainingString += spots + " ";
  }

  if (spots === 1) {
    spotsRemainingString += "spot ";
  } else {
    spotsRemainingString += "spots ";
  }

  spotsRemainingString += "remaining"

  return spotsRemainingString;
};

export default function DayListItem(props) {
  let dayClass = classNames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  })

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">
        {formatSpots(props.spots)}

        {/* {(props.spots === 0) ? "no " : props.spots + " "}
        {(props.spots === 1) ? "spot " : "spots "}
        remaining */}
      </h3>
    </li>
  );
}
