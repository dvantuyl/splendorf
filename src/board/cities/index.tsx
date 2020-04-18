import React from 'react';
import { City, GameState } from '../../types';
import CityComponent from './city';
import './cities.scss';

export default (props: { G: GameState }) => {
  const cityComponents = props.G.top.map((city: City) => {
    return <CityComponent key={city.id} city={city} />;
  });
  return <section id="cities-component">{cityComponents}</section>;
};
