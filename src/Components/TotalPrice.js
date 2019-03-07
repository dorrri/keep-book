import React from 'react';
import PropTypes from 'prop-types';

const TotalPrice=({income,outcome})=>{
    return (
    	<div className="total-price-com row align-items-right justify-content-center">
			<div className="outcome col font-weight-bold">
				总支出：
				<span>{outcome}</span>
			</div>
			<div className="income col font-weight-bold">
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