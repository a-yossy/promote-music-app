import React from 'react';
import { expect } from 'chai';
import { configure, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import FollowButton from 'components/FollowButton';
import LoadingButton from '@mui/lab/LoadingButton';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('<FollowButton />', () => {
  it('follows other user', () => {
    const isFollow = false;
    const handleFollow = sinon.spy();
    const handleUnfollow = sinon.spy();
    const wrapper = shallow(
      <FollowButton
        loading={false}
        followLoading={false}
        unfollowLoading={false}
        isFollowLoading={false}
        isFollow={isFollow}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
      />,
    );

    expect(wrapper.text()).includes('フォローする');
    wrapper.find(LoadingButton).simulate('click');
    wrapper.setProps({ isFollow: true });
    expect(wrapper.text()).includes('フォロー中');
    expect(handleFollow).to.have.property('callCount', 1);
    expect(handleUnfollow).to.have.property('callCount', 0);
  });

  it('unfollows other user', () => {
    const isFollow = true;
    const handleFollow = sinon.spy();
    const handleUnfollow = sinon.spy();
    const wrapper = shallow(
      <FollowButton
        loading={false}
        followLoading={false}
        unfollowLoading={false}
        isFollowLoading={false}
        isFollow={isFollow}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
      />,
    );
    expect(wrapper.text()).includes('フォロー中');
    wrapper.find(LoadingButton).simulate('click');
    wrapper.setProps({ isFollow: false });
    expect(wrapper.text()).includes('フォローする');
    expect(handleFollow).to.have.property('callCount', 0);
    expect(handleUnfollow).to.have.property('callCount', 1);
  });
});
