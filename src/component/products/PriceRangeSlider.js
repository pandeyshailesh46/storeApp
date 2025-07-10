import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceRangeSlider = ({ value, onChange, isVisible }) => {
   if (!isVisible) return null;

  return (
    <div className="text-white d-flex gap-3 align-items-center">
      <span>${value[0]}</span>
      <Slider
        range
        min={0}
        max={999}
        step={10}
        value={value}
        onChange={onChange}
        allowCross={false}
        trackStyle={[{ backgroundColor: '#e65128' }]}
        handleStyle={[{ borderColor: 'white' }, { borderColor: 'white' }]}
        railStyle={{ backgroundColor: '#666' }}
      />
      <span>${value[1]}</span>
    </div>
  );
};

export default PriceRangeSlider;
