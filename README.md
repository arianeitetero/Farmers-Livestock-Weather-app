# Farmers Livestock & Weather App

A beginner-friendly web application designed to help farmers decide the best time to plant crops based on current weather conditions. The app fetches live weather data from **OpenWeatherMap API** and provides simple, actionable advice.

---

## Features
- Displays current weather for any location.
- Provides planting advice based on weather conditions.
- Beginner-friendly UI with card-based visualization.
- Docker-ready for easy deployment.
- Load-balanced across two servers using NGINX for reliability.

---

## Servers & Load Balancer
- **Web01:** [http://34.238.85.241](http://34.238.85.241)  
- **Web02:** [http://13.222.249.244](http://13.222.249.244)  
- **Load Balancer (Lb01):** [http://3.85.13.111](http://3.85.13.111)  

> Users should access the app via the load balancer to ensure traffic is distributed evenly between the servers.

---

## Local Setup
1. Clone the repository:

```bash
git clone <https://github.com/arianeitetero/Farmers-Livestock-Weather-app.git>
cd Farmers-Livestock-Weather-app
````

2. Add your OpenWeatherMap API key in `script.js`:

```javascript
const apiKey = "YOUR_API_KEY_HERE";
```

3. Open `index.html` in your browser to run locally.

---

## Docker Deployment

1. Build the Docker image on each web server (Web01 & Web02):

```bash
sudo docker build -t farmersapp .
```

2. Run the Docker container:

```bash
sudo docker run -d -p 80:80 farmersapp
```

3. Verify the container is running:

```bash
sudo docker ps
```

---

## Load Balancer Setup (NGINX on Lb01)

1. Install NGINX:

```bash
sudo apt update
sudo apt install nginx -y
```

2. Configure NGINX by editing `/etc/nginx/sites-available/default`:

```nginx
upstream farmers_app {
    server 34.238.85.241;
    server 13.222.249.244;
}

server {
    listen 80;

    location / {
        proxy_pass http://farmers_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

3. Test the NGINX configuration:

```bash
sudo nginx -t
```

4. Restart NGINX to apply changes:

```bash
sudo systemctl restart nginx
```

> Access the app through the load balancer: [http://3.85.13.111](http://3.85.13.111)

---

## API

* **OpenWeatherMap API:** [https://openweathermap.org/api](https://openweathermap.org/api)
  Proper credit to OpenWeatherMap for providing weather data.

---

## Notes

* Cards display weather and planting advice clearly for farmers.
* The load balancer ensures even traffic distribution for reliability.
* Docker makes it simple to deploy the app on multiple servers.
* Beginner-friendly code with comments for easy understanding.

---

## Optional Enhancements for Extra Points

* User authentication for personalized settings.
* Caching API responses to improve performance.
* Advanced data visualization for better user experience.
* CI/CD pipeline for automated deployment.
* Enhanced security measures like input validation and XSS prevention.

```

---

If you want, I can **also generate the Dockerfile + docker-compose.yml** that will perfectly match this setup and allow you to **run Web01 and Web02 containers with one command**, making load balancer deployment super easy.  

Do you want me to do that next?
```
