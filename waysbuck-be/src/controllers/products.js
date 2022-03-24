const { products } = require("../../models/");

exports.addProducts = async (req, res) => {
  try {
    const data = req.body;
    let dataProducts = await products.create({
      ...data,
      image: req.file.filename,
    });
    dataProducts = JSON.parse(JSON.stringify(dataProducts));

    dataProducts = {
      ...dataProducts,
      image: process.env.PATH_FILE + dataProducts.image,
    };
    res.status(201).send({
      status: "Success",
      message: "Success Add Products",
      data: {
        dataProducts,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    let dataProducts = await products.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    dataProducts = JSON.parse(JSON.stringify(dataProducts));

    dataProducts = dataProducts.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image,
      };
    });

    res.send({
      succes: "Succcess",
      data: {
        dataProducts,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let dataProducts = await products.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    dataProducts = JSON.parse(JSON.stringify(dataProducts));

    dataProducts = {
      ...dataProducts,
      image: process.env.PATH_FILE + dataProducts.image,
    };

    res.send({
      message: "Success",
      data: {
        dataProducts,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {
      title: req?.body?.title,
      price: req?.body?.price,
      image: req?.file?.filename,
    };
    await products.update(data, {
      where: {
        id,
      },
    });
    res.send({
      status: "Success",
      message: "Succes update products",
      data: {
        id,
        data,
        image: req?.file?.filename,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    await products.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "Success",
      message: "Success Delete PRoducts",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
