'use strict';



const submitBtnBreed = document.getElementById('submit-btn-breed');
let idBreed = document.getElementById('input-breed');
let typeBreed = document.getElementById('input-type-breed');
let tableBreedEl = document.getElementById('tbody');

let breedArr = JSON.parse(getFromStorage('breedArr')) ?? [];

tableBreedEl.innerHTML = '';
//tao ham render table hien thi thong tin breed
console.log(tableBreedEl);
function renderTableBreed (breed) {

  //tableBreedEl.innerHTML = '';
  var tableBreed = '';
    
  for (let i=0; i < breed.length ; i++){
    tableBreed += `
    <thead>
    <tr>
      <td scope="">${breed.indexOf(breed[i]) + 1}</td>
      <td scope="">${breed[i].idBreed}</td>
      <td scope="">${breed[i].typeBreed}</td>
      <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${breed[i].idBreed}')">Delete</button></td>
    </tr>
    </n>
    </thead>
    `
    
  }
  console.log(tableBreed);
  tableBreedEl.innerHTML = tableBreed;
}
renderTableBreed(breedArr);
//delete breed
function deleteBreed(idBreed){
  const confirmDeleteBreed = confirm('Ban muon xoa loai Breed nay!')
  if (confirmDeleteBreed){
    var findBreed = breedArr.findIndex((a) => {
      return a.idBreed == idBreed;
    })
    console.log(findBreed);
    breedArr.splice(findBreed, 1)
    renderTableBreed(breedArr);
    saveToStorage('breedArr', JSON.stringify(breedArr));
  }else{
    renderTableBreed(breedArr);
  }
}
//validate dataBreed
function validateDataBreed(dataBreed) {
  if(dataBreed.idBreed == '' || dataBreed.typeBreed == ''){
    alert('You must fill all fields');
    return;
  };

  for(let i =0; i < breedArr.length; i++){
    if(dataBreed.idBreed == breedArr[i].idBreed & dataBreed.typeBreed == breedArr[i].typeBreed){
      alert('Breed is available');
      return;
    }
  }  
  return true
};

//event btn submit

submitBtnBreed.addEventListener('click', function(){
  
  const dataBreed = {
    idBreed : idBreed.value,
    typeBreed : typeBreed.value,
  }
  //check fields
  const checkBreed = validateDataBreed(dataBreed);
  console.log(checkBreed);
  if(checkBreed){
    console.log(dataBreed);
    breedArr.push(dataBreed);
    //tableBreedEl.innerHTML = ''//xoa toan bo table hien co
    renderTableBreed(breedArr);
    saveToStorage('breedArr', JSON.stringify(breedArr));
  }
  //clear input
  idBreed.value = '';
  typeBreed.value = 'Select Type';
});

//// add event in sideBar

const sideBar = document.getElementById('sidebar');


sideBar.addEventListener('click', function(){
  sideBar.classList.toggle('active');
})