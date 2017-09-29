//create a function that will search for books and dispaly them
function bookSearch(){
  //select elements by id
  var searchData = document.getElementById("searchData").value;
  //clear the previous data
  document.getElementById("results").innerHTML = "",
  //test the search term
  console.log(searchData.value);

  $.ajax({
    //create a url to connect to the api
    url: "https://www.googleapis.com/books/v1/volumes?q=" + searchData,
    dataType: "json",
    type: "GET",
    //this function will be called when the data is returned
    success: function(data){
      //console the results of the data
      console.log(data);
      for(var i = 0; i < data.items.length; i++){
        //store data from book data
        var aData = data.items[i].volumeInfo;
        //create elements
        var newdiv = document.createElement('div');
        var img = document.createElement('img');
        var hd2 = document.createElement('h2');
        var hd3 = document.createElement('h3');
        var hd4 = document.createElement('h4');
        var anc = document.createElement('a');

        //add classes to elements
        newdiv.className = 'col-2 display';
        anc.className = 'btn btn-info';

        //add text to tags
        hd2.innerText = aData.title;
        anc.innerText = "Get More Info";

        //add attributes
        anc.href = aData.infoLink;
        anc.setAttribute('target','_blank');

        //create image if one exists
        if(aData.imageLinks){
          img.src = aData.imageLinks.thumbnail;
        } else {
          img.src = 'img/nobook.jpg';
        };

        //create publish date if one exists
        if(aData.publishedDate){
          hd4.innerText = aData.publishedDate;
        } else {
          hd4.innerText = "no published date found";
        };
        //create author if one exists
        if(aData.authors){
          hd3.innerText = aData.authors[0];
        } else {
          hd3.innerText = 'no author found';
        };

        //add tags to document
        newdiv.appendChild(img);
        newdiv.appendChild(hd2);
        newdiv.appendChild(hd3);
        newdiv.appendChild(hd4);
        newdiv.appendChild(anc);

        //add results to the screen
        var results = document.getElementById('results');
        results.appendChild(newdiv);
      }
    },
  });
};
//select an element with id="searchBtn"
var searchBtn = document.getElementById("searchBtn");
//add an event to the element with id="searcBtn"
searchBtn.addEventListener('click',bookSearch, false);
