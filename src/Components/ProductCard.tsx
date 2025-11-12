import React from "react";
import type { Product } from "./Types/Products";
import Button from "./Button";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}


const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover mb-4 rounded"
          />
        )}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-sm text-gray-500 mb-2">Categoría: {product.category}</p>
        <p className="text-xl font-bold text-green-600 mb-4">${product.price}</p>
        <div className="flex gap-2">
            <Button variant="secondary" onClick={() => onEdit(product)} className="flex-1">Editar</Button>
            <Button variant="danger" onClick={() => onDelete(product.id)} className="flex-1">Eliminar</Button>
        </div>
    </div>
  );
}

export default ProductCard;