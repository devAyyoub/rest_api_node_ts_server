import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products = await Product.findAll({
    order: [["id", "ASC"]],
    attributes: { exclude: ["createdAt", "updatedAt", "availability"] },
  });
  res.json({ data: products });
};
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }
  res.json({ data: product });
};
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  // check if product exists
  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }

  // Update the product
  await product.update(req.body)
  await product.save()
  
  res.json({ data: product });
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};
