// عناصر الصفحة
const playButton = document.getElementById("playButton");
const videoPlayer = document.getElementById("video-player");
const videoURL = document.getElementById("videoURL");
const showLinks = document.getElementById("showLinks");
const linksContainer = document.querySelector(".links");
const toggleTheme = document.getElementById("toggleTheme");

// حفظ الروابط
let videoLinks = JSON.parse(localStorage.getItem("videoLinks")) || [];

// تحديث قائمة الروابط
function updateLinks() {
  linksContainer.innerHTML = "";
  videoLinks.forEach((link, index) => {
    const linkElement = document.createElement("p");
    linkElement.textContent = `رابط ${index + 1}`;
    linkElement.addEventListener("click", () => {
      videoPlayer.src = link;
      videoPlayer.play();
    });
    linksContainer.appendChild(linkElement);
  });
}

// تشغيل الفيديو وحفظ الرابط
playButton.addEventListener("click", () => {
  const url = videoURL.value.trim();
  if (url && !videoLinks.includes(url)) {
    if (videoLinks.length >= 15) videoLinks.shift();
    videoLinks.push(url);
    localStorage.setItem("videoLinks", JSON.stringify(videoLinks));
    updateLinks();
  } else if (videoLinks.includes(url)) {
    alert("الرابط موجود بالفعل!");
  }
  if (url) {
    videoPlayer.src = url;
    videoPlayer.play();
  } else {
    alert("يرجى إدخال رابط صحيح!");
  }
});

// عرض أو إخفاء الروابط
showLinks.addEventListener("click", () => {
  linksContainer.style.display =
    linksContainer.style.display === "block" ? "none" : "block";
});

// تفعيل الوضع الليلي
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️";
});

// منع تحديث الصفحة بالسحب للأسفل
document.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });

// تحميل الإعدادات عند بدء التشغيل
document.body.classList.add("dark");
toggleTheme.textContent = "🌙";
updateLinks();