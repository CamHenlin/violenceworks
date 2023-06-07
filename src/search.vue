<template>
    <div class="checkout-container">
      <main class="search-main">
        <div class="search-container">
          <input type="text" v-model="searchTerm" placeholder="Search..." />
          <button @click="searchProducts">Search</button>
          <div class="search-results">
            <template v-if="searchResults.length">
              <div class="result" v-for="result in searchResults">
                <img :src="result.thumbnail" />
                <div class="result-info">
                  <h2>{{ result.name }}</h2>
                  <p>{{ result.description }}</p>
                  <router-link :to="`/product/${result.id}`">View Product</router-link>
                </div>
              </div>
            </template>
            <template v-else>
              <p>No results found</p>
            </template>
          </div>
        </div>
      </main>
    </div>
  </template>

<script>
export default {
  components: {
  },
  data() {
    return {
      searchTerm: '',
      searchResults: []
    }
  },
  methods: {
    async searchProducts() {
      // Perform the search and update searchResults
      const searchResults = await this.$store.dispatch('searchProducts', this.searchTerm)
      this.searchResults = searchResults
    }
  }
}
</script>

<style scoped>
  .search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .search-input {
    width: 50%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  
  .search-results {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
  
  .search-result {
    width: 30%;
    margin: 20px;
    text-align: center;
  }
  
  .search-result-thumbnail {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50%;
  }
  
  .search-result-title {
    font-size: 18px;
    margin-top: 10px;
  }
  
  .search-result-description {
    font-size: 14px;
    color: #333;
    margin-top: 5px;
  }
</style>