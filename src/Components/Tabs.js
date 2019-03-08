import React from 'react';
import PropTypes from 'prop-types';

export class Tabs extends React.Component{
	constructor(props){
		super(props);
		this.state={
			activeIndex:props.activeIndex,
		}
	}
	tabChange=(event,index)=>{
	    event.preventDefault();
	    this.setState({
			activeIndex:index,
		});
		this.props.onTabChange(index);
	};
	activeClassName=(activeIndex,index)=>{
		return (activeIndex===index)?'nav-link active':'nav-link';
	};
	render(){
		const {children}=this.props;
		const activeIndex=this.state.activeIndex;
		return (
			<ul className="nav nav-tabs nav-fill my-4">
				{React.Children.map(children,(child,index)=>{
					return (
						<li className="nav-item">
							<a
								onClick={(event)=>{this.tabChange(event,index)}}
								href="#"
								className={this.activeClassName(activeIndex,index)}
								role="button"
							>
								{child}
							</a>
						</li>
					)
				})}
			</ul>
		)
	}
}

export const Tab=({children})=>
	<React.Fragment>{children}</React.Fragment>

Tabs.propTypes={
	activeIndex:PropTypes.number.isRequired,
	onTabChange:PropTypes.func.isRequired,
};