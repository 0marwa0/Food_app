import { url } from "./constant.js";
export let main_url = "https://food-delivery-backend-fcxs.onrender.com";
let FormFood = document.getElementById("foodForm");

let table = document.getElementById("food-table");

let getFoodList = async () => {
  let token = localStorage.getItem("token");
  let response = await fetch(`${url}/food/list`, {
    headers: {
      Authorization: token,
    },
  });
  let Data = await response.json();
  showFood(Data.data);
  console.log(Data, "respone");
};
if (table) {
  getFoodList();
}
let deleteFood = async (itemid) => {
  // do fetch request
  try {
    let itemId = { id: itemid };
    let respone = await fetch(`${url}/food/remove`, {
      method: "DELETE",
      body: JSON.stringify(itemId),
    });
    let data = await respone.json();
    if (data.success) {
      getFoodList();
      alert("Item removed!");
    } else {
      alert("Unable to remove error");
    }
    console.log(data);
  } catch (error) {
    alert("Delete is not working");
  }

  // specify the mothod which is delete
  // send the id of the item which we need to delete
};

const showFood = (foodList) => {
  var thead = `
        <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>*</th>
        </tr>
    `;
  table.innerHTML = "";
  table.innerHTML = thead;
  foodList.forEach((item, index) => {
    // item is an aboject
    // let { title} = item : is destructuring
    let { title, price, category, image, description, _id } = item;
    // Inside the forEach we will create a tr
    let tr = document.createElement("tr");

    // create image td
    let tdImage = document.createElement("td");
    let img = document.createElement("img");
    img.src = `${main_url}/images/${image}`;
    img.style.width = "40px";
    tdImage.appendChild(img);
    let tdTitle = document.createElement("td");
    let tdPrice = document.createElement("td");
    let tdCategory = document.createElement("td");
    let tdDescription = document.createElement("td");
    let tAction = document.createElement("td");
    let removeBtn = document.createElement("button");
    tAction.appendChild(removeBtn);
    removeBtn.textContent = "reomve";
    tdTitle.textContent = title;
    tdCategory.textContent = category;
    tdPrice.textContent = price;
    tdDescription.textContent = description;
    removeBtn.addEventListener("click", () => {
      deleteFood(_id);
    });
    tr.appendChild(tdTitle);
    tr.appendChild(tdPrice);
    tr.appendChild(tdCategory);
    tr.appendChild(tdDescription);
    tr.appendChild(tdImage);
    tr.appendChild(tAction);
    // then we will add the tr the table
    table.appendChild(tr);
  });
};
let name = document.getElementById("name");
let description = document.getElementById("description");
let price = document.getElementById("price");
let category = document.getElementById("category");
let image = document.getElementById("image");
if (FormFood) {
  FormFood.addEventListener("click", async () => {
    console.log("subit");
    // we will converte the data to formData
    let foodFormData = new FormData();
    foodFormData.append("name", name.value);
    foodFormData.append("price", price.value);
    foodFormData.append("description", description.value);
    foodFormData.append("category", category.value);
    foodFormData.append("image", image.files[0]);

    // do the fetch request
    let respone = await fetch(`${url}/food/add`, {
      method: "POST",
      body: foodFormData,
    });
    let data = await respone.json();
    console.log(data, "done adding food");
    // specify the mothod as POST
    // send the data that we have converted to formData
  });
}

// document
//   .getElementById("foodForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const formdata = new FormData();
//     formdata.append("name", document.getElementById("name").value);
//     formdata.append(
//       "description",
//       document.getElementById("description").value
//     );
//     formdata.append("price", document.getElementById("price").value);
//     formdata.append("category", document.getElementById("category").value);
//     formdata.append("image", document.getElementById("image").files[0]);

//     const requestOptions = {
//       method: "POST",
//       body: formdata,
//     };

//     fetch(
//       "https://food-delivery-backend-fcxs.onrender.com/api/food/add",
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((result) => console.log(result))
//       .catch((error) => console.error("Error:", error));
//   });
let removeFood = () => {
  event.preventDefault(); // Prevent the default form submission

  const foodId = document.getElementById("foodId").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    id: foodId,
  });

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://food-delivery-backend-fcxs.onrender.com/api/food/remove",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error("Error:", error));
};
