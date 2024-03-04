let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let dark = document.getElementById("dark");
let light = document.getElementById("light");
let body = document.getElementById("body");
let mood = "create";
let tmp;

//get total
function getTotal(){
    if(price.value != ""){
        let result = (+price.value +  +taxes.value +  +ads.value) 
        -  +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
        }else{
       total.innerHTML = "";
       total.style.background = "#a00d02";
        }
}
//creat product
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}
submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if( title.value !=''
    && price.value !=''
    && category.value !=''
    && newpro.count < 101){
            if(mood === "create"){
               if(newpro.count > 1){
               for(let i = 0; i < newpro.count; i++){
                datapro.push(newpro);
                }
        }else{
          datapro.push(newpro);
        }
    }else{
        datapro[ tmp ]  =  newpro;
         mood = "create"
        submit.innerHTML = "create";
        count.style.display = "block";
    }
    
    localStorage.setItem('product',    JSON.stringify(datapro)    );
    cleardata()
    showdata()
    }
}
    
//clean data
function cleardata(){
        title:title.value = '';
        price:price.value = '';
        taxes:taxes.value = '';
        ads:ads.value = '';
        discount:discount.value = '';
        total:total.innerHTML = '';
        count:count.value = '';
        category:category.value = '';
}
//read
function showdata(){
    getTotal()
    let table = '';
    for(let i = 0; i < datapro.length;i++){
        table += `           
        <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>
        </tr>
        `
    }
     document.getElementById("tbody").innerHTML = table;
    let btndelete = document.getElementById("deleteall");
    if(datapro.length > 0){
        btndelete.innerHTML = `
        <button onclick="deleteall()" >Delete All (${datapro.length})</button>
        `
    }else{
      btndelete.innerHTML = '';
    }
}
//delete
function deleteData(i)
{
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showdata()
}
function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}
// update
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display = "none";
    category.value = datapro[i].category;
    submit.innerHTML = "update";
    mood = "update";
    tmp = i ;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
 //search
let searchmood ="title";
function getsearch(id){
    let search = document.getElementById("search");
    if(id == "searchtitle"){
        searchmood = "title";
        search.placeholder = "search by ";
    }else{
        searchmood = "category";
        search.placeholder = "search by ";
    }
search.placeholder = "search by "+ searchmood;
search.focus()
search.value ='';
showdata()

}
function searchdata(value){
  let table='';
  for(let i =0; i< datapro.length;i++){
if(searchmood == "title"){
         if(datapro[i].title.includes(value.toLowerCase())){
                table += `
         <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>
        </tr>`;
      }
    }else{
if(datapro[i].category.includes(value.toLowerCase())){
                table +=`
      <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>
        </tr>`;
          }
      }
}cleardata()
   document.getElementById("tbody").innerHTML = table;
}
//style mode

light.onclick = function(){
 body.style.background = "#dcdcdc";
    body.style.color = "#111";
 title.style.background = "#daa520";
    title.style.color = "#111";
  price.style.background = "#daa520";
    price.style.color = "#111";
 taxes.style.background = "#daa520";
    taxes.style.color = "#111";
 ads.style.background = "#daa520";
    ads.style.color = "#111";
 count.style.background = "#daa520";
    count.style.color = "#111";
 discount.style.background = "#daa520";
    discount.style.color = "#111";
 category.style.background = "#daa520";
    category.style.color = "#111";
 search.style.background = "#daa520";
    search.style.color = "#111";
total.style.color = "#fff";
}
dark.onclick = function(){
 body.style.background = "#222";
    body.style.color = "#fff";
 title.style.background = "#111";
    title.style.color = "#fff";
  price.style.background = "#111";
    price.style.color = "#fff";
 taxes.style.background = "#111";
    taxes.style.color = "#fff";
 ads.style.background = "#111";
    ads.style.color = "#fff";
 count.style.background = "#111";
    count.style.color = "#fff";
 discount.style.background = "#111";
    discount.style.color = "#fff";
 category.style.background = "#111";
    category.style.color = "#fff";
 search.style.background = "#111";
    search.style.color = "#fff";
total.style.color = "#fff";
}
showdata()