import type { Product } from "../Types/Products";
import { useState } from "react";
import { createProduct, updateProduct } from "../Utils/api";
import Textarea from "./TextArea";

interface ProductFormProps {
    product?: Product;
    onsave: () => void;
    oncancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onsave, oncancel }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price.toString() || '',
        category: product?.category || '',
        image: product?.image || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            image: formData.image || undefined,
        };

        if (product) {
            updateProduct(product.id, productData);
        } else {
            createProduct(productData);
        }

        onsave();
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [field]: e.target.value });
    }

    return (
        <div className= "max-w-md mx mx-auto bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
                {product ? 'Editar Producto' : 'Crear Producto'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre:
                    </label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={handleChange('name')}
                        required
                        placeholder="Nombre del producto"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción:
                    </label>
                    <Textarea
                        value={formData.description}
                        onChange={handleChange('description')}
                        required
                        placeholder="Descripción del producto"
                    />
                </div>
            </form>
        </div>

    );
}

export default ProductForm;