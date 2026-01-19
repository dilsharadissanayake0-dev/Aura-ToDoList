const books = [
  { id: 1, name: "Harry Potter", price: 1500 },
  { id: 2, name: "Rich Dad Poor Dad", price: 1200 },
  { id: 3, name: "Atomic Habits", price: 1800 }
];
const bookList = document.getElementById("book-list");

books.forEach(book => {
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>${book.name}</h3>
    <p>Price: Rs.${book.price}</p>
    <button onclick="addToCart(${book.id})">Add to Cart</button>
  `;
  bookList.appendChild(div);
});
