"use strict";

class VideoYoutube extends HTMLElement
{
	static VideoYoutubeString(id)
	{
return `\
<div class='iframe-video-youtube-container'><iframe class='iframe-video-youtube' src='https://www.youtube.com/embed/${id}' style='border: 0;' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>`;
	}

	get id() { return this.getAttribute('id'); }
	set id(value) { this.setAttribute('id', value); }

	constructor()
	{
		super();

		this.insertAdjacentHTML('beforeend', VideoYoutube.VideoYoutubeString(this.id));
	}
}
window.customElements.define('video-youtube', VideoYoutube);