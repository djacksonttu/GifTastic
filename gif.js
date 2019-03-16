$(document).ready(function(){
    var topics = ['Lebron James', 'Dak Prescott', 'Serena Williams', 'Michael Jordan', 'Kobe Bryant', 'Usain Bolt', 'Michael Phelps', 'Tiger Woods'];

    

 
    function buttonExpress(){
        $('#buttonsBox').empty();
        
        for ( var i=0; i < topics.length; i++) {
           
            var a = $('<button>');
            a.addClass('clicker');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsBox').append(a);
        }
    }    
    buttonExpress();
   

  $(document).on('click', '.clicker', function() {

    var athlete = $(this).html(); 
    console.log(athlete);
    
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + athlete + "&api_key=dc6zaTOxFJmzC&limit=10";
        

        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
          

            var results = response.data;
           
            $('#expressView').empty();
               

                for ( var L =0; L < results.length; L++) {
                    var imageDiv = $('<div>');
                    var imageView = results[L].images.fixed_height.url;
                    var still = results[L].images.fixed_height_still.url;
                       
                    
                    var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    expressImage.attr('data-state', 'still');
                    $('#expressView').prepend(expressImage);
                    expressImage.on('click', startGif);
                    
                   
                        var rating = results[L].rating;
                            console.log(rating);
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#expressView').prepend(displayRated);
            
                } 
        }); 

        function startGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                     $(this).attr('data-state', 'animate');
                 } else {
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } 
                
    }) 

       

$(document).on('click', '#addExpress', function(){
    if ($('#express-input').val().trim() == ''){
      alert('please add athlete');
   }
   else {
    var athlete = $('#express-input').val().trim();
    topics.push(athlete);
    $('#express-input').val('');
    buttonExpress();
    return false;

    }

});



}); 