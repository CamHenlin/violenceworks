const express = require("express");
const stripe = require("stripe")("YOUR_STRIPE_SECRET_KEY");
const cors = require("cors");
const { Product, ShippingDetails, SupportDetails } = require("./models");

const app = express();

const logRequest = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.originalUrl} from ${req.ip}`);
  if (req.method === "POST") {
    console.log("Body:", req.body);
  }
  next();
};
app.use(logRequest);

app.use(cors());
app.use(express.json());

// Implement endpoint for retrieving product data
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement endpoint for retrieving product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement endpoint for searching products
app.get("/api/search", async (req, res) => {
  try {
    const searchResults = await Product.findAll({
      where: {
        name: {
          [Sequelize.Op.like]: `%${req.query.q}%`
        }
      }
    });
    res.json({ searchResults });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement endpoint for creating a Stripe charge
app.post("/api/charge", async (req, res) => {
  try {
    const { amount, token } = req.body;
    const charge = await createStripeCharge(amount, token);
    res.json({ charge });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement endpoint for retrieving shipping details
app.get("/api/shipping", async (req, res) => {
  try {
    const shippingDetails = await ShippingDetails.findAll();
    res.json({ shippingDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* 
implement a POST endpoint for this support form, this is the code sending the form data to the server:
const response = await axios.post("/api/support", this.form);
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
        */
app.post("/api/support", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // now put these into the sqlite database
    const supportDetails = await SupportDetails.create({
      name,
      email,
      message
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

// Function to create a Stripe charge
async function createStripeCharge(amount, token) {
  const charge = await stripe.charges.create({
    amount: amount * 100,
    currency: "usd",
    source: token,
    description: "Example charge"
  });
  return charge;
}