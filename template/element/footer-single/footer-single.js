"use strict";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

class FooterSingle extends HTMLElement
{
	constructor()
	{
		super();

		this.className = 'selectable';

		const result = [];
		result.push(`<div id='footer_single_sign' class='unselectable'>`);
		for (let i = 0; 64 > i; ++i)
			result.push(`<span>${alphabet.charAt(Math.floor(Math.random() * alphabet.length))}</span>`);
		result.push('</div>');
		this.insertAdjacentHTML('beforeend', result.join(''));

		this.footer_single_sign = document.getElementById('footer_single_sign');
	}

	CreateAnimation()
	{
		this.RefreshAnimation();
		setInterval(this.RefreshAnimation.bind(this), 500);
	}

	RefreshAnimation()
	{
		this.footer_single_sign.firstChild.remove();
		this.footer_single_sign.insertAdjacentHTML('beforeend', `<span>${alphabet.charAt(Math.floor(Math.random() * alphabet.length))}</span>`);
	}
}
window.customElements.define('footer-single', FooterSingle);