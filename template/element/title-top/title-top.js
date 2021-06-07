"use strict";

class TitleTop extends HTMLElement
{
	static TitleTopString(id, char)
	{
return `\
<div id='${id}' class='title-top-char'>${char}</div>`;
	}

	constructor() { super(); }

	CreateElement()
	{
		const title_chars = window.menu_last.text.toUpperCase().split('');

		this.animation_elements = [];
		this.animation_elements_length = 0;

		for (let i = 0; i < title_chars.length; ++i)
		{
			this.insertAdjacentHTML('beforeend', TitleTop.TitleTopString(`TitleTopChar_${i}`, title_chars[i]));
			if (' ' !== title_chars[i])
				this.animation_elements[this.animation_elements_length++] = document.getElementById(`TitleTopChar_${i}`);
		}
	}

	RefreshElement()
	{
		clearInterval(this.animation_interval);

		while (0 < this.childElementCount)
			this.lastChild.remove();
		this.CreateElement();

		this.CreateAnimation();
	}

	CreateAnimation()
	{
		this.animation_elements_index = 0;
		this.animation_elements[this.animation_elements_index].classList.add('title-top-char-light');
		this.animation_interval = setInterval(this.RefreshAnimation.bind(this), 500);
	}

	RefreshAnimation()
	{
		this.animation_elements[this.animation_elements_index].classList.remove('title-top-char-light');
		this.animation_elements_index = (this.animation_elements_index + 1) % this.animation_elements_length;
		this.animation_elements[this.animation_elements_index].classList.add('title-top-char-light');
	}
}
window.customElements.define('title-top', TitleTop);