class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.text :html_content
      t.text :markdown_content, null: false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
