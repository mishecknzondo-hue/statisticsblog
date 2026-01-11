// Scroll animation for fade-in sections
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll){
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Load blog posts dynamically from posts.json
fetch('posts.json')
  .then(response => response.json())
  .then(posts => {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
      const thumb = post.thumbnail ? post.thumbnail : 'MISHECK.jpg';
      const postHTML = `
        <div class="post-card fade-in">
          <img src="${thumb}" alt="${post.title}">
          <div class="post-content">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p class="date">Date: ${post.date}</p>
          </div>
        </div>
      `;
      postsContainer.insertAdjacentHTML('beforeend', postHTML);
    });

    // Reapply fade-in animation to dynamically added posts
    const newFaders = document.querySelectorAll('.post-card');
    newFaders.forEach(fader => appearOnScroll.observe(fader));
  })
  .catch(error => console.error('Error loading posts:', error));
