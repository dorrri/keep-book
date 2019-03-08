import React from 'react';
import {mount} from 'enzyme';
import Home from '../Home';

import PriceList from '../../Components/PriceList';
import ViewTab from '../../Components/ViewTab';
import {LIST_VIEW,CHART_VIEW,TYPE_INCOME,TYPE_OUTCOME,parseToYearAndMonth,padLeft} from "../../utility";
import TotalPrice from '../../Components/TotalPrice';
import MonthPicker from '../../Components/MonthPicker';
import CreateBtn from '../../Components/CreateBtn';

let wrapper;

describe('test Home container component',()=>{
	beforeEach(()=>{
		wrapper=mount(<Home/>)
	});
	it('should render the default layout', ()=> {
		const currentDate=parseToYearAndMonth('2018/09/10')
		expect(wrapper.find(PriceList).length).toEqual(1);
		expect(wrapper.find(ViewTab).props().activeTab).toEqual(LIST_VIEW);
		expect(wrapper.find(MonthPicker).props().year).toEqual(currentDate.year);
		expect(wrapper.find(MonthPicker).props().month).toEqual(currentDate.month);
		expect(wrapper.find(PriceList).props().items.length).toEqual(1);
	});
	it('should change the default view after click the another view tab', ()=> {
		wrapper.find('.nav-item a').last().simulate('click');
		expect(wrapper.find(PriceList).length).toEqual(0);
		expect(wrapper.find('.chart-title').length).toEqual(1);
		expect(wrapper.find(ViewTab).props().activeTab).toEqual(CHART_VIEW);
	});
	it('should switch to the correct items after click the new month item', ()=> {
		wrapper.find('.dropdown-toggle').simulate('click');
		wrapper.find('.month-range .dropdown-item').at(8).simulate('click');
		expect(wrapper.find(MonthPicker).props().month).toEqual(9);
		expect(wrapper.find(PriceList).props().items.length).toEqual(1);
	});
});