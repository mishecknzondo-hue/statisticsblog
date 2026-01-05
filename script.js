// Dynamic blog posts loader
const postsContainer = document.getElementById('posts');

// Fetch posts from posts.json
fetch('posts.json')
  .then(response => response.json())
  .then(posts => {
    // Sort posts by date descending (latest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Display all posts
    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';
      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        ${post.date ? `<small>${new Date(post.date).toLocaleDateString()}</small>` : ''}
        <p>${post.content}</p>
      `;
      postsContainer.appendChild(postDiv);
    });
  })
  .catch(error => {
    console.error('Error loading posts:', error);
    postsContainer.innerHTML = "<p>Unable to load posts at the moment.</p>";
  });

// Simple contact form feedback
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  formMessage.textContent = "Thank you! Your message has been sent.";
  contactForm.reset();
});
