const tastcontainer=document.querySelector(".task__container");
const savechanges=()=>{
    const tsdata={
        id:`{$date.now()}`,
        imageurl: document.getElementById("imageurl").value,
        tasktitle: document.getElementById("tasktile").value,
        tasktype: document.getElementById("tasktype").value,
        taskdescrip: document.getElementById("taskdes").value,
    };
    console.log(tsdata);
    const abctask=`
    <div class="col-md-6 col-lg-4" id=${tsdata.id}>
                        <div class="card ">
                            <div class="card-header d-flex justify-content-end gap-2">
                                <button type="button" class="btn btn-outline-success"><i class="fa-regular fa-pencil"></i></button>
                                <button type="button" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
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
    `;
    tastcontainer.insertAdjacentHTML("beforeend",abctask);

};