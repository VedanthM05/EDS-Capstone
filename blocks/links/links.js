

export default function decorate(block) {
  
  
  
 
[...block.children].forEach((child, index) => {
    child.classList.add(`block-child-${index + 1}`); // Add a class like "block-child-1", "block-child-2", etc.
  });
block.append(block);
}