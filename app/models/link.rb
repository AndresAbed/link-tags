class Link < ApplicationRecord
  belongs_to :user
  acts_as_taggable
  validates :link, presence: true
end
