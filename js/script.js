// Import helper functions
import createTaskElement from './helper/createTaskElement.js'
import { openAddTaskForm, closeDialog } from './helper/formDialog.js'

//Bind the functions to window since script type is module which limits the scope of the functions
window.openAddTaskForm = openAddTaskForm;
window.closeDialog = closeDialog;

//Create all the tasks from the data when fetched
const load = event => {
    const data = JSON.parse(event.target.responseText);
    data.forEach(element => createTaskElement(element));
    document.querySelector('.user-profile__tasks').innerHTML = "You have " + data.length + " tasks remaining";
}

//Fetch the data from the data.json file
const xhr = new XMLHttpRequest();
xhr.open('GET', 'js/data.json');
xhr.addEventListener('load', load);
xhr.send();

