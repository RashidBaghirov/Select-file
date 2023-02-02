let inp = document.querySelector(".form-control");
let images = document.querySelector(".images");
let del = document.querySelector(".btn");
let last;
let myArr = [];
inp.addEventListener("change", function (e) {
  let files = Array.from(e.target.files);
  files.forEach((file) => {
    ShowImage(file);
    if (!file.type.includes("image/")) {
      alert("salam");
      return;
    }
  });
});

function ShowImage(file) {
  let fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.addEventListener("loadend", function () {
    let src = fileReader.result;
    let image = document.createElement("div");
    let btn = document.createElement("button");
    btn.className = "btn btn-danger";
    btn.innerText = "X";
    btn.style.position = "absolute";
    btn.style.right = "0px";
    btn.style.width = "25px";
    btn.style.height = "25px";
    btn.style.display = "flex";
    btn.style.justifyContent = "center";
    btn.style.alignItems = "center";
    image.style.width = "150px";
    image.style.height = "150px";
    image.style.margin = "10px";
    image.style.position = "relative";
    let img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    img.src = src;

    image.addEventListener("dblclick", function () {
      image.style.transition = ".5s";
      image.style.width = "180px";
      image.style.height = "180px";
      image.style.boxShadow = "1px 1px 25px 1px gray";
      myArr.push(image);
     
      console.log(myArr);
      let allDelete = document.createElement("button");
      let cancel = document.createElement("button");
      allDelete.innerHTML = "Delete";
      allDelete.style.position = "absolute";
      allDelete.style.right = "90px";
      cancel.innerHTML = "Cancel";
      cancel.style.position = "absolute";
      cancel.style.right = "10px";
      allDelete.className = "btn btn-outline-danger";
      cancel.className = "btn btn-outline-success";

      document.body.prepend(allDelete);
      document.body.prepend(cancel);

      cancel.addEventListener("click", function () {
        myArr.forEach((element) => {
          element.style.transition = ".5s";
          element.style.width = "150px";
          element.style.height = "150px";
          element.style.boxShadow = "0 0 0 0 white";
          
        });
        allDelete.remove();
        cancel.remove();
        
      });
      allDelete.addEventListener("click", function () {
        myArr.forEach((element) => {
          if (!(element.style.width == "150px")) {
            element.remove();
          }
        });
        allDelete.remove();
        cancel.remove();
      });
    });


    image.append(img);
    images.appendChild(image);
    image.appendChild(btn);
    btn.addEventListener("click", function (e) {
      let result = confirm("are you sure this photo delete");
      if (result) {
        image.remove();
        last ? last.remove() : "null";
        let addElement = document.createElement("div");
        addElement.style.width = "150px";
        addElement.style.height = "150px";
        addElement.style.display = "flex";
        addElement.style.alignItems = "center";
        let addButton = document.createElement("button");
        addButton.className = "btn btn-warning";
        addButton.innerText = "Give back";
        addButton.style.width = "100%";
        addButton.style.width = "100%";
        addButton.style.fontSize = "15px";
        addElement.append(addButton);
        document.body.append(addElement);
        last = addElement;
        addButton.addEventListener("click", function () {
          this.parentElement.remove();
          images.append(image);
        });
      }
    });
  });
}
