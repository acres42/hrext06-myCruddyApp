$(window).ready(function(){

  var counter = 2;

  displayLinksFromStorage();
  reloadButtons();

  $('#loader_img').hide();

  /*********************Helper Functions*******************/
function displayLinksFromStorage(){
  //clear the list-display-field of current. reload with storage items
  $('.list-display-field').html('');
  var keys = Object.keys(localStorage);
  for (var i = 0, len = localStorage.length; i < len; ++i) {
    var stowed = (localStorage.getItem(localStorage.key(i)));
    var newDisplayLinkDiv = $(document.createElement('div')).attr("id", keys[i]);
    newDisplayLinkDiv.after().html('<p>' +stowed+'</p><button class="btn-load">load this link</button><button class="btn-delete">delete this link</button>');
    newDisplayLinkDiv.appendTo(".list-display-field");
  }
}

function resetDefaultGif(){
  $('#load').attr('src', 'https://media.giphy.com/media/mzSdSOMg59ZNC/giphy.gif');
}

function reloadButtons(){
$('.btn-delete').on('click', function(){
     var removalItem = $(this).closest('div').attr('id');
     localStorage.removeItem(removalItem);
     displayLinksFromStorage();
     resetDefaultGif();
     reloadButtons();
}); //EOF btn-delete

  $('.btn-nuke').on('click', function(){
    var keys = Object.keys(localStorage);
    keys.forEach(function(el){
      localStorage.removeItem(el);
    });
    displayLinksFromStorage();
    resetDefaultGif();
    reloadButtons();
  }); //EOF btn nuke

  $('.btn-load').on('click', function(){
    var loadItem = localStorage.getItem($(this).closest('div').attr('id'));
    //
    $('#load').attr('src', loadItem);
    $('#load').hide();
    $('#loader_img').show();

    // main image loaded ?
    $('#load').on('load', function(){
      $('#load').show();
      $('#loader_img').hide();
    });

    reloadButtons();
  });//EOF btn-load

}



  /*********************Buttons*******************/

  $('.btn-add-entry').on('click', function(){
    var newTextBoxDiv = $(document.createElement('div')).attr("id", 'entry'+counter);
    newTextBoxDiv.after().html('<label>entry #'+ counter + ' : </label>' +
      '<input class="text-entry" type="text-entry" id="text-entry' + counter + '" value="" placeholder="enter your link here">');
    newTextBoxDiv.appendTo(".entries-group");
    counter++;
  }); // EOF bth add entry

    $(".btn-remove-entry").click(function () {
    if(counter==1){
          alert("No more textboxes to remove");
          return false;
       }

    counter--;

    $("#entry" + counter).remove();

    reloadButtons()
  }); //EOF btn remove entry


  $('.btn-submit').on('click', function(){

    var getEntriesByClass = document.getElementsByClassName('text-entry');
    for(var i=0; i < getEntriesByClass.length; i++){
      var rando = Math.random().toString(36).substr(2, getEntriesByClass.length);
      localStorage.setItem('inputFieldValue' + rando, getEntriesByClass[i].value);
      displayLinksFromStorage();
    }



    var entries = $('.entries-group').children().toArray();
    for(var i = entries.length; i > 1; i--){
      $("#entry" + i).remove();
    }
    counter = 2;
    $('#text-entry1').val('');
    $('#text-entry1').attr("placeholder", "enter your link here");

    reloadButtons();

  }); //EOF 'btn-submit' on click

});