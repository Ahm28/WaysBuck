const { cart, Users, products, toppings } = require("../../models");

exports.getCarts = async (req, res) => {
  try {
    let data = await cart.findAll({
      attributes: {
        exclude: ["updatedAt", "idUser", "idProduct", "idTopping", "createdAt"],
      },
      include: [
        {
          model: Users,
          as: "userOrder",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status", "image"],
          },
        },
        {
          model: products,
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: toppings,
          as: "toppings",
          attributes: {
            exclude: ["createdAt", "updatedAt", "image"],
          },
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        products: {
          ...item.products,
          image: process.env.PATH_FILE + item.products.image,
          qty: 1,
        },
      };
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const idUser = req.user.id;

    let data = await cart.findAll({
      where: {
        idUser,
      },
      attributes: {
        exclude: ["updatedAt", "idUser", "idProduct", "idTopping", "createdAt"],
      },
      include: [
        {
          model: products,
          as: "products",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: toppings,
          as: "toppings",
          attributes: {
            exclude: ["createdAt", "updatedAt", "image"],
          },
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        products: {
          ...item.products,
          image: process.env.PATH_FILE + item.products.image,
          qty: 1,
        },
      };
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addCart = async (req, res) => {
  try {
    let data = req.body;

    data = {
      ...data,
      idUser: req.user.id,
    };

    await cart.create(data);

    res.send({
      status: "success",
      message: "Add cart finished",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    await cart.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: "Success Delete Cart",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
