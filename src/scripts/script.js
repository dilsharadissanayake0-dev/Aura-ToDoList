const books = [
  { id: 1, name: "Harry Potter", price: 1500 },
  { id: 2, name: "Rich Dad Poor Dad", price: 1200 },
  { id: 3, name: "Atomic Habits", price: 1800 }
];

const bookList = document.getElementById("book-list");
const cartList = document.getElementById("cart-list");
const totalEl = document.getElementById("total");
let cart = [];

function renderBooks() {
  books.forEach(book => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${book.name}</h3>
      <p>Price: Rs.${book.price}</p>
      <button onclick="addToCart(${book.id})">Add to Cart</button>
    `;
    bookList.appendChild(div);
  });
}

function addToCart(id){
  const book = books.find(b => b.id === id);
  cart.push(book);
  renderCart();
}

function removeFromCart(index){
  cart.splice(index, 1);
  renderCart();
}

function renderCart(){
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach((book, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${book.name} - Rs.${book.price} <button onclick="removeFromCart(${i})">Remove</button>`;
    cartList.appendChild(li);
    total += book.price;
  });
  totalEl.innerText = total;
}

renderBooks();
