(function() {

function getParams() {
  var queryString = window.location.search.substring(1);
  var list = queryString.split("&");
  var map = [];
  for(i in list) {
    var obj = {};
    obj.key = list[i].split("=")[0];
    obj.value = list[i].split("=")[1];
    map.push(obj);
  }

  return map;
}
function getMetaData() {
  $.getJSON('/search.json', function(data) {
    var type,value;
    var posts = [];
    for(i in data) {
      posts.push(data[i]);
    }
    if (posts.length === 0) {
      noResultsPage(type, value);
    } else {
      layoutResultsPage(type, value, posts);
    }
  });
}

function layoutResultsPage(type, value, posts) {
  var main = $("section.archives");
  var html = "<dl class='posts'>";
  for(i in posts) {
    if(posts[i] != null){
      html += "<dt>";
      html += "<a href='"+posts[i].href+"'>"+posts[i].title+"</a>";
      html += "</dt> ";
      html += "<dd>";
      html += "<span class='date'>"+posts[i].date.formatted+"</span>";
      html += "</dd>";
    }
  }
  html += "</dl>";
  main.append(html);
}

function noResultsPage(type, value) {
  var main = $("section.archives");
  var html = "<dl class='posts'>";
  html += "No Results Found.";
  html += "</dl>";
  main.append(html);
}
if($("section.archives")) {
  getMetaData();
}
})();