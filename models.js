const Sequelize = require("sequelize");

const sequelize = new Sequelize("sqlite://./my-database.sqlite");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: { 
    type: Sequelize.ARRAY(Sequelize.TEXT),
    // sqlite doesn't support arrays, so we need to do custom getter and setter to support it 
    get() {
      const rawValue = this.getDataValue("imageUrl");
      return JSON.parse(rawValue);
    },
    set(val) {
      this.setDataValue("imageUrl", JSON.stringify(val));
    },
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  subcategory: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const ShippingDetails = sequelize.define("shipping_details", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// support model, const { name, email, message } = req.body;
const SupportDetails = sequelize.define("support_details", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.STRING,
  }
});

const CheckoutDetails = sequelize.define('checkout_details', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  shippingDetails: {
    type: Sequelize.JSON,
    allowNull: false
  },
  cartItems: {
    type: Sequelize.JSON,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
})

sequelize.sync().then(() => {
  console.log("Tables have been created");
});

module.exports = { Product, ShippingDetails, SupportDetails, CheckoutDetails };