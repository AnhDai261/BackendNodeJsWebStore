import express from "express";
import userController from "../controller/userController";
import adminController from "../controller/adminController";
import itemController from "../controller/itemController";
import categorieController from "../controller/categorieController";
import brandController from "../controller/brandController";
import cartController from "../controller/cartController";
import orderController from "../controller/orderController";

let router = express.Router();

let initWebRoutes = (app) => {
  //API for admin

  // post dùng để tạo dữ liệu mới
  // get dùng để lấy dữ liệu
  // put dùng để thường cho chắc năng sửa dữ liệu(có thể dùng post)
  // delete dùng để xóa

  //   1. bắt đầu từ route
  //   2. rồi đến controller
  //   3. rồi đến service
  //   4. rồi trả về lại controller
  //   5. rồi trả về res
  //   6. rồi đưa về lại api

  // Tạo account Admin
  router.post(
    "/api/registerAccountAdmin",
    adminController.registerAccountAdmin
  );
  // Đăng nhập Admin
  router.post("/api/loginAdmin", adminController.loginAdmin);

  // // Tạo account User
  router.post("/api/registerAccountUser", userController.registerAccountUser);

  // // // Đăng nhập User
  router.post("/api/loginUser", userController.loginUser);

  // Get All User
  router.get("/api/getAllUser", userController.getAllUser);

  // Item
  // Thêm Sản Phẩm
  router.post("/api/addItem", itemController.addItem);
  // Get All Item
  router.get("/api/getAllItem", itemController.getAllItem);
  // Get 1 item
  router.get("/api/getOneItem", itemController.getOneItem);
  // Search item
  router.get("/api/findItem", itemController.findItem);

  // Sửa Sản Phẩm
  router.put("/api/editItem", itemController.editItem);
  // Xóa Sản Phẩm
  router.delete("/api/deleteItem", itemController.deleteItem);

  // CATEGORIE
  // Thêm Danh Mục
  router.post("/api/addcategorie", categorieController.addcategorie);
  // Get All Categories
  router.get("/api/getallcategorie", categorieController.getallcategorie);

  // Get all Brand
  router.get("/api/getAllBrand", brandController.getAllBrand);

  // Cart
  router.post("/api/orderProduct", cartController.orderProduct);

  //create new order
  router.post("/api/createOrder", orderController.createOrder);
  router.get("/api/getAllOrder", orderController.getAllOrder);
  router.get("/api/get-order-info", orderController.getOrderInfoById);

  return app.use("/", router);
};

module.exports = initWebRoutes;
