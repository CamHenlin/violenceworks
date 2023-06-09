<template>
    <div class="carousel" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="products-container">
      <main>
        <router-link v-if="selectedCategory && !selectedSubcategory" :to="'/products'" @click="selectCategory()">Back to models</router-link>
        <router-link v-if="selectedCategory && selectedSubcategory" :to="`/products/${selectedCategory}`" @click="selectCategory(`${selectedCategory}`)">Back to {{selectedCategory}}</router-link><br><br>
        <h1>{{ pageTitle }}</h1>
        <div class="products">
          <div class="products-category-list" v-if="!selectedCategory && !selectedSubcategory">
            <h2>Categories:</h2>
            <br>
            <ul>
              <li v-for="category in categories">
                <!-- do a router-link for the category -->
                <router-link :to="`/products/${category}`" @click="selectCategory(category)">
                  {{ category }}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="products-subcategory-list" v-if="selectedCategory && !selectedSubcategory">
            <h2>{{ selectedCategory }} Subcategories:</h2>
            <br>
            <ul>
              <li v-for="subcategory in subcategories">
                <!-- do a router-link for the subcategory -->
                <router-link :to="`/products/${selectedCategory}/${subcategory}`" @click="selectSubcategory(subcategory)">
                  {{ subcategory }}
                </router-link>
              </li>
            </ul>
          </div>
          <div class="products-list" v-if="selectedSubcategory">
            <h2>{{ selectedCategory }} {{ selectedSubcategory }} products</h2>
            <br>
            <ul>
                <li v-for="product in products" class="products-list-item">
                    <router-link :to="`/product/${product.id}`">
                      <div class="product-item">
                          <h3 class="product-name">{{ product.name }}</h3>
                          <div class="product-image">
                              <img :src="product.imageUrl" class="thumbnail-image" alt="product image">
                          </div>
                          <!--<p class="product-link">{{ product.description.length <= 128 ? product.description : product.description.slice(0, 196) + '...' }}</p>-->
                          <p class="product-price">${{ product.price }}.00</p>
                      </div>
                    </router-link>
                    <br><hr><br>
                </li>
            </ul>
          </div>
        </div>
        <br>
        <br>
        <router-link v-if="selectedCategory && !selectedSubcategory" :to="'/products'" @click="selectCategory()">Back to models</router-link>
        <router-link v-if="selectedCategory && selectedSubcategory" :to="`/products/${selectedCategory}`" @click="selectCategory(`${selectedCategory}`)">Back to {{selectedCategory}} products</router-link>
      </main>
    </div>
</template>
<script>
import Product from "./product.vue";
import axios from "axios";

export default {
  name: "Products",
  components: {
    Product
  },
  data() {

    let image = require('../images/turbo.png');
    switch (this.$route.params.category) {

      case "Ferrari 308":
        image = require('../images/fside.jpeg');
      break;
    }
    return {
      selectedCategory: "",
      selectedSubcategory: "",
      products: [],
      image
    };
  },
  created() {
    this.getProducts();


  },
  computed: {
    filteredProducts() {
      if (!this.selectedCategory && !this.selectedSubcategory) {
        return this.products;
      }

      if (this.selectedCategory && !this.selectedSubcategory) {
        return this.products.filter(
          product => product.category === this.selectedCategory
        );
      }

      return this.products.filter(
        product =>
          product.category === this.selectedCategory &&
          product.subcategory === this.selectedSubcategory
      );
    },
    categories() {
      return Array.from(
        new Set(this.products.map(product => product.category))
      );
    },
    subcategories() {
      return Array.from(
        new Set(
          this.products
            .filter(product => product.category === this.selectedCategory)
            .map(product => product.subcategory)
        )
      );
    }
  },
  methods: {
    getProducts() {
      // Make an API call to retrieve all products
      // and store them in the `products` data property

      axios.get(`${process.env.VUE_APP_API_URL}/api/products`).then(response => {

        console.log(`got response data`)
        console.log(response.data)
        this.products = response.data.products;

        for (let product of this.products) {

          product.imageUrl = require(`../images/${product.imageUrl[0]}`);
        }

        console.log(`got products`)
        console.log(this.products)

        if (this.$route.params.category) {

          // update this.selectedCategory with this.$route.params.category so that the update is triggered:
          this.selectedCategory = this.$route.params.category;
          console.log(`selectedCategory: ${this.selectedCategory}`)
        }

        if (this.$route.params.subCategory) {

          // update this.selectedCategory with this.$route.params.category so that the update is triggered:
          this.selectedSubcategory = this.$route.params.subCategory;
          console.log(`selectedCategory: ${this.selectedSubcategory}`)
        }
      });
    },
    selectCategory(category) {
      this.selectedCategory = category;
      if (this.selectedCategory === `Ferrari 308`) {
        this.image = require('../images/fside.jpeg')
      } else {
        this.image = require('../images/turbo.png')
      }
      this.selectedSubcategory = "";
      this.$router.push(`/products/${category}`);
    },
    selectSubcategory(subcategory) {
      this.selectedSubcategory = subcategory;
      // navigate to the subcategory page
      this.$router.push(`/products/${this.selectedCategory}/${subcategory}`);
    }
  }
};
</script>
<style scoped>

router-link {
  text-decoration: none;
}

.carousel {
  position: relative;
  width: 100%;
  min-height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  border-bottom: #d40000 1px solid;
}
.products-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.products-container main {
  width: 80%;
  min-width: 400px;
}
@media (max-width: 480px) {

  .products-container main {
    width: 80%;
    min-width: 340px;
  }
}
@media (max-width: 320px) {

  .products-container main {
    width: 80%;
    min-width: 300px;
  }

  img {
    max-width: 150px;
    height: auto !important;
  }
}
.products-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
}

.products-list {
  justify-content: center;
  width: 100%;
}

.products-list-item {
  list-style-type: none;
}

.product-item {
  min-width: 300px;
  margin: 1rem;
  text-align: center;
}

@media (max-width: 480px) {


  .product-item {
    min-width: 135px;
    margin: 1rem;
    text-align: center;
  }

}

.product-image {
  width: 100%;
  display: block;
  margin-bottom: 0rem;
}
.product-name {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}


.product-price {
  font-size: 1.2rem;
  margin-bottom: 0rem;
  color: #333;
}

.product-link {
  font-size: 1.2rem;
  color: #6772e5;
  text-decoration: none;
  cursor: pointer;
}
.product-link p {
  font-size: 1.2rem;
  color: #6772e5;
  text-decoration: none;
  cursor: pointer;
}

.back-link {
  font-size: 1.2rem;
  color: #6772e5;
  text-decoration: none;
  margin-bottom: 1rem;
  cursor: pointer;
}

.thumbnail-image {
  height: 200px;
  display: block;
}

@media (max-width: 480px) {

  .thumbnail-image {
  height: 150px;
  display: block;
}

}


hr {
  width: 100%;
  border: 0;
  border-top: 1px solid #000;
}
</style>