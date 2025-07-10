function Specials() {
    return (
        <section class="specials-section">
            <h2>Specials</h2> <button>Online Menu</button> 
            <div class="cards-container">
              <article class="special-card">
                <img src="dish1-placeholder.png" alt="dish 1"></img>
                <h3>Dish 1</h3>
                <p>Price: $XX.XX</p>
                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <button>Order a Delivery</button>
              </article>
              <article class="special-card">
                <img src="dish2-placeholder.png" alt="dish 2"></img>
                <h3>Dish 2</h3>
                <p>Price: $XX.XX</p>
                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <button>Order a Delivery</button>
              </article>
              <article class="special-card">
                <img src="dish3-placeholder.png" alt="dish 3"></img>
                <h3>Dish 3</h3>
                <p>Price: $XX.XX</p>
                <p>Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                <button>Order a Delivery</button>
              </article>
            </div>
        </section>
    );
}

export default Specials;