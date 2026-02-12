'use client';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/components/ProductCard";
import OrderConfirmModel from "@/components/modal/OrderConfirmModal";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        console.error("Error fetching products:", error);
        return;
      }

      console.log("Fetched products:", data); // ← ここで取得データ確認
      console.log("Error:", error);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const addToOrder = (id: number) => {
    setOrders((prev) => [...prev, id])
  }

  const removeFromOrder = (id: number) => {
    setOrders((prev) => {
      const index = prev.indexOf(id);
      if (index === -1) return prev;
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    })
  }

  const orderCount = orders.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const totalPrice = orders.reduce((sum, id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return sum;
    return sum + product.price;
  }, 0);

  const orderItems = Object.entries(orderCount).map(([id, count]) => {
    const product = products.find((p) => p.id === Number(id));
    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: count,
    };
  }).filter(Boolean) as {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];

  const handleConfirm = () => {
    setOrders([]);
    setIsModalOpen(false);
    router.push("/complete");
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">モバイルオーダー</h1>

      <div className="grid grid-cols-2 gap-4">
        {products.length === 0 && <p>Products 配列は空です</p>}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            onAdd={addToOrder}
          />
        ))}
      </div>

      <div className="mt-6">
        <h2 className="mb-2 text-lg font-bold">注文一覧</h2>

        {orders.length === 0 && (
          <p className="text-sm text-gray-500">
            まだ注文はありません
          </p>
        )}
        <ul className="space-y-1">
          {Object.entries(orderCount).map(([id, count]) => {
            const product = products.find(
              (p) => p.id === Number(id)
            );
            if (!product) return null;

            return (
              <li key={id} className="flex items-center gap-2 text-sm">
                <span>
                  {product.name} ×{count} ¥{product.price * count}
                </span>
                <button
                  onClick={() => removeFromOrder(Number(id))}
                  className="px-2 rounded bg-gray-200"
                >
                  -
                </button>
              </li>
            )
          })}
        </ul>


        <p className="mt-4 font-bold">
          合計金額：¥{totalPrice}
        </p>

        {orders.length > 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            注文確認
          </button>
        )}
      </div>
      {isModalOpen && (
        <OrderConfirmModel
          items={orderItems}
          total={totalPrice}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
