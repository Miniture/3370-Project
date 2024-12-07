nav.innerHTML = `
<ul>
    <li><a href="index.htm">Account</a></li>
    <li><a href="words.php">Word Library</a></li>
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

