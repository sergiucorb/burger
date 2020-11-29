import React from 'react';

import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavtigationItem/NavigationItem';

configure({adapter: new Adapter()})
describe('<NavigationItems />',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    });

    it('should render 2 links if you"re not authenticated',()=>{
        expect( wrapper.find(NavigationItem)).toHaveLength(2);
    })
 
    it('should render 3 links if you"re authenticated',()=>{
        wrapper.setProps({isAuthenticated:true}) 
        expect( wrapper.find(NavigationItem)).toHaveLength(3);
    })
    it('should render logout link if is not authenticated',()=>{
        wrapper.setProps({isAuthenticated:true}) 
        expect( wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    })

});