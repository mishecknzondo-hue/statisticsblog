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

// Contact form submission using Formspree
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
if(form){
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const action = form.action;
    try{
      const response = await fetch(action, { method: 'POST', body: data, headers: { 'Accept':'application/json' } });
      if(response.ok){
        formMessage.textContent = "Message sent successfully!";
        form.reset();
      } else {
        formMessage.textContent = "Failed to send message. Try again.";
      }
    }catch(error){
      formMessage.textContent = "Error occurred. Try again.";
    }
  });
}
