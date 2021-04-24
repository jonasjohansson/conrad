import { html } from 'https://unpkg.com/lit-html/lit-html.js';
import { component } from 'https://unpkg.com/haunted/haunted.js';

function Slider() {
	return html` <div class="module">Hello, World!</div> `;
}

customElements.define('x-slider', component(Slider));
