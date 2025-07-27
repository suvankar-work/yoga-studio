// ==================yoga dynamik==================

const urlParams = new URLSearchParams(window.location.search);
const videoId = parseInt(urlParams.get("id"));

fetch("assets/data/yoga-videos.json")
  .then(res => res.json())
  .then(videos => {
    const video = videos.find(v => v.id === videoId);
    if (!video) return;

    
    document.getElementById("hb_current").textContent = video.name;
    document.getElementById("vdy_name").textContent = video.name;
    document.getElementById("vdy_type").textContent = video.type;
    document.getElementById("vdy_trainer").textContent = video.teacher;
    document.getElementById("rating").textContent = video.rating;
    document.getElementById("how_many_rating").textContent = `${video.reviews} ratings`;
    document.getElementById("yoga_timing").textContent = video.duration;
    document.getElementById("yoga_lebel").textContent = video.level;

    const iframe = document.getElementById("videoIframe");
    iframe.src = video.videoPreview + "?enablejsapi=1";

    const wicList = document.getElementById("wic_list");
    video.whatInside.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<img src='assets/images/hand.svg' alt=''>${item}`;
      wicList.appendChild(li);
    });

    const benefitList = document.getElementById("va_benifit_list");
    video.benefits.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      benefitList.appendChild(li);
    });

    document.getElementById("va_benifit_one").textContent = video.description1;
    document.getElementById("va_benifit_two").textContent = video.description2;
    document.getElementById("yoga_det_img").src = video.image2;
  });

document.getElementById("playBtn").addEventListener("click", () => {
  document.getElementById("videoOverlay").classList.add("hidden");
  document.getElementById("videoIframe").contentWindow.postMessage(
    '{"event":"command","func":"playVideo","args":""}', '*'
  );
});



// ==================yoga video==================

const overlay = document.getElementById('videoOverlay');
const iframe = document.getElementById('videoIframe');

document.getElementById('playBtn').addEventListener('click', function () {
  // Hide overlay
  overlay.classList.add('hidden');

  // Play the YouTube video
  iframe.contentWindow.postMessage(
    '{"event":"command","func":"playVideo","args":""}',
    '*'
  );
});