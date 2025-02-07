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
    let now = new Date(); // 获取当前时间
    let siteStartTime = new Date("12/10/2022 00:00:00"); // 网站开始运行时间
    let gaokaoDate = new Date("07/06/2026 00:00:00"); // 高考日期（2026年6月7日）

    // 计算网站运行时间
    let timeDiff = now - siteStartTime;
    let totalSeconds = Math.floor(timeDiff / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor((totalSeconds % 86400) / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    // 补零处理
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    // 计算高考倒计时
    let gaokaoCountdown = "";
    let gaokaoDiff = gaokaoDate - now;
    if (gaokaoDiff > 0) {
        let remainingSeconds = Math.floor(gaokaoDiff / 1000);
        if (remainingSeconds >= 86400) {
            let daysUntilGaokao = Math.ceil(remainingSeconds / 86400);
            gaokaoCountdown = `📚 距离2026年高考还有 <b>${daysUntilGaokao}</b> 天，加油！`;
        } else {
            let gHours = Math.floor(remainingSeconds / 3600);
            let gMinutes = Math.floor((remainingSeconds % 3600) / 60);
            let gSeconds = remainingSeconds % 60;

            // 补零
            gHours = String(gHours).padStart(2, "0");
            gMinutes = String(gMinutes).padStart(2, "0");
            gSeconds = String(gSeconds).padStart(2, "0");

            gaokaoCountdown = `📚 距离2026年高考还有 <b>${gHours}</b> 小时 <b>${gMinutes}</b> 分钟 <b>${gSeconds}</b> 秒，加油！`;
        }
    } else {
        gaokaoCountdown = "🎉 高考加油！愿你金榜题名！";
    }

    // 生成显示内容
    let message = `
        <div style="font-size:14px;font-weight:bold">
            本站已正常运行了 <b>${days}</b> 天 <b>${hours}</b> 小时 <b>${minutes}</b> 分钟 <b>${seconds}</b> 秒
        </div>
        <br>
        <div style="font-size:14px;font-weight:bold">${gaokaoCountdown}</div>
    `;

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
