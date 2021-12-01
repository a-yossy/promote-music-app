import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from 'components/Modal';

configure({ adapter: new Adapter() });

describe('<Modal />', () => {
  it('shows modal', () => {
    const wrapper = shallow(<Modal showModal>modal</Modal>);
    expect(wrapper.text()).to.includes('modal');
  });

  it('does not show modal', () => {
    const wrapper = shallow(<Modal showModal={false}>modal</Modal>);
    expect(wrapper.text()).not.to.includes('modal');
  });
});
