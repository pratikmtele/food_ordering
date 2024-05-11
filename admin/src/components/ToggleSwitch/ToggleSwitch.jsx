import React from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({onChange, checked}) {
  return (
    <div className="checkbox_item citem_1">
		<label className="checkbox_wrap">
			<input type="checkbox" name="isActive" className="checkbox_inp" onChange={onChange} checked={checked}/>
			<span className="checkbox_mark"></span>
		</label>
	</div>
  )
}

export default ToggleSwitch
