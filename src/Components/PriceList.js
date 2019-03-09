import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';

const PriceList=({items,onModifyItem,onDeleteItem})=>{
	return (
		<ul className="my-2 p-0">
			{
				items.map((item)=>(
					<li className="list-group-item d-flex
					    justify-content-between align-items-center"
						key={item.id}
					>
						<span className="col-1">
							<Ionicon
								className="rounded-circle"
								fontSize="30px"
								style={{backgroundColor:'#007bff',padding:'3px'}}
								color={'#fff'}
								icon={item.category.iconName}
							/>
						</span>
						<span className="col-5">
							{item.title}
						</span>
						<span className="col-2 font-weight-bold">
							{(item.category.type==="income")?'+':'-'}
							{item.price}元
						</span>
						<span className="col-2">
							{item.date}
						</span>
						<a
							className="col-1"
							href="#"
							onClick={()=>{onModifyItem(item)}}
						>
							<Ionicon
								className="rounded-circle"
								fontSize="30px"
								style={{backgroundColor:'#28a745',padding:'3px'}}
								color={'#fff'}
								icon='ios-create-outline'
							/>
						</a>
						<a
							className="col-1"
							href="#"
							onClick={()=>{onDeleteItem(item)}}
						>
							<Ionicon
								className="rounded-circle"
								fontSize="30px"
								style={{backgroundColor:'#dc3545',padding:'1px'}}
								color={'#fff'}
								icon='ios-close'
							/>
						</a>
					</li>
				))
			}
			{
				items.length===0 &&
				<div>你还没有任何记账记录</div>
			}
		</ul>
	)
};

PriceList.propTypes={
    items:PropTypes.array.isRequired,
	onModifyItem:PropTypes.func.isRequired,
	onDeleteItem:PropTypes.func.isRequired,
};

PriceList.defaultProps={
	onModifyItem:()=>{}
};

export default PriceList