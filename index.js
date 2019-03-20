function getData() {
    var start = document.querySelector("input[name='start-date']");
    var end = document.querySelector("input[name='end-date']");
    var item = document.querySelector("input[name='numberOfItem']");
    console.log(item.value);
    console.log(checkNull(item.value));
    if (checkNull(item.value)) {
        item = 4;
        if (checkNull(end.value) && !checkNull(start.value)) {
            var temp = new Date(start.value);
            end = new Date(temp.getTime() + (item * 24 * 60 * 60 * 1000));
            end = end.getFullYear() + "-" + ((end.getMonth() + 1) < 10 ? ("0" + (end.getMonth() + 1)) : end.getMonth() + 1) + "-" + end.getDate();
            start = start.value;
        } else if (!checkNull(end.value) && checkNull(start.value)) {
            var temp = new Date(end.value);
            start = new Date(temp.getTime() - (item * 24 * 60 * 60 * 1000));
            start = start.getFullYear() + "-" + ((start.getMonth() + 1) < 10 ? ("0" + (start.getMonth() + 1)) : start.getMonth() + 1) + "-" + start.getDate();
            end = end.value;
        } else if (checkNull(end.value) && checkNull(start.value)) {
            end = new Date();
            start = new Date(end.getTime() - (item * 24 * 60 * 60 * 1000));
            end = end.getFullYear() + "-" + ((end.getMonth() + 1) < 10 ? ("0" + (end.getMonth() + 1)) : end.getMonth() + 1) + "-" + end.getDate();
            start = start.getFullYear() + "-" + ((start.getMonth() + 1) < 10 ? ("0" + (start.getMonth() + 1)) : start.getMonth() + 1) + "-" + start.getDate();
        } else {
            end = new Date(end.value);
            start = new Date(start.value);
            item = Math.floor((end - start) / 86400000) + 1;
            end = end.getFullYear() + "-" + ((end.getMonth() + 1) < 10 ? ("0" + (end.getMonth() + 1)) : end.getMonth() + 1) + "-" + end.getDate();
            start = start.getFullYear() + "-" + ((start.getMonth() + 1) < 10 ? ("0" + (start.getMonth() + 1)) : start.getMonth() + 1) + "-" + start.getDate();
        }

    } else if (!checkNull(item.value)) {
        if (checkNull(end.value) && !checkNull(start.value)) {
            var temp = new Date(start.value);
            end = new Date(temp.getTime() + ((item.value - 1) * 24 * 60 * 60 * 1000));
            end = end.getFullYear() + "-" + ((end.getMonth() + 1) < 10 ? ("0" + (end.getMonth() + 1)) : end.getMonth() + 1) + "-" + end.getDate();
            start = start.value;
            item = item.value;
        } else if (!checkNull(end.value) && checkNull(start.value)) {
            var temp = new Date(end.value);
            start = new Date(temp.getTime() - ((item.value - 1) * 24 * 60 * 60 * 1000));
            start = start.getFullYear() + "-" + ((start.getMonth() + 1) < 10 ? ("0" + (start.getMonth() + 1)) : start.getMonth() + 1) + "-" + start.getDate();
            end = end.value;
            item = item.value;
        } else if (checkNull(end.value) && checkNull(start.value)) {
            end = new Date();
            start = new Date(end.getTime() - ((item.value - 1) * 24 * 60 * 60 * 1000));
            end = end.getFullYear() + "-" + ((end.getMonth() + 1) < 10 ? ("0" + (end.getMonth() + 1)) : end.getMonth() + 1) + "-" + end.getDate();
            start = start.getFullYear() + "-" + ((start.getMonth() + 1) < 10 ? ("0" + (start.getMonth() + 1)) : start.getMonth() + 1) + "-" + start.getDate();
            item = item.value;
        } else {
            end = new Date(end.value);
            start = new Date(start.value);
            var dayRange = Math.floor((end - start) / 86400000) + 1;
            if (dayRange != item.value) {
                alert("Your item and End_Date - start_date + 1  are not match");
                return;
            }
        }

    }
    console.log(start+"--"+end);
    generateData(start, end);

}


function generateData(start, end) {
    // var days = 4;
    // var date = new Date();
    // var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    // var day = last.getDate();
    // var month = (last.getMonth() + 1) < 10 ? ("0" + (last.getMonth() + 1)) : last.getMonth() + 1;
    // var year = last.getFullYear();
    // var start_date = year + "-" + month + "-" + day;
    // var end_date = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + date.getDate();
    var request = new XMLHttpRequest()
    // Open a new connection, using the GET request on the URL endpoint
    if (start !== end) {
        request.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=' + start + '&end_date=' + end, true)
    } else {
        request.open('GET', 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' + start, true)
    }
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
}


function generateCard(value) {
    console.log(value);
    var allRow = document.querySelectorAll(".row");
    var targetRow = allRow[allRow.length - 1];
    var max = value.title.length;
    if (value.url.includes("youtube")) {
        var media = '<iframe class="card-img-top" src="' + value.url + '" alt="video"></iframe>';
    } else {
        var media = '<img class="card-img-top" src="' + value.url + '" alt="Card image cap"></img>';
    }
    var newCard = '<div class="col-lg-4"><div class="card h-100">' + media + '<div class="card-body"><h5 class="card-title">' + value.title + '</h5><p class="card-text">' + value.explanation + '</p><a href="https://apod.nasa.gov/apod/ap' + value.date.slice(2, 4) + value.date.slice(5, 7) + value.date.slice(8) + '.html" class="btn btn-primary">See more</a></div></div></div>';
    targetRow.innerHTML = targetRow.innerHTML + newCard;
}
function generateRow() {
    document.querySelector(".container").innerHTML = document.querySelector(".container").innerHTML + '<div class="row"></div>';
}
function checkNull(value) {
    if (typeof value === 'undefined' || value === null || value ==='') {
        return true;
    }
    return false;
}