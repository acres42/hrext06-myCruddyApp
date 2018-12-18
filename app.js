$(document).ready(function(){
  console.log('jQuery loaded');
  var counter = 2;
  /*********************Buttons*******************/

  $('.btn-add-entry').on('click', function(){
    
    var newTextBoxDiv = $(document.createElement('div')).attr("id", 'entry'+counter);
    newTextBoxDiv.after().html('<label>entry #'+ counter + ' : </label>' +
      '<input type="text-entry" name="text-entry"' + counter + '" id="text-entry' + counter + '" value="">');
    newTextBoxDiv.appendTo(".text-boxes-group");
    counter++;
  });
  // write to local storage from input when button save clicked
  $('.btn-submit').on('click', function(){
    localStorage.setItem('inputFieldValue', $('.text-entry').val());
    var myItemInStorage = localStorage.getItem('inputFieldValue');
    // console.log('myItemInStorage', myItemInStorage);


  // delete from local storage when delete button clicked
  $('.btn-delete').on('click', function(){
    localStorage.removeItem('inputFieldValue');
  });


    // display the value here
    $('.list-display-field').text(myItemInStorage); // ??

  });
});