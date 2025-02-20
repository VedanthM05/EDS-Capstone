import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  debugger;
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  let count=1;
  while (fragment.firstElementChild) {
    fragment.firstElementChild.classList.add(`block${count}`,"common-block");
    footer.append(fragment.firstElementChild); 
    count++;  
    console.log(fragment.firstElementChild);
  }


  block.append(footer);
}
