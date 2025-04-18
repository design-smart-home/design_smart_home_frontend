import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableWidget = ({ id, children, position, onMove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'widget',
    item: { id, position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        onMove({ x: offset.x, y: offset.y });
      }
    },
  }));

  const style = {
    position: 'absolute',
    left: position.x,
    top: position.y,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };

  return (
    <div ref={drag} style={style}>
      {children}
    </div>
  );
};

export default DraggableWidget;