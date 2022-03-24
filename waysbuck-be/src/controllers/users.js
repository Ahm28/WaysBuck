const { Users } = require("../../models");
// const { users } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const dataUser = await Users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    res.send({
      status: "Success",
      data: {
        dataUser,
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

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const dataUser = await Users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    res.send({
      status: "Success",
      user: dataUser,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    // users = [...users, req.body];
    const data = req.body;
    const dataUser = await users.create(data);
    res.send({
      status: "success",
      message: "Add user success",
      data: {
        dataUser,
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

exports.updateUser = async (req, res) => {
  try {
    // users[id - 1] = { ...users[id - 1], ...req.body };
    const { id } = req.params;
    const data = req.body;

    const dataUser = await Users.update(data, {
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await Users.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "Success",
      message: "Success Delete User",
      data: {
        id,
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
