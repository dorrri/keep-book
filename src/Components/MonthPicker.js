import React from 'react';
import PropTypes from 'prop-types';
import {padLeft,range} from "../utility";

class MonthPicker extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isOpen:false,
			selectedYear:this.props.year,
			selectedMonth:this.props.month
		};
	}
	componentDidMount() {
		document.addEventListener('click',this.handleClick,false);
	};
    componentWillUnmount() {
		document.removeEventListener('click',this.handleClick,false);
	};
    handleClick=(event)=>{
	    if(this.node.contains(event.target)){
	    	return;
		}
	    this.setState({
			isOpen:false,
		});
	};
	toggleDropdown=(event)=>{
	    event.preventDefault();
	    this.setState({
			isOpen:!this.state.isOpen
		});
	};
	selectYear=(event,yearNumber)=>{
        event.preventDefault();
        this.setState({
			selectedYear:yearNumber,
		});
	};
	selectMonth=(event,monthNumber)=>{
		event.preventDefault();
		this.setState({
			isOpen:false,
			selectedMonth:monthNumber
		});
		this.props.onChange(this.state.selectedYear,monthNumber);
	};
	render(){
		const originYear=this.props.year;
		const year=this.state.selectedYear;
		const month=this.state.selectedMonth;
		const isOpen=this.state.isOpen;
		const monthRange=range(12,1).map(month=>padLeft(month));
		const yearRange=range(9,-4).map(number=>number+originYear);
		const selectedYear=this.state.selectedYear;
		return (
			<div className="month-picker-com dropdown text-left" ref={(ref)=>{this.node=ref}}>
				<button
					className="btn btn-lg btn-secondary dropdown-toggle"
					id="month-picker-dropdown-btn"
					onClick={this.toggleDropdown}
				>
					{`${year}年 ${month}月`}
				</button>
				{ isOpen &&
					<div
						className="dropdown-menu"
						style={{display:'block'}}
						role="menu"
						aria-labelledby="month-picker-dropdown-btn"
					>
                        <div className="row">
							<div className="years-range col border-right">
								{yearRange.map((yearNumber,index)=>
									<a
										key={index}
										href="#"
										className={(yearNumber===selectedYear)?"dropdown-item active":"dropdown-item"}
										onClick={(event)=>this.selectYear(event,yearNumber)}
									>
										{yearNumber}年
									</a>
								)}
							</div>
							<div className="month-range col">
								{monthRange.map((monthNumber,index)=>
									<a
										key={index}
										href="#"
										className={(monthNumber===month)?"dropdown-item active":"dropdown-item"}
										onClick={(event)=>{this.selectMonth(event,monthNumber)}}
									>
										{monthNumber}月
									</a>
								)}
							</div>
						</div>
					</div>
				}
			</div>
		)
	}
}

MonthPicker.propsTypes={
	year:PropTypes.number.isRequired,
	month:PropTypes.number.isRequired,
	onChange:PropTypes.func.isRequired,
}

export default MonthPicker;