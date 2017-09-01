json.extract! post, :id, :html_content, :created_at
json.user do
  json.extract post.user, :id, :email
end

json.images do
  json.partial! 'images/image', collection: post.images, as: :image
end
json.url post_url(post, format: :json)
