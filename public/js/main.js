$(document).ready(function(){
  $("#searchVideo").on("click",searchVideo)
})

function searchVideo(){
  $.ajax({
    url:<iframe width="420" height="315" src="http://www.youtube.com/embed/'/content'+$(this).data('id')" frameborder="0" allowfullscreen></iframe>
  })
}
