// Navegación móvil
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                
                // Animar las líneas del menú hamburguesa
                const spans = menuToggle.querySelectorAll('span');
                if (navMenu.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        }

        // Efecto scroll en header
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Smooth scroll para navegación
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight || 80;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil después del click
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        
                        // Resetear animación del menú hamburguesa
                        if (menuToggle) {
                            const spans = menuToggle.querySelectorAll('span');
                            spans[0].style.transform = 'none';
                            spans[1].style.opacity = '1';
                            spans[2].style.transform = 'none';
                        }
                    }
                }
            });
        });

        // Animación de elementos al scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar elementos para animación
        document.querySelectorAll('.feature-card, .room-card, .gallery-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Formulario de contacto
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });

                const name = data.name;
                const email = data.email;
                const phone = data.phone;
                const checkin = data.checkin;
                const checkout = data.checkout;

                if (!name || !email || !phone || !checkin || !checkout) {
                    alert('Por favor, complete todos los campos obligatorios.');
                    return;
                }

                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;

                // WhatsApp integration
                const message = `¡Hola! Me interesa hacer una reservación en Posada D'Lourdes:
                
📝 *Datos del huésped:*
• Nombre: ${name}
• Email: ${email}
• Teléfono: ${phone}

📅 *Fechas:*
• Llegada: ${checkin}
• Salida: ${checkout}
• Huéspedes: ${data.guests}

💬 *Mensaje:*
${data.message || 'Sin mensaje adicional'}

¡Espero su respuesta!`;

                const whatsappNumber = '5219861126221';
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                
                window.open(whatsappURL, '_blank');
                
                setTimeout(() => {
                    alert(`¡Gracias ${name}! Se ha abierto WhatsApp con su solicitud de reserva.`);
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            });
        }

        // Validación de fechas
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        
        if (checkinInput && checkoutInput) {
            const today = new Date().toISOString().split('T')[0];
            checkinInput.min = today;
            checkoutInput.min = today;

            checkinInput.addEventListener('change', function() {
                const checkinDate = new Date(this.value);
                const minCheckoutDate = new Date(checkinDate);
                minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
                checkoutInput.min = minCheckoutDate.toISOString().split('T')[0];
                
                if (checkoutInput.value && new Date(checkoutInput.value) <= checkinDate) {
                    checkoutInput.value = '';
                }
            });
        }

        // Cerrar menú móvil al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (navMenu && menuToggle) {
                const isClickInsideMenu = navMenu.contains(e.target);
                const isClickOnToggle = menuToggle.contains(e.target);
                
                if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });

        // Resaltar navegación activa
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
            
            let currentSection = '';
            const scrollPosition = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });