<template>
  <nav>
    <div class="nav-header">
      <div class="nav-brand">
        <img src="../images/logosmall.png" alt="Logo" class="nav-logo" />
      </div>
      <div class="toggle-menu" @click="toggleMenu">
        <div class="hamburger"></div>
        <div class="hamburger"></div>
        <div class="hamburger"></div>
      </div>
    </div>
    <ul class="nav-list" :class="{ 'open': showMenu }">
      <li><router-link @click.native="killMenu" to="/">Home</router-link></li>
      <li><router-link @click.native="killMenu" to="/about">About</router-link></li>
      <li><router-link @click.native="killMenu" to="/products">Products</router-link></li>
      <li>
        <router-link  @click.native="killMenu" to="/checkout">
          Checkout
        </router-link>
        <span v-if="cartQuantity" class="cart-quantity">{{ cartQuantity }}</span>
      </li>
      <li><router-link @click.native="killMenu" to="/support">Support</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      cartQuantity: 0,
    };
  },
  mounted() {
    // this.updateMenuDisplay();
    this.fetchCartQuantity();
    // window.addEventListener("resize", this.updateMenuDisplay);

    window.addEventListener("storage", (event) => {
      if (event.key === "cart") {
        this.fetchCartQuantity();
      }
    });
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.updateMenuDisplay);
  },
  methods: {
    killMenu () {
      this.showMenu = false;
      window.scrollTo(0, 0);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;

      // scroll to the top of the page
      window.scrollTo(0, 0);
    },
    updateMenuDisplay() {
      if (window.innerWidth >= 768) {
        this.showMenu = true;
      } else {
        this.showMenu = false;
      }
    },
    fetchCartQuantity() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #fff;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  border-bottom: #d40000 1px solid;
}

.cart-quantity {
  position: relative;
  z-index: 10;
  top: -35px;
  right: 5px;
  background-color: red;
  border-radius: 50%;
  color: white;
  font-size: 0.7rem;
  padding: 3px 6px;
  font-weight: bold;
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 97px;
}

@media (max-width: 768px) {

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 57px;
  }
}
.toggle-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

@media (min-width: 768px) {

  .toggle-menu {
    display: none;
  }
}

.hamburger {
  width: 2rem;
  height: 0.25rem;
  background: #000;
  transition: all 0.3s linear;
  position: relative;
  border-radius: 10px;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  transition: all 0.3s ease-in-out;
}

.nav-list.open {
  display: flex;
}

nav ul li {
  margin: 0 1rem;
}

nav a {
  color: #000;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  border: 1px #d40000 solid;
}
@media (max-width: 960px) {
  nav a {
    
  padding: 0.5rem 0.2rem;
  }
}

@media (max-width: 801px) {
  nav ul li {
    
  margin: 0 0.3rem;
  }
}

@media (max-width: 768px) {
  nav ul li {
    
  margin: 0 1rem;
  }
}

nav a:hover {
  background-color: #b30000;
  color: #fff;
}

@media (max-width: 767px) {

  .toggle-menu {
    display: flex;
  }

  .nav-list {
    display: none;
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 90px;
    left: 0;
    background-color: #fff;
    padding: 1rem 2rem;
  }

  .nav-list.open {
    display: flex;
  }

  nav ul li {
    margin: 1rem 0;
  }

  nav a {
    color: #000;
  }
}

.nav-logo {
  height: auto;
  width: 349px;
}
@media (max-width: 960px) {
  .nav-logo {
    height: auto;
    width: 300px;
  }
}
/* 498x100 */
@media (max-width: 480px) {
  .nav-logo {
    height: auto;
    width: 249px;
  }
}

@media (max-width: 320px) {
  .nav-logo {
    height: auto;
    width: 200px;
  }
}

</style>
