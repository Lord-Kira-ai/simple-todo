
const submit_buttons = document.querySelector('#buttons');
const input_value = document.querySelector('#note-text-area');
const feedback_for_error = document.querySelector('.feedback');
const wrapper_container = document.querySelector('#parent_element');

let todos_list = [];

const handleItem = function (itemName) {
    const parent_container = wrapper_container.querySelectorAll('#created-lists');
    parent_container.forEach(function (item, index) {

        if (item.querySelector('#todo-data').textContent === itemName) {
            item.querySelector('#complete').addEventListener('click', function (e) {

                let completed_element = item.querySelector('#todo-data').parentElement;
                let collect = completed_element.parentElement;
                collect.style.marginTop = "2rem";
                completed_element.parentElement.classList.add('alert', 'alert-success');

                completed_element.parentElement.innerHTML = `<h1 style="font-weight: lighter; opacity: 0.8; text-align:center;">Great job Brother You did it🤗!</h1>`;
                // console.log(index);
                let remove_element_in_localstorage = JSON.parse(localStorage.getItem('todos_list'));

                remove_element_in_localstorage.splice(index, 1);

                localStorage.setItem('todos_list', JSON.stringify(remove_element_in_localstorage));
                // todos_list.splice(index,1);
                setTimeout(() => {
                    collect.style.display = "none";
                }, 3000);
            });
            item.querySelector('#delete').addEventListener('click', function (e) {

                let completed_element = item.querySelector('#todo-data').parentElement;
                let collect = completed_element.parentElement;
                collect.style.marginTop = "2rem";
                completed_element.parentElement.classList.add('alert', 'alert-danger');

                completed_element.parentElement.innerHTML = `<h1 style="font-weight: lighter; opacity: 0.8; text-align:center;">You Todo was deleted🙂!</h1>`;
                let remove_element_in_localstorage = JSON.parse(localStorage.getItem('todos_list'));
                remove_element_in_localstorage.splice(index, 1);
                localStorage.setItem('todos_list', JSON.stringify(remove_element_in_localstorage));

                setTimeout(() => {
                    // completed_element.style.backgroundColor = "#83fd89;"
                    collect.style.display = "none";
                }, 3000);
            });
        }
    })
}





let getList = function (todos_list) {
    wrapper_container.innerHTML = "";
    //    console.log(todos_list)

    todos_list.forEach(function (item) {
        var htmlObject = document.createElement('div');
        htmlObject.setAttribute('class', 'outer-container');
        // htmlObject.style.padding = "0";
        // htmlObject.textContent = "";
        let todo_box = `<div id="created-lists" class="container">
            <i class="fas fa-clipboard"></i>
               <p id="todo-data">${item}</p>
               <div id="button-collector">
                <buttons class="todo-btn" id="complete"><i class="fas fa-check-circle"></i></buttons>
                <buttons class="todo-btn"  id="delete"><i class="fas fa-times-circle"></i></buttons>
               </div>
           </div> `;
        htmlObject.innerHTML = todo_box;
        wrapper_container.insertAdjacentElement('beforeend', htmlObject);
        handleItem(item);
    });
}




let getLocalStorage = function () {
   
    const stored_todo_items = localStorage.getItem('todos_list');
    if (stored_todo_items === undefined || stored_todo_items === null) {
        todos_list = [];
    }
    else {
        // console.log("hiii");
        todos_list = JSON.parse(stored_todo_items);
        console.log(todos_list);
        getList(todos_list);
    }
}


let setLocalStorage = function (todos_list) {
    localStorage.setItem('todos_list', JSON.stringify(todos_list));
}

getLocalStorage();

submit_buttons.addEventListener('click', function (e) {
    e.preventDefault();
    
    let input_data = input_value.value;
    // console.log(input_data)
    if (input_data.length === 0 || input_data === ' ') {
        if(feedback_for_error.classList.contains('d-none')){
            feedback_for_error.classList.remove('d-none');
        }
        feedback_for_error.style.marginTop = '20px';
        feedback_for_error.innerHTML = `<h1 style="font-weight: lighter; opacity: 0.8; ">Please Enter Some Data in Textarea🥱!</h1>`;
        feedback_for_error.classList.add('alert','alert-danger');
        // feedback_for_error.classList.add('showItem');
        setTimeout(function () {
            feedback_for_error.classList.add('d-none');
        }, 3000)
    }
    else {
        todos_list.push(input_data);
        setLocalStorage(todos_list);
            getList(todos_list)
    }
    input_value.value = "";
})

const clear_all = document.querySelector('#clear-all');
clear_all.addEventListener('click', function () {
    // console.log("hello babe");
    todos_list = [];
    localStorage.clear();
    wrapper_container.innerHTML = `<hr style="border: none; border-top: 1px solid rgb(190, 189, 189); margin-top: 3rem; ">
    <p style="color: rgb(90, 90, 90); font-weight: bold; opacity: 0.6;">Your notes will apper here after you created😊</p>`;
    // getList(todos_list);
})

