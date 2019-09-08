import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, render } from "enzyme";
import {object} from "prop-types";
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Button Group Management", () => {
  const wrapper = mount(<App />);
  const Validation = wrapper.children('div').children('Controller');
    expect(Validation.props().data).not.toBeNull()
  const props = Validation.props()
  it('check all rendered', () => {
    for(let i in props.data){
        for(let obj in props.data[i]){
            // console.log(Controller.find('RadioButtons').find({id:props.data[i][obj].id,disabled:false}).getElements())
            expect(Validation.find('RadioButtons').find({id:props.data[i][obj].id}).length).not.toEqual(0)
        }
    }

  });
  it('check initial disabled status', () => {
    for(let i in props.data){
        if(i != 0) {
            for (let obj in props.data[i]) {
                expect(Validation.find('RadioButtons').find({id:props.data[i][obj].id,disabled:true}).length).not.toEqual(0)
            }
        }
        else {
            for (let obj in props.data[i]) {
                expect(Validation.find('RadioButtons').find({id:props.data[i][obj].id,disabled:false}).length).not.toEqual(0)
            }
        }
    }

  });
  it('check first group seleted validation', () => {

        for(let obj in props.data[0]){
            // console.log(Controller.find('RadioButtons').find({id:props.data[i][obj].id,disabled:false}).getElements())
            const submitBtn = wrapper.find('RadioButtons').find({id:props.data[0][obj].id,disabled:false}).at(1);
            submitBtn.simulate('click')
            const invalid = props.invalidRule[parseInt(props.data[0][obj].id) ]
            console.log(invalid)
            for(let j in invalid){
                expect(Validation.find('RadioButtons').find({id:invalid[j].toString(),disabled:true}).length).not.toEqual(0)
            }
        }


  });


})