FactoryBot.define do
  factory :post do
    user_id { FactoryBot.create(:user).id }
    markdown_content { FFaker::Lorem.paragraph }
    html_content { FFaker::HTMLIpsum.body }

    factory :invalid_post do
      markdown_content nil
    end
  end
end
