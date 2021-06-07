"use strict";

const contact_section_left_children = document.getElementById('contact_section_left').children;
const contact_section_right_children = document.getElementById('contact_section_right').children;

for (let i = 0; i < contact_section_left_children.length; ++i)
{
	if (contact_section_left_children[i].offsetHeight !== contact_section_right_children[i].offsetHeight)
	{
		if (contact_section_left_children[i].offsetHeight < contact_section_right_children[i].offsetHeight)
			contact_section_left_children[i].style.height = `${contact_section_right_children[i].offsetHeight}px`;
		else
			contact_section_right_children[i].style.height = `${contact_section_left_children[i].offsetHeight}px`;
	}
}