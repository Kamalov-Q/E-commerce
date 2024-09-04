import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();

  const item = storeItems?.find((item) => item?.id === id);
  if (item == null) {
    return null;
  }
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item?.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "contain" }}
      />
      <div className="me-auto">
        <div>
          {item?.name}
          {quantity > 1 && (
            <span
              className="text-muted"
              style={{ fontSize: "1rem", marginLeft: "10px" }}
            >
              {quantity}x
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item?.price * quantity)}
          <Button
            style={{ marginInline: "20px" }}
            variant="outline-danger"
            size="sm"
            onClick={() => removeFromCart(item?.id)}
          >
            &times;
          </Button>
        </div>
      </div>
    </Stack>
  );
};

export default CartItem;
