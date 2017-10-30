require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'Relationships' do
    it { should have_many :images }
    it { should belong_to :user }
  end

  describe 'Validations' do
    it { should validate_presence_of :markdown_content }
    it { should validate_length_of(:markdown_content).is_at_least(2)}
  end

  describe 'Callbacks' do
    context 'when updating post' do
      it 'save the existing images and new ones' do
        post = FactoryBot.create(:post)
        image = FactoryBot.create(:image, post_id: post.id)
        new_image = FactoryBot.create(:image, post_id: nil)
        post.images_ids = [new_image.id]
        new_image.reload
        expect(new_image.post_id).to eq(post.id)
      end
    end
  end
end
