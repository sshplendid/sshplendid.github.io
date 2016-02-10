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
  var html = "<table class='posts'>";
  for(i in posts) {
    if(posts[i] != null){

      /*
      html += "<tr>";
      html += "<td colspan=2>";
      for(j in posts[i].category) { 
        if(posts[i].category[j] != null) { 
          html += "<span>";
          html += posts[i].category[j].toUpperCase();
          html += "</span>";
          html += " > ";
        }
      }
      html += "</td>";
      html += "</tr>";
      */

      html += "<tr>";
      html += "<td class='postName'>";

      html += "<span class='pc-category'>";
      for(j in posts[i].category) { 
        if(posts[i].category[j] != null) { 
          html += "<span>";
          html += posts[i].category[j].toUpperCase().substring(0,1) + posts[i].category[j].toLowerCase().substring(1);
          html += "</span>";
          html += " > ";
        }
      }
      html += "</span>";

      html += "<a href='"+posts[i].href+"'>"+posts[i].title+"</a>";
      html += "</td> ";
      html += "<td class='postDate'>";
      html += "<span class='date'>"+posts[i].date.formatted+"</span>";
      html += "</td>";
      html += "</tr>";
    }
  }
  html += "</table>";
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