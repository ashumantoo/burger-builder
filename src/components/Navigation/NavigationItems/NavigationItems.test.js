import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { configure, } from '@testing-library/react';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {

    let wrapper;
    beforeEach(() => {
        //code inside the beforeEach runs before the every test and initialize some values
        wrapper = wrapper = shallow(<NavigationItems />);
    });

    // it('Should render two <NavigationItem /> element if not authenticated', () => {
    //     const wrapper = shallow(<NavigationItems />);
    //     expect(wrapper.find(NavigationItem)).toHaveLength(2);
    // });

    // it('Should render three <NavigationItem /> element if authenticated', () => {
    //     const wrapper = shallow(<NavigationItems isAuthenticated />);
    //     expect(wrapper.find(NavigationItem)).toHaveLength(3);
    // });
    it('Should render two <NavigationItem /> element if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('Should render three <NavigationItem /> element if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({ isAuthenticated: true }); //setting the props value if any we need on wrapper for the component
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    
    it('Should render Logout <NavigationItem /> element only if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({ isAuthenticated: true }); //setting the props value if any we need on wrapper for the component
        expect(wrapper.contains(<NavigationItem link="/logout" >Logout</NavigationItem>)).toBe(true);
    });
});