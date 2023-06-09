<template>
  <div class="carousel" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="checkout-container">
      <main>
        <section class="about">
          <h1>{{ about.title }}</h1>
          <p v-html="about.description"></p>
          <img class="about-image" :src="about.image" alt="About Image">
        </section>
      </main>
    </div>
  </template>
  
  <script>
  
  export default {
    components: {
    },
    data() {
    let image = require('../images/zside.png');
      return {
        about: {
          title: '',
          description:
        `<h1>Violence Works LLC</h1>
Roseburg, OR<br><br>
Violence Works specializes in custom engineering solutions, high-performance FDM and carbon fiber race car components for Datsun 240Zs and Ferrari 308s.<br><br>

I use advanced technology, lean manufacturing processes, and extensive build expertise to design, prototype, and manufacture top-quality components.<br><br>

For any custom automotive engineering needs, feel free to contact me. I'm excited to discuss your project and help bring your vision to life.
`,
        image: require('../images/zside.jpeg')
        },
        footerText: '',
        image
      }
    }
  }
  </script>

<style>
.carousel {
  position: relative;
  width: 100%;
  min-height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  border-bottom: #d40000 1px solid;
}
.about-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #333;
  color: #fff;
}

.about-header {
  font-size: 2em;
  margin-bottom: 30px;
}

.about-image {
  width: 50%;
  margin-bottom: 30px;
}

.about-text {
  text-align: center;
  font-size: 1.2em;
}

@media (max-width: 480px) {
  .about-image img {
    max-width: 200px;
  }
}
</style>
