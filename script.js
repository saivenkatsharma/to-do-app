function darkMode() {
    var element = document.body;
    element.className = "dark-mode";
  }
  
  function lightMode() {
    var element = document.body;
    element.className = "light-mode";
  }
  
  function getAndUpdate() {
    console.log("Updating List...");
    let title = document.getElementById("title").value;
    let desc = document.getElementById("description").value;
  
    if (localStorage.getItem("itemsJson") == null) {
      let itemJsonArray = [];
      itemJsonArray.push([title, desc]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } else {
      let itemJsonArrayStr = localStorage.getItem("itemsJson");
      let itemJsonArray = JSON.parse(itemJsonArrayStr);
      itemJsonArray.push([title, desc]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
    update();
  }
  
  function update() {
    if (localStorage.getItem("itemsJson") == null) {
      let itemJsonArray = [];
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } else {
      let itemJsonArrayStr = localStorage.getItem("itemsJson");
      let itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
  
    let tableBody = document.getElementById("tableBody");
    let str = "";
    let itemJsonArray = JSON.parse(localStorage.getItem("itemsJson"));
  
    itemJsonArray.forEach((element, index) => {
      str += `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${element[0]}</td>
          <td>${element[1]}</td> 
          <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
        </tr>`;
    });
    tableBody.innerHTML = str;
  }
  
  document.getElementById("add").addEventListener("click", getAndUpdate);
  update();
  
  function deleted(itemIndex) {
    let itemJsonArrayStr = localStorage.getItem("itemsJson");
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    update();
  }
  
  function clearStorage() {
    if (confirm("Do you really want to clear?")) {
      localStorage.clear();
      update();
    }
  }
  