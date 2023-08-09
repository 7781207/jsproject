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
                                <button type="button" class="btn btn-outline-success" onclick="editcard.apply(this,arguments)" ><i class="fa-solid fa-pencil" onclick="editcard.apply(this,arguments)"></i></button>
                                <button type="button" class="btn btn-outline-danger" onclick="deletecard.apply(this,arguments)"><i class="fa-solid fa-trash" onclick="deletecard.apply(this,arguments)"></i></button>
                            </div>
                            <img src=${tsdata.imageurl} class="card-img-top" alt="...">
                            <div class="card-body">
                              <h5 class="card-title">${tsdata.tasktitle}</h5>
                              <p class="card-text">${tsdata.taskdescrip}</p>
                              <a href="#" class="btn btn-primary">${tsdata.tasktype}</a>
                            </div>
                            <div class="card-footer ">
                                <button type="button" id=${tsdata.id} class="btn btn-outline-primary float-end">Open Task</button>
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
//contenteditable
 const editcard=(event)=>{
    event=window.event;
    const targetId=event.target.id;
    const tagname=event.target.tagName;
    let parenttask;
    if(tagname==="BUTTON"){
        parenttask=event.target.parentNode.parentNode;
    }else{
        parenttask=event.target.parentNode.parentNode.parentNode;
    }
    let tasktitle=(parenttask.childNodes[5].childNodes[1]);
    let taskdes=(parenttask.childNodes[5].childNodes[3]);
    let tasktype=(parenttask.childNodes[5].childNodes[5]);
    let submit=(parenttask.childNodes[7].childNodes[1]);
    //console.log(parenttask.childNodes[5].childNodes);
    tasktitle.setAttribute("contenteditable","true");
    taskdes.setAttribute("contenteditable","true");
    tasktype.setAttribute("contenteditable","true");
    submit.setAttribute("onclick","saveeditchanges.apply(this,arguments)");
    submit.innerHTML="save changes";
 };


 //save the changes
 const saveeditchanges=(event)=>{
    event=window.event;
    const targetId=event.target.id;
    const tagname=event.target.tagName;
    let parenttask;
    if(tagname==="BUTTON"){
        parenttask=event.target.parentNode.parentNode;
    }else{
        parenttask=event.target.parentNode.parentNode.parentNode;
    }
    let tasktitle=(parenttask.childNodes[5].childNodes[1]);
    let taskdes=(parenttask.childNodes[5].childNodes[3]);
    let tasktype=(parenttask.childNodes[5].childNodes[5]);
    let submit=(parenttask.childNodes[7].childNodes[1]);
    const edited={
        tasktitle:tasktitle.innerHTML,
        tasktype:tasktype.innerHTML,
        taskdescrip:taskdes.innerHTML,
    };
    globalStore = globalStore.map((caect)=>{
        if(caect.id === targetId){
            return {
                id:caect.id,
                imageurl: caect.imageurl,
                tasktitle:edited.tasktitle,
                tasktype: edited.tasktype,
               taskdescrip:edited.taskdescrip,
            };

            
        }
        return caect;
    });
    localStorage.setItem("tasky",JSON.stringify({card:globalStore}));
    tasktitle.setAttribute("contenteditable","false");
    taskdes.setAttribute("contenteditable","false");
    tasktype.setAttribute("contenteditable","tfalse");
    submit.removeAttribute("onclick");
    submit.innerHTML="Open Task";
    
 };