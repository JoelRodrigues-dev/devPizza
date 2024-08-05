import { Router, Request, Response } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/products/CreateProductController";

import uploadCongig from "./config/multer";
import { ListByCategoryController } from "./controllers/products/ListByCategoryController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { DeleteItemController } from "./controllers/order/DeleteItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();

const upload = multer(uploadCongig.upload("./img"));
// rotas de usuario
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.post("/users", new CreateUserController().handle);
router.post("/login", new AuthUserController().handle);

//rotas de categoria

router.get("/category", isAuthenticated, new ListCategoryController().handle);
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

//rotas de produtos

router.post(
  "/product",
  isAuthenticated,
  upload.single("banner"),
  new CreateProductController().handle
);

router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

// Rotas Order

router.get("/order", isAuthenticated, new ListOrderController().handle);
router.get(
  "/order/detail",
  isAuthenticated,
  new DetailOrderController().handle
);
router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("/order", isAuthenticated, new DeleteOrderController().handle);
router.post("/order/add", isAuthenticated, new AddItemController().handle);
router.delete(
  "/order/delete",
  isAuthenticated,
  new DeleteItemController().handle
);
router.put("/order/send", isAuthenticated, new SendOrderController().handle);
router.put(
  "/order/finish",
  isAuthenticated,
  new FinishOrderController().handle
);

export { router };
