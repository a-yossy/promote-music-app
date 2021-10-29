require 'rails_helper'

RSpec.describe User, type: :model do
  describe "name" do
    let(:user) { build(:user, name: name) }

    subject do
      user.valid?
      user.errors
    end

    context 'when name is blank' do
      let(:name) { '' }

      it { is_expected.to be_of_kind(:name, :blank) }
    end

    context 'when name is not blank' do
      let(:name) { 'user' }

      it { is_expected.not_to be_of_kind(:name, :blank) }
    end

    context 'when user name does not already exist' do
      let(:other_user) { create(:user) }
      let(:name) { other_user.name + ("a".."z").to_a.shuffle[0] }

      it { is_expected.not_to be_of_kind(:name, :taken) }
    end

    context 'when user name already exists' do
      let(:other_user) { create(:user) }
      let(:name) { other_user.name }

      it { is_expected.to be_of_kind(:name, :taken) }
    end
  end

  describe "associations" do
    it { should have_many(:user_artists) }
    it { should have_many(:artists).through(:user_artists) }
  end
end
