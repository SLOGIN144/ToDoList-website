
document.getElementById("submit").onclick = function(event) {
    event.preventDefault();

    const taskNameInput = document.getElementById("task-name");
    const taskDescInput = document.getElementById("task-des");
    const timeInput = document.getElementById("select-box");

    const newTask = {
        name: taskNameInput.value,
        desc: taskDescInput.value,
        time: timeInput.value
    };

  

    if (taskNameInput.value.trim() === "" ||  taskDescInput.value.trim() === "" || timeInput.value.trim() === "") {
    alert("Izpolni vsa polja!");
    return;
    }
    //doda v array
    tasks.push(newTask);

    //shrani v lokalno shrambo
    localStorage.setItem("tasks", JSON.stringify(tasks));

    
    const template = document.getElementById("template");
    const taskElement = template.cloneNode(true);
    taskElement.classList.remove("hidden");

    taskElement.querySelector(".task-name-temp").textContent = newTask.name;
    taskElement.querySelector(".task-temp-des").textContent = newTask.desc;
    taskElement.querySelector(".task-temp-time").textContent = "TIME: " + newTask.time;

    document.querySelector(".template-container").appendChild(taskElement);

    
    taskNameInput.value = "";
    taskDescInput.value = "";
    timeInput.value = "";

    
    document.getElementById("modal-container").classList.remove("show");
};


window.onload = function() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        const template = document.getElementById("template");
        const taskElement = template.cloneNode(true);
        taskElement.classList.remove("hidden");

        taskElement.querySelector(".task-name-temp").textContent = task.name;
        taskElement.querySelector(".task-temp-des").textContent = task.desc;
        taskElement.querySelector(".task-temp-time").textContent = "TIME: " + task.time;

        document.querySelector(".template-container").appendChild(taskElement);
    });

    
    tasks = savedTasks;
};

document.addEventListener("click", function(e) {
    if (e.target.closest(".checkmark")) {
        const taskBox = e.target.closest(".task-box");
        if (taskBox) taskBox.remove();
    }
});


