const container = document.querySelector(".js-list");
const totalPrice = document.querySelector(".js-total-price");
const clear = document.querySelector(".js-clear");

const LS_KEY = 'basket';


const products = JSON.parse(localStorage.getItem(LS_KEY)) || [];
let totalCost;

if(products.length) {
    clear.hidden = false;
    totalCost = products.reduce((acc, { qty, price}) => acc += qty * price , 0);
}

totalPrice.textContent = totalCost ? `Total cost ${totalCost} грн` : "Your basket is empty";
container.insertAdjacentHTML("beforeend", createMarkup(products));
clear.addEventListener("click", handleClick);

function handleClick() {
    localStorage.removeItem(LS_KEY);
    window.location.href = "./03-shop.html";
}

function createMarkup(arr) {
    return arr.map(({ id, img, price, qty, name}) => `
        <li class="cart-item" data-id=${id}>
            <img src="${img}" alt="${name}" class="product-img">
            <h2>${name}</h2>
            <p class="qty">Quantity: ${qty}</p>
            <p class="price">Total price: ${qty * price} грн</p>
            <button type="button" class="delete">Delete product</button>
        </li>
    `).join("");
}


function deleteProduct(arr) {
    const product = arr.find((item) => item.id === +event.currentTarget.dataset.id);
    if (product.qty > 1) {
        product.qty -= 1;
        const qtyEl = event.currentTarget.querySelector(".qty");
        const priceEl = event.currentTarget.querySelector(".price");
        qtyEl.textContent = `Quantity: ${product.qty}`;
        priceEl.textContent = `Total price: ${product.qty * product.price} грн`;
    } else {
        product.qty = 0;
        event.currentTarget.remove();
    }
    totalCost = products.reduce((acc, { qty, price }) => acc += qty * price, 0);
    totalPrice.textContent = totalCost ? `Total cost ${totalCost} грн` : "Your basket is empty";
    localStorage.setItem(LS_KEY, JSON.stringify(products.filter(item => item.qty !== 0)));
}

const cart = document.querySelectorAll('.cart-item');

cart.forEach(item => item.addEventListener('click', event => {
    if (event.target.nodeName !== "BUTTON") {
        return;
    }

    deleteProduct(products)
}));
