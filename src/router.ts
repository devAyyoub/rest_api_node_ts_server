import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProducts, getProductById } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get("/", getProducts);
router.get("/:id", 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById);
router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacío"),

  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacío")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
    handleInputErrors,
  createProduct
);
router.put("/", (req, res) => {
  const auth = true;
  res.json("Desde put");
});
router.patch("/", (req, res) => {
  const auth = true;
  res.json("Desde patch");
});
router.delete("/", (req, res) => {
  const auth = true;
  res.json("Desde delete");
});

export default router;
