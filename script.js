function updateDom(data) {
  let str = "";
  for (const d of data) {
    str += "<div>";
    str += `<h2>name : ${d.name}</h2>`;
    str += `<h2>email : ${d.email}</h2>`;
    str += `<h2>imgUrl : ${d.imgUrl}</h2>`;
    str += `<h2>msg : ${d.msg}</h2>`;
    str += "</div>";
  }

  document.getElementById("print").innerHTML = str;
}

function storageData(user) {
  let users = localStorage.getItem("users");

  if (users == null) {
    //no existe creamos la clave
    users = [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    users = JSON.parse(users);
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
}

function loadData() {
  let data = JSON.parse(localStorage.getItem("users"));
  updateDom(data)
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const imgUrl = event.target.imgUrl.value;
  const msg = event.target.msg.value;

  let user = { name: name, email: email, imgUrl: imgUrl, msg: msg };

  storageData(user);

  loadData();
});

document
  .getElementById("deleteUser")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const deleteUser = event.target.nameDelete.value;

    let data = JSON.parse(localStorage.getItem("users"));

    data = data.filter((el) => el.name !== deleteUser);

    localStorage.setItem("users", JSON.stringify(data));

    updateDom(data)
  });

document.getElementById("delete").addEventListener("click", function () {
  localStorage.setItem("users", JSON.stringify([]));
  updateDom([])
});
