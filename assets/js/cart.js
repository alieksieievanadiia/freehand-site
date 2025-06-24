const cartCountEl = document.getElementById('cart-count');
let count = parseInt(localStorage.getItem('freehand_cart') || '0', 10);
cartCountEl.textContent = count;

function addToCart(qty = 1) {
    count += qty;
    localStorage.setItem('freehand_cart', count);
    cartCountEl.textContent = count;
}

// делаем функцию глобальной
window.addToCart = addToCart;
