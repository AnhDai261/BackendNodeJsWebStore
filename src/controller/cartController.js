import cartService from "../services/cartService";

// order sp
const orderProduct = async (req, res) => {
  try {
    let response = await cartService.orderProduct(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

module.exports = {
  orderProduct,
};
