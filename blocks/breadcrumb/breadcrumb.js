import {  getMetadata } from '../../scripts/aem.js';
export default async function decorate(block) {
    let data=`<span ><a href="/">Home</a> / ${getMetadata('og:title')}<span>`
    block.innerHTML=data;

}
