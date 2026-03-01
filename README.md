
# Aura TodoList

## Team Members & Roles
Member 1:D.M.D.Dilki Dilshara-ITBIN-2313-0030-Devops Engineer
Member 2:M.Imashi Shashikala-ITBIN-2313-0135-Fullstack Developer

### Full-Stack Developer

Contribution:
- HTML structure (index.html)
- CSS styling (style.css)
- JavaScript logic (script.js)
- Initial project setup and feature development

###Docker Configuration

This application is containerised using Docker to ensure consistent deployment across different environments. A Dockerfile is used to build a lightweight container image based on the nginx:alpine base image. The static web files are copied into the Nginx default directory (/usr/share/nginx/html) and served over port 80.

Docker Compose is used to define the service configuration, including port mapping, restart policy, and resource limits. This approach enables reproducible builds, simplified deployment, and improved portability compared to traditional environment-based setups.

### DevOps Engineer

Contribution:
- Created develop and main branches
- Added CI workflow configuration (.github/workflows/ci.yml)
- Ensured successful Pull Request from develop to main
- Finalized production release (v1.0)

  

### Live URL
https://aura-to-do-list-25xx.vercel.app/

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Git & GitHub
- GitHub Actions (CI)
