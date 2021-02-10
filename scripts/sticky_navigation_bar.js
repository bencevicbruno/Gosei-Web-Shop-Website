window.onscroll = function()
{
    myFunction()
};

var navigation_header = document.getElementById("navigation_header");
var sticky = navigation_header.offsetTop;

function myFunction()
{
  if (window.pageYOffset >= sticky) 
    navigation_header.classList.add("sticky")
  else 
    navigation_header.classList.remove("sticky");
} 