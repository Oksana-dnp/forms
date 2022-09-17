const addBtn = document.querySelector(".form_btn");
let changeBtns;

addBtn.addEventListener("click", addUser);
let users = [];

function addUser() {
  const inputs = document.forms.reg.elements["user"];
  const user = {};
  let keys = ["login", "password", "email"];
  for(let i=0; i< keys.length; i++){
    user[keys[i]] = inputs[i].value;
  }
  document.forms.reg.reset();
  users.push(user);
  console.log('rener')
  renderData(users);

}

function renderData(user){
    console.log('rener')
const usersInfo = document.querySelector('.users__info');
usersInfo.innerHTML = "";
user.forEach((elem, index) => {
    let row = document.createElement('tr');
    let cell = document.createElement('td');
    let cellText = document.createTextNode(`${index+1}`);
    cell.appendChild(cellText);
    row.appendChild(cell);
    for(key in elem){
        let cell = document.createElement('td');
        let text = document.createTextNode(`${elem[key]}`);
        cell.appendChild(text);
        row.appendChild(cell)
    }

    usersInfo.appendChild(row);
    let btns = ["Edit", "Delete"];
    btns.forEach(btn =>{
        let button;
        if(btn.toLocaleLowerCase() === "edit"){
            button = `<button data-name="edit" data-index= ${index}>${btn}</button>`;
        }else{
            button = `<button data-name="delete" data-index= ${index}>${btn}</button>`;
        }
        let cell = `<td>${button}</td>`;
        row.innerHTML+=cell;
    })
});
   changeBtns= document.querySelectorAll('button[data-name="edit"]');
   console.log(changeBtns)
   changeBtns.forEach(btn=>{
    btn.addEventListener('click', deleteUser);
})

}



function deleteUser(e) {

   // users.splice()
    
  let index = e.target.dataset.index;
   users.splice(index,1);
   renderData(users)
 
    
}