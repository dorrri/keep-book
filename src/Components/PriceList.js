import React from 'react';
import Ionicon from 'react-ionicons';

const PriceList=({items,onModifyItem,onDeleteItem})=>{
	return (
		<ul>
			{
				items.map((item)=>(
					<li className="list-group-item d-flex
					    justify-content-between align-items-center"
						key={item.id}
					>
						<span className="col-1">
							<Ionicon
								className="rounded-circle"
								font-size="30px"
								style={{backgroundColor:'#007bff',padding:'1px'}}
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
						<a className="col-1"
								onClick={()=>{onModifyItem(item)}}
						>
							<Ionicon
								className="rounded-circle"
								font-size="30px"
								style={{backgroundColor:'#28a745',padding:'1px'}}
								color={'#fff'}
								icon='ios-create-outline'
							/>
						</a>
						<a className="col-1"
								onClick={()=>{onDeleteItem(item)}}
						>
							<Ionicon
								className="rounded-circle"
								font-size="30px"
								style={{backgroundColor:'#dc3545',padding:'1px'}}
								color={'#fff'}
								icon='ios-close'
							/>
						</a>
					</li>
				))
			}
		</ul>
	)
};

export default PriceList