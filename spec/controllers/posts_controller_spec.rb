require 'rails_helper'

RSpec.describe PostsController, type: :controller do
  describe 'GET index' do
    it 'fetch latest post' do
      get :index
      posts = FactoryBot.create_list(:post, 3)
      expect(assigns(:posts)).to match_array(Post.all)
    end
  end
end
