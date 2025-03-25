const products = [
    { id: 0, image: 'https://m.media-amazon.com/images/I/719RiDAGXtL._SL1500_.jpg', title: 'Smart Watch1', price: 10 },
    { id: 1, image: 'https://m.media-amazon.com/images/I/61JtVmcxb0L._SL1080_.jpg', title: 'Smart Watch2', price: 20 },
    { id: 2, image: 'https://m.media-amazon.com/images/I/61QMdK2FrXL._SL1500_.jpg', title: 'GW 57', price: 30 },
    { id: 3, image: 'https://m.media-amazon.com/images/I/618qhNo1BOL._SL1000_.jpg', title: 'Smart Watch4', price: 40 },
    { id: 4, image: 'https://m.media-amazon.com/images/I/61OzNoKjo9L._SX679_.jpg', title: 'Smart Watch5', price: 50 },
    { id: 5, image: 'https://m.media-amazon.com/images/I/61HWdCh-5lL._SX679_.jpg', title: 'Smart Watch6', price: 60 },
    { id: 6, image: 'https://m.media-amazon.com/images/I/61Dev97U-8L._SX679_.jpg', title: 'Smart Watch7', price: 70 },
    { id: 7, image: 'https://m.media-amazon.com/images/I/71wN2e+2VWL._SX679_.jpg', title: 'Smart Watch8', price: 80 },
];

const categories = [...new Set(products.map(item => item))];

// Search Functionality
document.getElementById('searchBar').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filterData = categories.filter(item => item.title.toLowerCase().includes(searchData));
    displayItems(filterData);
});

// Function to Display Products in Bootstrap Cards
const displayItems = (items) => {
    document.getElementById('root').innerHTML = items.map((item, index) =>
        `<div class="col-md-4 mb-4">
            <div class="card shadow-sm">
                <a href="recreatedProductpage.html"><img src="${item.image}" class="card-img-top" alt="${item.title}"></a>
                <div class="card-body text-center">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text fw-bold">$ ${item.price}.00</p>
                    <button class="btn btn-primary" onclick="addToCart(${index})">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>`
    ).join('');
};

// Initial display
displayItems(categories);

// Cart Logic
let cart = [];

// Add to Cart Function
function addToCart(index) {
    cart.push({ ...categories[index] });
    displayCart();
}

// Remove from Cart Function
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Display Cart
function displayCart() {
    let total = 0;
    document.getElementById("count").innerText = cart.length;

    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "<p class='text-center text-muted'>Your cart is empty</p>";
        document.getElementById("total").innerHTML = "$ 0.00";
        document.getElementById("checkout").innerHTML = ""; // Hide checkout button
        return;
    }

    document.getElementById("cartItem").innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="d-flex align-items-center border-bottom py-2">
                <img src="${item.image}" class="cart-img me-3" style="width: 50px; height: 50px;">
                <div class="flex-grow-1">
                    <p class="mb-0 fw-semibold">${item.title}</p>
                    <p class="text-muted mb-0">$ ${item.price}.00</p>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    document.getElementById("total").innerHTML = "$ " + total + ".00";

    // Show checkout button when cart has items
    document.getElementById("checkout").innerHTML = `
        <button class="btn btn-success w-100 mt-3" onclick="checkout()">
            <i class="fa-solid fa-credit-card"></i> Checkout
        </button>
    `;
}

// Checkout Function (Future Expansion)
function checkout() {
    alert("Proceeding to Checkout... (Integration Pending)");
}
