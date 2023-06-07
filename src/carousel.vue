<template>
  <div class="carousel-container">
    <div class="carousel">
      <div
        v-for="(image, index) in images"
        :key="index"
        :style="{ backgroundImage: `url(${image})` }"
        :class="{ 'carousel-slide': true, 'active': index === activeIndex }"
      >
        <slot v-if="index === activeIndex" name="text"></slot>
      </div>
    </div>
    <div class="carousel-controls">
      <button @click="prevSlide">Prev</button>
      <button @click="nextSlide">Next</button>
    </div>
    <div class="carousel-dots">
      <span
        v-for="(image, index) in images"
        :key="index"
        :class="{ 'dot': true, 'active': index === activeIndex }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeIndex: 0,
      timer: null
    }
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    nextSlide() {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.activeIndex = this.activeIndex === 0 ? this.images.length - 1 : this.activeIndex - 1;
    },
    goToSlide(index) {
      this.activeIndex = index;
    },
    startAutoSlide() {
      this.timer = setInterval(() => {
        this.nextSlide();
      }, 10000);
    }
  }
}
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  max-height: 100vh;
  overflow: hidden;
}

.carousel {
  position: relative;
  width: 100%;
  height: 100vh;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 1s ease;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-controls {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
}

button {
  background-color: #d40000;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.carousel-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #bbb;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: #717171;
}
</style>
