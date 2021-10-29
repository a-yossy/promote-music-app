require 'rails_helper'

RSpec.describe Artist, type: :model do
  describe 'name' do
    let(:artist) { build(:artist, name: name) }

    subject do
      artist.valid?
      artist.errors
    end

    context 'with blank name' do
      let(:name) { '' }

      it { is_expected.to be_of_kind(:name, :blank) }
    end

    context 'with not blank name' do
      let(:name) { 'artist1' }

      it { is_expected.not_to be_of_kind(:name, :blank) }
    end

    context 'when artist name does not already exist' do
      let(:other_artist) { create(:artist, name: 'artist1') }
      let(:name) { 'artist2' }

      it { is_expected.not_to be_of_kind(:name, :taken) }
    end

    context 'when artist name already exists' do
      let(:other_artist) { create(:artist, name: 'artist1') }
      let(:name) { 'artist1' }

      it { is_expected.to be_of_kind(:name, :taken) }
    end
  end

  describe 'associations' do
    it { should have_many(:user_artists) }
    it { should have_many(:users).through(:user_artists) }
  end
end
