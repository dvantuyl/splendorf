import React, { MouseEvent } from 'react';
import { Clr } from '../../../types';
import './token.scss';

export default (props: {
  clr: Clr;
  count: number;
  selectToken: (clr: Clr) => void;
}) => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    if (props.clr !== Clr.go) {
      props.selectToken(props.clr);
    }
  };

  const id = `token-component-${props.clr}`;
  const className = `token-component ${props.count === 0 ? 'hide' : ''}`;
  return (
    <div id={id} className={className} onClick={handleClick}>
      <div className="count">{props.count}</div>
    </div>
  );
};
