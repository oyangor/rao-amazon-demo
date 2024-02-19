import {updateQuantity, addToCart,updateCartQuantityonPage} from '../data/cart.js ';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

updateCartQuantityonPage('.js-cart-quantity','')
//each product in the array object will be saved in variable product
let productsCombined = '';

products.forEach((product)=>{ 
  const html = `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
         ${product.rating.count}
        </div>
      </div> 

      <div class="product-price">
        ${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button 
       button-primary js-addTocart "
       data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;

    productsCombined += html;
    
})

document.querySelector('.js-products-grid').innerHTML = productsCombined;


const addedMessageTimeout= {};

document.querySelectorAll('.js-addTocart')
  .forEach((button)=>{
    button.addEventListener('click',()=>{ 
      const productId = button.dataset.productId; 

      addToCart(productId);
     
      updateCartQuantityonPage('.js-cart-quantity','');

     let valueFromSelector = parseInt(document.querySelector(`.js-quantity-selector-${productId}`).value);
     //console.log(valueFromSelector)
     updateQuantity(productId,valueFromSelector)
     updateCartQuantityonPage('.js-cart-quantity','')

     const container = document.querySelector(`.js-added-to-cart-${productId}`);
     container.classList.add('is-added');

     const previousTimeoutId = addedMessageTimeout[productId];

     if (previousTimeoutId) {
      clearTimeout(previousTimeoutId)
     };

     const timeoutId = setTimeout(()=>{container.classList.remove('is-added')},2000);

     addedMessageTimeout[productId] = timeoutId;

     document.querySelector(`.js-quantity-selector-${productId}`).value ='1'
     })
  })

 

 