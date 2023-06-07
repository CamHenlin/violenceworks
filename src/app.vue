<template>
    <metainfo>
    <template v-slot:title="{ content }">{{ content ? `${content} | SITE_NAME` : `SITE_NAME` }}</template>
  </metainfo>
    <div id="app">
      <Nav />
      <router-view />
      <Footer />
    </div>
  </template>
  
  <script>
  import Nav from './nav.vue'
  import Footer from './footer.vue'
  
  export default {
    name: 'App',
    meta: {
      title: "Violence Works",
    },
    components: {
      Nav,
      Footer
    }
  }
  </script>
  
  <style>
#app {
  font-family: 'Open Sans', sans-serif;
  background-color: #6c6c6c;
  color: #F5F5F5;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
* {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: #f2f2f2;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2em;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;
  }

  .header h1 {
    color: #333;
    font-size: 2em;
  }

  .header nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .header nav a {
    color: #333;
    text-decoration: none;
    margin-right: 1em;
    font-size: 1.2em;
    font-weight: bold;
  }

  .header nav a:hover {
    color: #0070f3;
  }

  .header nav a.active {
    color: #0070f3;
  }

  main {
    background-color: #fff;
    color: black;
    padding: 10rem 3rem 5rem 3rem;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  .checkout-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  </style>