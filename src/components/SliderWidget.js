import React from 'react';
import { Slider } from 'antd';

const SliderWidget = () => {
  return (
    <div className="slider-widget">
      <h3>Слайдер</h3>
      <Slider className="widget-control" />
    </div>
  );
};

export default SliderWidget;