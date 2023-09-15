const express = require("express");
const stripe = require("stripe")("YOUR_STRIPE_SECRET_KEY");
const cors = require("cors");
const { Product, ShippingDetails, SupportDetails, CheckoutDetails } = require("./models");

const app = express();

const SUPPORT_SECRET = process.env.SUPPORT_SECRET || `secret`

const logRequest = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${req.method} ${req.originalUrl} from ${req.ip}`);
  if (req.method === "POST") {
    console.log("Body:", req.body);
  }
  next();
};

app.use(logRequest);
var allowedOrigins = ['https://www.violenceworks.com', 'https://violenceworks.com', 'https://api.violenceworks.com', 'http://127.0.0.1', 'http://localhost:8080'];

var corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/checkoutsubmission', async (req, res) => {
  const { shippingDetails, cartItems } = req.body

  try {
    // Save the checkout information to the database using the CheckoutDetails model
    await CheckoutDetails.create({ shippingDetails, cartItems })
    res.status(200).send('Checkout information saved successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error saving checkout information to database')
  }
})

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

// get the support details, auth header protected with key set at .env.SUPPORT_SECRET
app.get("/api/support", async (req, res) => {

  // check if auth header matches SUPPORT_SECRET
  if (req.headers.authorization !== SUPPORT_SECRET) {
    res.status(401).json({ error: "Not authorized" });
    return;
  }

  try {
    const supportDetails = await SupportDetails.findAll();
    res.json({ supportDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  // Check for the support secret in the request headers
  const secret = req.headers['x-support-secret']
  if (secret !== SUPPORT_SECRET) {
    return res.status(401).send('Unauthorized')
  }

  try {
    // Retrieve all orders from the database using the Order model
    const orders = await CheckoutDetails.findAll()
    res.status(200).json(orders)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error retrieving orders from database')
  }
})

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