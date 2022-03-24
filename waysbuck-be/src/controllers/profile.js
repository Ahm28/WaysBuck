const { Users } = require("../../models");

exports.getProfile = async (req, res) => {
  try {
    const id = req.user.id;

    console.log(id);

    let data = await Users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
    };

    res.send({
      status: "success...",
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
