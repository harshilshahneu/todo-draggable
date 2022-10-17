let dialogBoundingClientHeight = 0;
const addButton = document.querySelector('#add-button').style

function dragElement(event) {
    const element = event.currentTarget;
    const startPoint = event.clientX;
    let diff = 0;
    const id = element.parentElement.id;
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

    function mouseMoveHandler(e){
        let currentPoint = e.clientX;
        diff = startPoint - currentPoint;
        console.log(element)
        if(diff <= 0 && diff >= -document.querySelector('#'+ id + '>.task-completion').offsetWidth) {
            element.style.transform = `translateX(${-diff}px)`;
        }
       
    }
    function mouseUpHandler(e){
        if(diff <=  -document.querySelector('#'+ id + '>.task-completion').offsetWidth) {
            const node = document.querySelector('#' + id);
            node.style.opacity = 0;
          
            setTimeout(() => {
                document.querySelector('.task-list').appendChild(node);
                setTimeout(() => {
                    node.style.opacity = 1;
                }, 10);
            }, 300);
           
        }
        element.style.transform = `translateX(0px)`;
        document.removeEventListener('mouseup', mouseUpHandler);
        document.removeEventListener('mousemove', mouseMoveHandler);
    }
}

function createTaskElement(element) {
    const li = document.createElement('li');
    li.setAttribute('id', 'id_' + element.id);
    li.setAttribute('data', element.status);

    const taskCompletion = document.createElement('div');
    taskCompletion.setAttribute('class', 'task-completion');

    const checkMark = document.createElement('img');
    checkMark.setAttribute('src', 'img/checked.png');

    taskCompletion.appendChild(checkMark);

    const task = document.createElement('div');
    task.setAttribute('class', 'task');

    const taskTitle = document.createElement('div');
    taskTitle.setAttribute('class', 'task-title');

    const taskHeader = document.createElement('div');
    taskHeader.setAttribute('class', 'task-header');
    taskHeader.innerHTML = element.title;

    const collapsibleButton = document.createElement('button');
    collapsibleButton.setAttribute('class', 'collapsible');
    collapsibleButton.setAttribute('id', 'collapsible-' + element.id);
    collapsibleButton.innerHTML = '+';

    collapsibleButton.addEventListener('click', e => {
        console.log(e.currentTarget.parentElement.parentElement.parentElement.id);
        const id = e.currentTarget.parentElement.parentElement.parentElement.id;
        const collapsible = document.querySelector('#' + id + '>.task>.task-details');
        console.log(collapsible);
        if(collapsible.style.maxHeight) {
            collapsible.style.maxHeight = null;
            e.currentTarget.innerHTML = '+';
        }
        else {
            collapsible.style.maxHeight = collapsible.scrollHeight + 'px';
            e.currentTarget.innerHTML = '-';
        }
    })

    taskTitle.appendChild(taskHeader);
    taskTitle.appendChild(collapsibleButton);

    const taskDetails = document.createElement('div');
    taskDetails.setAttribute('class', 'task-details');

    const taskDescription = document.createElement('div');
    taskDescription.setAttribute('class', 'task-description');
    taskDescription.innerHTML = element.description;

    const taskDueDate = document.createElement('div');
    taskDueDate.setAttribute('class', 'task-due-date');
    taskDueDate.innerHTML = element.due_date;

    const taskDueTime = document.createElement('div');
    taskDueTime.setAttribute('class', 'task-due-time');
    taskDueTime.innerHTML = element.due_time;

    taskDetails.appendChild(taskDescription);
    taskDetails.appendChild(taskDueDate);
    taskDetails.appendChild(taskDueTime);

    task.appendChild(taskTitle);
    task.appendChild(taskDetails);
    task.addEventListener('mousedown', dragElement);

    li.appendChild(taskCompletion);
    li.appendChild(task);
   
    document.querySelector('.task-list').appendChild(li);
}

const load = event => {
    const data = JSON.parse(event.target.responseText);
    data.forEach(element => createTaskElement(element));
    document.querySelector('.user-profile__tasks').innerHTML = "You have " + data.length + " tasks";
}

//show add task form
function openAddTaskForm() {
    const dialogStyle = document.querySelector('.dialog').style;
    if(dialogStyle.display === 'block') {
      //add event to the list
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const due_date = document.querySelector('#due-date').value;
        const due_time = document.querySelector('#due-time').value;

        //@TODO add validation

        const data = {
            id: document.querySelectorAll('.task-list li').length + 1,
            title,
            description,
            due_date,
            due_time,
            status: "open"
        };
        createTaskElement(data);
        document.querySelector('.form').reset();
        document.querySelector('.user-profile__tasks').innerHTML = "You have " + document.querySelectorAll('.task-list li').length + " tasks";
        closeDialog();
    }
    else {
        dialogStyle.display = 'block';
        setTimeout(() => {
            const dialogBoundingClientHeight = document.querySelector('.dialog').getBoundingClientRect().y
            dialogStyle.transform = 'translateY('  + (-dialogBoundingClientHeight) + 'px)';
            dialogStyle.opacity = 1;
            addButton.width = '250px';
            addButton.borderRadius = '0';
        }, 1);

    }
}

function closeDialog() {
    document.querySelector('.dialog').style.transform = 'translateY(' + dialogBoundingClientHeight + 'px)';
    addButton.width = '60px';
    addButton.borderRadius = '50%';

    setTimeout(() => {
        document.querySelector('.dialog').style.display = 'none';
    }, 1000);
}

const xhr = new XMLHttpRequest();
xhr.open('GET', 'js/data.json');
xhr.addEventListener('load', load);
xhr.send();

