const CART_KEY = 'cart';

const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

const addProductToCart = product => {
  let cart = getCart();
  let productIndex = cart.findIndex(p => p.id === product.id);
  if (productIndex === -1) {
    cart.push({ ...product, quantity: 1 });
  } else {
    cart[productIndex].quantity++;
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const removeProductFromCart = productId => {
  let cart = getCart();
  let productIndex = cart.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const updateProductQuantity = (productId, quantity) => {
  let cart = getCart();
  let productIndex = cart.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    cart[productIndex].quantity = quantity;
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const getCartTotal = () => {
  let cart = getCart();
  return cart.reduce((total, product) => total + product.price * product.quantity, 0);
};

const getCartQuantity = () => {
  let cart = getCart();
  return cart.reduce((total, product) => total + product.quantity, 0);
};

const Cart = {
    getCart,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    getCartTotal,
    getCartQuantity
}

export default Cart