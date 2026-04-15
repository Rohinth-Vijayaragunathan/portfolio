// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        html.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

// Mobile Menu Hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Navbar & Back to Top & Scroll Progress
const header = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    // Sticky Nav
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }

    // Back to top
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // Scroll Progress
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${(totalScroll / windowHeight) * 100}%`;
    scrollProgress.style.width = scroll;
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Typing Animation
const texts = ["Python Developer", "Web Developer", "Problem Solver"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
let isDeleting = false;
const typingText = document.getElementById("typing-text");

(function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];

    if (isDeleting) {
        letter = currentText.slice(0, --index);
    } else {
        letter = currentText.slice(0, ++index);
    }
    
    typingText.textContent = letter;
    
    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed /= 2; // Delete faster
    }
    
    if (!isDeleting && letter.length === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
})();

// Reveal on Scroll & Progress Bar Animation
const revealElements = document.querySelectorAll('.reveal');
const progressBars = document.querySelectorAll('.progress-bar');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    // Reveal Elements
    revealElements.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });

    // Progress Bars
    progressBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        if (barTop < windowHeight - 50) {
            bar.style.width = bar.getAttribute('data-progress');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger on load

// Contact Form Validation
emailjs.init("6fYyVwz26SjalEnLo");

const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        formStatus.textContent = '';
        formStatus.style.color = '';

        [nameInput, emailInput, messageInput].forEach(input => {
            input.style.borderColor = '';
        });

        if (nameInput.value.trim().length < 2) {
            isValid = false;
            nameInput.style.borderColor = '#ef4444';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            emailInput.style.borderColor = '#ef4444';
        }

        if (messageInput.value.trim().length < 10) {
            isValid = false;
            messageInput.style.borderColor = '#ef4444';
        }

        if (isValid) {

            formStatus.textContent = "Sending...";
            formStatus.style.color = "orange";

            const params = {
                from_name: nameInput.value,
                from_email: emailInput.value,
                message: messageInput.value
            };

            emailjs.send(
                "service_uwmdx2e",
                "template_gq8wxp7",
                params
            )
            .then(() => {
                formStatus.textContent = "Message sent successfully!";
                formStatus.style.color = "green";
                form.reset();

                setTimeout(() => {
                    formStatus.textContent = "";
                }, 3000);
            })
            .catch((error) => {
                formStatus.textContent = "Failed to send message.";
                formStatus.style.color = "red";
                console.log(error);
            });

        } else {
            formStatus.textContent = "Please fill out all fields correctly.";
            formStatus.style.color = "#ef4444";
        }
    });
}