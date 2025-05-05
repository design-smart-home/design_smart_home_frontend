import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import DraggableWidget from './DraggableWidget';
import SliderWidget from './SliderWidget';
import SwitchWidget from './SwitchWidget';

const Workspace = ({ widgets, onMoveWidget }) => {
  const workspaceRef = useRef(null);

  const [, drop] = useDrop({
    accept: 'widget',
    drop(item, monitor) {
      const offset = monitor.getClientOffset();
      if (!offset || !workspaceRef.current) return;

      const workspaceRect = workspaceRef.current.getBoundingClientRect();
      const position = {
        x: offset.x - workspaceRect.left,
        y: offset.y - workspaceRect.top
      };

      // Обновляем позицию существующего виджета
      if (item.id) {
        onMoveWidget(item.id, position);
      }
    }
  });

  return (
    <div ref={drop} className="workspace-container">
      <div ref={workspaceRef} className="workspace-area">
        {widgets.map(widget => (
          <DraggableWidget
            key={widget.id}
            id={widget.id}
            type={widget.type}
            position={widget.position}
            onMove={onMoveWidget}
          >
            {widget.type === 'slider' ? <SliderWidget /> : <SwitchWidget />}
          </DraggableWidget>
        ))}
      </div>
    </div>
  );
};

export default Workspace;