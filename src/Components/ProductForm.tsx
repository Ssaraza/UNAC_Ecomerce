import type { Product } from "../Types/Products";
import { useState } from "react";
import { createProduct, updateProduct } from "../Utils/api";
import Textarea from "./TextArea";
import Input from "./Input";
import Button from "./Button";

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

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio:
                    </label>
                    <Input
                        value={formData.description}
                        onChange={handleChange('price')}
                        required
                        placeholder="0.00"
                        min ="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoria:
                    </label>
                    <Input
                        value={formData.description}
                        onChange={handleChange('Category')}
                        required
                        placeholder="Categoria del producto"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL deimagen (opcional):
                    </label>
                    <Input
                        value={formData.description}
                        onChange={handleChange('image')}
                        placeholder="https://"
                    />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button type= "submit" className= "flex-1">
                        {product ? "Actualizar" : "Crear"}
                    </Button>
                    <Button type = "button" variant="secondary" className="flex-1" onClick={oncancel}>
                        Cancelar
                    </Button>
                </div>


            </form>
        </div>

    );
}

export default ProductForm;