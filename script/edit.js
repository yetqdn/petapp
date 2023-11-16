'use strict';

const breedEl = document.getElementById('tbody');
const contentForm = document.getElementById('container-form');
const inputId = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const inputType = document.getElementById('input-type');
const inputWeight = document.getElementById('input-weight');
const inputLength = document.getElementById('input-length');
const inputColor = document.getElementById('input-color-1');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');
const submitBtn = document.getElementById('submit-btn');

//const inputBreed = document.getElementById('input-breed');

const arrPetEdit = JSON.parse(getFromStorage('arrPet'))  ?? [];
console.log(arrPetEdit);
function renderBreedEdit(){
  var htmlBreedEdit = '';
  for(let i = 0; i < arrPetEdit.length; i ++){
    htmlBreedEdit += `
    <thead>
    <td scope="row">${arrPetEdit[i].id}</td>
    <td scope="row">${arrPetEdit[i].name}</td>
    <td scope="row">${arrPetEdit[i].age}</td>
    <td scope="row">${arrPetEdit[i].type}</td>
    <td scope="row">${arrPetEdit[i].weight} kg</td>
    <td scope="row">${arrPetEdit[i].height} cm</td>
    <td scope="row">${arrPetEdit[i].breed}</td>
    <td scope="row"><i class="bi bi-square-fill" style="color: ${arrPetEdit[i].color}"></i></td>
    <td scope="row">${arrPetEdit[i].vacine ? '<i class="bi bi-check-circle-fill">' : '<i class="bi bi-x-circle-fill"></i>'}</td>
    <td scope="row">${arrPetEdit[i].deworm ? '<i class="bi bi-check-circle-fill">' : '<i class="bi bi-x-circle-fill"></i>'}</td>
    <td scope="row">${arrPetEdit[i].sterilize ? '<i class="bi bi-check-circle-fill">' : '<i class="bi bi-x-circle-fill"></i>'}</td>
    <td scope="row">${arrPetEdit[i].date}</td>
    <td><button type="button" class="btn btn-warning" onclick="startEditPet('${arrPetEdit[i].id}')">Edit</button>
      </td>
    </n>
    </thead>
    `
  }
  breedEl.innerHTML = htmlBreedEdit;
}
renderBreedEdit();

//tao ham optop breed
function optionBreed(arr){
  var breedArr = JSON.parse(localStorage.getItem('breedArr'));
  console.log(breedArr);
  var typeBreedEdit = breedArr.filter(x => x.typeBreed == inputType.value);
  console.log(typeBreedEdit);
 
  var htmlBreed= '';
  for(let i = 0; i <typeBreedEdit.length; i++){
    htmlBreed += `<option value='${typeBreedEdit[i].idBreed}'>${typeBreedEdit[i].idBreed}</option>`
  }
  console.log(htmlBreed);
  inputBreed.innerHTML = htmlBreed;
}
//ham edit pet

function startEditPet(idPet){
  contentForm.classList.remove('hide');
  console.log(idPet);
  var arrPetToEdit = arrPetEdit.filter(x => x.id == idPet)
  console.log(arrPetToEdit);
  //cho hien cac tham so cua pet edit
  inputId.value = arrPetToEdit[0].id;
  inputName.value = arrPetToEdit[0].name;
  inputAge.value = arrPetToEdit[0].age;
  inputType.value = arrPetToEdit[0].type;
  inputWeight.value = arrPetToEdit[0].weight;
  inputLength.value = arrPetToEdit[0].height;
  inputColor.value = arrPetToEdit[0].color;
  //tao select cho breed
  optionBreed(arrPetToEdit);
  //chon value cho Breed
  inputBreed.value = arrPetToEdit[0].breed;
  //console.log(arrPetToEdit[0].breed);
  inputVaccinated.checked = arrPetToEdit[0].vacine;
  inputDewormed.checked = arrPetToEdit[0].deworm;
  inputSterilized.checked = arrPetToEdit[0].sterilize;  
}

//function update info after edit
//1. tao la thong tin pet moi sua voi id ko thay doi
//2. update dư lieu lai trong editpetarr
//3. add arpetedit moi chinh sua vao lai localstorage replaceItem()
//4. hien thi lai danh sach tren editfile va hide phan chinh sua
//validate data
function validateData(){
  if (inputName.value =='' || inputAge.value == NaN || inputWeight.value ==  NaN || inputLength.value == NaN){
    alert('You must fill all fields');
    return;
  } 
    
  if (inputAge.value > 15 || inputAge.value == 0){
    alert("Age must be between 1 and 15!")
    return;
  }
  if (inputWeight.value > 15 || inputWeight.value == 0){
    alert("Weight must be between 1 and 15!")
    return;
  }
  if (inputLength.value > 100 || inputLength.value == 0){
    alert("Lenght must be between 1 and 100!")
    return;
  }
  if (inputType.value == 'Select Type'){
    alert("Please select Type!")
    return;
  }
  if (inputBreed.value == 'Select Breed'){
    alert("Please select Breed!")
    return;
  }
  return true;
}
submitBtn.addEventListener('click', function(){
  var idPet = inputId.value;
  //validate data
  if (validateData()){
    //tim index cua pet edit
  var indexPet = arrPetEdit.findIndex(a => {
    return a.id == idPet;
  })
  console.log(indexPet);
  //update 
  arrPetEdit[indexPet] = {
    id : inputId.value,
    name: inputName.value,
    age: parseInt(inputAge.value),
    type: inputType.value,
    weight: Number(inputWeight.value),
    height: Number(inputLength.value),
    color: inputColor.value,
    breed: inputBreed.value,
    vacine: inputVaccinated.checked,
    deworm: inputDewormed.checked,
    sterilize: inputSterilized.checked,
    date: new Date().toLocaleDateString('en-GB'),
    bmi: '?',
  }
  console.log(arrPetEdit);
  localStorage.setItem('arrPet', JSON.stringify(arrPetEdit));
  //hide edit container
  contentForm.classList.add('hide');
  //load data
  renderBreedEdit();
  }
  
})

inputType.onchange = optionBreed;

//// add event in sideBar

const sideBar = document.getElementById('sidebar');


sideBar.addEventListener('click', function(){
  sideBar.classList.toggle('active');
})