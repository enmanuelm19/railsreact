require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'Relationships' do
    it { should have_many :posts }
  end
end
