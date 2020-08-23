$(function(){
    function buildHTML(message){
      if ( message.image ) {
        let html =
          `<div class="Message__info">
            <div class="Message__list">
              <div class="Message__list__username">
                ${message.user_name}
              </div>
              <div class="Message__list__date">
                ${message.created_at}
              </div>
            </div>
            <div class="Message">
              <p class="Message__content">
                ${message.content}
              </p>
              <img class="Message__image" src="${message.image}">
            </div>
          </div>`
        return html;
      } else {
        let html =
        `<div class="Message__info">
          <div class="Message__list">
            <div class="Message__list__userName">
              ${message.user_name}
            </div>
            <div class="Message__list__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
      };
    }
  
    $('.Form').on('submit', function(e){
      e.preventDefault();  
      let formData = new FormData(this);
      let url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        let html = buildHTML(data);
        $('.Message_box').append(html)
        $('.Form')[0].reset();      
        $('.Message_box').animate({ scrollTop: $('.Message_box')[0].scrollHeight});
        $('.Form__submit').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
    });
});