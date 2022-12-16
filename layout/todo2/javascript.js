let state = {
  todos: [],
};

localStorageOut();
renderTodos();

const btnNewTodo = document.getElementById("btnnewtodo");
btnNewTodo.addEventListener("click", () => {
  const newInput = document.getElementById("input").value;

  if (newInput != "") {
    state.todos.push({
      id: Date.now(),
      description: newInput,
      done: false,
    });
    console.log(state.todos);
  } else {
    alert("You must enter a task!!!");
  }
  document.getElementById("input").value = "";
  ul.setAttribute("class", "ul");
  renderTodos();
  localStorageIn();
});

function renderTodos() {
  const ul = document.getElementById("ul");
  ul.innerHTML = "";

  //  Schleife
  state.todos.forEach((todo) => {
    const ul = document.getElementById("ul");
    const newLi = document.createElement("li");
    if (todo.done) {
      newLi.setAttribute("class", "done");
      localStorageIn();
    } else {
      newLi.setAttribute("class", "open");
      localStorageIn();
    }

    const newbtn = document.createElement("button");
    newbtn.innerHTML = " Augabe löschen";
    newbtn.setAttribute("class", "newbtn");

    const newTxt = document.createTextNode(todo.description);

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = todo.done;

    newCheckbox.addEventListener("change", (e) => {
      const checkboxNew = e.target.checked;
      todo.done = checkboxNew;

      if (checkboxNew) {
        newLi.setAttribute("class", "done");
        localStorageIn();
      } else {
        newLi.setAttribute("class", "open");
        localStorageIn();
      }
    });

    newLi.appendChild(newCheckbox);
    newLi.appendChild(newTxt);
    newLi.appendChild(newbtn);
    ul.appendChild(newLi);

    // Selectbox
    const sBox = document.querySelector(".box");
    sBox.addEventListener("change", (e) => {
      const auswahl = e.target.value;

      if (auswahl === "erledigt" && todo.done) {
        newLi.setAttribute("class", "done");
      } else {
        newLi.setAttribute("class", "donehidden");
      }

      if (auswahl === "offen" && !todo.done) {
        newLi.setAttribute("class", "open");
      }
      if (auswahl === "alle") {
        renderTodos();
      }
    });

    newbtn.addEventListener("click", () => {
      const indexFindTodo = state.todos.findIndex((x) => x === todo);

      state.todos.splice(indexFindTodo, 1);

      newLi.remove();
      newbtn.remove();
      localStorageIn();
    });
  });
}
// Bis hier aufgabe anlegen

function localStorageIn() {
  localStorage.setItem("state", JSON.stringify(state));
}

function localStorageOut() {
  const datenOut = JSON.parse(localStorage.getItem("state"));
  if (datenOut != null) {
    state = datenOut;
  } else {
    console.warn("Es sind keine Daten vorhanden");
  }
}
