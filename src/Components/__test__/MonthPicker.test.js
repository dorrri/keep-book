import React from 'react';
import {mount} from 'enzyme';
import MonthPicker from '../MonthPicker';
import {items} from '../../Containers/Home'
import * as ReactDOM from "react-dom";

let props={
	year:2018,
	month:8,
	onChange:jest.fn(),
};

let wrapper;

describe('test MonthPicker component',()=>{
	beforeEach(()=>{
		wrapper=mount(<MonthPicker{...props}/>);
	});
	it('should render the component to match the snapshot', ()=> {
		expect(wrapper).toMatchSnapshot();
	});
	it('should render the correct year and month,show correct dropdown menu', ()=> {
		const text=wrapper.find('.dropdown-toggle').first().text();
		expect(text).toEqual('2018年 08月');
		expect(wrapper.find('.dropdown-menu').length).toEqual(0);
		expect(wrapper.state('isOpen')).toEqual(false);
		expect(wrapper.state('selectedYear')).toEqual(props.year);
	});
	it('should show the dropdown menu and have the correct list item after click the button', function () {
		wrapper.find('.dropdown-toggle').simulate('click');
		expect(wrapper.find('.dropdown-menu').length).toEqual(1);
		expect(wrapper.state('isOpen')).toEqual(true);
		expect(wrapper.find('.years-range .dropdown-item').length).toEqual(9);
		expect(wrapper.find('.month-range .dropdown-item').length).toEqual(12);
		expect(wrapper.find('.years-range .dropdown-item.active').text()).toEqual('2018年');
		expect(wrapper.find('.month-range .dropdown-item.active').text()).toEqual('08月');
		expect(wrapper.find('.years-range .dropdown-item').first().text()).toEqual(`${props.year-4}年`);
		expect(wrapper.find('.month-range .dropdown-item').first().text()).toEqual('01月');
	});
	it('should trigger the correct status change when click the year&month button', ()=> {
		wrapper.find('.dropdown-toggle').simulate('click');
		wrapper.find('.years-range .dropdown-item').first().simulate('click');
        expect(wrapper.find('.years-range .dropdown-item').first().hasClass('active')).toEqual(true);
        expect(wrapper.state('selectedYear')).toEqual(props.year-4);
		wrapper.find('.month-range .dropdown-item').first().simulate('click');
		expect(wrapper.state('isOpen')).toEqual(false);
		expect(props.onChange).toHaveBeenCalledWith(props.year-4,1);
	});
	it('should close the dropdown menu after click the document', ()=> {
		let eventMap={};
		document.addEventListener=jest.fn((event,cb)=>{
			eventMap[event]=cb;
		});
		wrapper=mount(<MonthPicker{...props}/>);
		wrapper.find('.dropdown-toggle').simulate('click')
		expect(wrapper.state('isOpen')).toEqual(true);
		expect(wrapper.find('.dropdown-menu').length).toEqual(1);
		eventMap.click({
			target:ReactDOM.findDOMNode(wrapper.instance()),
		});
		expect(wrapper.state('isOpen')).toEqual(true);
		eventMap.click({
			target:document,
		});
		expect(wrapper.state('isOpen')).toEqual(false);
	});
});