<template>
  <div class="checkout-container">
    <main>
      <h1>Checkout</h1>
      <div class="checkout-header">
        <h2>Cart</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td><img class="item-image" :src="item.image" alt="product thumbnail"/><br><span>{{ item.name }}</span></td>
              <td>${{ item.price }}.00</td>
              <td>
                <input type="number" v-model.number="item.quantity" min="1" @input="updateQuantity(item)" style="max-width: 50px;" />
              </td>
              <td>${{ item.price * item.quantity }}.00</td>
              <td>
                <button @click="removeFromCart(item)">Remove</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">Subtotal:</td>
              <td>${{ subtotal }}.00</td>
            </tr>
            <tr>
              <td colspan="4">Shipping:</td>
              <td>${{ shipping }}.00</td>
            </tr>
            <tr>
              <td colspan="4">Total:</td>
              <td>${{ total }}.00</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <form class="checkout-form">
        <h2>Shipping Details</h2>
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="shippingDetails.name" class="form-input"/>
        </div>
        <div>
          <label for="email">Email Address:</label>
          <input type="text" id="email" v-model="shippingDetails.email" class="form-input"/>
        </div>
        <div>
          <label for="phone">Phone Number:</label>
          <input type="text" id="phone" v-model="shippingDetails.phone" class="form-input"/>
        </div>
        <div>
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="shippingDetails.address" class="form-input"/>
        </div>
        <div>
          <label for="city">City:</label>
          <input type="text" id="city" v-model="shippingDetails.city" class="form-input"/>
        </div>
        <div>
          <label for="state">State:</label>
          <input type="text" id="state" v-model="shippingDetails.state" class="form-input"/>
        </div>
        <div>
          <label for="zip">Zip Code:</label>
          <input type="text" id="zip" v-model="shippingDetails.zip" class="form-input"/>
        </div>
      </form>
      <!-- <CheckoutButton class="stripe-checkout-button"/>-->
      <!-- add a simple submit form button for now -->
      <button type="submit" @click="sendCheckoutSubmission" class="stripe-checkout-button">Checkout</button>
      <p class="checkout-description">By clicking the checkout button, you will be taken to the secure checkout page to complete your purchase. Your shipping details will be used to calculate shipping costs and complete the transaction.</p>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import CheckoutButton from './stripe-checkout.vue';

export default {
  components: {
    CheckoutButton,
  },
  data() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || []

    // we need to require in all of the images on item.imageUrl
    for (let cartitem of cartItems) {
      cartitem.image = require(`../images/${cartitem.imageUrl}`)
    }

    return {
      shippingDetails: {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      },
      cartItems
    };
  },
  methods: {
    removeFromCart(item) {
      const index = this.cartItems.indexOf(item)
      if (index > -1) {
        this.cartItems.splice(index, 1)
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    },
    updateQuantity(item) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    },
    async sendCheckoutSubmission () {

      // send the shippingDetails and cartItems to the server endpoint /api/checkoutsubmission and then clear the cart
      await axios.post(`${process.env.VUE_APP_API_URL}/api/checkoutsubmission`, { shippingDetails: this.shippingDetails, cartItems: this.cartItems })
        .then(response => {
          alert(`done`)
          // clear the cart
          this.cartItems = []
          localStorage.setItem('cart', JSON.stringify(this.cartItems))
          // redirect to the success page
          this.$router.push('/success')
        })
        .catch(err => {
          alert(`error`)
          console.log(err)
        })
    }
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    },
    shipping() {
      // implement your shipping cost logic here
      return 10;
    },
    total() {
      return this.subtotal + this.shipping;
    }
  }
};
</script>

<style scoped>
.checkout-container {
    max-width: 1080px;
    margin: auto;
    padding: 15px;
}

.checkout-header {
    margin-bottom: 20px;
}

.checkout-container img {
    max-width: 200px;
    height: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    overflow-x: auto;
    display: block;
}

th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #2d3e50;
    color: #fff;
    font-weight: bold;
}

tbody tr:nth-child(even) {
    background-color: #f3f3f3;
}

tbody tr:hover {
    background-color: #f1f1f1;
}

tfoot td {
    font-weight: bold;
}

tfoot tr:first-child td {
    border-top: 2px solid #2d3e50;
}
@media screen and (max-width: 768px) {
    table, thead, tbody, th, td, tr {
        display: block;
    }

    img {max-width: 125px; height: auto;}
    thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    tr {
        border: 1px solid #ccc;
    }

    td {
        border: none;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-left: 30%;
        text-align: right;
    }

    td:before {
        position: absolute;
        top: 6px;
        left: 6px;
        padding-right: 10px;
        white-space: nowrap;
        text-align: left;
        font-weight: bold;
    }

    tbody td:nth-of-type(1):before { content: "Product"; }
    tbody td:nth-of-type(2):before { content: "Price"; }
    tbody td:nth-of-type(3):before { content: "Quantity"; }
    tbody td:nth-of-type(4):before { content: "Total"; }
    tbody td:nth-of-type(5):before { content: "Action"; }

    tfoot {
        display: table-row-group;
        min-width: 200px;
    }

    tfoot td {
      min-width: 200px;
    }

}

@media screen and (min-width: 769px) {
    th, td {
        display: table-cell;
    }

    td:before {
        display: none;
    }
}
.form-input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
}
.checkout-description {
    margin-top: 20px;
}
</style>
