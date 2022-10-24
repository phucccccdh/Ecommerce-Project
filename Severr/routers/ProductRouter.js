import express from 'express'
import {
  getAllProduct,
  filterProductByType,
  findProductById,
  AddProduct,
  DeleteProduct,
  CommentProduct,
  UpdateProduct,
  SearchProduct,
  paginationProduct,
  RateProduct,
  RepCommentProduct,
  BlogProduct,
  PinCommentProduct,
  filterProductByRandomField,
} from "../controllers/ProductController.js";
import { isAuth, isAdmin } from "../untils/until.js";
import { upload } from "../untils/until.js";

const ProductRouter = express.Router();

ProductRouter.get("/:type", filterProductByType);
ProductRouter.get("/detail/:id", findProductById);
ProductRouter.get("/", getAllProduct);
ProductRouter.get(`/pagination/:page`, paginationProduct);

ProductRouter.post("/rate/:id", RateProduct);
ProductRouter.post("/comment/:id", CommentProduct);
ProductRouter.post("/rep/comment/:id", RepCommentProduct);

ProductRouter.post(
  "/create",
  upload.single("image"),
  AddProduct
);
ProductRouter.put(
  "/update",
  upload.single("image"),
  UpdateProduct
);
ProductRouter.post(
  "/blog/:id",
  BlogProduct
);
ProductRouter.delete(
  "/delete/:id",
  upload.single("image"),
  DeleteProduct
);

ProductRouter.get('/search/product', SearchProduct);

export default ProductRouter;