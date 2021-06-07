"use strict";

class SeparatorNatty extends HTMLElement
{
	static SeparatorNattyHorizontalString()
	{
return `\
<div class='separator-natty-line-horizontal'></div>
<div class='separator-natty-circle'></div>
<div class='separator-natty-line-horizontal'></div>`;
	}

	static SeparatorNattyVerticalString()
	{
return `\
<div class='separator-natty-line-vertical'></div>
<div class='separator-natty-circle'></div>
<div class='separator-natty-line-vertical'></div>`;
	}

	get horizontal() { return this.hasAttribute('horizontal'); }
	set horizontal(value) { if (value) this.setAttribute('horizontal', ''); else this.removeAttribute('horizontal'); }

	get vertical() { return this.hasAttribute('vertical'); }
	set vertical(value) { if (value) this.setAttribute('vertical', ''); else this.removeAttribute('vertical'); }

	get circle() { return this.hasAttribute('circle'); }
	set circle(value) { if (value) this.setAttribute('circle', ''); else this.removeAttribute('circle'); }

	constructor()
	{
		super();

		if (this.circle)
		{
			if (this.horizontal)
			{
				this.className = 'separator-natty-horizontal';
				this.insertAdjacentHTML('beforeend', SeparatorNatty.SeparatorNattyHorizontalString());
			}
			else if (this.vertical)
			{
				this.className = 'separator-natty-vertical';
				this.insertAdjacentHTML('beforeend', SeparatorNatty.SeparatorNattyVerticalString());
			}
		}
		else
		{
			if (this.horizontal)
				this.className = 'separator-natty-line-horizontal';
			else if (this.vertical)
				this.className = 'separator-natty-line-vertical';
		}
	}
}
window.customElements.define('separator-natty', SeparatorNatty);