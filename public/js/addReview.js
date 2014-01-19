$(document).ready(function(){
  $("#review").click(function(){
    var id = this.id;
    var url = "/get/reviews/"+url;
    $("#sidebar").addClass("sidebar");
    $.GET(url,function(data,status) {
			for (var reviewNum = 0; reviewNum < data.length; reviewNum++) {
				var review = document.createElement("p");
				generateRatings("rating", "Rating: ");
				generateRatings("cleanliness", "Cleanliness: ");
				generateRatings("aroma", "Auroma: ");
				generateRatings("amenities", "Amenities: ");
				var wait_time = document.createElement("lable");
				wait_time.innerHTML = data.wait_time + " minutes";
				review.append(wait_time);
				var title = document.createElement("lable");
				title.id = "title";
				title.innerHTML = "Title: " + data.title;
				review.append(title);
				var body = document.createElement("lable");
				body.id = "body";
				body.innerHTML = "Review: " + data.review;
				review.append(body);
			}
		}

	});
  function generateRatings(name, title) {
		var lable = document.createElement("lable");
		review.append(rating);
		lable.id = name;
		rating.innerHTML = title;
		for (var i = 0; i < data.name; i++) {
			$(name).append("<img src="smiley.gif" alt="Smiley face" height="42" width="42">>");
		}
	}
});)

