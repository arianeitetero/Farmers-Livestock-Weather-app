# Smart Farming Advisor

## Overview
The Smart Farming Advisor is a web application designed to help small-scale farmers make better planting decisions based on current weather conditions. It uses a free weather API to provide real-time weather information and suggests whether farmers should plant crops or wait. This application is beginner-friendly and uses HTML, CSS, and JavaScript for the frontend.  

---

## Features
- Fetches **current weather data** using an external API.
- Provides **planting recommendations** based on weather conditions.
- Displays information in **clear, interactive cards**.
- Beginner-friendly code with **simple English comments**.
- Runs locally and can be deployed using **Docker**.
- Supports **load-balanced deployment** with NGINX.

---

## API Used
- **WeatherAPI.com** (Free subscription)  
  Official Documentation: [https://www.weatherapi.com/docs/](https://www.weatherapi.com/docs/)  
  **Credit:** This app uses the free Weather API to fetch current weather data.  

> **Note:** API keys are stored in `script.js` in a placeholder variable. Do **not share your API key publicly**.

---

## Local Setup

1. Clone this repository or copy files to your local machine.
2. Open `index.html` in your browser.
3. Enter your **location** to get weather info and planting recommendations.

---

## Docker Setup

1. Make sure Docker is installed:

```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
docker --version
