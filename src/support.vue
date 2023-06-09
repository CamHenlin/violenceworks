<template>
  <div class="carousel" :style="{ backgroundImage: `url(${image})` }"></div>
    <div class="checkout-container">
      <main>
        <h1 class="support-header">Support</h1>
        <p>Welcome to our support page. We specialize in race car fabrication, customization, tuning, and more. If you have any questions or concerns, or if you're interested in our services, please don't hesitate to reach out. Simply fill out the form below and we'll get back to you as soon as we can.</p>
        <form class="support-form">
          <div class="form-group">
            <label for="name" class="form-label">Name:</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email:</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="message" class="form-label">Message:</label>
            <textarea
              id="message"
              v-model="form.message"
              class="form-textarea"
            ></textarea>
          </div>
          <button type="button" @click="submitForm" class="submit-button">Submit</button>
        </form>
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    components: {
    },
    data() {
    let image = require('../images/zside.png');
      return {
        form: {
          name: "",
          email: "",
          message: ""
        },
        image
      };
    },
    methods: {
      async submitForm() {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/api/support`, this.form);
        if (response.data.success) {
          this.form = {
            name: "",
            email: "",
            message: ""
          };
          alert("Your message was successfully sent!");
        } else {
          alert("There was a problem sending your message. Please try again later.");
        }
      }
    }
  };
  </script>
  <style scoped>
  .carousel {
    position: relative;
    width: 100%;
    min-height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  
    border-bottom: #d40000 1px solid;
  }
  .support-header {
    font-size: 2em;
    margin-bottom: 30px;
    text-align: center;
  }

  .support-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    width: 60%;
    margin: 0 auto;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 20px;
  }

  .form-label {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 10px;
    font-size: 1.2em;
    border: 1px solid #333;
    border-radius: 5px;
  }

  .submit-button {
    width: 100px;
    padding: 10px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1.2em;
    cursor: pointer;
    margin-top: 20px;
  }
</style>