<template>
  <div class="checkout-container">
    <main>
      <!-- link back to the previous products page, where the selected category and subcategory should come from this.product.category and this.product.subcategory -->
      <router-link :to="`/products/${product.category}/${product.subcategory}`" @click="selectCategory()">Back to {{product.category }} / {{ product.subcategory }} products</router-link>

      <h1>{{ product.name }}</h1>
      <div class="product">
        <img v-if="selectedImage" :src="selectedImage" class="product-image" />
        <div class="thumbnail-container">
          <img
            v-for="image in product.images"
            :src="image"
            @click="selectImage(image)"
            class="thumbnail"
          />
        </div>
        <p>{{ product.description }}</p>
        <br>
        <br>
        <div class="call-to-action">
          <div v-if="!itemAdded" class="quantity-selection">
            <label for="quantity">Quantity:&nbsp;</label>
            <input type="number" id="quantity" v-model.number="quantity" min="1" step="1" />
          </div>
          <br>
          <button v-if="!itemAdded" @click="addToCart" class="add-to-cart-btn">Add to Cart</button>
          <!-- now if the item is added, show a checkout link instead and take the user to the checkout page -->
          <router-link v-if="itemAdded" :to="`/checkout`">Checkout now</router-link>
        </div>
      </div>
    </main>
  </div>
</template>
<script>

import axios from "axios";

export default {
  name: "Product",
  components: {
  },
  data() {
    return {
      product: {},
      selectedImage: null,
      quantity: 1,
      itemAdded: false
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/api/products/${this.$route.params.id}`)
        .then(response => {
          this.product = response.data.product;
          this.selectedImage = require(`../images/${this.product.imageUrl[0]}`);

          this.product.images = this.product.imageUrl.map(image => {
            return require(`../images/${image}`);
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    selectImage(image) {
      this.selectedImage = image;
    },
    addToCart() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const productIndex = cart.findIndex(item => item.id === this.product.id);

      if (productIndex !== -1) {
        cart[productIndex].quantity += this.quantity;
      } else {
        cart.push({
          id: this.product.id,
          name: this.product.name,
          imageUrl: this.product.imageUrl[0],
          price: this.product.price,
          quantity: this.quantity
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // now disable the add to cart button by changing itemAdded
      this.itemAdded = true;
      
    }
  }
};
</script>

<style>
  .checkout-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .product-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .product-image-large {
    width: 70%;
    height: auto;
    margin-bottom: 20px;
  }

  .product-thumbnail-container {
    display: flex;
    justify-content: center;
  }

  .product-thumbnail {
    width: 50px;
    height: 50px;
    margin: 0 10px;
    cursor: pointer;
  }

  .product-thumbnail.active {
    border: 2px solid #333;
  }

  .product img {
    max-width: 800px;
    max-height: 800px;
  }

  .product-info {
    text-align: center;
    margin-top: 20px;
  }

  /* set up a product-image class to prevent images from displaying too large, biggest we want is 768 wide */
  .product-image {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  .call-to-action {
    justify-content: center;
    margin-top: 20px;
    border: 2px #d40000 dotted;
    padding: 20px;
  }

  .add-to-cart-btn {
    background-color: #4CAF50;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 8px;
    padding: 10px 20px;
    transition: background-color 0.2s ease;
  }

  .add-to-cart-btn:hover {
    background-color: #45a049;
  }

  img.thumbnail {
    max-width: 100px;
    max-height: 100px;
  }
</style>