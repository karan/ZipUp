$(document).ready(function() {
  $("#reviewToggle").click(function(){
  	console.log('clicked');
  	$("#sidebar").toggleClass("sidebar");
    var id = this.id;
    var url = "/get/reviews/"+id;
    console.log(url);
    $.GET(url,function(data,status) {
		for (var reviewNum = 0; reviewNum < data.length; reviewNum++) {
			var review = document.createElement("p");
			generateRatings("rating", "Rating: ");
			generateRatings("cleanliness", "Cleanliness: ");
			generateRatings("aroma", "Aroma: ");
			generateRatings("amenities", "Amenities: ");
			var wait_time = document.createElement("label");
			wait_time.innerHTML = data.wait_time + " minutes";
			review.append(wait_time);
			var title = document.createElement("label");
			title.id = "title";
			title.innerHTML = "Title: " + data.title;
			review.append(title);
			var body = document.createElement("label");
			body.id = "body";
			body.innerHTML = "Review: " + data.review;
			review.append(body);
		}
	});
});


});
function generateRatings(name, title) {
	var label = document.createElement("label");
	review.append(rating);
	label.id = name;
	rating.innerHTML = title;
	for (var i = 0; i < data.name; i++) {
		$("#" + name).append("<img src='images/rating.gif' alt='rating' height='42' width='42'>");
	}
}
