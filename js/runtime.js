function fetchWeather() {
    fetch("您的天气API地址") // 请提供 API 地址
        .then(response => response.json())
        .then(data => {
            let weatherInfo = `🌤 天气：${data.weather}，温度：${data.temperature}℃`;
            let weatherElement = document.getElementById("weather");
            if (!weatherElement) {
                weatherElement = document.createElement("div");
                weatherElement.id = "weather";
                weatherElement.style.fontSize = "13px";
                weatherElement.style.fontWeight = "bold";
                let workboard = document.getElementById("workboard");
                if (workboard) workboard.appendChild(weatherElement);
            }
            weatherElement.innerHTML = weatherInfo;
        })
        .catch(error => console.error("天气信息获取失败:", error));
}

function createtime() {
    let now = new Date(); // 每次获取最新的当前时间
    let startTime = new Date("12/10/2022 00:00:00"); // 计算起始时间
    let voyagerStartTime = new Date("12/10/2022 00:00:00"); // 旅行者1号计算起点

    // 计算旅行者1号距离地球的千米数
    let t = Math.trunc(234e8 + (now - startTime) / 1e3 * 17);
    let a = (t / 1496e5).toFixed(6); // 转换为天文单位

    // 计算网站运行时间
    let elapsedDays = Math.floor((now - voyagerStartTime) / (1000 * 60 * 60 * 24));
    let elapsedHours = Math.floor((now - voyagerStartTime) / (1000 * 60 * 60)) % 24;
    let elapsedMinutes = Math.floor((now - voyagerStartTime) / (1000 * 60)) % 60;
    let elapsedSeconds = Math.floor((now - voyagerStartTime) / 1000) % 60;

    // 补零处理
    elapsedHours = elapsedHours.toString().padStart(2, "0");
    elapsedMinutes = elapsedMinutes.toString().padStart(2, "0");
    elapsedSeconds = elapsedSeconds.toString().padStart(2, "0");

    // 判断时间段，切换不同的文本
    let message = elapsedHours >= 9 && elapsedHours < 18
        ? `<img class='boardsign' src="..." title="什么时候能够实现财富自由呀~"><br> 
           <div style="font-size:13px;font-weight:bold">
           本站已正常运行了 ${elapsedDays} 天 ${elapsedHours} 小时 ${elapsedMinutes} 分 ${elapsedSeconds} 秒 
           <i id="heartbeat" class='fas fa-heartbeat'></i> <br>
           旅行者 1 号当前距离地球 ${t} 千米，约为 ${a} 个天文单位 🚀</div>`
        : `<img class='boardsign' src="..." title="下班了就该开开心心地玩耍~"><br> 
           <div style="font-size:13px;font-weight:bold">
           本站已正常运行了 ${elapsedDays} 天 ${elapsedHours} 小时 ${elapsedMinutes} 分 ${elapsedSeconds} 秒 
           <i id="heartbeat" class='fas fa-heartbeat'></i> <br>
           旅行者 1 号当前距离地球 ${t} 千米，约为 ${a} 个天文单位 🚀</div>`;

    // 更新页面
    let workboard = document.getElementById("workboard");
    if (workboard) {
        workboard.innerHTML = message;
    }

    // 获取天气信息
    fetchWeather();
}

// 每秒更新一次时间
setInterval(createtime, 1000);

// 每 10 分钟更新一次天气
setInterval(fetchWeather, 600000);

// 初始调用
createtime();
fetchWeather();
