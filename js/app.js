$(document).ready(function(){
	//enable listeners
	$('#tag-search').submit(function(){instagram_api($(this));return false;})
	//load default page
	/*PLACE FUNCTION HERE THAT LOADS PICTURES ON PAGE LOAD */
	ajax_call('toronto');
	
});

//global variable
var animation ='';

function instagram_api(frm){
	//find the input field in the form that has the name tag search
	var search = frm.find('input[name="tag_search"]').val();
	console.log(search);
	//run the ajax call
	ajax_call(search);
}

var scroll_images=function(){
	$('#image-container').animate({'top':'-=1'},1,function(){
	});
}

function images_response(data){
	console.log(data);
	//grab the images from the returned object whcih are all stored in the data property of the returned object
	images = data.data;

	//clear the instagram pics list
	$('#instagram-pics').html('');
	//the data property contains an array of 20 images, the below for looop is a shorthand
	//notation for the following
	// for (var i = 0; i< 20; i++){
   		// your code
	//}
	//what the shortand below does is automitically loop over the 
	// array till there are no array indexs left, and the array index is stored in
	// the variable image
	for(image in images){

		/* 
			WRITE THE FUNCTION THAT TAKES THE IMAGE URL AND ADDS THEM TO
			list with the id instagram-pics. You will need to know the following things:

			1. To add html to an element with jquery use this syntax $('#instagram-pics').append('html tag goes in here');
			2. To make sure all images fit in the squares available to them, use these css properties
			   background:url('image url')
			   background-size:cover
			   background-position:center center
	     */
	     //the notion below is equivalent to writing:
	     //var image_url = images[i].images.standard_resolution.url
	     // if you had not used the shorthand version of the array
	     //if you're not sure how this path to the url was created, open your console. and expand
	     // the object, than expand the [0] index value, then expand images, standard_resolution.. 
	     // until you see url. 
	    var image_url = images[image].images.standard_resolution.url
		$('#instagram-pics').append('<li class="blur" style="background:url('+image_url+');background-size:cover; background-position:center center"></li>');
		
	}
	//snap the image container back to the top of the page after a new search
	//this interval function is what creates the scroll effect.
	$('#image-container').css('top','0px');
	clearInterval(animation);
	animation=setInterval(scroll_images,100);
}

function ajax_call(tag){
	//the encodeURI function ensures that the value in tag will be "cleaned" so that it  is safe to send via url.
	$.ajax({
		url:'https://api.instagram.com/v1/tags/'+encodeURI(tag)+'/media/recent?client_id=61f8b631abd34732a3bcd8c73d0d73a9',
		type:'GET',
		dataType:'jsonp',
		success:function(data){
			images_response(data);
		},
		error:function(data){
			console.log(data);
		}
	});

}

