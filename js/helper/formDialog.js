import createTaskElement from './createTaskElement.js';
let dialogBoundingClientHeight = 0;
const addButton = document.querySelector('#add-button').style;
//show add task form
export function openAddTaskForm() {
    const dialogStyle = document.querySelector('.dialog').style;
    if(dialogStyle.display === 'block') {
      //add event to the list
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const due_date = document.querySelector('#due-date').value;
        const due_time = document.querySelector('#due-time').value;

        let valid = true;
        //valid = validateField(title, 'title') && validateField(description, 'description') && validateField(due_date, 'due-date') && validateField(due_time, 'due-time');
        if(!validateField(title, 'title'))
            valid = false;
        if(!validateField(description, 'description'))
            valid = false;
        if(!validateField(due_date, 'due-date'))
            valid = false;
        if(!validateField(due_time, 'due-time'))
            valid = false;
        
        if(valid){
            const data = {
                id: document.querySelectorAll('.task-list li').length + 1,
                title,
                description,
                due_date,
                due_time,
                status: "open"
            };
            createTaskElement(data);
            resetForm();
            document.querySelector('.user-profile__tasks').innerHTML = "You have " + document.querySelectorAll('.task-list li').length + " tasks";
            closeDialog();
        }
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

export function closeDialog() {
    document.querySelector('.dialog').style.transform = 'translateY(' + dialogBoundingClientHeight + 'px)';
    addButton.width = '60px';
    addButton.borderRadius = '50%';

    setTimeout(() => {
        document.querySelector('.dialog').style.display = 'none';
    }, 1000);
}

function resetForm() {
    document.querySelector('#title').style.border = '1px solid black';
    document.getElementById('title-error').innerHTML = '';
    document.querySelector('#description').style.border = '1px solid black';
    document.getElementById('description-error').innerHTML = '';
    document.querySelector('#due-date').style.border = '1px solid black';
    document.getElementById('due-date-error').innerHTML = '';
    document.querySelector('#due-time').style.border = '1px solid black';
    document.getElementById('due-time-error').innerHTML = '';
    document.querySelector('.form').reset();
}

function validateField(value, filedName) {
    if(!value) {
        document.querySelector('#' + filedName).style.border = '1px solid red';
        document.getElementById(filedName + '-error').innerHTML = filedName + ' is required';
    }
    return !!value;
}