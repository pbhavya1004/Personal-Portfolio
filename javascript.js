// Function to load all sections taking in the section id, the file path, and callback function(to run after all pages loaded as animation for twinkling won't work without it)
function loadSection(sectionId, file_path, callback = null) { 
    // fetch the file(returns a promise when completed sucessfully returns a reposse object with methods to read the file)
    fetch(file_path)
        //.then acceses the previous reponse object and generates another promise which when completed return a response with the plain text
        .then(response => response.text())
        //.then acceses the previous reponse object(html data) 
        .then(data => {
            //gets html elemnts by their unique section id, gets their associated inner html content stored in data into correct section
            document.getElementById(sectionId).innerHTML = data;
            //allows twikling animation after home page loads
            if (callback) callback(); 
        });
}

// Load each part of the portfolio
loadSection("header", "header.html");
// Run twinkling effect after home page is done loading
loadSection("home", "home.html", TwinkleCircles); 
loadSection("about", "about.html");
loadSection("experience", "experience.html");
loadSection("projects", "projects.html");
loadSection("skills", "skills.html");
loadSection("contact", "contact.html");

// Smooth scroll function using functions getelementbyid and scrollintoview
//takes in the sectionid which is the page you are trying to get to
function scroll_to_page(sectionId) {
    //seclects the html elemnt in the chosen section
    const section = document.getElementById(sectionId);
    //if the section exists (so not null)
    if (section) {
        //scroll that section into the view frame(takes up whole page)
        //smmoth behaviour means it's a smooth transition not instantly jumping
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

//A function to allow twinkling circles effect
function TwinkleCircles() {
    // Select the circle container holding the whole home page
    const container = document.querySelector('.circle-container');

    //array of colors I wanted to use
    const colors = [
        'rgba(255, 255, 255, 0.5)',  
        'rgba(255, 182, 193, 0.5)',  
        'rgba(144, 238, 144, 0.5)',  
        'rgba(173, 216, 230, 0.5)'   
    ];

    // create circles
    for (let i = 0; i < 500; i++) {
        const circle = document.createElement('div');
        // add each circle to the circle class
        circle.classList.add('circle');

        // Initialize the idea f having random sizes - between 1 and under 3 pixels
        const size = Math.random() * 2 + 1; 
        //now give the circles the random sizes applying them to width and height
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;

        // Initialize the idea f having random position - between 0 and under 100% of screen 
        const x = Math.random() * 100; 
        const y = Math.random() * 100; 
        //give the circles the randomized x and y positions as positions from left and top of screen
        circle.style.left = `${x}vw`;
        circle.style.top = `${y}vh`;

        
        // allows you to select a random index value from 0 to 3 -> random * 4 gives 0 to under 4 -> floor rounds down to 0 to 3(int only)
        const randomColor = colors[Math.floor(Math.random() * 4)];
        //set the styles of the circle, background color to the randomly selected color
        circle.style.backgroundColor = randomColor;


        // Set a random animation delay(css property) to allows circles to create at different times(between 0 and under 1 second)
        circle.style.animationDelay = `${Math.random()}s`; 

        // Add the circle to selected container(circle-container)
        container.appendChild(circle);
    }
}
