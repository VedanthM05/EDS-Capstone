import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */

export default async function decorate(block) {
  // load footer as fragment

  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const element=document.createElement('div');
  const footer = document.createElement('div');
  footer.classList.add("footer-1");
  const lastelement=document.createElement('div');
  lastelement.classList.add("footer-2")
  let count=1;
  while (fragment.childElementCount>1) {
    fragment.firstElementChild.classList.add(`block${count}`,"common-block");
    footer.append(fragment.firstElementChild); 
    count++;   
  }
  const secondLastElement = footer.lastElementChild;
  console.log(secondLastElement)
  if (secondLastElement) {
    // Create subscribe container
    const subscribeContainer = document.createElement("div");
    subscribeContainer.className = "subscribe-container"; // Class for styling

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.className = "subscribe-input"; // Class for styling

    // Error message element
    const errorMessage = document.createElement("p");
    errorMessage.className = "error-message";
    errorMessage.textContent = "is required.";
    errorMessage.style.display = "none"; // Hide by default
    errorMessage.style.color="red";

    const subscribeButton = document.createElement("button");
    subscribeButton.textContent = "Subscribe";
    subscribeButton.className = "subscribe-button"; // Class for styling

    // Append elements to the subscribe container
    subscribeContainer.appendChild(emailInput);
    subscribeContainer.appendChild(errorMessage);
    subscribeContainer.appendChild(subscribeButton);
     // Append error message below input

    // ✅ Append the subscription form inside the second-to-last element
    secondLastElement.appendChild(subscribeContainer);

    // ✅ Add event listener for Subscribe button
    subscribeButton.addEventListener("click", () => {
      if (emailInput.value.trim() === "") {
        errorMessage.style.display = "block"; // Show error message
        emailInput.style.border="2px solid red";
        emailInput.classList.add("input-error"); 
        subscribeButton.classList.add("unique-border");
      } else {
        errorMessage.style.display = "none"; // Hide error message
        emailInput.classList.remove("input-error"); // Remove error class
        // alert(`Subscribed with: ${emailInput.value}`);
        emailInput.value = ""; // Clear input after subscribing
        // subscribeButton.classList.remove("unique-border");
      }
    });

    // ✅ Remove error state when typing
    emailInput.addEventListener("input", () => {
      if (emailInput.value.trim() !== "") {
        errorMessage.style.display = "none";
        emailInput.classList.remove("input-error");
        subscribeButton.classList.remove("unique-border");
      }
    });
  } else {
    console.warn("No second-to-last element found in the footer.");
  }
  
  //required
  lastelement.append(fragment.lastElementChild)
  element.append(footer);
  element.append(lastelement);


  block.append(element);
}
