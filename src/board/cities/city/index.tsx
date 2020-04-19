import React from 'react';
import { City } from '../../../types';
import './city.css';

export default (props: { city: City }) => {
  const id = `city-component-${props.city.id}`;
  return <div id={id} className="city-component"></div>;
};
