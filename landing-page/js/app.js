/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('.landing__container');
let currentView=0;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
//Function "createTableOfContents" -> it create the table of contents elements based on sections number.
function createTableOfContents(){
	const tempFragBuffer = document.createDocumentFragment();
	for(let index = 0 ; index<sections.length ; index++)
	{
		const sectionName = "Section"+(index+1);
		const liElemntBuffer = document.createElement("li");
		liElemntBuffer.innerHTML = "<a href=\"#\" class = \"link_class\">"+sectionName+"</a>";
		liElemntBuffer.classList.add("list_class");
		tempFragBuffer.appendChild(liElemntBuffer);
	}
	const ulElmentBuffer = document.querySelector("#navbar__list");
	ulElmentBuffer.appendChild(tempFragBuffer);
	const tags = document.querySelectorAll('.list_class');
	for(let index = 0 ; index<tags.length ; index++)
	{
		tags[index].addEventListener("click", function(){
			smoothScrollToSection(index);
			});
		tags[index].addEventListener("mouseover", function( event ) {
			event.target.style.backgroundColor = "rgb(120, 120, 120)";	
			});
		tags[index].addEventListener("mouseout", function( event ) {
				if(currentView != index)
				{
					event.target.style.backgroundColor = "black";
				}
			});			
	}
}

//Function "smoothScrollToSection" -> this function scroll the window to the target section based on input index
function smoothScrollToSection(indexClicked){
	sections[indexClicked].scrollIntoView({behavior: 'smooth'});
}

//Function "getActiveSecion" -> get the section in the view and assign a visiual highlights in both section background and its reffrence in the table of content.
function getActiveSecion(){
	const tempFragBuffer = document.createDocumentFragment();
	const tags = document.querySelectorAll('.list_class');
	let currentBuffer = 0;
	let sectioLocation = sections[0].getBoundingClientRect();
	let front = 0;
	let end = 0;
	let sectionHeight = 0;
	if ((document.body.clientWidth)>=560)
	{	
		front = 400;
		end = 400;
	}
	else{
		front = 200;
		end = 200;
	}
	for(let index = 0 ; index<sections.length ; index++)
	{
		sections[index].parentElement.classList.remove('your-active-class');
		tags[index].style.backgroundColor = "black";
		sectioLocation = sections[index].parentElement.getBoundingClientRect();
		sectionHeight = sectioLocation.height;
		end = front;
		end += sectionHeight-150;
		if(index === (sections.length-1))
		{
			end+=150;
		}
		currentBuffer = window.pageYOffset;
		if((currentBuffer >= front)&&(currentBuffer <= end))
		{
			sections[index].parentElement.classList.add('your-active-class');
			tags[index].style.backgroundColor = "rgb(120, 120, 120)";
			currentView = index;
		}
		front += sectionHeight;
	}
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
//create the table of content as soon as the script file is executed.
createTableOfContents();
/**
 * End Main Functions
 * Begin Events
 * 
*/
//add event to watch if the scroll was used to get the active section.
window.addEventListener("scroll",getActiveSecion);