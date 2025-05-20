// Background Image Slideshow
        const images = [
            "1.jpg", "2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","15.jpg"];

        let index = 2;
        const background = document.getElementById("background");

        function changeBackground() {
            background.style.backgroundImage = `url('${images[index]}')`;
            index = (index + 1) % images.length;
        }

        changeBackground();
        setInterval(changeBackground, 3500); // Change background every 3 seconds

        // Toggle Voice Notes Section
        function toggleVoiceNotes() {
            const voiceNotes = document.getElementById("voiceNotes");
            if (voiceNotes.style.display === "none" || voiceNotes.style.display === "") {
                voiceNotes.style.display = "block";
            } else {
                voiceNotes.style.display = "none";
            }
        }
// Preloader: Hide After 3 Seconds
window.onload = function() {
    setTimeout(function() {
        document.getElementById("preloader").classList.add("hide-preloader");
    }, 3000);
};

//CONTROLSLIST
document.addEventListener('DOMContentLoaded', () => {
  const mediaElements = document.querySelectorAll('audio, video,img');
  mediaElements.forEach((element) => {
    element.setAttribute('controlsList', 'nodownload');
  });
});

//AUDIO AND VIDEO MANAGEMENT 
// Get all audio and video elements
const mediaElements = document.querySelectorAll('audio, video');

// Add an event listener to each media element
mediaElements.forEach((element) => {
  element.addEventListener('play', () => {
    // Pause all other media elements when this one starts playing
    mediaElements.forEach((otherElement) => {
      if (otherElement !== element) {
        otherElement.pause();
      }
    });
  });
});

// Function to cache data in local storage
function cacheData() {
  // Get all media elements (audio, video, and images)
  const mediaElements = document.querySelectorAll('audio, video, img');

  // Loop through each media element
  mediaElements.forEach((element) => {
    // Get the source URL of the media element
    const srcUrl = element.src;

    // Download the media data and store it in local storage
    fetch(srcUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const fileData = fileReader.result;
          localStorage.setItem(srcUrl, fileData);
        };
        fileReader.readAsDataURL(blob);
      });
  });
}

// Function to load cached data from local storage
function loadCachedData() {
  // Get all media elements (audio, video, and images)
  const mediaElements = document.querySelectorAll('audio, video, img');

  // Loop through each media element
  mediaElements.forEach((element) => {
    // Get the source URL of the media element
    const srcUrl = element.src;

    // Check if the media data is cached in local storage
    if (localStorage.getItem(srcUrl)) {
      // Load the cached media data
      element.src = localStorage.getItem(srcUrl);
    }
  });
}

//LAZY LOADING 
// Lazy loading for images, audio, and video
function lazyLoadMedia() {
    const lazyMedia = document.querySelectorAll('img[data-src], audio[data-src], video[data-src]');

    // Observer for lazy loading
    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Replace data-src with src
                if (element.tagName === "IMG" || element.tagName === "VIDEO" || element.tagName === "AUDIO") {
                    element.src = element.dataset.src;
                }

                // Load additional data if available
                if (element.tagName === "VIDEO" || element.tagName === "AUDIO") {
                    element.load();
                }

                // Stop observing the loaded element
                observer.unobserve(element);
            }
        });
    });

    // Observe all lazy media
    lazyMedia.forEach(media => lazyObserver.observe(media));
}

// Call the functions on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    adjustResourceScaling();
    lazyLoadMedia();
});
