
export default async function decorate(block) {
    const link = block.querySelector(".product-carousel div .button-container p a");

    try {
        const response = await fetch(link.href);
        const data = await response.json();

        if (!data || !data.data) {
            console.error('Invalid JSON structure');
            return;
        }
        const filteredProducts = data.data.filter(product => product.path && product.path.startsWith("/products"));

        if (filteredProducts.length === 0) {
            console.warn("No products found with path starting with '/products'.");
            return;
        }

        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('carousel-container');

        const carouselWrapper = document.createElement('div');
        carouselWrapper.classList.add('carousel-wrapper');

        const indicators = document.createElement('div');
        indicators.classList.add('carousel-indicators');

        filteredProducts.forEach((product) => {
           
            const card = document.createElement('div');
            card.classList.add('product-card');

            card.innerHTML = `
                <a href="${product.path}" class="product-link">
            <img src="${product.image}" alt="${product.title}" class="product-image">
             </a>
                <p class="product-title">${product.title}</p>
                <p class="product-price">${product.price}</p>
                <div class="product-actions">
                    <button class="add-to-cart">ADD TO CART</button>
                    <span class="heart-icon"> <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg></span>
                </div>
            `;
            
            carouselWrapper.appendChild(card);
          
           
        });

        carouselContainer.appendChild(carouselWrapper);
        carouselContainer.appendChild(indicators);
        block.innerHTML = '';
        block.appendChild(carouselContainer);

        initializeCarousel(carouselWrapper, indicators, filteredProducts.length);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }

    function initializeCarousel(wrapper, indicators, totalCards) {
        let index = 0;

        function getVisibleCards() {
            if (window.innerWidth >= 900) return 5;
            if (window.innerWidth >= 600) return 3;
            return 2;
        }

        function updateIndicators() {
            indicators.innerHTML = '';
            const visibleCards = getVisibleCards();
            const totalGroups = Math.ceil(totalCards / visibleCards);

            for (let i = 0; i < totalGroups; i++) {
                const indicator = document.createElement('span');
                indicator.classList.add('indicator');
                if (i === index) indicator.classList.add('active');
                indicator.dataset.index = i;
                indicator.addEventListener('click', () => slideTo(i, visibleCards, totalGroups));
                indicators.appendChild(indicator);
            }
        }

        function updateCarousel() {
            const visibleCards = getVisibleCards();
            const offset = -index * (100 / visibleCards) * visibleCards;
            wrapper.style.transform = `translateX(${offset}%)`;

            [...indicators.children].forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function slideTo(i, visibleCards, totalGroups) {
            if (i >= totalGroups) return;
            index = i;
            updateCarousel();
        }

        window.addEventListener('resize', () => {
            index = 0;
            updateIndicators();
            updateCarousel();
        });

        updateIndicators();
        updateCarousel();
    }
}
