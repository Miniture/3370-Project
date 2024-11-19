nav.innerHTML = `
<ul>
    <li><a href="index.htm">Account</a></li>
    <li><a href="words.html">Word Library</a></li>
    <li><a href="audio.html">Audio Learning</a></li>
    <li><a href="quiz.html">Quiz</a></li>
    
</ul>
`;

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a').forEach(link => {
	if(link.href.includes(`${activePage}`)){
		console.log(`${activePage}`);
		link.classList.add('active');
	}
})

//sections for navbar from
//https://www.w3schools.com/css/css_navbar_horizontal.asp