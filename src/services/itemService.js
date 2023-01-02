const db = require("../models/index");
const { Op } = require("sequelize");

// Tao admin
const addItem = (state) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = state.state;
      if (!data.name || !data.price || !data.brandId || !data.cateId) {
        resolve({
          errCode: 2,
          errMessage: "Mày chưa truyền dữ liệu cho t sao tao tạo?",
        });
      } else {
        let Item = await db.Item.findOne({
          where: { name: data.name },
        });
        if (Item) {
          resolve({
            errCode: 2,
            errMessage: "Dữ liệu đã có sẵn trong server !!!",
          });
        } else {
          await db.Item.create({
            name: data.name,
            price: data.price,
            image: data.photo,
            cateId: data.cateId,
            brandId: data.brandId,
            amount: data.soluong,
            describe: data.mota,
            status: data.trangthai,
            soldCount: 200,
          });
          resolve({
            errCode: 0,
            errMessage: "Tạo sản phẩm thành công!!!",
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// Get all item
const getAllItem = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataItem = await db.Item.findAll({
        order: [["id", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Categorie,
            attributes: ["name"],
          },
          {
            model: db.Brand,
            attributes: ["name"],
          },
        ],
      });
      if (!dataItem) {
        resolve({
          errCode: 2,
          errMessage: "Không có dữ liệu trong data !!!",
        });
      } else {
        dataItem.forEach((element) => {
          return (element.image = new Buffer(element.image, "base64").toString(
            "binary"
          ));
        });
        resolve({
          errCode: 0,
          errMessage: "Lấy thành công !!!",
          data: dataItem,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// Get one item
const getOneItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataItem = await db.Item.findOne({
        where: { id: data },
        // order: [["id", "DESC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Brand,
            attributes: ["name"],
          },
          {
            model: db.Categorie,
            attributes: ["name"],
          },
        ],
      });
      if (!dataItem) {
        resolve({
          errCode: 2,
          errMessage: "Không có dữ liệu trong data !!!",
        });
      } else {
        if (dataItem.image) {
          dataItem.image = new Buffer(dataItem.image, "base64").toString(
            "binary"
          );
        }
        resolve({
          errCode: 0,
          errMessage: "Lấy thành công !!!",
          data: dataItem,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// edit item
const editItem = (state) => {
  let data = state.state;
  return new Promise(async (resolve, reject) => {
    try {
      if (!data) {
        resolve({
          errCode: 2,
          errMessage: "Mày chưa truyền dữ liệu cho t sao tao sửa ?",
        });
      } else {
        let item = await db.Item.findOne({
          where: { id: data.id },
        });
        if (!item) {
          resolve({
            errCode: 2,
            errMessage: "Không tìm thấy sản phẩm ?",
          });
        } else {
          // await db.Item.update({name : data.name,price : data.price,image : data.photo,
          // cateId : data.cateId,brandId : data.brandId,amount : data.soluong,
          // describe : data.mota,status : data.trangthai,},{ where: { id: item.id })
          // resolve({
          //   errCode: 0,
          //   errMessage: "Sửa sản phẩm thành công!!!",
          // });
          (item.name = data.name),
            (item.price = data.price),
            (item.image = data.photo),
            (item.cateId = data.cateId),
            (item.brandId = data.brandId),
            (item.amount = data.soluong),
            (item.describe = data.mota),
            (item.status = data.trangthai),
            await item.save();

          resolve({
            errCode: 0,
            errMessage: "Sửa sản phẩm thành công!!!",
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// delete item
const deleteItem = (Item) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = Item;
      if (!data) {
        resolve({
          errCode: 2,
          errMessage: "Mày chưa chọn item sao mà xóa ? ?",
        });
      } else {
        let item = await db.Item.findOne({
          where: { id: data },
        });
        if (item) {
          await db.Item.destroy({
            where: { id: item.id },
          });
          resolve({
            errCode: 0,
            errMessage: "Xóa sản phẩm thành công!!!",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage:
              "Không tìm thấy sản phẩm trong hệ thống, vui lòng kiểm tra lại dữ liệu ? ?",
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// Find Item

const findItem = (keySearch) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("coi key la gi: ", keySearch);
      let res = await db.Item.findAll({
        where: {
          [Op.or]: [{ name: { [Op.like]: "%" + keySearch + "%" } }],
        },
        attributes: ["name", "image", "price", "id"],
        include: [
          {
            model: db.Categorie,
            attributes: ["name"],
          },
          {
            model: db.Brand,
            attributes: ["name"],
          },
        ],
      });
      console.log("what query: ", res);

      if (!res) {
        resolve({
          errCode: 2,
          errMessage: "Không có dữ liệu trong data !!!",
        });
      } else {
        res.forEach((element) => {
          return (element.image = new Buffer(element.image, "base64").toString(
            "binary"
          ));
        });
        resolve({
          errCode: 0,
          errMessage: "Lấy thành công !!!",
          data: res,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  addItem,
  getAllItem,
  getOneItem,
  editItem,
  deleteItem,
  findItem,
};
