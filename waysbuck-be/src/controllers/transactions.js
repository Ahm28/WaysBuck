const {
  transactions,
  cart,
  products,
  toppings,
  Users,
} = require("../../models");

exports.getTransactions = async (req, res) => {
  try {
    // const idUser = req.user.id;

    let data = await transactions.findAll({
      attributes: {
        exclude: ["updatedAt", "createdAt", "idCart"],
      },
      include: [
        {
          model: cart,
          as: "carts",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "idUser",
              "idProduct",
              "idTopping",
            ],
          },
          include: [
            {
              model: Users,
              as: "userOrder",
              attributes: {
                exclude: [
                  "password",
                  "image",
                  "status",
                  "createdAt",
                  "updatedAt",
                ],
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
        },
      ],
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        userOrder: {
          ...item.carts.userOrder,
        },
        carts: {
          ...item.carts,
          products: {
            ...item.carts.products,
            image: process.env.PATH_FILE + item.carts.products.image,
          },
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

exports.addTransactions = async (req, res) => {
  try {
    let data = req.body;

    data = {
      ...data,
      status: "success",
    };

    await transactions.create(data);

    res.send({
      status: "success",
      message: "Add transactions finished",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
