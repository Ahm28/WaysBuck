const { toppings } = require("../../models/");

exports.addToppings = async (req, res) => {
  try {
    const data = req.body;
    let dataToppings = await toppings.create({
      ...data,
      image: req.file.filename,
    });

    dataToppings = JSON.parse(JSON.stringify(dataToppings));

    dataToppings = {
      ...dataToppings,
      image: process.env.PATH_FILE + dataToppings.image,
    };

    res.send({
      status: "Success",
      data: {
        dataToppings,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Conection Failed",
    });
  }
};

exports.getToppings = async (req, res) => {
  try {
    let dataToppings = await toppings.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    dataToppings = JSON.parse(JSON.stringify(dataToppings));

    dataToppings = dataToppings.map((item) => {
      return {
        ...item,
        image: process.env.PATH_FILE + item.image,
      };
    });

    res.send({
      status: "Success",
      data: {
        dataToppings,
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

exports.getTopping = async (req, res) => {
  try {
    const { id } = req.params;
    let dataToppings = await toppings.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    dataToppings = JSON.parse(JSON.stringify(dataToppings));

    dataToppings = {
      ...dataToppings,
      image: process.env.PATH_FILE + dataToppings.image,
    };

    res.send({
      status: "Success",
      data: {
        dataToppings,
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

exports.updateTopping = async (req, res) => {
  try {
    // users[id - 1] = { ...users[id - 1], ...req.body };
    const { id } = req.params;
    const data = req.body;

    await toppings.update(data, {
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: "Success update user",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteTopping = async (req, res) => {
  try {
    const { id } = req.params;
    await toppings.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "Success",
      message: "Success Delete User",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
