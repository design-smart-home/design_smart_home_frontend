import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableWidget = ({ id, type, children, position, onMove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'widget',
    item: { id, type, position },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    end: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && onMove) {
        onMove(item.id, { x: offset.x, y: offset.y });
      }
    }
  });

  return (
    <div
      className="draggable-widget"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div ref={drag} className="widget-handle">≡</div>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};

export default DraggableWidget;