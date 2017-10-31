require 'rails_helper'

RSpec.describe Image, type: :model do
  describe 'Relationships' do
    it { should belong_to :post }
  end
end
