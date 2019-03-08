import React from 'react';
import {shallow} from 'enzyme';
import ViewTab from '../ViewTab'
import {LIST_VIEW,CHART_VIEW} from '../../utility'

const props={
    activeTab:LIST_VIEW,
	onTabChange:jest.fn(),
};

let wrapper;
describe('test ViewTab component',()=>{
	beforeEach(()=>{
		wrapper=shallow(<ViewTab {...props}/>);
	});
	it('should render the component to the snapshot', ()=> {
		expect(wrapper).toMatchSnapshot();
	});
	it('should active the correct tab', ()=> {
        expect(wrapper.find('.nav-item').first().find('a').props().className).toEqual('nav-link active');
	});
	// it('should trigger the correct function callbacks', ()=> {
	// 	const firstTab=wrapper.find('.nav-item').first().find('a').first();
	// 	firstTab.simulate('click');
	// 	expect(props.onTabChange).toHaveBeenCalled();
	// });
});