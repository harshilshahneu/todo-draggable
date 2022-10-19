import createTaskElement from './helper/createTaskElement.js'
import { openAddTaskForm, closeDialog } from './helper/formDialog.js'

window.openAddTaskForm = openAddTaskForm;
window.closeDialog = closeDialog;

const load = event => {
    const data = JSON.parse(event.target.responseText);
    data.forEach(element => createTaskElement(element));
    document.querySelector('.user-profile__tasks').innerHTML = "You have " + data.length + " tasks";
}

const xhr = new XMLHttpRequest();
xhr.open('GET', 'js/data.json');
xhr.addEventListener('load', load);
xhr.send();

