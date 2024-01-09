// crud (create,retrieve,update,delete)
//validation 
//regex(regular expression)
// js DOM document object model


var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var submitBtn = document.getElementById("submitBtn");
var inputs = document.getElementsByClassName("form-control");
var searchInput= document.getElementById("search");
var nameAlert= document.getElementById("nameAlert");
var priceAlert= document.getElementById("priceAlert");
var categoryAlert= document.getElementById("categoryAlert");
var descriptionAlert= document.getElementById("descriptionAlert");
var products=[]; 
var currentIndex=0;

  productName.onkeyup=function()
{
  var nameRejex=/^[A-ZAa-z]{1,}(\s)*([A-Za-z]{1,})*$/;/* /^[A-Z][a-z]{1,}$\s[A-Za-z]/ */
  if(!nameRejex.test(productName.value))
  {
    //submitBtn.disabled='true';
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
  }
  else
  {
    //submitBtn.removeAttribute("disabled");
    productName.classList.remove("is-invalid");
    productName.classList.add("is-valid");
    nameAlert.classList.add("d-none");
  }
}

productPrice.onkeyup=function()
{
  var PriceRejex=/^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/
  if(!PriceRejex.test(productPrice.value))
  {
    //submitBtn.disabled='true';
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    priceAlert.classList.remove("d-none");
  }
  else
  {
    //submitBtn.removeAttribute("disabled");
    productPrice.classList.remove("is-invalid");
    productPrice.classList.add("is-valid");
    priceAlert.classList.add("d-none");
  }
}

productCategory.onkeyup=function()
{
  var categoryRejex=/(^[A-Za-z]{1,}(\s)*[0-9(\s)*A-Za-z]{0,}$)/
  if(!categoryRejex.test(productCategory.value))
  {
    //submitBtn.disabled='true';
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    categoryAlert.classList.remove("d-none");
  }
  else
  {
   // submitBtn.removeAttribute("disabled");
    productCategory.classList.remove("is-invalid");
    productCategory.classList.add("is-valid");
    categoryAlert.classList.add("d-none");
  }
}

productDescription.onkeyup=function()
{
  var descriptionRejex=/(^[A-Za-z0-9]{1,}(\s)*[0-9(\s)*A-Za-z]{0,}$)/
  if(!descriptionRejex.test(productDescription.value))
  {
    submitBtn.disabled='true';
    productDescription.classList.add("is-invalid");
    productDescription.classList.remove("is-valid");
    descriptionAlert.classList.remove("d-none");
  }
  else
  {
    submitBtn.removeAttribute("disabled");
    productDescription.classList.remove("is-invalid");
    productDescription.classList.add("is-valid");
    descriptionAlert.classList.add("d-none");
  }
}


if(JSON.parse(localStorage.getItem("productList"))!=null)
{
  products=JSON.parse(localStorage.getItem("productList"));
  displayProduct();
}


submitBtn.onclick=function()
{
  if(submitBtn.innerHTML=="Add Product")
  {
    addProduct();
    submitBtn.disabled='true';
    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productCategory.classList.remove("is-valid");
    productDescription.classList.remove("is-valid");
  }
  else
  {
    updateProduct();
  }
  displayProduct();
  clearForm();
}

function addProduct()
{
  var product = 
  {
    name:productName.value,
    price:productPrice.value,
    category:productCategory.value,
    description:productDescription.value
  }
  products.push(product);
  localStorage.setItem("productList",JSON.stringify(products));
}

function displayProduct()
{
  var cartona = '';
  for(var i=0 ;i<products.length;i++)
  {
    cartona+=`
          <tr>
            <td>${i+1}</td>
            <td scope="row">${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].description}</td>
            <td><button onclick="deleteBtn(${i})" type="button" class="btn btn-success rounded-pill">Delete</button></td>
            <td><button onclick="getProductInfo(${i})" type="button" class="btn btn-warning rounded-pill">Update</button></td>
          </tr>
    `
  }
  document.getElementById("tableBody").innerHTML=cartona;
}

function clearForm()
{
  for(var i = 0;i<inputs.length;i++)
  {
    inputs[i].value="";
  }
/*   productName.value="";
  productPrice.value="";
  productCategory.value="";
  productDescription.value=""; */
}


function deleteBtn(index)
{
  products.splice(index,1);
  displayProduct();
  localStorage.setItem("productList",JSON.stringify(products));
}

searchInput.onkeyup=function()
{
  var cartona = '';
  var val=searchInput.value;
  for(var i=0 ;i<products.length;i++)
  {
    if(products[i].name.toLowerCase().includes(val.toLowerCase()))
    {
      cartona+=`
      <tr>
        <td>${i+1}</td>
        <td scope="row">${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].description}</td>
        <td><button onclick="deleteBtn(${i})" type="button" class="btn btn-success rounded-pill">Delete</button></td>
        <td><button onclick="updateBtn()" type="button" class="btn btn-warning rounded-pill">Update</button></td>
      </tr>
`
    }

  }
  document.getElementById("tableBody").innerHTML=cartona;
}

function getProductInfo(index)
{
  productName.value=products[index].name;
  productPrice.value=products[index].price;
  productCategory.value=products[index].category;
  productDescription.value=products[index].description;
  submitBtn.innerHTML="Update Product"
  currentIndex=index;
}


function updateProduct()
{
  var product = 
  {
    name:productName.value,
    price:productPrice.value,
    category:productCategory.value,
    description:productDescription.value
  }
  products[currentIndex]=product;
  localStorage.setItem("productList",JSON.stringify(products));
  submitBtn.innerHTML="Add Product"
}

