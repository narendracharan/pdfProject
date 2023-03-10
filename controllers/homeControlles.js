const fs = require("fs");
const pdf = require("pdf-creator-node");
const path = require("path");
const data = require("./helpers/data");
const { options } = require("../routes/homeRoutes");

const homeView = async (req, res) => {
  res.render("home");
};

const generatePDF = async (req, res, next) => {
  try {
    const html = fs.readFileSync(
      path.join(__dirname, "../views/temp.html"),
      "utf8"
    );
    const filename = Math.random() + "_docs" + ".pdf";
    let array = [];
    data.forEach((d) => {
      const prod = {
        Variety: d.Variety,
        Type: d.Type,
        Unit: d.Unit,
        Quantity: d.Quantity,
        Price: d.Price,
        Amount: d.Quantity * d.Price,
      };
      array.push(prod);
    });
    let subtotal = 0;
    array.forEach((i) => {
      subtotal += i.Amount;
    });
    const tax = (subtotal * 10) / 100;
    const Totaldue = subtotal + tax;
    const obj = {
      prodlist: array,
      subtotal: subtotal,
      tax: tax,
      Totaldue: Totaldue,
    };
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: "./docs/" + filename,
    };
    pdf.create(document, options);
    const filepath = "http://localhost:5000/docs/" + filename;
    res.render("download", {
      path: filepath,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  homeView,
  generatePDF,
};
