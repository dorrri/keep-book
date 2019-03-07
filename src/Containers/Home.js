import React from 'react';
import PropTypes from 'prop-types';
import PriceList from '../Components/PriceList';
import ViewTab from '../Components/ViewTab'
import {LIST_VIEW,CHART_VIEW,TYPE_INCOME,TYPE_OUTCOME,parseToYearAndMonth,padLeft} from "../utility";
import TotalPrice from '../Components/TotalPrice'
import MonthPicker from '../Components/MonthPicker'
import CreateBtn from '../Components/CreateBtn'

const items=[
	{
		"id":1,
		"title":"去云南旅游",
		"price":2000,
		"date":"2018-09-10",
		"cid":1
	},
	{
		"id":2,
		"title":"理财收入",
		"price":4000,
		"date":"2018-10-10",
		"cid":2
	}
];

const categories={
    "1":{
		"id":1,
		"name":"旅游",
		"type":"outcome",
		"iconName":"ios-plane"
	},
	"2":{
		"id":2,
		"name":"理财",
		"type":"income",
		"iconName":"logo-yen"
	},
};
const newItem={
	"id":3,
	"title":"理财收入",
	"price":1000,
	"date":"2018-10-10",
	"cid":2
};

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
		    items,
			currentDate:parseToYearAndMonth(),
			tabView:LIST_VIEW,
		};
	}
	changeView=(view)=>{
        this.setState({
			tabView:view,
		})
	};
	changeDate=(year,month)=>{
        this.setState({
			currentDate:{year,month},
		})
	};
	modifyItem=(modifiedItem)=>{
        const modifiedItems=this.state.items.map(item=>{
        	if (item.id===modifiedItem.id){
        		return{...item,title:'update'}
			} else {
        		return item
			}
		});
		this.setState({
			items:modifiedItems,
		})
	};
	createItem=()=>{
        this.setState({
			items:[newItem,...this.state.items]
		})
	};
	deleteItem=(deletedItem)=>{
        const filteredItems=this.state.items.filter(item=>item.id!==deletedItem.id);
        this.setState({
			items:filteredItems,
		})
	};
	render(){
		const {items,currentDate,tabView}=this.state;
		const itemsWithCategory=items.map(item=>{
			item.category=categories[item.cid];
			return item;
		}).filter(item=>{
			return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`);
		});
		let totalIncome=0,totalOutcome=0;
		items.forEach(item=>{
			if (item.category.type===TYPE_OUTCOME){
				totalOutcome+=item.price;
			}else {
				totalIncome+=item.price;
			}
		});
		return (
			<React.Fragment>
				<header className="header">
					<div className="row mb-5">

					</div>
					<div className="row">
						<div className="col">
							<MonthPicker
								year={currentDate.year}
								month={currentDate.month}
								onChange={this.changeDate}
							/>
						</div>
						<div className="col">
							<TotalPrice
								income={totalIncome}
								outcome={totalOutcome}
							/>
						</div>
					</div>
				</header>
				<div className="content-area py-3 px-3">
                    <ViewTab activeTab={tabView} onTabChange={this.changeView}/>
					<CreateBtn onClick={this.createItem}/>
					{ tabView === LIST_VIEW &&
					<PriceList
						onModifyItem={this.modifyItem}
						items={itemsWithCategory}
						onDeleteItem={this.deleteItem}
					/>
					}
					{ tabView === CHART_VIEW &&
					<h2>图表</h2>
					}
				</div>
			</React.Fragment>
		)
	}
}

export default Home