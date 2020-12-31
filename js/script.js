// define ui element

let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// define event listener
form.addEventListener('submit', addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click',clearTask);
filter.addEventListener('keyup',filterTask);
document.addEventListener('DOMContentLoaded',get_Task);
//define  function

//addtask function

function addTask(e){
    //console.log("helo ")
    if(taskInput.value === ""){
        alert("Empty!! Add a Task!");
    }
    else{
        // task insert in li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));

        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link)
       
        taskList.appendChild(li);

        storeTaskLocalStorage(taskInput.value);
        taskInput.value = '';
        
    }

    e.preventDefault();
}

// remove task
function removeTask(e){
    if(e.target.hasAttribute("href")){
        if(confirm("Are you Sure?")){
            let ele = e.target.parentElement; // call to parent Element
            ele.remove();
            removeFromLS(ele);
        }
    }
}

// clear Task
function clearTask(e){

    //taskList.innerHTML = "";

    //faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)

    }
    localStorage.clear()
}

 // filter Task

 function filterTask(e){
     let text = e.target.value.toLowerCase();

     document.querySelectorAll('li').forEach(task=>{ //checking item into li tag.
         let item = task.firstChild.textContent;
         if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';
         }
         else{
             task.style.display = 'none';
         }
     })
 }

 // store in local storage

 function storeTaskLocalStorage(task){
     let tasks;
     if(localStorage.getItem('tasks') === null){
         tasks = []
     }else{
         tasks = JSON.parse(localStorage.getItem('tasks')); // to get item using parse to get as object

     }
     tasks.push(task);
     localStorage.setItem('tasks', JSON.stringify(tasks)); // store  the item  as json object
 }

 function get_Task(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.forEach(task =>{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));

        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';
        li.appendChild(link)
       
        taskList.appendChild(li);
    });
 }

 function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));//The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. 

    }

    let li = taskItem;
    li.removeChild(li.lastChild); // <a></a> data remove

    tasks.forEach((task,index)=>{ 
        if(li.textContent.trim() === task){ // trim the data from item included space
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // update list to send into local storage
    // method converts a JavaScript object or value to a JSON string,

 }