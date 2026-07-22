# Vansh-Tyagi-Portfolio

## Overview

A futuristic personal portfolio website for Vansh Tyagi. This is a static HTML/CSS/JavaScript site built to showcase a professional profile, work experience, skills, projects, certifications, and contact details.

The design focuses on a cyber/holographic aesthetic with 3D effects, animated sections, and interactive visual motion.

## Project Structure

- `index.html` - main page markup and layout.
- `style.css` - project styling, visual effects, and animations.
- `script.js` - page interactions, animation logic, and contact form handling.
- `assets/` - images, certificates, profile photos, and resume PDF.

## Features

- Full one-page portfolio layout with section navigation
- Hero section with animated typing and 3D layered profile display
- Smooth scroll and scroll-triggered entrance animations
- Background starfield rendered with Three.js
- Parallax and tilt interactions on hover
- Contact form integration using EmailJS
- Skills, experience, community, services, projects, education, and certifications sections
- Responsive navigation menu and floating UI elements

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

### Libraries and CDNs

- Boxicons
- Font Awesome
- Google Fonts (`Outfit`)
- Three.js
- GSAP with ScrollTrigger
- Lenis
- ScrollReveal
- Typed.js
- EmailJS

## How to Run

1. Clone or download the repository.
2. Open `index.html` in your browser.

No build tools are required since this is a static website.

## Customization Notes

- Update name, headline, biography, and social links in `index.html`.
- Replace resume in `assets/Vansh_Resume.pdf` with the latest PDF.
- Swap outdated images in `assets/` with new profile/project visuals.
- Update section content for projects, experience, education, and certifications.
- Verify EmailJS service IDs and template IDs in `script.js` if the contact form is active.

## Recommended Updates

- Refresh the portfolio content to reflect current roles, skills, and accomplishments.
- Add real project links or GitHub repositories for featured projects.
- Improve mobile responsiveness and test the navigation menu on small screens.
- Optimize image file sizes for better load performance.
- Consider simplifying heavy visual effects if a cleaner professional look is desired.

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Vansh-Tyagi-Portfolio.git
   cd Vansh-Tyagi-Portfolio
   ```

2. Open in a local server (recommended):

   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Node.js
   npx http-server
   ```

3. Open your browser and navigate to `http://localhost:8000`

## Configuration

### EmailJS Setup

- Sign up at [emailjs.com](https://emailjs.com/)
- Update the EmailJS service ID, template ID, and public key in `script.js`
- Test the contact form to ensure emails are being sent correctly


## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Notes

- The portfolio uses external CDN scripts, so an internet connection is required for full functionality.
- The contact form is configured through EmailJS and will need valid EmailJS credentials to work correctly.
- Images and assets should be optimized for web to improve page load performance.

---

For questions or suggestions, feel free to open an issue or contact directly via the portfolio contact form.
