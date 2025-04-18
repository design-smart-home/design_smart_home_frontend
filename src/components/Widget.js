import React from 'react';
import { useDrag } from 'react-dnd';

const Widget = ({ type, children, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'widget',
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      onClick={onClick} // Добавляем обработчик клика
    >
      {children}
    </div>
  );
};

export default Widget;