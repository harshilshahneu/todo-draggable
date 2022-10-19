//Function to create a task element
export default function createTaskElement(element) {

    //Create the task element structure and append event listeners to appropriate elements
    const li = setTagAttrAndHTML('li', null, null, 'id_' + element.id, element.status, null);
    const taskCompletion = setTagAttrAndHTML('div', 'task-completion', null, null, null, null);
    const checkMark = setTagAttrAndHTML('img', null, null, null, null, 'img/checked.png');
    taskCompletion.appendChild(checkMark);

    const task = setTagAttrAndHTML('div', 'task', null, null, null, null);
    const completedTaskTagText = setTagAttrAndHTML('div', null, 'Completed', null, null, null);
    const completedTaskTag = setTagAttrAndHTML('div', 'completed-task-tag', null, null, null, null);
    completedTaskTag.appendChild(completedTaskTagText);

    const taskTitle = setTagAttrAndHTML('div', 'task-title', null, null, null, null);
    const taskHeader = setTagAttrAndHTML('div', 'task-header', element.title, null, null, null);
    const collapsibleButton = setTagAttrAndHTML('button', 'collapsible', '+', 'collapsible-' + element.id, null, null);

    //Add event listener to the collapsible button to toggle the task description
    collapsibleButton.addEventListener('click', e => {
        const id = e.currentTarget.parentElement.parentElement.parentElement.id;
        const collapsible = document.querySelector('#' + id + '>.task>.task-details');
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

    const taskDetails = setTagAttrAndHTML('div', 'task-details', null, null, null, null);
    const taskDescription = setTagAttrAndHTML('div', 'task-description', element.description, null, null, null);
    const taskDueDate = setTagAttrAndHTML('div', 'task-due-date', element.due_date, null, null, null);
    const taskDueTime = setTagAttrAndHTML('div', 'task-due-time', element.due_time, null, null, null);

    taskDetails.appendChild(taskDescription);
    taskDetails.appendChild(taskDueDate);
    taskDetails.appendChild(taskDueTime);

    task.appendChild(completedTaskTag);
    task.appendChild(taskTitle);
    task.appendChild(taskDetails);

    //Attach event listeners to the task element
    task.addEventListener('mousedown', dragElement);

    li.appendChild(taskCompletion);
    li.appendChild(task);
   
    document.querySelector('.task-list').prepend(li);
}

// Function to set attributes and HTML content to a tag
function setTagAttrAndHTML(tag, className, htmlText, id, data, src) {
    const element = document.createElement(tag);
    if(className)
        element.setAttribute('class', className);
    if(htmlText)
        element.innerHTML = htmlText;
    if(id)
        element.setAttribute('id', id);
    if(data)
        element.setAttribute('data', data);
    if(src)
        element.setAttribute('src', src);
    return element;
}

// Function to drag the task element and mark it as completed if dragged to the right till a certain threshold
function dragElement(event) {
    
    const element = event.currentTarget;
    const startPoint = event.clientX;
    let diff = 0;
    const id = element.parentElement.id;

    //Attach event listeners till the mouse is up
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

    /** 
     * Function to handle the mouse move event
     * Calculate the difference between the start point and the current point
     * translate the element by the difference to the X axis only
     **/
    function mouseMoveHandler(e){
        let currentPoint = e.clientX;
        diff = startPoint - currentPoint;
        if(diff <= 0 && diff >= -document.querySelector('#'+ id + '>.task-completion').offsetWidth) {
            element.style.transform = `translateX(${-diff}px)`;
        }
       
    }

    /**
     * Function to handle the mouse up event
     * If the difference is greater than a certain threshold, mark the task as completed and
     * make pointer events as none so that the element cannot be dragged again
     * Reset the element to its original position
     * Update the task count
     * Remove the event listeners
     */
    function mouseUpHandler(e){
        if(diff <=  -document.querySelector('#'+ id + '>.task-completion').offsetWidth) {
            const node = document.querySelector('#' + id);
            node.style.opacity = 0;
            node.setAttribute('data', 'completed');
            element.style.pointerEvents = 'none';

            setTimeout(() => {
                element.firstChild.style.display = 'flex';
                document.querySelector('.task-list').appendChild(node);  
                setTimeout(() => {
                    if(document.querySelectorAll('[data="open"]').length) {
                        document.querySelector('.user-profile__tasks').innerHTML = "You have " + document.querySelectorAll('[data="open"]').length + " tasks remaining";
                    }
                    else {
                        document.querySelector('.user-profile__tasks').innerHTML = "Yay! You have no tasks remaining";
                    }
                    node.style.opacity = 1;
                }, 10);
            }, 300);
           
        }
        element.style.transform = `translateX(0px)`;
        document.removeEventListener('mouseup', mouseUpHandler);
        document.removeEventListener('mousemove', mouseMoveHandler);
    }
}