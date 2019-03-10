import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip, PieChart, Pie, Cell, ResponsiveContainer} from "recharts";
import {Colors} from "../utility";

const ColorArr=Object.keys(Colors).map(key=>Colors[key]);

const CustomedPieChart=({title,categoryData})=>{
    if (categoryData.length===0){
    	return <h6 className="text-center mt-3">{title}还没有任何数据</h6>
	} else {
    	return (
    		<div className="pie-chart-com">
				<h6 className="text-center mt-3">{title}</h6>
				<ResponsiveContainer width={'100%'} height={300}>
					<PieChart>
						<Pie isAnimationActive={false}
							 data={categoryData}
							 dataKey="value"
							 cx={'50%'}
							 cy={"50%"}
							 outerRadius={100}
							 fill={Colors.blue}
						>
							{
								categoryData.map((entry,index)=>
									<Cell key={index} fill={ColorArr[index%ColorArr.length]}/>)
							}
						</Pie>
						<Tooltip/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		)
	}
};

CustomedPieChart.propTypes = {
	title: PropTypes.string,
	categoryData: PropTypes.array
};

export default CustomedPieChart
