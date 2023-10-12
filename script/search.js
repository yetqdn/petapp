'use strict';

const inputId = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const inputType = document.getElementById('input-type');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');
const btnFind = document.getElementById('find-btn');

const arrPet = JSON.parse(localStorage.getItem('arrPet'));
const arrBreed = JSON.parse(localStorage.getItem('breedArr'))
const petEl = document.getElementById('tbody');

let askId = '';
let askName = '';
let askType = '';
let askBreed = '';
let askVacine;
let askDeworm;
let askSterilized;
let arrById = [];
let arrByName = [];
let arrByType = [];
let arrByBreed = [];
let arrByVaccine = [];
let arrByDeworm = [];
let arrBySterilized = []; //arrBySterilized = [];

let arrAllBreed = [];
const arrAllType = ['Dog', 'Cat'];
//1. sử dụng công cụ include() tim ra arrPet thỏa mãn yêu cầu
// tìm theo thứ tự từ id trước, lần lượt thỏa mãn các tiêu chí all
//2. dùng hàm render cho hiên ra

//render Type va Breed
for(const e of arrBreed){
  arrAllBreed.push(e.idBreed)
}
console.log(arrAllBreed);
function showAllBreed (){
  var htmlAllBreed =  '<option></option>';
  for (let i =0; i < arrAllBreed.length; i++){
    htmlAllBreed += `
     
      <option>${arrAllBreed[i]}</option>
  `
  }
  inputBreed.innerHTML = htmlAllBreed;
  inputBreed.value ='';
  inputType.value = '';
}
showAllBreed();
//render html 

function renderPetSearch(arr){
  var htmlpetSearch = '';
  for(let i = 0; i < arr.length; i ++){
    htmlpetSearch += `
    <thead>
    <td scope="row">${arr[i].id}</td>
    <td scope="row">${arr[i].name}</td>
    <td scope="row">${arr[i].age}</td>
    <td scope="row">${arr[i].type}</td>
    <td scope="row">${arr[i].weight} kg</td>
    <td scope="row">${arr[i].height} cm</td>
    <td scope="row">${arr[i].breed}</td>
    <td scope="row"><i class="bi bi-square-fill" style="color: ${arr[i].color}"></i></td>
    <td scope="row">${arr[i].vacine ? '<i class="bi bi-check-circle-fill">' : '<i class="bi bi-x-circle-fill"></i>'}</td>
    <td scope="row">${arr[i].deworm ? '<i class="bi bi-check-circle-fill">' : '<i class="bi bi-x-circle-fill"></i>'}</td>
    <td scope="row">${arr[i].sterilize ? '<i class="bi bi-check-circle-fill">' : '<i class="bi bi-x-circle-fill"></i>'}</td>
    <td scope="row">${arr[i].date}</td>
    </n>
    </thead>
    `
  }
  petEl.innerHTML = htmlpetSearch;
}


btnFind.addEventListener('click', function(){
  arrById = [];
  arrByName = [];
  arrByType = [];
  arrByBreed = [];
  arrByVaccine = [];
  arrByDeworm = [];
  arrBySterilized = [];

  askId = inputId.value.toLowerCase();
  askName = inputName.value.toLowerCase();
  askType = inputType.value;
  askBreed = inputBreed.value;
  askVacine = inputVaccinated.checked;
  askDeworm = inputDewormed.checked;
  askSterilized = inputSterilized.checked;

 // console.log(askVacine);
  //id
  for (const e of arrPet){
    if(e.id.toLowerCase().includes(askId)){
      arrById.push(e)
    }
  }
//  console.log(arrById)
//name
  for(const e of arrById){
    if(e.name.toLowerCase().includes(askName)){
      arrByName.push(e);
    }
  }
//  console.log(arrByName);
//type
  for(const e of arrByName){
    if(e.type.includes(askType)){
      arrByType.push(e);
    }
  }
  //console.log(arrByType);
//breed
  for(const e of arrByType){
    if(e.breed.includes(askBreed)){
      arrByBreed.push(e)
    }
  }
///////viet cau truc logic tim when checked vaccine deworm Sterilized
//nhanh 1: vaccine true so sanh Deworm and Stelizi
  if (askVacine){ // nhanh 100 vaccine true, so sanh deworm va sterilized
    for(const e of arrByBreed){
      if(e.vacine){
      arrByVaccine.push(e)
      //renderPetSearch(arrByVaccine);//100 tao ra array chua vaccine true
      }
      
    }
    //if Derworm is true 110
    if(askDeworm){
      for(const e of arrByVaccine){
        if(e.deworm){
          arrByDeworm.push(e);
          //renderPetSearch(arrByDeworm) //110 tao ra array chua vaccine va derworm true
        }
      }
      //if sterilized is true 111
      if(askSterilized){
        for(const e of arrByDeworm){
          if(e.sterilize){
            arrBySterilized.push(e);
            renderPetSearch(arrBySterilized);/////////111 all true
          }
        }
      }else{
        renderPetSearch(arrByDeworm)//////////////110 true true false
      }
    }else{//vaccine true deworm false
      
      if(askSterilized){ //nhanh vaccine true and deworm is false, so sanh sterilized 10?
        for(const e of arrByVaccine){
          if(e.sterilize){
            arrBySterilized.push(e);
            renderPetSearch(arrBySterilized);///////////101 true false true
          }
          
        }
      }else{
        renderPetSearch(arrByVaccine);////////////100 true false false
      }
    }
      
  //nhanh hai: vaccine false so sanh Deworm and Stelizi
  }else{//askvaccin false
    console.log(arrByBreed);
    if(askDeworm){ //nhanh vaccine false deworm true so sanh steli
      for(const e of arrByBreed){
        if(e.deworm){
          arrByDeworm.push(e);
          console.log(arrByDeworm);
          //renderPetSearch(arrByDeworm)//010 tao array Deworm
        }
      
      }//!
      if(askSterilized){
        for(const e of arrByDeworm){
          if(e.sterilize){
            arrBySterilized.push(e);
            console.log(arrBySterilized);
            renderPetSearch(arrBySterilized);////////// 011
          }
          }
        }//!!
        else{
          renderPetSearch(arrByDeworm); /////////010
      }
    }else{//flalse false
      if(askSterilized){//nhanh 001 
        for(const e of arrByBreed){
          if(e.sterilize){
            arrBySterilized.push(e);
            renderPetSearch(arrBySterilized);////////001
          }
        }
      }else{
        renderPetSearch(arrByBreed);//////////////000 ca ba deu false
      }
    }
    
  }
});//ket thuc

//// add event in sideBar

const sideBar = document.getElementById('sidebar');


sideBar.addEventListener('click', function(){
  sideBar.classList.toggle('active');
})