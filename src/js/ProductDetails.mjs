import { setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
    }
  
    async init() {
      // Use the dataSource to get product details
      this.product = await this.dataSource.findProductById(this.productId);
      
      // Render the product details in HTML
      this.renderProductDetails();
  
      // Add an event listener to the "Add to Cart" button
      document.getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    }
  
    renderProductDetails() {
        // Get the container element
        const productContainer = document.getElementById("productDetailsContainer");
      
        // Generate HTML using the productDetailsTemplate
        productContainer.innerHTML = productDetailsTemplate(this.product);
    }
  
    addToCart() {
        // Retrieve the cart from localStorage or create a new one
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Add the current product to the cart
        cart.push(this.product);
        
        // Use setLocalStorage to store the updated cart
        setLocalStorage("cart", cart);
      
        alert(`${this.product.NameWithoutBrand} has been added to your cart!`);
      }
  }