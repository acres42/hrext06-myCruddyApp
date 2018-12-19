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
          alert("No more textbox to remove");
          return false;
       }

    counter--;

        $("#entry" + counter).remove();
  }); //EOF btn remove entry

  // write to local storage from input when button save clicked
  $('.btn-submit').on('click', function(){

    var getEntriesByClass = document.getElementsByClassName('text-entry');
    for(var i=0; i < getEntriesByClass.length; i++){
      console.log(i);
      var rando = Math.random().toString(36).substr(2, getEntriesByClass.length);
      localStorage.setItem('inputFieldValue' + rando, getEntriesByClass[i].value);
      displayLinksFromStorage();
    }

    // localStorage.setItem('inputFieldValue'+counter, $('.text-entry').val());
    // var myItemInStorage = localStorage.getItem('inputFieldValue'+counter);
    // console.log('myItemInStorage', myItemInStorage);
    //TODO clear inputs on submit


  // delete from local storage when delete button clicked
  //TODO this needs to be fixed to work with numbered storage items somehow
  $('.btn-delete').on('click', function(){
    localStorage.removeItem('inputFieldValue'+counter);
  });


    // display the value here
    // TODO: turn this back on when multi entry fixed
    // $('.list-display-field').text(myItemInStorage); // ??

  }); //EOF 'btn-submit' on click
});