import React from 'react';
import {withRouter} from "react-router-dom";

import CategorySelect from '../Components/CategorySelect'
import PriceForm from '../Components/PriceForm'
import {Tabs,Tab} from  '../Components/Tabs'
import withContext from "../WithContext";

import {TYPE_INCOME, TYPE_OUTCOME} from "../utility";


const tabsText=[TYPE_OUTCOME,TYPE_INCOME];

class Create extends React.Component{
    constructor(props){
    	super(props);
    	this.state={
    		selectedTab:TYPE_OUTCOME,
			selectedCategory:null,
		}
	}
	tabChange=(index)=>{
    	this.setState({
			selectedTab:tabsText[index],
		})
	};
    cancelSubmit=()=>{
		this.props.history.push('/');
	};
	formSubmit=(data,isEditMode)=>{
	    if(!isEditMode){
	    	this.props.actions.createItem(data,this.state.selectCategory.id);
		}else{

		}
	};
	selectCategory=(category)=>{
		this.setState({
			selectedCategory:category,
		})
	};
	render() {
		const {data} = this.props;
		const {items, categories}=data;
		const {selectedTab}=this.state;
		const filterCategories=Object.keys(categories).filter(id=>categories[id].type===selectedTab)
			.map(id=>categories[id]);
		return(
			<div
				className="create-page rounded"
				style={{background: '#fff'}}
			>
				<Tabs activeIndex={0} onTabChange={this.tabChange}>
					<Tab>支出</Tab>
					<Tab>收入</Tab>
				</Tabs>
				<CategorySelect
					categories={filterCategories}
					onSelectCategory={this.selectCategory}
				/>
				<PriceForm
					onFormSubmit={this.formSubmit}
					onCancelSubmit={this.cancelSubmit}
					item={{}}
				/>
			</div>
		)
	}
}

export default withRouter(withContext(Create));