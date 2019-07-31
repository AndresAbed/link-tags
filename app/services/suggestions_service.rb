class SuggestionsService
  pattr_initialize :link

  def perform
    check_suggestions
  end

  private
  def check_suggestions
    tags = Link.where(link: link).tag_counts.order("taggings_count desc").pluck(:name)
    tags
  end
end
