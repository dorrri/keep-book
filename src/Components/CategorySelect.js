import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';

class CategorySelect extends React.Component{
	constructor(props){
		super(props);
		this.state={
			selectedCategoryId:props.selectedCategory && props.selectedCategory.id,
		}
	}
	selectCategory=(event,id)=>{
		event.preventDefault();
		this.setState({
			selectedCategoryId:id,
		});
		this.props.onSelectCategory(this.props.categories[id]);
	};
	render() {
		const {categories}=this.props;
		const selectedCategoryId=this.state.selectedCategoryId;
		return (
			<div className="category-select-com">
				<div className="row">
					{Object.keys(categories).map(id => {
						const backColor=(selectedCategoryId === id)?'#007bff':'#ccc';
						const activeClassName = (selectedCategoryId === id) ?
							'category-item col-2 active' : 'category-item col-2';
						return (
							<a
								className={activeClassName}
								key={id}
								href="#"
								style={{textDecoration:'none'}}
								onClick={(event) => {
									 this.selectCategory(event, id)
								}}
							>
								<Ionicon
									className="rounded-circle"
									fontSize="50px"
									color="#fff"
									icon={categories[id].iconName}
									style={{backgroundColor:backColor,padding:'8px'}}
								/>
								<p style={{color:backColor}}>{categories[id].name}</p>
							</a>
						)
					})
					}
				</div>
			</div>
		)
	}
}

CategorySelect.propTypes={
	categories:PropTypes.object.isRequired,
	onSelectCategory:PropTypes.func.isRequired,
	selectedCategory:PropTypes.object,
};


export default CategorySelect