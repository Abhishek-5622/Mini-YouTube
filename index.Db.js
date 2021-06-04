let galleryHouse=document.querySelector(".gallery_house");
//create request => create ya open database
let request = indexedDB.open('DownloadVideo',1);
//database
let db;
//on success
request.onsuccess=function(e)
{
    //store request result in database
    db = request.result;
}
//on error
request.onerror=function(e)
{
    //error
    console.log('error');
}
//on upgrade
request.onupgradeneeded =function(e)
{
    //store request result in database
    db = request.result;
    //create objectStore(like a table)
    // keyPath => primary key
    db.createObjectStore('VideoStore',{keyPath:'mId'});

}
//add items in store
function addMediaToGallery(data,type)
{
    //create transaction
    let tx = db.transaction('VideoStore','readwrite');
    //get VideoStore
    let VideoStore = tx.objectStore('VideoStore');
    //add items in VideoStore
    VideoStore.add({mId:Date.now(),type,media:data});
}

// function that is used to view img n video that are present in db to gallery
function viewMedia()
{
    //get body
    let body = document.querySelector('body');
    //set transaction
    let tx = db.transaction('VideoStore','readonly');
    //set gallery store
    let VideoStore = tx.objectStore('VideoStore');
    //request
    let req = VideoStore.openCursor();
    //on success
    req.onsuccess=function()
    {
        //get cursor
        let cursor = req.result;
        // is cursor present
        if(cursor)
        {
                //create div of video container
                let vidContainer = document.createElement('div');
                let remove_bar = document.createElement('div');
                remove_bar.classList.add('remove_bar');
                let remove_icon = document.createElement('div');
                remove_icon.innerHTML=`<i class="fas fa-times-circle"></i>`;
                remove_bar.appendChild(remove_icon);
                //set attribute => used to find uniquely
                vidContainer.setAttribute('data-mId',cursor.value.mId);
                //add class
                vidContainer.classList.add('gallery-vid-container');
                //create video
                let video = document.createElement('video');
                // /add class
                video.classList.add('view_video');
                //append
                vidContainer.appendChild(remove_bar);
                vidContainer.appendChild(video);
                
                remove_icon.addEventListener('click',deleteBtnHandler);
                //create button
                let downloadBtn = document.createElement('div');
                //add class
                downloadBtn.classList.add('gallery-download-button');
                //set inner text
                downloadBtn.innerHTML=`<i class="fas fa-download"></i>`;

                downloadBtn.addEventListener('click',downloadBtnHandler);
                let bContainer = document.createElement('div');
                bContainer.classList.add('b_container');
                vidContainer.appendChild(bContainer);
                //append
                
                bContainer.appendChild(downloadBtn);
                //add controls and autoplay
                video.controls=true;
                video.autoplay= false;
                //add source
                if(cursor.value.type=='video'){
                    video.src = cursor.value.media;
                }
                else if(cursor.value.type=='video'){
                    video.src = URL.createObjectURL(cursor.value.media);
                }
                
                //append to body
                galleryHouse.appendChild(vidContainer);
            
           
            //continue 
            cursor.continue();
        }
    }
    
}

//delete from datbase
function deleteMediaFromGallery(mId)
{
    let tx = db.transaction('VideoStore','readwrite');
    let VideoStore = tx.objectStore('VideoStore');
    VideoStore.delete(Number(mId));
}
//delete from ui and db
function deleteBtnHandler(e)
{
    let mId = e.currentTarget.parentNode.parentNode.getAttribute('data-mId');
    //delete from db
    deleteMediaFromGallery(mId);
    e.currentTarget.parentNode.parentNode.remove();
}


function downloadBtnHandler(e)
{
    // create anchore tag
    var link = document.createElement("a");
    let src = e.currentTarget.parentNode.parentNode.childNodes[1].getAttribute("src");
    console.log(src);
    // URL.createObjectURL(src);
    
    //set href attributes
    link.href =src;
    //set downoad attribute => name of file with extension
    link.download = `${Date.now()}.mp4`;
    // //click on anchore tag
    link.click();
    //remove anchore tag
    link.remove();
}
