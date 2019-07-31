// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require popper
//= require bootstrap
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

$(document).ready( () => {
  let link = document.getElementById('link');

  let append_tags = () => {
    tags = Array.prototype.slice.call( document.getElementsByClassName('suggestions'));
    tags_input = document.getElementById('link_tag_list');
    tags.forEach((tag) => {
      $(tag).on('click', () => {
        let content = tag.textContent
        console.log(content)
        $(tags_input).val( $(tags_input).val() + content + "," );
      })
    })
  }

  $(link).focusout(() => {
    if (link.value != ""){
      $.ajax({
        url:'/suggestions',
        type:'get',
        dataType:'json',
        data:{ link: link.value },
        success: (data) => {
          let suggestions = document.getElementById('tags_suggestions');
          if (data.suggestions.length > 0) {
            suggestions.innerHTML = '';
            suggestions.innerHTML = 'Click to add -> ';
            data.suggestions.forEach((tag) => {
              suggestions.innerHTML += '<div class="suggestions">'+tag+'</div>';
            })
            append_tags();
          }
          else{
            suggestions.innerHTML = '';
          }
        }
      });
    }
  })
})
