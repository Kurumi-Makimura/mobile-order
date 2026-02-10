import { Button } from "./ui/button/button";
type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  onAdd: (id: number) => void;
};

export default function ProductCard({
  id,
  name,
  price,
  onAdd,
}: ProductCardProps) {


  return (
    <div className="rounded-lg bg-white shadow p-3">
      <div className="h-24 w-full bg-gray-200 rounded" />
      <h2 className="mt-2 text-sm font-medium">{name}</h2>
      <p className="text-xs text-gray-500">¥{price}</p>
      <Button
        className=""
        onClick={() => onAdd(id)}
      >
        追加
      </Button>
    </div>
  )
}