# Use a lightweight web server image
FROM nginx:alpine

# Copy your HTML, CSS, and JS files into NGINX default folder
COPY . /usr/share/nginx/html

# Expose port 80 for HTTP
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
