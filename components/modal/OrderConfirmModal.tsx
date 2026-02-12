'use client';

type OrderItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

type Props = {
    items: OrderItem[];
    total: number;
    onClose: () => void;
    onConfirm: () => void;
};

export default function OrderConfirmModel({
    items,
    total,
    onClose,
    onConfirm,
}: Props) {
    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-80">
                <h2 className="text-lg font-bold mb-4">注文確認</h2>
                <ul className="space-y-2 text-sm">
                    {items.map((item) => (
                        <li key={item.id}>
                            {item.name} × {item.quantity} ¥{item.price * item.quantity}
                        </li>
                    ))}
                </ul>

                <p className="mt-4 font-bold">合計金額：¥{total}</p>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 bg-gray-300 rounded"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                        注文確定
                    </button>
                </div>
            </div>
        </div>
    )
}