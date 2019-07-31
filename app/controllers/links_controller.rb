class LinksController < ApplicationController
  def index
    @links = current_user.links
  end

  def new
    @link = Link.new
    @link.tags.build
  end

  def create
    link = current_user.links.new(link_params)
    if link.save
      redirect_to :authenticated_root, flash: { success: "Linke created" }
    else
      errors = link.errors.full_messages.to_sentence
      redirect_to :authenticated_root, flash: { error: errors }
    end
  end

  def suggestions
    suggestions = SuggestionsService.new(params[:link]).perform
    render json: {suggestions: suggestions}
  end

  private

  def link_params
    params.require(:link).permit(:link, :tag_list)
  end
end
