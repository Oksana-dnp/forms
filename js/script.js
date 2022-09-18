const addBtn = document.querySelector(".form__btn-add");
const editBtn = document.querySelector(".form__btn-edit");
const inputs = document.forms.reg.elements["user"];
let changeBtns;
addBtn.addEventListener("click", addUser);
editBtn.addEventListener("click", addUser);
let users = [];

class createUser {
    constructor(login, password, email) {
      this.login = login;
      this.password = password;
      this.email= email;
    }
}
function addUser(e) {
  let userData = [];
  for (item of inputs) {
    userData.push(item.value);
  }
  let [login, password, email] = userData;
  let user = new createUser(login, password, email);
  console.log(user)
  if (e.target.value === "edit user") {
    let index = inputs[0].dataset.index;
    users[index] = user;
    addBtn.classList.toggle('hide')
    editBtn.classList.remove('show')

  } 
  if(e.target.value = "add user") {
    users.push(user);
  }
  document.forms.reg.reset();
  renderData(users);
}

function renderData(user) {
  const usersInfo = document.querySelector(".users__info");
  usersInfo.innerHTML = "";
  user.forEach((elem, index) => {
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    let cellText = document.createTextNode(`${index + 1}`);
    cell.appendChild(cellText);
    row.appendChild(cell);
    for (key in elem) {
      let cell = document.createElement("td");
      let text = document.createTextNode(`${elem[key]}`);
      cell.appendChild(text);
      row.appendChild(cell);
    }
    usersInfo.appendChild(row);
    let btns = ["Edit", "Delete"];
    btns.forEach((btn) => {
      let button;
      if (btn.toLocaleLowerCase() === "edit") {
        button = `<button data-name="edit" data-index= ${index}>${btn}</button>`;
      } else {
        button = `<button data-name="delete" data-index= ${index}>${btn}</button>`;
      }
      let cell = `<td>${button}</td>`;
      row.innerHTML += cell;
    });
  });
  changeBtns = document.querySelectorAll("button");
  changeBtns.forEach((btn) => {
    btn.addEventListener("click", deleteUser);
  });
}

function deleteUser(e) {
  let index = e.target.dataset.index;
  if (e.target.dataset.name === "delete") {
    users.splice(index, 1);
    renderData(users);
  }
  if (e.target.dataset.name === "edit") {
    editUserData(index);
  }
}

function editUserData(index) {
  let { login, password, email } = users[index];
  inputs[0].setAttribute('data-index', `${index}`);
  inputs[0].value = login;
  inputs[1].value = password;
  inputs[2].value = email;
  addBtn.classList.toggle('hide');
  editBtn.classList.add('show');
}

}
