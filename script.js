let video = document.querySelector('video');

let dateContainer = document.querySelector('.date_container');
let WeatureContainer = document.querySelector('.weature_container');
let showBtn = document.querySelector('.show');
var today = new Date();
function getCurrentDate(today)
{
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = dd+'-'+mm+'-'+yyyy;
    dateContainer.innerText="Date : "+today;
}
getCurrentDate(today);

let playState = false;
let playspeedBtn = document.querySelector(".fa-pinterest");
let playspeedConatainer = document.querySelector(".playspeed_container");
let radioBtn = document.querySelectorAll(".r1");
playspeedBtn.addEventListener("click",function()
{
    if(playState==false)
    {
        playspeedConatainer.style.display='block';
        playState=true;
    }
    else{
        let value=1;
        for(let i=0;i<radioBtn.length;i++)
    {
        if(radioBtn[i].checked){
            value = radioBtn[i].value;
        }
    }
    playspeedConatainer.style.display='none';
    video.playbackRate=value;
    playState=false;
    }
   
})


   

let like=  document.querySelector('.fa-heart');
let islike =false;
like.addEventListener("click",function()
{
    if(islike==false){
        like.style.color='red';
        islike=true;
    }
    else{
        like.style.color='black';
        islike=false;
    }
    
})
  
          
let videoList = document.querySelectorAll('.vid');
let mainVideo = document.querySelector('.main_video');

console.log("list"+videoList);
for(let i=0;i<videoList.length;i++)
{
    videoList[i].addEventListener("click",function(e)
    {
        let currentVideo=e.currentTarget;
        let source = currentVideo.getAttribute("src");
        console.log(source);
        mainVideo.setAttribute('src',source);
        like.style.color='black';
        islike=false;
        download.style.color="black";
    })
}   

let category = document.querySelector("#category");
let categoryContainer = document.querySelectorAll(".container");
let containerBox = document.querySelector(".category_container");

let searchConatiner=categoryContainer;


category.addEventListener("change",function()
{
    let allVideoContainer = document.querySelectorAll(".all_video_container");
    let c_name = category.value;
    // console.log(c_name);
    console.log(allVideoContainer.length);
    for(let i=0;i<allVideoContainer.length;i++)
    {
        allVideoContainer[i].remove();
    }
   
    for(let i=0;i<searchConatiner.length;i++)
    {
        
        let showCategoryName = searchConatiner[i].getAttribute('category');
        if(showCategoryName.localeCompare(c_name)==0)
        {
            allVideoContainer=document.createElement('div');
            allVideoContainer.setAttribute('class','all_video_container');
            allVideoContainer.append(categoryContainer[i]);
            containerBox.append(allVideoContainer);

            
        }

    }

})


let download = document.querySelector(".download");
download.addEventListener('click',function()
{
    let source = mainVideo.getAttribute("src");
    console.log(source);
    //blob = > immutable file and written in binary ya text(Readable)
    //create object of blob
    // let blob = new Blob(source, { type: "video/mp4" });
    //add video in index database

    addMediaToGallery(source,'video');
    download.style.color="red";
})


let goTocreatorMode = document.querySelector("#creator_bt");

goTocreatorMode.addEventListener("click",function()
{
    location.assign('create.html');
})