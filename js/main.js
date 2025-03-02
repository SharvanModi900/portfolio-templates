(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            }
        }
    });
    
    
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    

    // Skills section parallax and mouse effects
    document.addEventListener('DOMContentLoaded', function() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        // Initialize VanillaTilt for 3D hover effect
        VanillaTilt.init(skillCards, {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.5,
            scale: 1.02
        });

        // Animate skill ratings when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ratingStars = entry.target.querySelectorAll('.skill-rating i');
                    const ratingText = entry.target.querySelector('.rating-text');
                    
                    // Animate stars sequentially
                    ratingStars.forEach((star, index) => {
                        setTimeout(() => {
                            star.style.opacity = '1';
                            star.style.transform = 'scale(1)';
                        }, index * 100);
                    });

                    // Show rating text
                    setTimeout(() => {
                        ratingText.style.opacity = '1';
                        ratingText.style.transform = 'translateY(0)';
                    }, ratingStars.length * 100);
                }
            });
        }, { threshold: 0.2 });

        skillCards.forEach(card => observer.observe(card));

        // Create floating grid effect
        const skillsSection = document.querySelector('.skills-section');
        const cyberGrid = document.querySelector('.cyber-grid');
        
        // Add multiple grid lines
        for (let i = 0; i < 10; i++) {
            const line = document.createElement('div');
            line.className = 'grid-line';
            line.style.top = `${i * 10}%`;
            cyberGrid.appendChild(line);
        }

        // Parallax effect on mouse move
        skillsSection.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = skillsSection.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            skillCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardX = (rect.left + rect.width / 2 - e.clientX) / 30;
                const cardY = (rect.top + rect.height / 2 - e.clientY) / 30;

                card.style.transform = `
                    perspective(1000px)
                    rotateY(${cardX}deg)
                    rotateX(${-cardY}deg)
                    translateZ(10px)
                `;

                // Add star glow effect on hover
                const stars = card.querySelectorAll('.skill-rating i');
                stars.forEach((star, index) => {
                    const delay = index * 0.1;
                    star.style.textShadow = `0 0 ${20 + Math.abs(cardX + cardY)}px rgba(0, 255, 255, ${0.5 + Math.abs(cardX + cardY) / 50})`;
                    star.style.transform = `scale(${1 + Math.abs(cardX + cardY) / 50}) rotate(${(cardX + cardY) * 2}deg)`;
                    star.style.transition = `all 0.3s ${delay}s ease`;
                });
            });

            cyberGrid.style.transform = `
                perspective(1000px)
                rotateX(${y * 10}deg)
                rotateY(${x * 10}deg)
                translateZ(-50px)
            `;
        });

        // Reset card positions when mouse leaves section
        skillsSection.addEventListener('mouseleave', () => {
            skillCards.forEach(card => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                
                // Reset star effects
                const stars = card.querySelectorAll('.skill-rating i');
                stars.forEach(star => {
                    star.style.textShadow = '0 0 15px rgba(0, 255, 255, 0.5)';
                    star.style.transform = 'scale(1) rotate(0deg)';
                });
            });
            cyberGrid.style.transform = 'perspective(1000px) rotateX(15deg) translateZ(-50px)';
        });

        // Add glow effect on hover
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                const glowEffect = document.createElement('div');
                glowEffect.className = 'card-glow';
                this.appendChild(glowEffect);

                const updateGlowPosition = (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    glowEffect.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,255,255,0.2) 0%, transparent 50%)`;
                };

                card.addEventListener('mousemove', updateGlowPosition);
                card.addEventListener('mouseleave', () => {
                    glowEffect.remove();
                    card.removeEventListener('mousemove', updateGlowPosition);
                });
            });
        });

        // Animate tags on hover
        const tags = document.querySelectorAll('.cyber-tag');
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
                this.style.boxShadow = '0 5px 15px rgba(0,255,255,0.3)';
            });

            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    });

    // Add scroll-based parallax effect
    window.addEventListener('scroll', () => {
        const skillsSection = document.querySelector('.skills-section');
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.15;
        
        if (skillsSection) {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                skillsSection.style.backgroundPosition = `center ${rate}px`;
                
                const cards = skillsSection.querySelectorAll('.skill-card');
                cards.forEach((card, index) => {
                    const speed = 0.1 + (index % 3) * 0.05;
                    card.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        }
    });

    // About Section Animations
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize About section animations
        initializeAboutSection();
    });

    function initializeAboutSection() {
        const aboutSection = document.querySelector('.about');
        if (!aboutSection) return;

        // Add cyber particles
        const particles = document.createElement('div');
        particles.className = 'cyber-particles';
        aboutSection.prepend(particles);

        // Initialize cyber frame
        initializeCyberFrame();

        // Initialize experience badge
        initializeExperienceBadge();

        // Initialize skill animations
        initializeSkillAnimations();

        // Initialize parallax effects
        initializeParallaxEffects();

        // Initialize button effects
        initializeButtonEffects();
    }

    function initializeCyberFrame() {
        const cyberFrame = document.querySelector('.cyber-frame');
        if (!cyberFrame) return;

        // Add corner lights
        const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        corners.forEach(corner => {
            const frameCorner = cyberFrame.querySelector(`.${corner}`);
            if (frameCorner) {
                const light = document.createElement('div');
                light.className = 'corner-light';
                frameCorner.appendChild(light);
            }
        });

        // Add scan line
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        cyberFrame.appendChild(scanLine);

        // Add glitch effect
        const originalImg = cyberFrame.querySelector('img');
        if (originalImg) {
            const glitchEffect = document.createElement('div');
            glitchEffect.className = 'glitch-effect';
            
            // Create three layers of the same image for glitch effect
            for (let i = 0; i < 3; i++) {
                const imgClone = originalImg.cloneNode(true);
                glitchEffect.appendChild(imgClone);
            }
            
            originalImg.replaceWith(glitchEffect);
        }

        // Add cyber circles
        const circles = document.createElement('div');
        circles.className = 'cyber-circles';
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            circles.appendChild(span);
        }
        cyberFrame.appendChild(circles);

        // Add shine effect on mouse move
        cyberFrame.addEventListener('mousemove', (e) => {
            const rect = cyberFrame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (x - centerX) / centerX * 15;
            const angleY = (y - centerY) / centerY * 15;
            
            cyberFrame.style.transform = `perspective(1000px) rotateX(${-angleY}deg) rotateY(${angleX}deg)`;
            
            // Update corner lights intensity based on mouse position
            corners.forEach(corner => {
                const light = cyberFrame.querySelector(`.${corner} .corner-light`);
                if (light) {
                    const distance = Math.sqrt(
                        Math.pow(x - (corner.includes('right') ? rect.width : 0), 2) +
                        Math.pow(y - (corner.includes('bottom') ? rect.height : 0), 2)
                    );
                    const intensity = Math.max(0, 1 - distance / Math.max(rect.width, rect.height));
                    light.style.opacity = 0.5 + intensity * 0.5;
                }
            });
        });

        cyberFrame.addEventListener('mouseleave', () => {
            cyberFrame.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            // Reset corner lights
            corners.forEach(corner => {
                const light = cyberFrame.querySelector(`.${corner} .corner-light`);
                if (light) light.style.opacity = '';
            });
        });
    }

    function initializeExperienceBadge() {
        const badge = document.querySelector('.experience-badge');
        if (!badge) return;

        // Add hologram effect
        const hologram = document.createElement('div');
        hologram.className = 'hologram-effect';
        badge.prepend(hologram);

        // Add badge circles
        const circles = document.createElement('div');
        circles.className = 'badge-circles';
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            circles.appendChild(span);
        }
        badge.appendChild(circles);

        // Animate years counter
        const yearsElement = badge.querySelector('.years');
        if (yearsElement) {
            const targetYears = parseInt(yearsElement.textContent);
            let currentYears = 0;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && currentYears === 0) {
                        const interval = setInterval(() => {
                            currentYears += 0.1;
                            yearsElement.textContent = currentYears.toFixed(1);
                            
                            if (currentYears >= targetYears) {
                                yearsElement.textContent = targetYears;
                                clearInterval(interval);
                            }
                        }, 50);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(badge);
        }
    }

    function initializeSkillAnimations() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            // Add progress circles
            const progressBar = item.querySelector('.skill-progress');
            if (progressBar) {
                const circles = document.createElement('div');
                circles.className = 'progress-circles';
                for (let i = 0; i < 3; i++) {
                    const span = document.createElement('span');
                    circles.appendChild(span);
                }
                progressBar.appendChild(circles);
            }

            // Animate progress bar on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target.querySelector('.progress-bar');
                        const percentage = entry.target.querySelector('.skill-percentage');
                        if (bar && percentage) {
                            const value = percentage.textContent;
                            bar.style.width = value;
                        }
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(item);

            // Add hover effects
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px)';
                item.style.boxShadow = '0 10px 20px rgba(0, 247, 255, 0.2)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
                item.style.boxShadow = '';
            });
        });
    }

    function initializeParallaxEffects() {
        const aboutSection = document.querySelector('.about');
        if (!aboutSection) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            // Parallax for background grid
            aboutSection.style.backgroundPosition = `center ${rate}px`;
            
            // Parallax for cyber particles
            const particles = aboutSection.querySelector('.cyber-particles');
            if (particles) {
                particles.style.transform = `translateY(${rate * 0.5}px)`;
            }
        });

        // Mouse move parallax
        aboutSection.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            const elements = aboutSection.querySelectorAll('.cyber-frame, .experience-badge, .skill-item');
            elements.forEach(el => {
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        aboutSection.addEventListener('mouseleave', () => {
            const elements = aboutSection.querySelectorAll('.cyber-frame, .experience-badge, .skill-item');
            elements.forEach(el => {
                el.style.transform = '';
            });
        });
    }

    function initializeButtonEffects() {
        const buttons = document.querySelectorAll('.cyber-btn');
        
        buttons.forEach(btn => {
            // Add button lines
            for (let i = 0; i < 4; i++) {
                const line = document.createElement('span');
                line.className = 'btn-line';
                btn.appendChild(line);
            }

            // Add particles effect
            const particles = document.createElement('div');
            particles.className = 'btn-particles';
            btn.appendChild(particles);

            // Wrap text in span
            const text = btn.textContent;
            btn.textContent = '';
            const textSpan = document.createElement('span');
            textSpan.className = 'btn-text';
            textSpan.textContent = text;
            btn.appendChild(textSpan);

            // Add hover effect
            btn.addEventListener('mouseenter', () => {
                particles.style.opacity = '1';
            });

            btn.addEventListener('mouseleave', () => {
                particles.style.opacity = '0';
            });
        });
    }

    function initializeExperience() {
        const experienceSection = document.querySelector('.experience');
        if (!experienceSection) return;

        // Handle card glow effect
        const cards = experienceSection.querySelectorAll('.cyber-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
                const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--mouse-x', '50%');
                card.style.setProperty('--mouse-y', '50%');
            });
        });

        // Handle timeline animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.2 });

        const timelineItems = experienceSection.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => observer.observe(item));

        // Handle grid parallax effect
        const grid = experienceSection.querySelector('.cyber-grid');
        if (grid) {
            experienceSection.addEventListener('mousemove', (e) => {
                const rect = experienceSection.getBoundingClientRect();
                const x = (e.clientX - rect.left) / experienceSection.clientWidth;
                const y = (e.clientY - rect.top) / experienceSection.clientHeight;
                
                const moveX = (x - 0.5) * 20;
                const moveY = (y - 0.5) * 20;
                
                grid.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${moveY}deg) rotateY(${-moveX}deg)`;
            });

            experienceSection.addEventListener('mouseleave', () => {
                grid.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
            });
        }
    }

    // Initialize experience section
    document.addEventListener('DOMContentLoaded', () => {
        initializeExperience();
    });

    // Initialize portfolio section
    function initializePortfolio() {
        const portfolioSection = document.querySelector('.portfolio');
        if (!portfolioSection) return;

        // Initialize isotope after images are loaded
        const portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            transitionDuration: '0.6s'
        });

        // Filter items on button click
        $('#portfolio-filter li').on('click', function () {
            $("#portfolio-filter li").removeClass('filter-active');
            $(this).addClass('filter-active');
            portfolioIsotope.isotope({filter: $(this).data('filter')});
        });

        // Handle card hover effects
        const cards = portfolioSection.querySelectorAll('.cyber-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
                const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
                
                // Update corner lights based on mouse position
                const corners = card.querySelectorAll('.corner-light');
                corners.forEach(corner => {
                    const cornerRect = corner.getBoundingClientRect();
                    const distance = Math.sqrt(
                        Math.pow(e.clientX - cornerRect.left, 2) +
                        Math.pow(e.clientY - cornerRect.top, 2)
                    );
                    const maxDistance = Math.sqrt(
                        Math.pow(rect.width, 2) +
                        Math.pow(rect.height, 2)
                    );
                    const intensity = 1 - (distance / maxDistance);
                    corner.style.opacity = 0.4 + (intensity * 0.6);
                    corner.style.transform = `scale(${1 + (intensity * 0.5)})`;
                });

                // Add glow effect
                card.style.background = `
                    radial-gradient(
                        circle at ${x}% ${y}%,
                        rgba(0, 247, 255, 0.1) 0%,
                        rgba(255, 255, 255, 0.02) 50%
                    )
                `;
            });

            card.addEventListener('mouseleave', () => {
                // Reset corner lights
                const corners = card.querySelectorAll('.corner-light');
                corners.forEach(corner => {
                    corner.style.opacity = '';
                    corner.style.transform = '';
                });

                // Reset background
                card.style.background = '';
            });
        });

        // Animate tags on hover
        const tags = portfolioSection.querySelectorAll('.cyber-tag');
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
            });

            tag.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Add parallax effect to grid
        const grid = portfolioSection.querySelector('.cyber-grid');
        if (grid) {
            portfolioSection.addEventListener('mousemove', (e) => {
                const rect = portfolioSection.getBoundingClientRect();
                const x = (e.clientX - rect.left) / portfolioSection.clientWidth;
                const y = (e.clientY - rect.top) / portfolioSection.clientHeight;
                
                const moveX = (x - 0.5) * 20;
                const moveY = (y - 0.5) * 20;
                
                grid.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            portfolioSection.addEventListener('mouseleave', () => {
                grid.style.transform = 'translate(0, 0)';
            });
        }
    }

    // Initialize portfolio section when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initializePortfolio();
    });

})(jQuery);

