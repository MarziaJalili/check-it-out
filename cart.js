export let cart = [];

export function addToCart(productId) {
    let matchingItem;
    cart.forEach(item => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity++
    } else {
        cart.push({
            productId,
            quantity: 1
        })
    }
};



export function updateQuantity() {
    let cartQuantity = 0;

    cart.forEach(item => {
        cartQuantity += item.quantity;
    })
    const quantityElement = document.querySelector(".total-quantity");
    quantityElement.innerText = cartQuantity;
}

export function decrementQuantity(productId) {
    let matchingItem;
    cart.forEach(item => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });
    if (matchingItem) {
        matchingItem.quantity--;
        const newCart = cart.filter(item => item !== matchingItem);
        cart = newCart;
    }

    const quantityElement = document.querySelector(".total-quantity");
    // let cartQuantity = quantityElement;

    quantityElement.innerText--;
}