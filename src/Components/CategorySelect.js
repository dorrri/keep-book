import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';

class CategorySelect extends React.Component{
	selectCategory=(event,category)=>{
		event.preventDefault();
		this.props.onSelectCategory(category);
	};
	render() {
		const {categories,selectedCategory}=this.props;
		const selectedCategoryId=selectedCategory && (selectedCategory.id);
		return (
			<div className="category-select-com">
				<div className="row">
					{categories.map((category,index) => {
						const backColor=(selectedCategoryId === category.id)?'#007bff':'#ccc';
						const activeClassName = (selectedCategoryId === category.id) ?
							'category-item col-2 active' : 'category-item col-2';
						return (
							<a
								className={activeClassName}
								key={index}
								href="#"
								style={{textDecoration:'none'}}
								onClick={(event) => {
									 this.selectCategory(event, category)
								}}
							>
								<Ionicon
									className="rounded-circle"
									fontSize="50px"
									color="#fff"
									icon={category.iconName}
									style={{backgroundColor:backColor,padding:'8px'}}
								/>
								<p style={{color:backColor}}>{category.name}</p>
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
	categories:PropTypes.array.isRequired,
	onSelectCategory:PropTypes.func.isRequired,
	selectedCategory:PropTypes.object,
};


export default CategorySelect