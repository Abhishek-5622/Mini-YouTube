// ***************************************************************JS Code**************************************************


//Store Reference
let videoPlayer = document.querySelector("video");
let vidRecordBtn = document.querySelector("#record-video");
let backToMainBtn = document.querySelector("#backToMain_bt");
let download = document.querySelector("#download2");

//create constraints => hardware device
let constraints = { video: true, audio: true };

//mediaRecorder => for recording
let mediaRecorder;

//create array to add data
let chunks = [];

//set state of recording
let recordState = false;

// click on back icon
backToMainBtn.addEventListener("click", function () {
    location.assign('index.html');
})

// click on download
download.addEventListener("click", function () {
    location.assign('gallery.html');
})

//click on record button 
vidRecordBtn.addEventListener("click", function () {
    if (mediaRecorder != undefined) {

        let innerDiv = vidRecordBtn.querySelector('#record-div');
        if (recordState == false) {
            recordState = true;
            innerDiv.classList.add('recording-animation');
            mediaRecorder.start();
        }
        else {
            recordState = false;
            innerDiv.classList.remove('recording-animation');
            mediaRecorder.stop();
        }
    }
})

//mediaDevices => help in access the device
//getUserMedia is a function => provide permission
// it is a promise
navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    //add source to video
    videoPlayer.srcObject = mediaStream;
    // create object of MediaRecorder
    mediaRecorder = new MediaRecorder(mediaStream);
    //when some amount of recording complete => event ondataavailable occur => add some data in chunk array
    mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
    };
    //when recording complete => onstop event occur => file download
    mediaRecorder.onstop = function () {
        //blob = > immutable file and written in binary ya text(Readable)
        //create object of blob
        let blob = new Blob(chunks, { type: "video/mp4" });
        //array get empty for new files
        chunks = [];
        //add video in index database
        // addMediaToGallery(blob, 'creation');
    };
});

let open = document.querySelector(".open");
let input = document.querySelector(".file-taker");

//click on open icon
open.addEventListener("click", function () {
    //click on input
    input.click();
    //select file
    input.addEventListener("change", function () {
        //file object array
        let filesArr = input.files;
        //get first file
        let fileObj = filesArr[0];
        // frontend api -> file reader 
        let fr = new FileReader();
        //read file
        fr.readAsText(fileObj);
        //load 
        fr.addEventListener("load", function () {
            let stringData = fr.result
            // console.log(stringData);
            ///still working

        })
    })
})

// for date
let dateContainer = document.querySelector('.date_container');
var today = new Date();
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
getCurrentDate(today);
