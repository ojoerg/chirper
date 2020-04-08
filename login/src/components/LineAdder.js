import React from 'react';

export const LineAdder = props => {
  if (props.index < props.userLength - 1) {
    return <hr></hr>;
  }
  return <div></div>;
};
