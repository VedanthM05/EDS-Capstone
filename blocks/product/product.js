export default async function decorate(block) {
    [...block.children].forEach((child, index) => {
      child.classList.add(`product-child-${index + 1}`,"product-common");
      
    });
    
    const images = block.querySelectorAll('.product-child-1 div picture img');

    images.forEach((img) => {
        img.addEventListener('click', () => {
            images.forEach((image) => image.classList.remove('active-image'));
            img.classList.add('active-image');
        });
    });
    

    const productChild3 = block.querySelector('.product-child-3');
    if (productChild3) {
      const secondDiv = productChild3.querySelectorAll('div')[1]; 
      if (secondDiv) {
        const paragraphs = secondDiv.querySelectorAll('p');
  
        if (paragraphs.length >= 2) {
          const secondP = paragraphs[1]; 
          const thirdP = paragraphs[2] || document.createElement('p'); 
          const buttonContainer = document.createElement('div');
          buttonContainer.classList.add('button-container');
         
          

          const addToCartBtn = block.querySelector(".product .product-child-3 div:nth-of-type(4) .button-container a");
          if (addToCartBtn) {
              addToCartBtn.classList.add("disabled"); 
              addToCartBtn.style.pointerEvents = "none"; 
          }
        
          const sizes = ['S', 'M', 'L'];
          sizes.forEach((size) => {
            const button = document.createElement('button');
            button.textContent = size;
            button.classList.add('size-button');
            buttonContainer.appendChild(button);
  
            
            button.addEventListener('click', () => {
              buttonContainer.querySelectorAll('.size-button').forEach((btn) => btn.classList.remove('active'));
              button.classList.add('active');
              thirdP.textContent = `Selected Fashion Size: ${size}`;
              if (addToCartBtn) {
                addToCartBtn.classList.remove("disabled");
                addToCartBtn.style.pointerEvents = "auto";
            }
            });
          });
          secondDiv.replaceChild(buttonContainer, secondP);
          thirdP.classList.add('selected-size');
          if (!paragraphs[2]) {
            secondDiv.appendChild(thirdP);
          }
        }
      }
    }
    const quantityContainer = block.querySelector(".product-child-3 div:nth-of-type(3) p:nth-of-type(2)");
    if (quantityContainer) {
        const decreaseBtn = quantityContainer.querySelector(".product .product-child-3 div:nth-of-type(3) p:nth-of-type(2) a:nth-of-type(1)");
        const increaseBtn = quantityContainer.querySelector(".product .product-child-3 div:nth-of-type(3) p:nth-of-type(2) a:nth-of-type(2)");

        if (decreaseBtn && increaseBtn) {
            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.value = "1";
            quantityInput.min = "1";
            quantityInput.classList.add("quantity-input");
            decreaseBtn.insertAdjacentElement("afterend", quantityInput);

            function updateButtons() {
                decreaseBtn.classList.toggle("disabled", quantityInput.value <= 1);
            }
            decreaseBtn.addEventListener("click", (e) => {
                e.preventDefault();
                let currentValue = parseInt(quantityInput.value, 10);
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                    updateButtons();
                }
            });

            increaseBtn.addEventListener("click", (e) => {
                e.preventDefault();
                let currentValue = parseInt(quantityInput.value, 10);
                quantityInput.value = currentValue + 1;
                updateButtons();
            });
            updateButtons();
        }
    }
 
    
  }
  