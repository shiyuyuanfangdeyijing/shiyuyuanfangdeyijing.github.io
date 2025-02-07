let newYearTimer = null;

var newYear = () => {
    clearTimeout(newYearTimer);
    let newYearElement = document.querySelector('#newYear');
    if (!newYearElement) return;

    // 新年时间戳 & 星期数组
    let newYearTimestamp = new Date('2026-02-17 00:00:00').getTime() / 1000;
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    function nol(h) { return h > 9 ? h : '0' + h; }

    function time() {
        let now = new Date();
        let second = newYearTimestamp - Math.round(now.getTime() / 1000);

        // 显示当前日期
        newYearElement.querySelector('.today').textContent = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${week[now.getDay()]}`;

        if (second < 0) {
            newYearElement.querySelector('.title').textContent = 'Happy New Year!';
            newYearElement.querySelector('.newYear-time').innerHTML = '<span class="happyNewYear">新年快乐</span>';
        } else {
            newYearElement.querySelector('.title').textContent = '距离2026年春节：';

            if (second >= 86400) {
                let days = Math.floor(second / 86400);
                newYearElement.querySelector('.newYear-time').innerHTML = `<span class="day">${days}<span class="unit">天</span></span>`;
            } else {
                let h = nol(Math.floor(second / 3600));
                second %= 3600;
                let m = nol(Math.floor(second / 60));
                let s = nol(second % 60);
                newYearElement.querySelector('.newYear-time').innerHTML = `<span class="time">${h}:${m}:${s}</span>`;
                newYearTimer = setTimeout(time, 1000);
            }
        }
    }

    time();
};

newYearElement.style.backgroundImage = 'none';

// 防止 Pjax 事件重复绑定
document.removeEventListener('pjax:complete', newYear);
document.addEventListener('pjax:complete', newYear);
document.addEventListener('DOMContentLoaded', newYear);
