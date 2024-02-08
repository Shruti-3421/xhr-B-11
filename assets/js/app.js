const cl= console.log;

//,...8/1/24.......
const cardContainer = document.getElementById('cardContainer');
const postForm = document.getElementById('postForm');
const titleControl = document.getElementById('title');
const contentControl= document.getElementById('content');
const userIdControl= document.getElementById('userId');
const loader= document.getElementById('loader');

const baseUrl= `https://jsonplaceholder.typicode.com`;
const postUrl= `${baseUrl}/posts/`;

const createCards= (arr) => {
    cardContainer.innerHTML= arr.map(obj =>{
        return `
            <div class="card mb-4" id="${obj.id}">
                <div class="card-header">
                    <h4 class="m-0">${obj.title}</h4>
                </div>
                <div class="card-body">
                    <p class="m-0">${obj.body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                    <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                </div>    
            </div>
           
        `
    }).join("");
}

const createPost= (postobj) => {
    let card= document.createElement("div");
    card.className= "card mb-4";
    card.id= postobj.id;
    card.innerHTML= `
                    <div class="card-header">
                        <h4 class="m-0">${postobj.title}</h4>
                    </div>
                    <div class="card-body">
                        <p class="m-0">${postobj.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-primary" onclick="onEdit(this)">Edit</button>
                        <button class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                    </div>                
                   `
               cardContainer.append(card);     
}

const makeApiCall= (methodName, apiUrl, msgbody = null) => { 
   return new Promise((resolve, reject) => {
    loader.classList.remove("d-none");
    let xhr= new XMLHttpRequest(); 
    xhr.open(methodName, apiUrl);
    xhr.send(JSON.stringify(msgbody));
    xhr.onload = function(){
        if(xhr.status >=200 && xhr.status <300){
          // cl(xhr.response); 
           resolve(JSON.parse(xhr.response));
        }else{
            reject(xhr.statustext);
        }     
      }
   })
}

 makeApiCall("GET", postUrl)
   .then((res) => {
       cl(res);
       //callback function..
       createCards(res);
   }) 
   .catch((err) => {
      cl(err);
   })
   .finally(() => {
    postForm.reset();  
    loader.classList.add("d-none");
   })



  const onSubmitPost= (eve) =>{
      eve.preventDefault();
      let postobj={
            title: titleControl.value,
            body : contentControl.value,
            userId: userIdControl.value
         }
           cl(postobj);
        makeApiCall("POST", postUrl, postobj)
        .then((res) => {
            cl(res)
          postobj.id = res.id;
           createPost(postobj);           
        }) 
        .catch((err) => {
           cl(err);
        })
        .finally(() => {
            postForm.reset();  
            loader.classList.add("d-none");
        })
}


postForm.addEventListener("submit", onSubmitPost);
