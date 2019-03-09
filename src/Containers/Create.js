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
    	const {id}=props.match.params;
    	const {items, categories}=props.data;
    	this.state={
    		selectedTab:(id && items[id])? categories[items[id].cid].type:TYPE_OUTCOME,
			selectedCategory:(id && items[id])? categories[items[id].cid]:null,
			validePass:true,
			errorMessage:'',
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
	    	if (this.state.selectedCategory===null){
	    		this.setState({
					validePass:false,
					errorMessage:'请选择账目类型',
				})
			}else {
				this.props.actions.createItem(data,this.state.selectedCategory.id);
				this.props.history.push('/');
			}
		}else{
	    	this.props.actions.updateItem(data,this.state.selectedCategory.id);
			this.props.history.push('/');
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
		const {id}=this.props.match.params;
		const editItem=(id && items[id])?items[id]:{};
		const activeIndex=tabsText.findIndex(text=>text===this.state.selectedTab);
		const filterCategories=Object.keys(categories).filter(id=>categories[id].type===this.state.selectedTab)
			.map(id=>categories[id]);
		return(
			<div
				className="create-page rounded"
				style={{background: '#fff'}}
			>
				<Tabs activeIndex={activeIndex} onTabChange={this.tabChange}>
					<Tab>支出</Tab>
					<Tab>收入</Tab>
				</Tabs>
				<CategorySelect
					categories={filterCategories}
					onSelectCategory={this.selectCategory}
					selectedCategory={this.state.selectedCategory}
				/>
				<PriceForm
					onFormSubmit={this.formSubmit}
					onCancelSubmit={this.cancelSubmit}
					item={editItem}
				/>
				{ !this.state.validePass &&
				<div className="alert alert-danger mt-5" role="alert">
					{this.state.errorMessage}
				</div>
				}
			</div>
		)
	}
}

export default withRouter(withContext(Create));