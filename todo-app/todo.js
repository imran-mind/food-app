let openList = document.getElementById('open-items').children;
let inprogressList = document.getElementById('inprogress-items').children;
let completedList = document.getElementById('completed-items').children;
console.log('openList ', openList[0])
console.log('inprogressList ', inprogressList[0])
console.log('completedList ', completedList[0]);


document.getElementById('todo-input');
document.addEventListener('keyup', handleInputBox);
document.getElementById('open-to-in').addEventListener('click', shiftOpenToInProgress);
document.getElementById('in-to-complete').addEventListener('click', shiftInProgressToComplete);

function handleInputBox(e) {
    if (e.key === 'Enter') {
        console.log(e.key)
        console.log(e.target.value);
        generateTodoDiv(e.target.value, 'open-items');
        document.getElementById('todo-input').innerText = '';
        console.log(document.getElementById('todo-input').value = '')
    }
}

let openItems = new Set();

function removeAttribute(id) {
    // document.getElementById(id).children[0].style.display = 'none';
    // document.getElementById(id).children[1].innerText = '';
    // document.getElementById(id).children[0].remove();
    // document.getElementById(id).children[1].remove();
    document.getElementById(id).remove()
}

function shiftOpenToInProgress(e) {
    // console.log('---------', e)
    let newArr = Array.from(openItems);
    for (let i = 0, len = newArr.length; i < len; i++) {
        generateTodoDiv(document.getElementById(newArr[i]).children[1].innerText, 'inprogress-items');
        console.log(document.getElementById(newArr[i]).children[1].innerText)
        removeAttribute(newArr[i]);
    }
    openItems = new Set();
}

function shiftInProgressToComplete(e) {
    console.log('---------', e)
    let newArr = Array.from(openItems);
    for (let i = 0, len = newArr.length; i < len; i++) {
        generateTodoDiv(document.getElementById(newArr[i]).children[1].innerText, 'completed-items');
        console.log(document.getElementById(newArr[i]).children[1].innerText)
        removeAttribute(newArr[i]);
    }
    openItems = new Set();
}

function handleOpenTicked(checked, randomNum) {
    console.log(checked)
    if (checked) {
        openItems.add(randomNum);
    } else {
        openItems.delete(randomNum);
        // _.remove(openItems, (randomNum) => randomNum == id);
    }
    console.log(openItems)
    // let taskDiv = e.path[1].
    // console.log(e.path[1]);
    // console.log(document.getElementById(randomNum).children[0].checked = false)
    // console.log(document.getElementById(randomNum).children[0].style.display = 'none');
    // console.log(document.getElementById(randomNum).children[1].innerText='');
    // console.log(document.getElementById(randomNum).children[1].innerText='')
    // e.path.forEach((item)=>{
    //     console.log(item.getElementByClassName('task-class'));
    // });
}

function generateTodoDiv(data, section) {
    let openListElements = document.getElementById(section);
    console.log(openListElements)
    let randomNum = getTaskId();
    let todoDiv = document.createElement('div');
    todoDiv.setAttribute('id', randomNum);
    todoDiv.setAttribute('class', 'task-class');
    let tickCheckbox = document.createElement('input');
    tickCheckbox.setAttribute('type', 'checkbox');

    tickCheckbox.addEventListener('change', function (e) {
        console.log('on changed ', tickCheckbox.checked)
        if (e) {
            //do something
            handleOpenTicked(tickCheckbox.checked, randomNum);
        }
    });
    let todoText = document.createElement('p');
    todoText.setAttribute('class', 'terms-checkbox');
    todoText.textContent = data;

    todoDiv.appendChild(tickCheckbox);
    todoDiv.appendChild(todoText);

    openListElements.appendChild(todoDiv);
}

function getTaskId() {
    return Math.floor(Math.random() * 10000000);
}


// 10:40 AM to 11:15 AM
// enable scroller in all sections -> done
// capture input data -> done
// Captured input data append into li list  