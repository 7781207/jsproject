const tastcontainer=document.querySelector(".task__container");
var globalStore=[];
const localinitialcarddata=()=>{
    //localStorage to get tasky data
    const dstask=localStorage.getItem("tasky");
    //convert from string to normal object
    const {card}=JSON.parse(dstask);
    //loop over the cards data and  generate new data
    card.map((tsda)=>{
        tastcontainer.insertAdjacentHTML("beforeend",generatenewcard(tsda));
        globalStore.push(tsda);
    })
};
//Generation of new card

const generatenewcard=(tsdata)=>`
    <div class="col-md-6 col-lg-4" id=${tsdata.id}>
                        <div class="card ">
                            <div class="card-header d-flex justify-content-end gap-2">
                                <button type="button" class="btn btn-outline-success" ><i class="fa-solid fa-pencil"></i></button>
                                <button type="button" class="btn btn-outline-danger" onclick="deletecard.apply(this,arguments)"><i class="fa-solid fa-trash" onclick="deletecard.apply(this,arguments)"></i></button>
                            </div>
                            <img src=${tsdata.imageurl} class="card-img-top" alt="...">
                            <div class="card-body">
                              <h5 class="card-title">${tsdata.tasktitle}</h5>
                              <p class="card-text">${tsdata.taskdescrip}</p>
                              <a href="#" class="btn btn-primary">${tsdata.tasktype}</a>
                            </div>
                            <div class="card-footer ">
                                <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
                            </div>
                        </div>
                        
                    </div>
 `
 ;
// Savechanges onclick function
const savechanges=()=>{
    const tsdata={
        id:`{$date.now()}`,
        imageurl: document.getElementById("imageurl").value,
        tasktitle: document.getElementById("tasktile").value,
        tasktype: document.getElementById("tasktype").value,
        taskdescrip: document.getElementById("taskdes").value,
    };
     
    tastcontainer.insertAdjacentHTML("beforeend",generatenewcard(tsdata));
    globalStore.push(tsdata);
    localStorage.setItem("tasky",JSON.stringify({card:globalStore}));// an object

};
const deletecard=(event)=>{
    event =window.event;
    const targetId=event.target.id;
    const tagname=event.target.tagName;

    globalStore = globalStore.filter((caect)=>caect.id !== targetId);

    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

    if(tagname==="BUTTON"){
        return tastcontainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }else{
        return tastcontainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
    
};