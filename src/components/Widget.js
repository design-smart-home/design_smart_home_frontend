import React from 'react';
import { useDrag } from 'react-dnd';

const Widget = ({ type, children, onAdd }) => {
  const [, drag] = useDrag(() => ({
    type: 'widget',
    item: { type },
  }));

  const handleClick = (e) => {
    e.stopPropagation();
    onAdd(type);
  };

  return (
    <div
      ref={drag}
      className="widget-item"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Widget;