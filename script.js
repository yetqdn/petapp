'use strict';

//khai bao variable

const submitBtn = document.getElementById('submit-btn');
let idInput = document.getElementById('input-id');
let nameInput = document.getElementById('input-name');
let ageInput = document.getElementById('input-age');
let typeInput = document.getElementById('input-type')
let weightInput = document.getElementById('input-weight');
let lengthInput = document.getElementById('input-length');
let colorInput = document.getElementById('input-color-1');
let breedInput = document.getElementById('input-breed');
let vaccinatedInput = document.getElementById('input-vaccinated');
let dewormedInput = document.getElementById('input-dewormed');
let sterilizedInput = document.getElementById('input-sterilized');
let tableBodyEl = document.getElementById('tbody');
const btnDelete = document.getElementsByClassName('btn-danger');
const  btnHealthy = document.getElementById('healthy-btn');
const rowBmi = document.getElementById('row-bmi');
const formElement = document.getElementById('id-form');


const arrPet = JSON.parse(getFromStorage('arrPet')) ?? []; //khai bao gia tri bien doi thanh obj hoac []
let healthyPet = [];
let healthyCheck = false;
let table =''; // bien global
let flat = true;


function validateData(data) {
      //check fields
      if (data.id == '' || data.name =='' || data.age == NaN || data.weight ==  NaN || data.height == NaN){
        alert('You must fill all fields');
        return;
      } 
      //check id 
      for (let i = 0; i < arrPet.length; i++){
        if(data.id == arrPet[i].id){
          alert("ID must be unique!");
          return;
        } 
      }
      
      if (data.age > 15 || data.age == 0){
        alert("Age must be between 1 and 15!")
        return;
      }
      if (data.weight > 15 || data.weight == 0){
        alert("Weight must be between 1 and 15!")
        return;
      }
      if (data.height > 100 || data.height == 0){
        alert("Lenght must be between 1 and 100!")
        return;
      }
      if (data.type == 'Select Type'){
        alert("Please select Type!")
        return;
      }
      if (data.breed == 'Select Breed'){
        alert("Please select Breed!")
        return;
      }
      return true;
}

function renderTableData(arrVar){
 
  table = '' // xoa toan bo render html truoc do

  for(let arr = 0; arr < arrVar.length; arr++){
   
    let checkVaccinated = arrVar[arr].vacine ? '<i class="bi bi-check-circle-fill">' : '<i class="bi bi-x-circle-fill">';
    let checkDeworme = arrVar[arr].deworm ? '<i class="bi bi-check-circle-fill">' : '<i class="bi bi-x-circle-fill">';
    let checkSterilized = arrVar[arr].sterilize ? '<i class="bi bi-check-circle-fill">' : '<i class="bi bi-x-circle-fill">';
    table += `
    <tr>
      <th scope="row">${arrVar[arr].id}</th>
      <td>${arrVar[arr].name}</td>
      <td>${arrVar[arr].age}</td>
      <td>${arrVar[arr].type}</td>
      <td>${arrVar[arr].weight} kg</td>
      <td>${arrVar[arr].height} cm</td>
      <td>${arrVar[arr].breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${arrVar[arr].color}"></i>
      </td>

      <td>${checkVaccinated}</i></td>
      <td>${checkDeworme}</i></td>
      <td>${checkSterilized}</i></td>
      <td>${arrVar[arr].date}</td>
      <td id='bmi-calc'>${arrVar[arr].bmi}</td>
      <td><button type="button" class="btn btn-danger" onclick="deletePet('${arrVar[arr].id}')">Delete</button>
      </td>
    </tr>
    </n>
  `
  // tableBodyEl.innerHTML = table; gay bug neu dat o day gay ra loi khong xoa dc hang cuoi cung
  }
  tableBodyEl.innerHTML = table;
  //dieu kien kiem tra xem da co btnCalalate chua thi cho hien thi
  if (arrayHasElements(arrPet)){
      if (flat){
        createElement();
        flat = false; //dan flat de hien mot lan button
      } 
  }
   
};
// ham check co array co data ko, true: co, false: rong
function arrayHasElements(array) {
  return array.length > 0;
}

//function clear ve gia tri ban dau
function clearInput(){
  idInput.value = '';
  nameInput.value = '';
  ageInput.value ='';
  typeInput.value = 'Select Type'
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = "#000000";
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//function tao ra button va row name BMI
function createElement (){
    // Create a "th" element for Table row name
  const newTh = document.createElement("th");
  //add class scope, id
  newTh.scope = "col";
  newTh.id = 'id-th';
  // Create a text node:
  const textNode = document.createTextNode("BMI");
  // Append text node to "li" element:
  newTh.appendChild(textNode);
  rowBmi.insertBefore(newTh, rowBmi.children[12]);
  // create botton Calculate BMI
  const newBtnBmi = document.createElement('button')
  newBtnBmi.innerHTML='Calculate BMI';
  newBtnBmi.className = 'btn btn-primary';
  newBtnBmi.type = 'button'; //cto chi cach them type vao de nó thanh button khong refresh lai web
  newBtnBmi.id = 'btn-bmi';
  newBtnBmi.addEventListener('click', calcBmi);
  formElement.appendChild(newBtnBmi);

}

//function delete button and th
function deleteElement(){
  const buttonCalcBmi = document.getElementById('btn-bmi');
  const elementTh = document.getElementById('id-th')
  buttonCalcBmi.remove();
  elementTh.remove();
  flat = true;
}
function calcBmi (){
  for (let b = 0; b < arrPet.length; b++){
    let bmix = (arrPet[b].type == "Dog") ? (arrPet[b].weight* 703)/arrPet[b].height**2 : (arrPet[b].weight* 886)/arrPet[b].height**2;
    let fomartBmi = bmix.toFixed(2);
    arrPet[b].bmi = fomartBmi;
    // document.getElementById('bmi-calc').innerHTML = arrPet[b].bmi;
  }
  if (healthyCheck){
    renderTableData(healthyPet);
  } else {
    renderTableData(arrPet);
  }
  
}


//function collect data healthy pet
function calHealthyPet () {
  healthyPet = arrPet.filter(arr => arr.vacine == true && arr.deworm == true && arr.sterilize == true);
}

//function delete pet 
function deletePet(petId){
  
  String(petId);
  console.log(petId);
  const confirmDelete = confirm(" Are you sure!")
  if (confirmDelete){
    var find = arrPet.findIndex((a) => {
      return a.id == petId
    });
    arrPet.splice(find,1); // bat cu o dang pet nao thi khi xoa se xoa luon phan tap hop me
    //xóa danh sách trên localStorage
    console.log(arrPet);
    saveToStorage('arrPet', JSON.stringify(arrPet));//phai co JSON.stringify neu ko sẽ lỗi object
    if (healthyCheck){
      calHealthyPet();// goi lai healthypet khi arrPet thay doi phantu
      renderTableData(healthyPet);
    } else {
      
      renderTableData(arrPet);
    }
    
  }
  //check arrpet ma het thi xoa button Calculate BMI
  
  
  console.log(arrayHasElements(arrPet));
  if (!arrayHasElements(arrPet)){
    deleteElement();
  }
};
function test(){
  console.log("test code")
}

// show All pet sign in
submitBtn.addEventListener('click', function(){
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: Number(weightInput.value),
    height: Number(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vacine: vaccinatedInput.checked,
    deworm: dewormedInput.checked,
    sterilize: sterilizedInput.checked,
    date: new Date().toLocaleDateString('en-GB'),
    bmi: '?',
  }

  const validate = validateData(data);
  if (validate) {
    console.log(typeof(arrPet));
    arrPet.push(data);
    renderTableData(arrPet);
    //fuction savetoStorea call
    
    saveToStorage('arrPet', JSON.stringify(arrPet));

    //clear input
    clearInput();
  }
  

});


//hien thi thu cung khoe manh
btnHealthy.addEventListener('click', function() {
  if (healthyCheck){
    btnHealthy.textContent = "Show Healthy Pet";
    healthyCheck= false;
    renderTableData(arrPet);
  } else {
    btnHealthy.textContent = "Show All Pet";
    healthyCheck = true;
    calHealthyPet();// tao array healhyPet total Pet is healthy
    renderTableData(healthyPet);
  }
})
//////////////////////////////////
//////Assigment 2///////////////
//////////////////////////////

// function cho hien thi tat ca thu cung da luu by localStorage

renderTableData(arrPet);

//chuc nang hien thi breed theo type dog or cat
//1. tao onchange tren type bat su kien ham
//2. tao ra mot array filter theo dog or cat
//3. tao ra mot html va ham renderBreed de hien thi ben muc option breed
//console.log(localStorage.breedArr);

function typeBreed(){
  var typeAmimal = typeInput.value;
  //var breedArr = localStorage.breedArr ?? [];
  var breedArr = JSON.parse(localStorage.getItem('breedArr'));
  //console.log(typeof(breedArr));
  //console.log(breedArr);
  const typeBreedFilterArr = breedArr.filter(x => x.typeBreed == typeAmimal)
  console.log(typeBreedFilterArr.length);
  //call function renderoptiontypebreed
  renderOptionTypeBreed(typeBreedFilterArr)
  
}

//tao ra render typeBreed
function renderOptionTypeBreed (arr){
  var optionTypeBreed= '';
  for(let i = 0; i < arr.length; i++){
    optionTypeBreed += `<option>${arr[i].idBreed}</option>`
  }
  //console.log(optionTypeBreed);
  breedInput.innerHTML = optionTypeBreed;
}
typeInput.onchange = typeBreed; 

//// add event in sideBar

const sideBar = document.getElementById('sidebar');


sideBar.addEventListener('click', function(){
  sideBar.classList.toggle('active');
})
