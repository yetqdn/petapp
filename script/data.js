"use strict";

import saveAs from "./FileSaver.js";

console.log(saveAs);
const inputData = document.getElementById("input-file");
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
const form = document.querySelector("form");
let info;
let modifiArrPet = []; //dung de chua cac Pet ko trung id khi import data
let json_info_id = []; // dung de chua Id cua data import
//viet export
//tao var datasave bang arry localStorage
//su dung ham savas(var, ten.json)
exportBtn.addEventListener("click", function () {
  const blob = new Blob([localStorage.getItem("arrPet")], {
    type: "application/json",
  });
  saveAs(blob, "pet-info.json");
  alert("File Save Successful!");
  form.reset();
});

//tao import data
//load lên lại data from localstorage
//lấy dữ liệu từ file upload, push vao local cũ

const arrPet = JSON.parse(getFromStorage("arrPet")) ?? [];

importBtn.addEventListener("click", function () {
  modifiArrPet = []; //dua ve trang thai ban dau
  if (!inputData.value.length) {
    alert("Vui lòng nhập file upload!");
    return;
  }
  var file = inputData.files[0];
  var reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = function (e) {
    var info = e.target.result;
    console.log(typeof info);
    let json_info = JSON.parse(info);
    json_info.forEach((e) => {
      json_info_id.push(e.id);
    });
    for (const item of arrPet) {
      if (json_info_id.indexOf(item.id) === -1) {
        modifiArrPet.push(item); //loai bo cac id trung lap voi data import
      }
    }
    json_info.forEach((e) => {
      //push data moi import vao
      modifiArrPet.push(e);
    });

    console.log(modifiArrPet);

    saveToStorage("arrPet", JSON.stringify(modifiArrPet));
    //error
  };
  alert("File Upload Successful!");
  form.reset();
});

//// add event in sideBar

const sideBar = document.getElementById("sidebar");

sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});
