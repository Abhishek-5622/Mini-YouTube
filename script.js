let video = document.querySelector('video');
let dateContainer = document.querySelector('.date_container');
var today = new Date();

// get current date
function getCurrentDate(today) {
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    dateContainer.innerText = "Date : " + today;
}
// call function
getCurrentDate(today);

let playState = false;
let playspeedBtn = document.querySelector(".fa-pinterest");
let playspeedConatainer = document.querySelector(".playspeed_container");
let radioBtn = document.querySelectorAll(".r1");
let bar = document.querySelector(".video_feature");

// click on playspeed icon
playspeedBtn.addEventListener("click", function () {
    if (playState == false) {
        playspeedConatainer.style.display = 'block';
        playState = true;
    }
    else {
        let value = 1;
        for (let i = 0; i < radioBtn.length; i++) {
            if (radioBtn[i].checked) {
                value = radioBtn[i].value;
            }
        }
        playspeedConatainer.style.display = 'none';
        video.playbackRate = value;
        playState = false;
    }

})

let like = document.querySelector('.fa-heart');
let islike = false;

// like on like icon
like.addEventListener("click", function () {
    if (islike == false) {
        like.style.color = 'red';
        islike = true;
    }
    else {
        like.style.color = 'black';
        islike = false;
    }

})

let allVidContainer = document.querySelectorAll('.all_video_container');
let videoList = document.querySelectorAll('.vid');
let mainVideo = document.querySelector('.main_video');
let head = document.querySelector('.video_heading');
let para = document.querySelector(".para");

// reload function is used when we select category it reload and make sure when we click on any video it come to main video
function reload() {
    let allVidContainer = document.querySelectorAll('.all_video_container');
    console.log(allVidContainer.length);
    for (let i = 0; i < allVidContainer.length; i++) {
        allVidContainer[i].addEventListener("click", function (e) {
            let currentContainer = e.currentTarget;
            let currentVideo = currentContainer.children[0].children[0];
            let source = currentVideo.getAttribute("src");
            mainVideo.setAttribute('src', source);
            like.style.color = 'black';
            islike = false;
            download.style.color = "black";
            let title = currentContainer.children[0].children[1].children[0].innerText;
            let paraValue = currentContainer.children[0].children[1].children[1].innerText;
            head.innerText = "";
            head.innerText = title;
            para.innerText = "";
            para.innerText = paraValue
        })
    }


}
// video src to main video src
for (let i = 0; i < allVidContainer.length; i++) {
    allVidContainer[i].addEventListener("click", function (e) {
        let currentContainer = e.currentTarget;
        let currentVideo = currentContainer.children[0].children[0];
        let source = currentVideo.getAttribute("src");
        mainVideo.setAttribute('src', source);
        like.style.color = 'black';
        islike = false;
        download.style.color = "black";
        let title = currentContainer.children[0].children[1].children[0].innerText;
        let paraValue = currentContainer.children[0].children[1].children[1].innerText;
        head.innerText = "";
        head.innerText = title;
        para.innerText = "";
        para.innerText = paraValue
    })
}

let category = document.querySelector("#category");
let categoryContainer = document.querySelectorAll(".container");
let containerBox = document.querySelector(".category_container");
let searchConatiner = categoryContainer;

// select category
category.addEventListener("change", function () {
    let allVideoContainer = document.querySelectorAll(".all_video_container");
    let c_name = category.value;
    for (let i = 0; i < allVideoContainer.length; i++) {
        allVideoContainer[i].remove();
    }
    for (let i = 0; i < searchConatiner.length; i++) {

        let showCategoryName = searchConatiner[i].getAttribute('category');
        if (showCategoryName.localeCompare(c_name) == 0) {
            allVideoContainer = document.createElement('div');
            allVideoContainer.setAttribute('class', 'all_video_container');
            allVideoContainer.append(categoryContainer[i]);
            containerBox.append(allVideoContainer);


        }
        else if (c_name.localeCompare("all") == 0) {
            allVideoContainer = document.createElement('div');
            allVideoContainer.setAttribute('class', 'all_video_container');
            allVideoContainer.append(categoryContainer[i]);
            containerBox.append(allVideoContainer);
        }

    }
    reload();
})

let download = document.querySelector(".download");
download.addEventListener('click', function () {
    let source = mainVideo.getAttribute("src");
    //add video in index database
    addMediaToGallery(source, 'video');
    download.style.color = "blue";
})


let goTocreatorMode = document.querySelector("#creator_bt");
// clic on create mode 
goTocreatorMode.addEventListener("click", function () {
    location.assign('create.html');
})


let commentContainer = document.querySelectorAll(".comment_container");
let commentHeading = document.querySelector(".comment_headng");
let commentDescription = document.querySelectorAll(".comment_description");
// when we press enter in comment box ten new comment box created
for (let i = 0; i < commentContainer.length; i++) {

    commentContainer[i].addEventListener("keypress", function (e) {
        if (e.key == 'Enter') {

            let commentContainer2 = document.createElement("div");
            commentContainer2.classList.add("comment_container");
            let commentdescription = document.createElement("div");
            commentdescription.classList.add("comment_description");
            commentdescription.contentEditable = "true";
            commentContainer2.appendChild(commentdescription);
            commentContainer[i].appendChild(commentContainer2);
        }
    })
}

commentContainer = document.querySelectorAll(".comment_container");
// when we doublw click on comment it removes
for (let i = 0; i < commentContainer.length; i++) {
    commentContainer[i].addEventListener('dblclick', function () {
        commentDescription[i].remove();

    })
}
