var instagramAccessToken = "7262219.e4a2e2b.326ed2ecb45c4c4a9e21135f02e7811c";
var latitude = null;
var longitude = null;

function getMediaByLocation(longitude, latitude) {
	var url = "https://api.instagram.com/v1/media/search?distance=5000&lat="+latitude+"&lng="+longitude+"&access_token="+instagramAccessToken;

	$.ajax({
		type:"get",
		url:url,
		dataType:"jsonp",
		crossDomain:true
	}).complete(function(data){
		console.log("instagram api success");
		console.log(data.responseJSON.data);

		for(var i in data.responseJSON.data) {
			addImage(data.responseJSON.data[i]);
		}
		
	});
}

function getMediaByTag(tag) {
	var url = "https://api.instagram.com/v1/tags/"+tag+"/media/recent?"
		+"access_token="+instagramAccessToken;

	$.ajax({
		type:"get",
		url:url,
		dataType:"jsonp",
		crossDomain:true
	}).complete(function(data){
		console.log("instagram api success");
		console.log(data.responseJSON.data);

		for(var i in data.responseJSON.data) {
			addImage(data.responseJSON.data[i]);
		}
		
	});
}

function addImage(obj) {
	var gallery = $("section#gallery");
	var url = obj.images.standard_resolution.url;
	var html = "<article>";
	html += "<img src='"+url+"' />";
	html += "</article>"
	gallery.append(html);
}