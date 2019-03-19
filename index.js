var days = 4;
var date = new Date();
var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
var day = last.getDate();
var month = (last.getMonth() + 1) < 10 ? ("0" + (last.getMonth() + 1)) : last.getMonth() + 1;
var year = last.getFullYear();
var start_date = year + "-" + month + "-" + day;
var end_date = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + date.getDate();
var request = new XMLHttpRequest()
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=' + start_date + '&end_date=' + end_date, true)

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    var dataToWrite = "";
    for (let index = 0; index < data.length; index++) {
        if (index % 3 == 0) {
            console.log(index);
            generateRow();
        }
        generateCard(data[index]);
    }
    console.log(data);
}
// Send request
request.send()

function generateCard(value) {
    console.log(value);
    var allRow = document.querySelectorAll(".row");
    var targetRow = allRow[allRow.length - 1];
    var max = value.title.length;
    var newCard = '<div class="col-lg-4"><div class="card h-100"><img class="card-img-top" src="' + value.url + '" alt="Card image cap"><div class="card-body"><h5 class="card-title">' + value.title + '</h5><p class="card-text">' + value.explanation + '</p><a href="https://apod.nasa.gov/apod/ap'+ value.date.slice(2,4)+value.date.slice(5,7)+value.date.slice(8)+'.html" class="btn btn-primary">See more</a></div></div></div>';
    targetRow.innerHTML = targetRow.innerHTML + newCard;
}
function generateRow() {
    document.querySelector(".container").innerHTML = document.querySelector(".container").innerHTML + '<div class="row"></div>';
}