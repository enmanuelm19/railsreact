FactoryBot.define do
  factory :image do
    title { FFaker::Name.name }
    description { FFaker::Avatar.image}
    post_id { FactoryBot.create(:post).id }

    factory :invalid_image do
      title nil
      description nil
    end
  end
end
