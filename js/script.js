let dialogBoundingClientHeight = 0;
const addButton = document.querySelector('#add-button').style

function createTaskElement(element) {
    const li = document.createElement('li');
    li.setAttribute('id', element.id);

    const taskHeader = document.createElement('div');
    taskHeader.setAttribute('class', 'task-header');
    taskHeader.innerHTML = element.title;
    li.appendChild(taskHeader);

    const taskDescription = document.createElement('div');
    taskDescription.setAttribute('class', 'task-description');
    taskDescription.innerHTML = element.description;
    li.appendChild(taskDescription);

    const taskDueDate = document.createElement('div');
    taskDueDate.setAttribute('class', 'task-due-date');
    taskDueDate.innerHTML = element.due_date;
    li.appendChild(taskDueDate);

    const taskDueTime = document.createElement('div');
    taskDueTime.setAttribute('class', 'task-due-time');
    taskDueTime.innerHTML = element.due_time;
    li.appendChild(taskDueTime);
   
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
        // dialogStyle.position = 'fixed';
        setTimeout(() => {
            const dialogBoundingClientHeight = document.querySelector('.dialog').getBoundingClientRect().y
            console.log(dialogBoundingClientHeight)
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

