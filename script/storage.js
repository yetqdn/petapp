'use strict';


function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}

// function saveToStorage() {
//   const arrPetJson = JSON.stringify(arrPet);
//   localStorage.setItem('arrPetJson', arrPetJson);
// }

// function getFromStorage(ar, defaultVal) {
//   localStorage.getItem(key) ?? defaultVal;
// }

// if (typeof(Storage) !== "undefined") {
//   // Code for localStorage/sessionStorage.
//   console.log("sure")
// } else {
//   // Sorry! No Web Storage support..
//   console.log('noStorage')
// }

// const username = "John Doe";
// sessionStorage.setItem("user", username);
// const username2 = sessionStorage.getItem('user');

// //sessionStorage.removeItem('username');
// console.log(username2);
// console.log(username);

// localStorage.setItem('user2', username);
// const userName3 = localStorage.getItem('user2')
// console.log(userName3);

