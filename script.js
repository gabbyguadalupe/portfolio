const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
if (menuButton) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', open);
    menuButton.textContent = open ? 'CLOSE' : 'MENU';
  });
}
document.querySelectorAll('#year').forEach((year) => { year.textContent = new Date().getFullYear(); });

// Narrow vertical videos: browsers hide the fullscreen button in the ⋮ menu
// when a video is this small, so add our own button in the corner.
document.querySelectorAll('video.vertical-embed, video.about-video').forEach((video) => {
  let frame = video.parentNode;
  if (!frame.classList.contains('media-frame')) {
    frame = document.createElement('div');
    frame.className = 'video-frame';
    video.parentNode.insertBefore(frame, video);
    frame.appendChild(video);
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'fullscreen-button';
  button.setAttribute('aria-label', 'Play video full screen');
  button.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
  frame.appendChild(button);

  button.addEventListener('click', () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen(); // iPhone Safari
    }
  });
});

// About page: until a photo/video file is added, show which file belongs there
document.querySelectorAll('.media-frame').forEach((frame) => {
  const media = frame.querySelector('img, video');
  if (!media) return;
  const markMissing = () => frame.classList.add('is-missing');
  if (media.tagName === 'IMG') {
    if (media.complete && media.naturalWidth === 0) markMissing();
    media.addEventListener('error', markMissing);
  } else {
    const source = media.querySelector('source');
    if (source) source.addEventListener('error', markMissing);
    media.addEventListener('error', markMissing);
  }
});
