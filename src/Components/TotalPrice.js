import React from 'react';
import PropTypes from 'prop-types';

const TotalPrice=({income,outcome})=>{
    return (
    	<div className="total-price-com text-right pr-3">
			<div className="outcome font-weight-bold mb-1">
				总支出：
				<span>{outcome}</span>
			</div>
			<div className="income font-weight-bold">
				总收入：
				<span>{income}</span>
			</div>
		</div>
	)
};

TotalPrice.propTypes={
	income:PropTypes.number.isRequired,
	outcome:PropTypes.number.isRequired,
};
export default TotalPrice;