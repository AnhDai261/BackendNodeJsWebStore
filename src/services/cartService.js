const db = require("../models/index");

// Tao admin
const orderProduct = (state) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = state.state;
      if (!data.fullName || !data.phoneNumber || !data.address) {
        resolve({
          errCode: 2,
          errMessage: "Bạn chưa nhập đủ thông tin người mua?",
        });
      } else {
        let Item = await db.Item.findOne({
          where: { name: data.name },
          raw: false,
          nest: true,
        });
        if (Item) {
          resolve({
            errCode: 2,
            errMessage: "Bạn vừa đặt đơn hàng này rồi !!!",
          });
        } else {
          await db.Cart.create({
            name: data.name,
            price: data.price,
            image: data.photo,
            cateId: data.cateId,
            brandId: data.brandId,
            amount: data.soluong,
            describe: data.mota,
            status: data.trangthai,
            fullName: data.fullName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            note: data.note,
            country: data.country,
          });
          resolve({
            errCode: 0,
            errMessage: "Tạo đơn hàng thành công!!!",
          });
        }
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  orderProduct,
};
