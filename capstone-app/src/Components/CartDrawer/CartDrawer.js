import React from 'react';
import "./CartDrawer.css";

const mockItems = [
    { id: 1, name: "Margherita Pizza", price: 12.99, quantity: 1 },
    { id: 2, name: "Caesar Salad", price: 8.5, quantity: 2 },
    { id: 3, name: "Tiramisu", price: 6.0, quantity: 1 },
];

export default function CartDrawer({ isCartOpen, onCloseCart }) {
    const subtotal = mockItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            <div className={`cart-overlay ${isCartOpen ? "open" : ""}`}
            onClick={onCloseCart}
            />
            <aside className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
                <header className="cart-header">
                    <h2>Your Cart</h2>
                    <button className="cart-close" onClick={onCloseCart}>
                        ✕
                    </button>
                </header>

                <ul className="cart-items">
                    {mockItems.map((item) => (
                        <li key={item.id} className="cart-item">
                            <div>
                                <strong>{item.name}</strong>
                                <div className="cart-qty">Qty: {item.quantity}</div>
                            </div>
                            <span>${(item.price * item.quantiy).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>

                <footer className="cart-footer">
                    <div className="cart-subtotal">
                        <span>Subtotal:</span>
                        <strong>${subtotal.toFixed(2)}</strong>
                    </div>
                    <button className="checkout-btn">Checkout</button>
                </footer>
            </aside>
        </>
    );
}