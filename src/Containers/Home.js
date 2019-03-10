import React from 'react';
import Ionicon from 'react-ionicons';
import {withRouter} from "react-router-dom";
import withContext from '../WithContext'
import PropTypes from 'prop-types';
import PieChart from '../Components/PieChart'

import PriceList from '../Components/PriceList';
import TotalPrice from '../Components/TotalPrice'
import MonthPicker from '../Components/MonthPicker'
import CreateBtn from '../Components/CreateBtn'
import {Tabs,Tab} from  '../Components/Tabs'
import Loader from '../Components/Loader'

import {LIST_VIEW,CHART_VIEW,TYPE_INCOME,TYPE_OUTCOME,Colors} from "../utility";


const tabsText=[LIST_VIEW,CHART_VIEW];

const generateChartDataByGategory=(items,type)=>{
	let categoryMap={};
	items.filter(item=>item.category.type===type).forEach(item=>{
		if (categoryMap[item.cid]){
			categoryMap[item.cid].value+=(item.price*1);
			categoryMap[item.cid].items.push(item.id);
		} else {
			categoryMap[item.cid]={
				name:item.category.name,
				value:item.price*1,
				items:[item.id]
			}
		}
	});
	return Object.keys(categoryMap).map(mapKey=>{
		return {...categoryMap[mapKey]};
	});
};

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			tabView:tabsText[0],
		};
	}
	componentDidMount() {
		this.props.actions.getInitalData();
	}
	changeView=(index)=>{
        this.setState({
			tabView:tabsText[index],
		})
	};
	changeDate=(year,month)=>{
        this.props.actions.selectNewDate(year,month);
	};
	modifyItem=(modifiedItem)=>{
        this.props.history.push(`/edit/${modifiedItem.id}`)
	};
	createItem=()=>{
        this.props.history.push('/create');
	};
	deleteItem=(deletedItem)=>{
        this.props.actions.deleteItem(deletedItem);
	};
	render(){
		const {data} = this.props;
		const {items,categories,currentDate,isLoading}=data;
		const {tabView}=this.state;
		const itemsWithCategory=Object.keys(items).map(id=>{
			items[id].category=categories[items[id].cid];
			return items[id];
		});
		const chartOutcomeDataByCategory=generateChartDataByGategory(itemsWithCategory,TYPE_OUTCOME);
		const chartIncomeDataByCategory=generateChartDataByGategory(itemsWithCategory,TYPE_INCOME);
		const tabIndex=tabsText.findIndex(tabText=>tabText===tabView);
		let totalIncome=0,totalOutcome=0;
		itemsWithCategory.forEach(item=>{
			if (item.category.type===TYPE_OUTCOME){
				totalOutcome+=item.price;
			}else {
				totalIncome+=item.price;
			}
		});
		return (
			<div className='create-page rounded'>
				<header className="header">
					<div className="row py-4" style={{background:'#aaa'}}>
						<Ionicon
							className="col"
							icon='ios-ionic'
							color={'#fff'}
							fontSize="100px"
						/>
					</div>
					<div className="row py-3" style={{background:'#aaa'}}>
						<div className="col-9">
							<MonthPicker
								year={currentDate.year}
								month={currentDate.month}
								onChange={this.changeDate}
							/>
						</div>
						<div className="col-3">
							<TotalPrice
								income={totalIncome}
								outcome={totalOutcome}
							/>
						</div>
					</div>
				</header>
				<div className="content-area">
					<Tabs activeIndex={tabIndex} onTabChange={this.changeView}>
						<Tab>
							<Ionicon
								className="rounded-circle mr-2"
								fontSize="30px"
								color={'#007bff'}
								icon='ios-paper'
							/>
							列表模式
						</Tab>
						<Tab>
							<Ionicon
								className="rounded-circle mr-2"
								fontSize="30px"
								color={'#007bff'}
								icon='ios-pie'
							/>
							图表模式
						</Tab>
					</Tabs>
					<CreateBtn onClick={this.createItem}/>
					{isLoading &&
						<Loader/>
					}
					{	itemsWithCategory.length===0 && !isLoading &&
						<div className="small mt-3">你还没有任何记账记录</div>
					}
					{tabView === LIST_VIEW &&
					<PriceList
						onModifyItem={this.modifyItem}
						items={itemsWithCategory}
						onDeleteItem={this.deleteItem}
					/>
					}
					{tabView === CHART_VIEW &&
					<React.Fragment>
						<div className="row">
							<div className="col">
								<PieChart title="本月支出" categoryData={chartOutcomeDataByCategory}/>
							</div>
							<div className="col">
								<PieChart title="本月收入" categoryData={chartIncomeDataByCategory}/>
							</div>
						</div>
					</React.Fragment>
					}
				</div>
			</div>
		)
	}
}

Home.propTypes = {
	data: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	history: PropTypes.object,
	match: PropTypes.object,
};

export default withRouter(withContext(Home));