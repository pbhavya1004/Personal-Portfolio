// Function to load all sections taking in the section id, the file path, and callback function (to run after all pages loaded as animation for twinkling won't work without it)
function loadSection(sectionId, file_path, callback = null) {
    const section = document.getElementById(sectionId);
    //error handling if that section doesn't exist or load
    if (!section) {
        console.error(`Section with ID ${sectionId} not found.`);
        return; 
    }

    // Fetch the file (returns a promise when completed successfully returns a response object with methods to read the file)
    fetch(file_path)
        //.then accesses the previous response object and generates another promise which when completed returns a response with the plain text
        .then(response => response.text())
        //.then accesses the previous response object (HTML data) 
        .then(data => {
            // Gets HTML elements by their unique section id, gets their associated inner HTML content stored in data into the correct section
            section.innerHTML = data;
            // Allows twinkling animation or carousel logic after the page loads
            if (callback) callback();
        })
        //error message in console if section is not loaded properly
        .catch(err => console.error(`Failed to load section '${sectionId}':`, err));
}

// Function to initialize the carousel logic
function initializeCarousel() {
    //select the carousel div by the attribute data-carousel
    const carousel = document.querySelector("[data-carousel]");
    //error handling to check if carousel found
    if (!carousel) {
        console.error("Carousel not found.");
        return;
    }

    //select the "slides" by the attribute data-slides
    const slides = carousel.querySelector("[data-slides]");
    //error handling to check if slides found
    if (!slides) {
        console.error("Slides not found.");
        return;
    }

    ///select the buttons by the attribute data-carousel-button
    const buttons = document.querySelectorAll("[data-carousel-button]");
    //error handling if buttons not found
    if (buttons.length === 0) {
        console.error("Carousel buttons not found.");
        return;
    }

    

    // defining elemnts or container that need updating along with slides
    const descriptionContainer = document.querySelector(".details .description");
    const projectLink = document.querySelector(".details .project-link");

    //error handling if not loading or if cannot be found
    if (!descriptionContainer || !projectLink) {
        console.error("Description container or project link not found.");
        return;
    }

    // helper function to help update description and link with each new slide
    function updateDetails(slide) {

        //get the new description via textcontent and new link as an href
        const newDescription = slide.querySelector(".description")?.textContent;
        const newLink = slide.querySelector("a")?.href;

        //error handling if issue with new description or a project link
        if (!newDescription || !newLink) {
            console.error("Description or link is missing in the slide.");
            return;
        }

        // Update the description and project link by setting equal to new values
        descriptionContainer.textContent = newDescription;
        projectLink.href = newLink;
        // the content of ther text for project link is constantly "view project"
        projectLink.textContent = "View Project"; 
    }

    // Set initial text and link based on the active slide
    const activeSlide = slides.querySelector("[data-active]");
    if (activeSlide) {
        updateDetails(activeSlide); 
    } else {
        console.error("No slide found on initialization.");
    }

    // For each button make sure there is an event on clickn
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            //assigns values to buttons for indexing (if next) then 1 else -1 is the offset
            const offset = button.dataset.carouselButton === "next" ? 1 : -1; 

            //a slide is active if select the slide with attribute data-active
            const currentActiveSlide = slides.querySelector("[data-active]");

            //if nothing on(no active slides) then error
            if (!currentActiveSlide) {
                console.error("No active slide found.");
                return;
            }

            //convert from a nodeList to array 
            const slidesArray = Array.from(slides.children);

            //the newIndex value for activeslide is the index of the active slide slide + offset
            let newIndex = slidesArray.indexOf(currentActiveSlide) + offset;

            //Looping functionality: if the value of newIndex is < 0, wrap to last slide
            if (newIndex < 0) newIndex = slidesArray.length - 1;

            //if index greater than number of slides or equal to number of slides wrap to first slide
            if (newIndex >= slidesArray.length) newIndex = 0;

            // Update slides by removing the data-active from it
            currentActiveSlide.removeAttribute("data-active");

            //add data active attribute to new active slide
            slidesArray[newIndex].setAttribute("data-active", "true");

            // Update the details section with the new active slide
            updateDetails(slidesArray[newIndex]);
        });
    });

}








// Load each part of the portfolio
loadSection("header", "header.html");
// Run twinkling effect after the home page is done loading
loadSection("home", "home.html", TwinkleCircles);
loadSection("about", "about.html");

// Initialize the carousel but helps fix button functionality
loadSection("projects", "projects.html", () => {
    console.log("Projects section loaded. Inspecting carousel...");
    // Delay initialization of carousel to make sure DOM is fully updated due to dynamic loading
    setTimeout(() => {
        initializeCarousel();
    }, 500); 
});

loadSection("skills", "skills.html");
loadSection("contact", "contact.html", TwinkleCircles);

// Smooth scroll function using functions getElementById and scrollIntoView
// Takes in the section id which is the page you are trying to get to
function scroll_to_page(sectionId) {
    // Selects the HTML element in the chosen section
    const section = document.getElementById(sectionId);
    // If the section exists (so not null)
    if (section) {
        // Scroll that section into the view frame (takes up whole page)
        // Smooth behaviour means it's a smooth transition not instantly jumping
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// A function to allow twinkling circles effect
function TwinkleCircles() {
    // Select the circle container holding the whole home page
    const containers = document.querySelectorAll('.circle-container, .contact-container');

    // Array of colors I wanted to use
    const colors = [
        'rgba(255, 255, 255, 0.5)',
        'rgba(255, 182, 193, 0.5)',
        'rgba(144, 238, 144, 0.5)',
        'rgba(173, 216, 230, 0.5)'
    ];

    containers.forEach(container => {
        for (let i = 0; i < 500; i++) {
            const circle = document.createElement('div');
            // Add each circle to the circle class
            circle.classList.add('circle');

            // Initialize the idea of having random sizes - between 1 and under 3 pixels
            const size = Math.random() * 2 + 1;
            // Now give the circles the random sizes applying them to width and height
            circle.style.width = `${size}px`;
            circle.style.height = `${size}px`;

            // Initialize the idea of having random positions - between 0 and under 100% of screen
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            // Give the circles the randomized x and y positions as positions from left and top of screen
            circle.style.left = `${x}vw`;
            circle.style.top = `${y}vh`;

            // Allows you to select a random index value from 0 to 3 -> random * 4 gives 0 to under 4 -> floor rounds down to 0 to 3 (int only)
            const randomColor = colors[Math.floor(Math.random() * 4)];
            // Set the styles of the circle, background color to the randomly selected color
            circle.style.backgroundColor = randomColor;

            // Set a random animation delay (CSS property) to allow circles to create at different times (between 0 and under 1 second)
            circle.style.animationDelay = `${Math.random()}s`;

            // Add the circle to the selected container (circle-container)
            container.appendChild(circle);
        }
    });
}
