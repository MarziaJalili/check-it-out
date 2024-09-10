import { products } from "./dataProducts.js";
import {
    cart,
    addToCart,
    updateQuantity,
    decrementQuantity
} from "./cart.js";
const container = document.querySelector(".container-grid");
let productHTML = '';
products.forEach((product, key) => {
    productHTML += `
        <div class="product">
           <div class="thumbnail">
                <img class="dessert-image" src=${product.image.mobile} alt="product-image">
                <button class="add-btn" data-product-id=${product.id}>
                    <img src="assets/images/icon-add-to-cart.svg" alt="cart-icon">
                    <span>Add to Cart</span>
                </button>
           </div>
            <span class="category">${product.category}</span>
            <h3 class="name">${product.name}</h3>
            <span class="price">$${(product.price).toFixed(2)}</span>
        </div>
    `;
});

container.innerHTML = productHTML;

// Add event listeners to all add buttons
const addButtons = document.querySelectorAll('.add-btn');


addButtons.forEach(button => {
    button.addEventListener("click", () => {
        // change styles
        const product = button.parentElement;
        product.classList.add("active-product");

        // change the html inside the button
        button.style.display = "none";
        const newBtn = document.createElement("button");
        newBtn.className = "add-btn active-btn";

        let quantity = 1;

        // let's create the three elements of the button: 
        // decrement button
        const decrementBtn = document.createElement("button");
        decrementBtn.className = "change-quantity decrement-btn";
        decrementBtn.innerHTML = `<img src="assets/images/icon-decrement-quantity.svg">`;
        // product Id
        const productId = button.dataset.productId;
        // decrement function man
        decrementBtn.addEventListener('click', function () {
            if (quantity > 1) {
                quantity--;
                quantitySpan.innerHTML = quantity;
            } else {
                newBtn.remove();
                button.style.display = "flex";
                product.classList.remove("active-product");
            }
            decrementQuantity(productId);
            decrementPrice(productId);
        });

        // the quantity span
        const quantitySpan = document.createElement("span");
        quantitySpan.className = "quantity-span";
        quantitySpan.innerHTML = quantity;

        // increment button 
        const incrementBtn = document.createElement("button");
        incrementBtn.className = "change-quantity increment-btn";
        incrementBtn.innerHTML = `<img src="assets/images/icon-increment-quantity.svg">`;

        // increment function man
        // add to cart outside
        addToCart(productId)

        incrementBtn.addEventListener('click', function () {
            quantity++;
            quantitySpan.innerHTML = quantity;

            // add to cart inside
            addToCart(productId);

            // update the quantity
            updateQuantity();

            // total price
            totalPrice()
        });

        // changing the HTML 

        product.appendChild(newBtn);
        newBtn.appendChild(decrementBtn);
        newBtn.appendChild(quantitySpan);
        newBtn.appendChild(incrementBtn);

        // update the freaking quantity 😤
        updateQuantity();

        // generate the cart
        createCart();
        totalPrice();

        // console.log(cart);
    });
});

// create cart function dude
function createCart() {
    const orderGrid = document.querySelector(".order-grid")
    let productHTML = ``;
    cart.forEach(item => {
        const productId = parseFloat(item.productId);
        let matchingItem;
        products.forEach(product => {
            if (product.id === productId) {
                matchingItem = product;
            }
        });
        if (item.quantity > 1) {
            console.log("no sir")
        } else {

            productHTML += `
                <div class="bought-product">
                    <div class="totaled">
                    <h4>${matchingItem.name}</h4>
                    <div class="cost">
                        <span class="product-quantity">${item.quantity}x</span>
                        <span>&#64; $${(matchingItem.price).toFixed(2)}</span>
                        <span>$${(matchingItem.price * parseFloat(item.quantity)).toFixed(2)}</span>
                    </div>
                    </div>
    
                    <button class="delete-btn">
                    <img src="assets/images/icon-remove-item.svg" alt="remove-from-cart">
                    </button>
                </div>
            `
        }
    });
    orderGrid.innerHTML += productHTML;
}
const totalPriceElement = document.querySelectorAll(".total-cart-price");

// total price of the cart
let outsideTotal;
function totalPrice() {
    let total = 0;
    cart.forEach(item => {
        let matchingItem;
        const productId = parseFloat(item.productId)
        products.forEach(product => {
            if (product.id === productId) {
                matchingItem = product;
            }
        });
        const realPrice = matchingItem.price * parseFloat(item.quantity);
        total += parseFloat(realPrice);
    });
    totalPriceElement.forEach(span => {
        span.innerText = total;
    }
    );
    outsideTotal = total;
}

function decrementPrice(productId) {
    console.log(cart)
    cart.forEach(item => {
        console.log("ldf")
        // products.forEach(product => {
        //     if (product.id === item.productId) {
        //         matchingItem = product;
        //     }
        // })
    });
    // console.log(matchingItem)
}

// confirm buttom for showing up the popup
const popUp = document.querySelector(".pop-up");
document.querySelector(".js-confirm-btn").addEventListener("click", () => {
    popUp.classList.add("show");
    document.body.classList.add("darken");
});

// start a new order and refresh the page
document.querySelector(".js-start-new-order").addEventListener("click", () => {
    popUp.classList.remove("show")
    document.body.classList.remove("darken")
    location.reload();
})


















// Function to update image sources based on viewport size
// it is a copy paste tough 😁
function updateImageSources() {
    document.querySelectorAll('.dessert-image').forEach(img => {
        const src = img.src;

        if (window.innerWidth <= 600) {
            // If it's mobile, ensure we set it to mobile
            if (!src.includes('mobile')) {
                img.src = src.replace(/(desktop|tablet)/, 'mobile');
            }
        } else if (window.innerWidth > 600 && window.innerWidth <= 1024) {
            // If it's tablet, ensure we set it to tablet
            if (!src.includes('tablet')) {
                img.src = src.replace(/(desktop|mobile)/, 'tablet');
            }
        } else {
            // If it's desktop, ensure we set it to desktop
            img.src = src.replace(/(mobile|tablet)/, 'desktop');
        }
    });
}


// Call the function initially and on window resize
updateImageSources();
window.addEventListener('resize', updateImageSources);

// Initial image update
updateImageSources();

// Update images on resize
window.addEventListener('resize', updateImageSources);






