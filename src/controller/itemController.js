import itemService from "../services/itemService";

// Thêm sp
const addItem = async (req, res) => {
  try {
    let response = await itemService.addItem(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

// Sửa sp
const editItem = async (req, res) => {
  try {
    let response = await itemService.editItem(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

// Xóa sp
const deleteItem = async (req, res) => {
  try {
    let response = await itemService.deleteItem(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

// Lấy tất cả sp
const getAllItem = async (req, res) => {
  try {
    let response = await itemService.getAllItem(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

// Lay 1 sp
const getOneItem = async (req, res) => {
  try {
    let response = await itemService.getOneItem(req.query.id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Hệ thống đã xảy ra lỗi rồi :))",
    });
  }
};

// Find Item
const findItem = async (req, res) => {
  try {
    let response = await itemService.findItem(req.query.key);
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
  addItem,
  getAllItem,
  editItem,
  deleteItem,
  getOneItem,
  findItem,
};
