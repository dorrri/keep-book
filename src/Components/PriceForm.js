import React from 'react';
import PropTypes from 'prop-types';
import {isValidDate} from '../utility'

class PriceForm extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			validatePass:true,
			errorMessage:'',
		};
	}
	submitForm=(event)=>{
	    const {item,onFormSubmit}=this.props;
	    const editMode=!!item;

	    const price=this.priceInput.value.trim()*1;
	    const title=this.titleInput.value.trim();
	    const date=this.dateInput.value.trim();
	    if (price && date && title){
	    	if (price<0){
	    		this.setState({
					validatePass:false,
					errorMessage:'金额数字必须大于0'
				})
			} else if (!isValidDate(date)){
	    		this.setState({
					validatePass:false,
					errorMessage:'请填写正确的日期格式'
				})
			} else {
	    		this.setState({
					validatePass:true,
					errorMessage:'',
				})
			}
			console.log(title,editMode);
			if (editMode){
	    		onFormSubmit({...item,title,price,date},editMode)
			} else {
				onFormSubmit({title,price,date},editMode)
			}
		}else {
	    	this.setState({
				validatePass:false,
				errorMessage:'请输入所有必选项'
			})
		}
		event.preventDefault();
	};
	render() {
		const {title,price,date}=(this.props.item)?this.props.item:{};
		return (
			<form className="price-form-com p-0" onSubmit={(event)=>{this.submitForm(event)}} noValidate>
				<div className="form-group text-left">
					<label className="col-2 col-form-label px-0" htmlFor="inputTitle">标题：</label>
					<input
						type="text"
						className="form-control"
						id="inputTitle"
						defaultValue={title}
						ref={(input)=>{this.titleInput=input}}
						placeholder="请输入标题"
					/>
				</div>
				<div className="form-group text-left">
					<label className="col-2 col-form-label px-0" htmlFor="inputPrice">金额：</label>
					<input
						type="number"
						className="form-control"
						defaultValue={price}
						id="inputPrice"
						ref={(input)=>{this.priceInput=input}}
						placeholder="请输入金额"
					/>
				</div>
				<div className="form-group text-left">
					<label className="col-2 col-form-label px-0" htmlFor="inputDate">日期：</label>
					<input
						type="date"
						className="form-control"
						id="inputDate"
						defaultValue={date}
						ref={(input)=>{this.dateInput=input}}
						placeholder="请输入日期"
					/>
				</div>
				<div className="row mt-4">
					<div className="col-2 text-left pr-0">
						<button type="submit" className="btn btn-primary">
							提交
						</button>
					</div>
					<div className="col-2 text-left pl-0">
						<button className="btn btn-secondary"
								onClick={this.props.onCancelSubmit}
						>
							取消
						</button>
					</div>
					{ !this.state.validatePass &&
						<div className="alert alert-danger mt-5" role="alert">
							{this.state.errorMessage}
						</div>
					}
				</div>
			</form>
		)
	}
}

PriceForm.propTypes={
	onFormSubmit:PropTypes.func.isRequired,
	onCancelSubmit:PropTypes.func.isRequired,
};

export default PriceForm