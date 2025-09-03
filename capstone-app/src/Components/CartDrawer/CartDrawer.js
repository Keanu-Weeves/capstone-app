import React from 'react';
import "./CartDrawer.css";

// const mockItems = [
//     { id: 1, name: "Margherita Pizza", price: 12.99, quantity: 1 },
//     { id: 2, name: "Caesar Salad", price: 8.5, quantity: 2 },
//     { id: 3, name: "Tiramisu", price: 6.0, quantity: 1 },
// ];

export default function CartDrawer({ isCartOpen,
     onCloseCart, cartItems, increaseQty, decreaseQty }) {

    const subtotal = cartItems.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
        0
    );

    const currency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <>
            <div className={`cart-overlay ${isCartOpen ? "open" : ""}`}
            onClick={onCloseCart}
            aria-hidden="true"
            />
            <aside className={`cart-drawer ${isCartOpen ? "open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            >
                <header className="cart-header">
                    <h2 id="cart-title">Your Cart</h2>
                    <button className="cart-close" onClick={onCloseCart}>
                        ✕
                    </button>
                </header>

                <ul className="cart-items">
                    {cartItems.length === 0 ? (
                        <li className="cart-empty">Your cart is empty</li>
                    ) : (
                        cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <div className="cart-item-info">
                                    <strong>{item.name}</strong>
                                    <div className="cart-qty-controls">
                                        <button onClick={() => decreaseQty(item.id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => increaseQty(item.id)}>+</button>
                                    </div>
                                </div>
                                <span>{currency.format((Number(item.price) || 0) * item.quantity)}</span>
                            </li>
                        ))
                    )}
                </ul>

                <footer className="cart-footer">
                    <div className="cart-subtotal">
                        <span>Subtotal: </span>
                        <strong> {currency.format(subtotal)}</strong>
                    </div>
                    <button className="checkout-btn">Checkout</button>
                </footer>
            </aside>
        </>
    );
}