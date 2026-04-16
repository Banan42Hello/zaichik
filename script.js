// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Bunny Run landing page loaded successfully!', 'color:#00ff9d; font-family:monospace; font-size:14px;');

    // Carousel data - replace these URLs with your actual 8-bit PNGs later
    const characters = [
        {
            src: "https://i.postimg.cc/sD5GXg7V/38056d35_2584_4f3b_857f_8bffc8134906_removebg_preview_(1).png",
            name: "BUNNY"
        },
        {
            src: "https://i.postimg.cc/4dbZQxjp/Chat-GPT-Image-Jan-25-2026-07-54-44-AM-removebg-preview.png",
            name: "CARROT"
        },
        {
            src: "https://i.postimg.cc/kgnGgF7W/cc48e812_e994_4e0e_aa30_64fd7f23915a_removebg_preview.png",
            name: "PURPLE WIZARD"
        }
    ];

    let currentIndex = 0;
    const carouselImg = document.getElementById('carousel-image');
    const characterName = document.getElementById('character-name');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('carousel-dots');

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        characters.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        });
    }

    // Update carousel
    function updateCarousel() {
        carouselImg.src = characters[currentIndex].src;
        characterName.textContent = characters[currentIndex].name;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + characters.length) % characters.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % characters.length;
        updateCarousel();
    });

    // Auto-cycle every 4 seconds
    let autoCycle = setInterval(() => {
        currentIndex = (currentIndex + 1) % characters.length;
        updateCarousel();
    }, 4000);

    // Pause auto-cycle on hover
    const carouselFrame = document.querySelector('.carousel-frame');
    carouselFrame.addEventListener('mouseenter', () => clearInterval(autoCycle));
    carouselFrame.addEventListener('mouseleave', () => {
        autoCycle = setInterval(() => {
            currentIndex = (currentIndex + 1) % characters.length;
            updateCarousel();
        }, 4000);
    });

    // Initialize carousel
    createDots();
    updateCarousel();

    // Fake sales counter animation (increases slightly every 8 seconds)
    const salesEl = document.getElementById('sales-number');
    let salesCount = 2456789;
    setInterval(() => {
        salesCount += Math.floor(Math.random() * 37) + 12;
        salesEl.textContent = salesCount.toLocaleString('en-US');
    }, 8000);

    // Donate form handling (demo)
    const donateForm = document.getElementById('donate-form');
    const amountBtns = document.querySelectorAll('.amount-btn');
    let selectedAmount = 10;

    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            amountBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedAmount = parseInt(btn.dataset.value);
        });
    });

    donateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const customInput = document.getElementById('custom-amount').value;
        const finalAmount = customInput ? parseInt(customInput) : selectedAmount;
        
        // Demo success message
        const thanks = document.createElement('div');
        thanks.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: #00ff9d; color: #000; padding: 30px 40px; border-radius: 12px;
            font-family: 'Press Start 2P'; text-align: center; box-shadow: 0 0 40px #0f0;
            z-index: 9999; animation: pop 0.4s ease;
        `;
        thanks.innerHTML = `
            <h3>THANK YOU!</h3>
            <p>You just threw ${finalAmount} carrots<br>at the Purple Wizard!</p>
            <p style="font-size:0.8rem;margin-top:15px;">(Demo - real donation coming soon)</p>
        `;
        document.body.appendChild(thanks);
        
        setTimeout(() => {
            thanks.style.transition = 'all 0.4s';
            thanks.style.opacity = '0';
            setTimeout(() => thanks.remove(), 400);
            
            // Reset form
            donateForm.reset();
            amountBtns.forEach(b => b.classList.remove('active'));
            amountBtns[1].classList.add('active'); // $10 default
        }, 2600);
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    
    mobileBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileBtn.textContent = '☰';
                }
            }
        });
    });

    console.log('%c✅ All systems go! Your Bunny Run website is ready to hop!', 'color:#ff0; font-family:monospace');
});