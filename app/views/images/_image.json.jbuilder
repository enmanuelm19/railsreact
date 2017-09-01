json.extract! image, :id, :created_at
json.urls do
  json.thumb image.image_file.url(:thumb)
  json.medium image.image_file.url(:medium)
  json.original image.image_file.url(:original)
end
json.url image_url(image, format: :json)
