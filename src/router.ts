import { Router } from "express";
import { createProduct } from "./handlers/product";

const router = Router()

// Routing
router.get('/', (req, res) => {
    const auth = true
    res.json('Desde get')
})
router.post('/', createProduct)
router.put('/', (req, res) => {
    const auth = true
    res.json('Desde put')
})
router.patch('/', (req, res) => {
    const auth = true
    res.json('Desde patch')
})
router.delete('/', (req, res) => {
    const auth = true
    res.json('Desde delete')
})

export default router
