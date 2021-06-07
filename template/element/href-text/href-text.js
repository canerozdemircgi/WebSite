"use strict";

class HrefText extends HTMLAnchorElement
{
	get same() { return this.hasAttribute('same'); }
	set same(value) { if (value) this.setAttribute('same', ''); else this.removeAttribute('same'); }

	get classic() { return this.hasAttribute('classic'); }
	set classic(value) { if (value) this.setAttribute('classic', ''); else this.removeAttribute('classic'); }

	get color_light() { return this.getAttribute('color_light'); }
	set color_light(value) { this.setAttribute('color_light', value); }

	get color_light_hover() { return this.getAttribute('color_light_hover'); }
	set color_light_hover(value) { this.setAttribute('color_light_hover', value); }

	get href() { return this.getAttribute('href'); }
	set href(value) { this.setAttribute('href', GetHrefWithRedirect(value)); }

	constructor()
	{
		super();

		this.className = 'href-text selectable';
		if (this.same)
			this.innerText = this.href;
		if (null === this.color_light_hover)
			this.color_light_hover = getComputedStyle(document.body).getPropertyValue('--selection-color')

		if (this.classic)
		{
			this.style = `color: ${this.color_light};`;
			this.onmouseover = () => { this.style.color = this.color_light_hover; };
			this.onmouseout = () => { this.style.color = this.color_light; };
		}
		else
		{
			this.style = `text-shadow: 0 0 4px ${this.color_light}, 0 0 4px ${this.color_light};`;
			this.onmouseover = () => { this.style.textShadow = `0 0 4px ${this.color_light_hover}, 0 0 4px ${this.color_light_hover}`; };
			this.onmouseout = () => { this.style.textShadow = `0 0 4px ${this.color_light}, 0 0 4px ${this.color_light}`; };
		}

		this.href = this.href;
	}
}
window.customElements.define('href-text', HrefText, {extends: 'a'});