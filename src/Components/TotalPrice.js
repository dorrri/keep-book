import React from 'react';
import PropTypes from 'prop-types';

const TotalPrice=({income,outcome})=>{
    return (
    	<div className="total-price-com text-left pr-3" style={{color:'#fff'}}>
			<div className="outcome mb-1">
				总支出：
				<span className="font-weight-bold">{outcome}</span>
			</div>
			<div className="income">
				总收入：
				<span className="font-weight-bold">{income}</span>
			</div>
		</div>
	)
};

TotalPrice.propTypes={
	income:PropTypes.number.isRequired,
	outcome:PropTypes.number.isRequired,
};
export default TotalPrice;