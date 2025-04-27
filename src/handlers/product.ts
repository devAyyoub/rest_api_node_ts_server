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
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }
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
