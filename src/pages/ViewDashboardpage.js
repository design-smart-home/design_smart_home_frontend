import React from 'react';
import { useParams } from 'react-router-dom';
import { Empty, Card } from 'antd';
import SliderWidget from '../components/SliderWidget';
import SwitchWidget from '../components/SwitchWidget';

const ViewDashboard = ({ dashboards, controllers }) => {
  const { id } = useParams();
  const dashboard = dashboards.find(d => d.id === Number(id));

  return (
    <div className="view-container">
      <div className="view-content">
        <h1 className="view-title">{dashboard?.name || 'Дашборд'}</h1>
        
        {!dashboard || dashboard.widgets.length === 0 ? (
          <Empty 
            className="view-empty"
            description={
              <span>
                {!dashboard ? 'Дашборд не найден' : 'Нет виджетов в этом дашборде'}
              </span>
            }
          />
        ) : (
          <div className="view-workspace">
            {dashboard.widgets.map(widget => {
              const controller = controllers.find(c => c.id === widget.controllerId);
              const pin = controller?.pins.find(p => p.pin === widget.pin);
              
              return (
                <Card
                  key={widget.id}
                  className={`view-widget ${widget.type}`}
                  style={{
                    left: `${widget.position?.x || 50}px`,
                    top: `${widget.position?.y || 50}px`
                  }}
                >
                  {widget.type === 'slider' ? (
                    <SliderWidget 
                      device={{ 
                        ...pin,
                        name: `${controller?.name} (${pin?.pin})`,
                        current_value: pin?.value
                      }}
                      onChange={() => {}}
                      disabled
                    />
                  ) : (
                    <SwitchWidget 
                      device={{ 
                        ...pin,
                        name: `${controller?.name} (${pin?.pin})`,
                        current_value: pin?.value ? 'ON' : 'OFF'
                      }}
                      onChange={() => {}}
                      disabled
                    />
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDashboard;