$(document).ready(function(){
  console.log('jQuery loaded');
  var counter = 2;

  displayLinksFromStorage();

function displayLinksFromStorage(){
  //clear the list-display-field of current. reload with storage items
  $('.list-display-field').html('');
  var keys = Object.keys(localStorage);
  for (var i = 0, len = localStorage.length; i < len; ++i) {
    var stowed = (localStorage.getItem(localStorage.key(i)));
    var newDisplayLinkDiv = $(document.createElement('div')).attr("id", keys[i]);
    newDisplayLinkDiv.after().html('<p>' +stowed+'</p');
    newDisplayLinkDiv.appendTo(".list-display-field");
  }
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
  }); //EOF btn remove entry

  // write to local storage from input when button save clicked
  $('.btn-submit').on('click', function(){

    var getEntriesByClass = document.getElementsByClassName('text-entry');
    for(var i=0; i < getEntriesByClass.length; i++){
      var rando = Math.random().toString(36).substr(2, getEntriesByClass.length);
      localStorage.setItem('inputFieldValue' + rando, getEntriesByClass[i].value);
      displayLinksFromStorage();
    }


    //delete all entries except entry #1 & reset form values
    var entries = $('.entries-group').children().toArray();
    for(var i = entries.length; i > 1; i--){
      $("#entry" + i).remove();
    }
    counter = 2;
    $('#text-entry1').val('');
    $('#text-entry1').attr("placeholder", "enter your link here");


  }); //EOF 'btn-submit' on click
  // delete from local storage when delete button clicked
  //TODO this needs to be fixed to work with numbered storage items somehow
  $('.btn-delete').on('click', function(){
    localStorage.removeItem('inputFieldValue'+counter);
  }); //EOF btn-delete
});