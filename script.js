//1)  VARIABLES
const balance=document.getElementById("balance");

const money_plus=document.getElementById("money-plus");

const money_minus=document.getElementById("money-minus");

const list=document.getElementById("list");

const form=document.getElementById("form");

const text=document.getElementById("text");

const amount=document.getElementById("amount");

// ----------------------------------------------------------------------------------------------

//last 
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// -------------------------------------------------------------------------------------------------

//5) - for text and amoont in the form, after filling text and amount and clikcing add transac, history shd be generated automatically and balance also updated.

//Add New Transaction
function addTransaction(e){
    // upon clicking add trans, form is getting cleared
  e.preventDefault();
  if(text.value.trim() === '' || amount.value.trim() === ''){
    alert('please add text and amount')
    // if user hasnt entered adn left blank -> alert
  }else{
    const transaction = {
      id:`${Date.now()}`,
      text:text.value,
      amount: +amount.value
    }
    
    // console.log(transaction);  
    // {id: "1630637350449", text: "see me?", amount: 1000}

    transactions.push(transaction);
   //console.log(transactions)--> array of objects

    addTransactionDOM(transaction);
   
    updateValues(); 
    // upon adding update in localstorage too
    updateLocalStorage();
    // empyting after accesing values 
    text.value='';
    amount.value='';
  }
}


// -------------------------------------------------------------------------------------------------

//2
//generating a function to get data from and display in history ie: Add Trasactions to DOM list

function addTransactionDOM(transaction) {
  //to GET sign - if smaller than 0 then minus
  const sign = transaction.amount < 0 ? "-" : "+";

//   creating an element 
  const item = document.createElement("li");

  //Adding Class for that item (which is li) based on Value
  item.classList.add(
    transaction.amount < 0 ? "minus" : "plus"
  );

//   generating list item in history , adding span buttons
// abs - eg: -20 it will show 20
  item.innerHTML = `
    ${transaction.text} <span>${sign}₹${Math.abs(
    transaction.amount
  )}</span>

  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
    // each item append
  list.appendChild(item);
}

// -------------------------------------------------------------------------------------------------

//4 - whateva transactions eg: 4 arrays of trans,it will fetch each value

//Update the balance income and expence
function updateValues() {
  const amounts = transactions.map(
    (transaction) => transaction.amount
  );
  // console.log(amounts);
  const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2); //eg: 0.00
  
  const income = amounts
    .filter((item) => item > 0)    
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  //console.log(income);
  // so first filtering out positive elements then finding sum of only pos

  const expense = (amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0) 
    ).toFixed(2);
  //console.log(expense);

    balance.innerText=`₹${total}`;
    money_plus.innerText = `₹${income}`;
    money_minus.innerText = `₹${expense}`;
  //console.log(balance);
}

// -------------------------------------------------------------------------------------------------

//6 

//Remove Transaction by ID
function removeTransaction(id){
  console.log(id);
  transactions = transactions.filter(transaction => parseInt(transaction.id) !== id);
  // console.log(transactions);  --> parseInt imp!! coz in the array its of string type
  updateLocalStorage();
  Init();
}
//last
//update Local Storage Transaction
function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

// -------------------------------------------------------------------------------------------------

//3 - fetch each item one by one by loopinh and pass to addtransaction function

//Init 
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
// to update values
  updateValues();
}

Init();

// submit event 
form.addEventListener('submit',addTransaction);
