import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import DraggableWidget from './DraggableWidget';

const Workspace = ({ widgets, onDrop }) => {
  const [positions, setPositions] = useState({});
  const workspaceRef = useRef(null);

  const [, drop] = useDrop(() => ({
    accept: 'widget',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const workspaceRect = workspaceRef.current.getBoundingClientRect();

      if (offset) {
        const newPosition = {
          x: offset.x - workspaceRect.left,
          y: offset.y - workspaceRect.top,
        };
        setPositions((prev) => ({ ...prev, [item.id]: newPosition }));
        onDrop(item.type, newPosition);
      }
    },
  }));

  return (
    <div ref={drop} className="workspace-grid" style={{ position: 'relative', height: '100%' }}>
      <div ref={workspaceRef} style={{ width: '100%', height: '100%' }}>
        {widgets.map((widget) => (
          <DraggableWidget
            key={widget.id}
            id={widget.id}
            position={positions[widget.id] || { x: 0, y: 0 }}
            onMove={(newPosition) => {
              const workspaceRect = workspaceRef.current.getBoundingClientRect();
              const adjustedPosition = {
                x: newPosition.x - workspaceRect.left,
                y: newPosition.y - workspaceRect.top,
              };
              setPositions((prev) => ({ ...prev, [widget.id]: adjustedPosition }));
            }}
          >
            {widget.component}
          </DraggableWidget>
        ))}
      </div>
    </div>
  );
};

export default Workspace;