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
    

      const secondDiv = block.querySelector(".product-child-3 div:nth-last-child(4)");
      const colorLinks = secondDiv.querySelectorAll("p:nth-of-type(2) a");
      const selectedColorText = secondDiv.querySelector("p:nth-of-type(3)");
      const colorNames = {
        "#fee1d2": "Peach",
        "#f9efe5": "Khaki",
        "#d4e3ec": "Rain",
        "#d8f0d8": "Mint"
    };
      colorLinks.forEach((link) => {
          const color = link.getAttribute("title");
          link.style.backgroundColor = color;
          link.textContent = ""; 
          link.addEventListener("click", (event) => {
              event.preventDefault(); 
              colorLinks.forEach((btn) => btn.classList.remove("selected"));
              link.classList.add("selected");
              const colorName = colorNames[color] ;
              selectedColorText.textContent = `Selected Fashion Color : ${colorName}`;
          });
      });
  
  
    
      const addToCartBtn = block.querySelector(".product-child-3 div:last-child .button-container a.button");
      const sizeLinks = block.querySelectorAll(".product-child-3 div:nth-last-child(3) p:nth-of-type(2) a");
      const selectedSizeText = block.querySelector(".product-child-3 div:nth-last-child(3) p:nth-of-type(3)");
  
      if (addToCartBtn) {
          addToCartBtn.classList.add("disabled");
      }
  
      sizeLinks.forEach((link) => {
          link.addEventListener("click", (event) => {
              event.preventDefault();
              sizeLinks.forEach((btn) => btn.classList.remove("active"));
              link.classList.add("active");
              selectedSizeText.textContent = `Selected Fashion Size : ${link.title}`;
  
             
              if (addToCartBtn) {
                  addToCartBtn.classList.remove("disabled");
                  addToCartBtn.style.pointerEvents = "auto";
              }
          });
      });
  
  
    const quantityContainer = block.querySelector(".product-child-3 div:nth-last-child(2) p:nth-of-type(2)");
    if (quantityContainer) {
        const decreaseBtn = quantityContainer.querySelector(".product .product-child-3 div:nth-last-child(2) p:nth-of-type(2) a:nth-of-type(1)");
        const increaseBtn = quantityContainer.querySelector(".product .product-child-3 div:nth-last-child(2) p:nth-of-type(2) a:nth-of-type(2)");

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
  