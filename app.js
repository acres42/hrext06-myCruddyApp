$(document).ready(function(){
  console.log('jQuery loaded');
  var counter = 2;
  /*********************Buttons*******************/

  $('.btn-add-entry').on('click', function(){
    
    var newTextBoxDiv = $(document.createElement('div')).attr("id", 'entry'+counter);
    newTextBoxDiv.after().html('<label>entry #'+ counter + ' : </label>' +
      '<input type="text-entry" name="text-entry"' + counter +
       '" id="text-entry' + counter + '" value="" placeholder="enter your link here">');
    newTextBoxDiv.appendTo(".entries-group");
    counter++;
  });

    $(".btn-remove-entry").click(function () {
    if(counter==1){
          alert("No more textbox to remove");
          return false;
       }   

    counter--;

        $("#entry" + counter).remove();
  });

  // write to local storage from input when button save clicked
  $('.btn-submit').on('click', function(){
    localStorage.setItem('inputFieldValue'+counter, $('.text-entry').val());
    var myItemInStorage = localStorage.getItem('inputFieldValue'+counter);
    // console.log('myItemInStorage', myItemInStorage);
    //clear inputs on form


  // delete from local storage when delete button clicked
  //TODO this needs to be fixed to work with numbered storage items somehow
  $('.btn-delete').on('click', function(){
    localStorage.removeItem('inputFieldValue'+count);
  });


    // display the value here
    $('.list-display-field').text(myItemInStorage); // ??

  });
});