#  Farmers Livestock & Weather App

A beginner-friendly web application that helps farmers decide the best time to plant crops based on **current weather conditions**.  
It fetches live weather data from **OpenWeatherMap API** and provides actionable advice in a simple, card-based format.

---

## Features
- Display current weather for any location
- Provide planting advice based on weather conditions
- Beginner-friendly UI with card visualization
- Docker-ready for easy deployment
- Load-balanced across two servers using NGINX for reliability

---

## Servers & Load Balancer
- **Web01:** [http://34.238.85.241](http://34.238.85.241)  
- **Web02:** [http://13.222.249.244](http://13.222.249.244)  
- **Load Balancer (Lb01):** [http://3.85.13.111](http://3.85.13.111)  

> Users should access the app via the load balancer to ensure traffic is distributed evenly.

- **Live Demo Video:** [https://youtu.be/nP0vyBpnstA](https://youtu.be/nP0vyBpnstA) (2 minutes max)

---

## Local Setup
1. Clone the repository:

```bash
git clone https://github.com/arianeitetero/Farmers-Livestock-Weather-app.git
cd Farmers-Livestock-Weather-app
````

2. Add your OpenWeatherMap API key in `script.js`:

```javascript
const apiKey = "YOUR_API_KEY_HERE"; // Replace with your key
```

3. Open `index.html` in your browser to run locally.

> **Note:** Do not commit your API key. Use `.gitignore` to exclude sensitive files like `.env`.

---

## Docker Deployment

1. Build Docker image on **each web server**:

```bash
sudo docker build -t farmersapp .
```

2. Run Docker container:

```bash
sudo docker run -d -p 80:80 farmersapp
```

3. Check running containers:

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

2. Configure `/etc/nginx/sites-available/default`:

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

3. Test and restart NGINX:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

> Access the app through the load balancer: [http://3.85.13.111](http://3.85.13.111)

---

## API Credit

* **OpenWeatherMap API:** [https://openweathermap.org/api](https://openweathermap.org/api)
  Proper credit to OpenWeatherMap for providing weather data.

---

## Notes & Challenges

* Cards display weather and planting advice clearly for farmers.
* Docker allows easy deployment on multiple servers.
* NGINX load balancer ensures even traffic distribution and reliability.
* Charts were replaced with cards for simpler visualization.