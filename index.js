var allInput = document.querySelectorAll("input");
for (let index = 0; index < allInput.length; index++) {
    allInput[index].addEventListener("change", getData);
}
document.querySelector("select[name='arrange']").addEventListener("change", getData);

const maxItem = 100;
const defualtItem =5;
function getData() {
    var start = document.querySelector("input[name='start-date']");
    var end = document.querySelector("input[name='end-date']");
    var item = document.querySelector("input[name='numberOfItem']");
    var arrange = document.querySelector("select[name='arrange']").value;
    document.querySelector(".loader").classList.toggle("display-none");
    if (checkNull(item.value)) {
        item = defualtItem;
        if (checkNull(end.value) && !checkNull(start.value)) {
            var temp = new Date(start.value);
            if(!checkValidInput(temp)){
                alert("Your in put is not in a correct format");
                document.querySelector(".loader").classList.toggle("display-none");
                return;
            }
            end = new Date(temp.getTime() + (item * 24 * 60 * 60 * 1000));
            end = end.getFullYear() + "-" + ((end.getMonth() + 1) < 10 ? ("0" + (end.getMonth() + 1)) : end.getMonth() + 1) + "-" + ((end.getDate()) < 10 ? ("0" + (end.getDate())) : end.getDate());
            start = start.value;
        } else if (!checkNull(end.value) && checkNull(start.value)) {
            var temp = new Date(end.value);
            if(!checkValidInput(temp)){
                alert("Your in put is not in a correct format");
                document.querySelector(".loader").classList.toggle("display-none");
                return;
            }
            start = new Date(temp.getTime() - (item * 24 * 60 * 60 * 1000));
            start = start.getFullYear() + "-" + ((start.getMonth() + 1) < 10 ? ("0" + (start.getMonth() + 1)) : start.getMonth() + 1) + "-" + ((start.getDate()) < 10 ? ("0" + (start.getDate())) : start.getDate());
            end = end.value;
        } else if (checkNull(end.value) && checkNull(start.value)) {
            end = new Date();
            start = new Date(end.getTime() - (item * 24 * 60 * 60 * 1000));
            end = end.getFullYear() + "-" + ((end.getMonth() + 1) < 10 ? ("0" + (end.getMonth() + 1)) : end.getMonth() + 1) + "-" + ((end.getDate()) < 10 ? ("0" + (end.getDate())) : end.getDate());
            start = start.getFullYear() + "-" + ((start.getMonth() + 1) < 10 ? ("0" + (start.getMonth() + 1)) : start.getMonth() + 1) + "-" + ((start.getDate()) < 10 ? ("0" + (start.getDate())) : start.getDate());
        } else {
            end = new Date(end.value);
            start = new Date(start.value);
            if(!checkValidInput(start)||!checkValidInput(end)){
                alert("Your in put is not in a correct format");
                document.querySelector(".loader").classList.toggle("display-none");
                return;
            }
            if (end - start < 0) {
                alert("Start date cannot after End date");
                document.querySelector(".loader").classList.toggle("display-none");
                return;
            }
            var dayRange = Math.floor((end - start) / 86400000) + 1;
            // console.log(dayRange);
            if (dayRange > maxItem) {
                alert("day range cannot more tham 100 day")
            }
            //     item.value = 100;
            //     if (arrange === 'From Start') {
            //         end = new Date(start.getTime() + ((item.value - 1) * 24 * 60 * 60 * 1000));
            //         console.log(start);
            //         console.log(end);
            //     } else if (arrange === 'From End') {
            //         start = new Date(end.getTime() - ((item.value - 1) * 24 * 60 * 60 * 1000));
            //     }
            // }
            end = end.getFullYear() + "-" + ((end.getMonth() + 1) < 10 ? ("0" + (end.getMonth() + 1)) : end.getMonth() + 1) + "-" + ((end.getDate()) < 10 ? ("0" + (end.getDate())) : end.getDate());
            start = start.getFullYear() + "-" + ((start.getMonth() + 1) < 10 ? ("0" + (start.getMonth() + 1)) : start.getMonth() + 1) + "-" + ((start.getDate()) < 10 ? ("0" + (start.getDate())) : start.getDate());
            item = maxItem;
        }

    } else if (!checkNull(item.value)) {
        if (item.value < 1) {
            alert("item cannot be less than 1")
            document.querySelector(".loader").classList.toggle("display-none");
            return;
        }
        if (item.value > maxItem) {
            alert("Maximum item is "+maxItem);
            item.value = maxItem;
        }
        if (checkNull(end.value) && !checkNull(start.value)) {
            var temp = new Date(start.value);
            if(!checkValidInput(temp)){
                alert("Your in put is not in a correct format");
                document.querySelector(".loader").classList.toggle("display-none");
                return;
            }
            end = new Date(temp.getTime() + ((item.value - 1) * 24 * 60 * 60 * 1000));
            end = end.getFullYear() + "-" + ((end.getMonth() + 1) < 10 ? ("0" + (end.getMonth() + 1)) : end.getMonth() + 1) + "-" + ((end.getDate()) < 10 ? ("0" + (end.getDate())) : end.getDate());
            start = start.value;
            item = item.value;
        } else if (!checkNull(end.value) && checkNull(start.value)) {
            var temp = new Date(end.value);
            if(!checkValidInput(temp)){
                alert("Your in put is not in a correct format");
                document.querySelector(".loader").classList.toggle("display-none");
                return;
            }
            start = new Date(temp.getTime() - ((item.value - 1) * 24 * 60 * 60 * 1000));
            start = start.getFullYear() + "-" + ((start.getMonth() + 1) < 10 ? ("0" + (start.getMonth() + 1)) : start.getMonth() + 1) + "-" + ((start.getDate()) < 10 ? ("0" + (start.getDate())) : start.getDate());
            end = end.value;
            item = item.value;
        } else if (checkNull(end.value) && checkNull(start.value)) {
            end = new Date();
            start = new Date(end.getTime() - ((item.value - 1) * 24 * 60 * 60 * 1000));
            end = end.getFullYear() + "-" + ((end.getMonth() + 1) < 10 ? ("0" + (end.getMonth() + 1)) : end.getMonth() + 1) + "-" + ((end.getDate()) < 10 ? ("0" + (end.getDate())) : end.getDate());
            start = start.getFullYear() + "-" + ((start.getMonth() + 1) < 10 ? ("0" + (start.getMonth() + 1)) : start.getMonth() + 1) + "-" + ((start.getDate()) < 10 ? ("0" + (start.getDate())) : start.getDate());
            item = item.value;
        } else {
            end = new Date(end.value);
            start = new Date(start.value);
            if(!checkValidInput(start)||!checkValidInput(end)){
                alert("Your in put is not in a correct format");
                document.querySelector(".loader").classList.toggle("display-none");
                return;
            }
            if (end - start < 0) {
                alert("Start date cannot after End date");
                document.querySelector(".loader").classList.toggle("display-none");
                return;
            }
            var dayRange = Math.floor((end - start) / 86400000) + 1;
            if (dayRange > maxItem&&item.value>maxItem) {
                item.value = maxItem;
                if (arrange === 'From Start') {
                    end = new Date(start.getTime() + ((item.value - 1) * 24 * 60 * 60 * 1000));
                } else if (arrange === 'From End') {
                    start = new Date(end.getTime() - ((item.value - 1) * 24 * 60 * 60 * 1000));
                }
            }
            end = end.getFullYear() + "-" + ((end.getMonth() + 1) < 10 ? ("0" + (end.getMonth() + 1)) : end.getMonth() + 1) + "-" + ((end.getDate()) < 10 ? ("0" + (end.getDate())) : end.getDate());
            start = start.getFullYear() + "-" + ((start.getMonth() + 1) < 10 ? ("0" + (start.getMonth() + 1)) : start.getMonth() + 1) + "-" + ((start.getDate()) < 10 ? ("0" + (start.getDate())) : start.getDate());
            item = item.value;
        }

    }
    //console.log(start + "--" + end);
    if (!checkValidDate(start) || !checkValidDate(end)) {
        document.querySelector(".loader").classList.toggle("display-none");
        return;
    }
    generateData(start, end, arrange,item);

}


function generateData(start, end, whatFirst,item) {
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
        document.querySelector(".container").innerHTML = "";
        if (!Array.isArray(data)) {
            generateRow();
            generateCard(data);
        }
        if (whatFirst === 'From Start') {
            for (let index = 0; index < data.length&&index<maxItem&&index<item; index++) {
                if (index % 3 == 0) {

                    generateRow();
                }
                generateCard(data[index]);
            }
            document.querySelector(".loader").classList.toggle("display-none");
        } else if (whatFirst === 'From End') {
            for (let index = 0; index < data.length&&index<maxItem&&index<item; index++) {
                if (index % 3 == 0) {
                    generateRow();
                }
                generateCard(data[data.length - index - 1]);
            }
            document.querySelector(".loader").classList.toggle("display-none");
        }

        console.log(data);
    }

    // Send request
    request.send()
}


function generateCard(value) {
    //console.log(value);
    var allRow = document.querySelectorAll(".row");
    var targetRow = allRow[allRow.length - 1];

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
    if (typeof value === 'undefined' || value === null || value === '') {
        return true;
    }
    return false;
}
function checkValidDate(date) {
    var tempp = new Date();
    if (Math.floor((tempp - date) / 86400000) < 0) {
        return false;
    }
    return true;
}
function checkValidInput(date){
    if(date == 'Invalid Date'){
        return false;
    }
    return true;
}