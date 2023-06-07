<template>
  <div class="home-container">
    <section class="hero">
      <Carousel :images="heroImages">
        <template #text>
          <div class="hero-text">
            <h1>Start Your Build Today</h1>
            <router-link to="/products" class="btn-shop-now"><b>Shop Now</b></router-link>
          </div>
        </template>
      </Carousel>
    </section>
    <section class="featured-products">
      <h2>Featured Products</h2>
      <div class="products-grid">
        <div v-for="product in featuredProducts" :key="product.id" class="product-card">
          <router-link :to="`/product/${product.id}`">
            <img :src="`${product.imageUrl}`" :alt="product.name" />
            <h3>{{ product.name }}</h3>
            <h4>${{ product.price }}.00</h4>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Carousel from './carousel.vue'
import axios from 'axios'

export default {
  components: {
    Carousel
  },
  data() {
    return {
      heroImages: [require('../images/heros/hero1.jpg'), require('../images/heros/frear.jpg')],
      featuredProducts: [
      ]
    }
  },
  mounted() {
    // Fetch your hero images and featured products here
  },
  created () {

    this.getProducts();
  },
  methods: {
    getProducts() {
      // Make an API call to retrieve all products
      // and store them in the `products` data property

      axios.get(`${process.env.VUE_APP_API_URL}/api/products`).then(response => {

        console.log(`got response data`)
        console.log(response.data)
        let products = response.data.products;

        // take 3 random products
        let featuredProducts = products.sort(() => Math.random() - Math.random()).slice(0, 3);

        // now order the remaining by price
        featuredProducts = featuredProducts.sort((a, b) => a.price - b.price);

        for (let product of featuredProducts) {

          product.imageUrl = require(`../images/${product.imageUrl[0]}`);
        }

        this.featuredProducts = featuredProducts;
      })


    }
  }

}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.hero {
  position: relative;
  width: 100%;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
}


@media (max-width: 480px) {

  .hero-text {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
  }
}

.hero-text h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  padding-bottom: 50px;
}

.btn-shop-now {
  background-color: #d40000;
  color: #fff;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 5px;
}

.featured-products {
  width: 80%;
  text-align: center;
  margin: 2rem auto;
  color: #333;
  background-color: #fff;
}

.products-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.product-card {
  width: 30%;
  margin-bottom: 2rem;
}

.product-card img {
  width: 100%;
}

.product-card h4 {
  text-decoration: none !important;
  color: black;
  font-size: 10px;
}


@media (max-width: 480px) {

  .product-card {
    width: 30%;
    margin-bottom: 2rem;
    padding: 10px;
    font-size: 12px;
  }
}
</style>
