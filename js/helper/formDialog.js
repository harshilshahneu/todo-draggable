//import helper function
import createTaskElement from './createTaskElement.js';

//Set the default value of dialogBoundingClientHeight and get add button style
let dialogBoundingClientHeight = 0;
const addButton = document.querySelector('#add-button').style;

//Function to open the add task form dialog or add data to the TODO list based on state of UI 
export function openAddTaskForm() {
    const dialogStyle = document.querySelector('.dialog').style;

    //Check if the dialog is open or not
    if(dialogStyle.display === 'block') {
      
        //Get the values from the form
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const due_date = document.querySelector('#due-date').value;
        const due_time = document.querySelector('#due-time').value;

        //Validate the form fields
        let valid = true;
        valid = validateField(title, 'title') && valid;
        valid = validateField(description, 'description') && valid;
        valid = validateField(due_date, 'due-date') && valid;
        valid = validateField(due_time, 'due-time') && valid;
        
        //If all the fields are valid then add the task to the TODO list and close the dialog
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
            document.querySelector('.user-profile__tasks').innerHTML = "You have " + document.querySelectorAll('[data="open"]').length + " tasks remaining";
            closeDialog();
        }
    }
    else {
        //Open the dialog with animation
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


//Function to close the add task form dialog with animation
export function closeDialog() {
    document.querySelector('.dialog').style.transform = 'translateY(' + dialogBoundingClientHeight + 'px)';
    addButton.width = '60px';
    addButton.borderRadius = '50%';

    setTimeout(() => {
        document.querySelector('.dialog').style.display = 'none';
    }, 1000);
}

//Function to reset the form fields and remove the error messages
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

//Function to validate the form fields
function validateField(value, filedName) {
    if(!value) {
        document.querySelector('#' + filedName).style.border = '1px solid red';
        document.getElementById(filedName + '-error').innerHTML = filedName + ' is required';
    } else { //If the field is valid then remove the error message
        document.querySelector('#' + filedName).style.border = '1px solid black';
        document.getElementById(filedName + '-error').innerHTML = '';
    }
    return !!value;
}