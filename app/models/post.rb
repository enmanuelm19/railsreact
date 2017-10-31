# == Schema Information
#
# Table name: posts
#
#  id               :integer          not null, primary key
#  html_content     :text
#  markdown_content :text             not null
#  user_id          :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
# Indexes
#
#  index_posts_on_user_id  (user_id)
#

class Post < ApplicationRecord
  belongs_to :user
  has_many :images
  validates :markdown_content, presence: true, length: { minimum: 2}
  after_save :update_images
  #after_create :push_to_web_sockets
  attr_accessor :images_ids

  def self.latest
    self.order("id desc")
  end

  private
    def update_images
      Image.where(post_id: nil).where(id: images_ids).update_all(post_id: self.id)
      push_to_web_sockets
    end

    def push_to_web_sockets
      if will_save_change_to_attribute? :create_at
        ActionCable.server.broadcast("posts",
          data: json_view
        )
      end
    end

    def json_view
      ApplicationController.renderer.render(partial: 'posts/post.json.jbuilder', locals: {post: self})
    end
end
