let table = document.getElementById("product-table");
let btn_new_product = document.getElementById("new-product");
let url = "https://fakestoreapi.com/products";
let addNwPrdouct = async () => {
  // preaper the data of the new product
  let newProcuct = {
    title: "new product",
    price: 50835,
    category: "Women",
    description: "test",
  };
  // do fetch request
  // in the fetch specify the mothod of the request
  // and the data you want to send
  let respone = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newProcuct),
  });
  if (respone.status == 200) {
    // Calle the fetch again to bring
    fetchProductData();
  }

  console.log(respone, "res");
};
btn_new_product.addEventListener("click", () => {
  addNwPrdouct();
});

const showProducts = (products) => {
  console.log(products, "my product");
  // loop throguh products using forEach
  // products = products.splice(4, 5);
  products.forEach((item) => {
    // item is an aboject
    // let { title} = item : is destructuring
    let { title, price, category, image, description, id } = item;
    // Inside the forEach we will create a tr
    let tr = document.createElement("tr");
    // then we will create td
    let tdId = document.createElement("td");
    // give this ted the right content
    tdId.textContent = id;
    // then we add this td to the tr
    tr.appendChild(tdId);

    // create image td
    let tdImage = document.createElement("td");
    let img = document.createElement("img");
    img.src = image;
    img.style.width = "40px";
    tdImage.appendChild(img);
    let tdTitle = document.createElement("td");
    let tdPrice = document.createElement("td");
    let tdCategory = document.createElement("td");
    let tdDescription = document.createElement("td");
    tdTitle.textContent = title;
    tdCategory.textContent = category;
    tdPrice.textContent = price;
    tdDescription.textContent = description;
    tr.appendChild(tdTitle);
    tr.appendChild(tdPrice);
    tr.appendChild(tdCategory);
    tr.appendChild(tdDescription);
    tr.appendChild(tdImage);
    // then we will add the tr the table
    table.appendChild(tr);
  });
};
const fetchProductData = async () => {
  // user try catch to fetch data
  try {
    // insdie try will wait the fetch request
    let respone = await fetch("https://fakestoreapi.com/products");
    // convert the respone to json format
    let data = await respone.json();
    console.log(data, "this should has the new");
    // send the data that I get as respone to a function called showProducts
    showProducts(data);
    // showProducts is function that will print the data in the httml
  } catch (error) {
    console.log(error);
  }
};
fetchProductData();

// function showProducts(products) {
//   const tableBody = document.querySelector("#product-table tbody");

//   products.forEach((product) => {
//     const row = document.createElement("tr");

//     const idCell = document.createElement("th");
//     idCell.textContent = product.id;
//     row.appendChild(idCell);

//     const titleCell = document.createElement("td");
//     titleCell.textContent = product.title;
//     row.appendChild(titleCell);

//     const priceCell = document.createElement("td");
//     priceCell.textContent = product.price;
//     row.appendChild(priceCell);

//     const descriptionCell = document.createElement("td");
//     descriptionCell.textContent = product.description;
//     row.appendChild(descriptionCell);

//     const categoryCell = document.createElement("td");
//     categoryCell.textContent = product.category;
//     row.appendChild(categoryCell);

//     const imageCell = document.createElement("td");
//     const image = document.createElement("img");
//     image.src = product.image;
//     image.alt = product.title;
//     image.style.width = "50px";
//     imageCell.appendChild(image);
//     row.appendChild(imageCell);

//     tableBody.appendChild(row);
//   });
// }

// Call the function to fetch data and populate the table
