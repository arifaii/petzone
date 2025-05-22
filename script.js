document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")
  const closeMenu = document.getElementById("close-menu")
  const mobileNavLinks = mobileMenu.querySelectorAll(".nav-link")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
  })

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
  })

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  })

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Carousel functionality
  const carousel = document.getElementById("carousel")
  const carouselItems = carousel.querySelectorAll(".carousel-item")
  const prevButton = document.getElementById("carousel-prev")
  const nextButton = document.getElementById("carousel-next")

  let currentIndex = 0
  const itemWidth = carouselItems[0].offsetWidth
  const gap = 20
  const itemsPerView = window.innerWidth < 768 ? 2 : 4

  function updateCarousel() {
    carousel.scrollTo({
      left: currentIndex * (itemWidth + gap),
      behavior: "smooth",
    })
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--
      updateCarousel()
    }
  })

  nextButton.addEventListener("click", () => {
    if (currentIndex < carouselItems.length - itemsPerView) {
      currentIndex++
      updateCarousel()
    }
  })

  // Auto-scroll carousel
  let autoScrollInterval = setInterval(() => {
    if (currentIndex < carouselItems.length - itemsPerView) {
      currentIndex++
    } else {
      currentIndex = 0
    }
    updateCarousel()
  }, 5000)

  // Pause auto-scroll when hovering over carousel
  carousel.addEventListener("mouseenter", () => {
    clearInterval(autoScrollInterval)
  })

  carousel.addEventListener("mouseleave", () => {
    autoScrollInterval = setInterval(() => {
      if (currentIndex < carouselItems.length - itemsPerView) {
        currentIndex++
      } else {
        currentIndex = 0
      }
      updateCarousel()
    }, 5000)
  })

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-item")
  faqItems.forEach((item) => {
    const header = item.querySelector(".faq-header")
    header.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active")
    })
  })

  // Form validation
  const form = document.getElementById("subscription-form")
  const formMessage = document.getElementById("form-message")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const nameInput = document.getElementById("nombre")
    const emailInput = document.getElementById("email")

    // Basic validation
    if (nameInput.value.trim() === "" || emailInput.value.trim() === "") {
      formMessage.textContent = "Por favor, completa todos los campos"
      formMessage.className = "form-message error"
      return
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(emailInput.value)) {
      formMessage.textContent = "Por favor, ingresa un correo electrónico válido"
      formMessage.className = "form-message error"
      return
    }

    // Success message
    formMessage.textContent = "¡Gracias por suscribirte!"
    formMessage.className = "form-message success"

    // Reset form
    nameInput.value = ""
    emailInput.value = ""

    // Clear message after 3 seconds
    setTimeout(() => {
      formMessage.textContent = ""
    }, 3000)
  })

  // Back to top button
  const backToTopButton = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  })

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Animation on scroll
  const animateElements = document.querySelectorAll(".animate-on-scroll")

  function checkIfInView() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight - 100) {
        element.classList.add("animate-fade-in")
      }
    })
  }

  window.addEventListener("scroll", checkIfInView)
  window.addEventListener("resize", checkIfInView)

  // Check on initial load
  checkIfInView()
})
