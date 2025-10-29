export default function slider() {
  const sliderParent = document.querySelector(".offer__slider");
  const slides = document.querySelectorAll(".offer__slide");
  const prevBtn = document.querySelector(".offer__slider-prev");
  const nextBtn = document.querySelector(".offer__slider-next");
  const current = document.querySelector("#current");
  const total = document.querySelector("#total");
  const slidesWrapper = document.querySelector(".offer__slider-wrapper");
  const slidesInner = document.querySelector(".offer__slider-inner");
  
  // slider new version start
  let slideIndex = 1;
  let baseOffset = 0;
  const wrapperWidth = parseFloat(window.getComputedStyle(slidesWrapper).width);
  
  setCurrentAndTotal(current, slideIndex);
  setCurrentAndTotal(total, slides.length);

  slidesWrapper.style.overflow = "hidden";
  slidesInner.style.cssText = `
    width: ${100 * slides.length}%;
    transition: 0.4s all ease;
    display: flex;
  `;
  slides.forEach(slide => slide.style.width = wrapperWidth);

  sliderParent.style.position = "relative";

  const dotsWrapper = document.createElement("ul");
  dotsWrapper.classList.add("dots__wrapper");

  const dots = [];

  sliderParent.append(dotsWrapper);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.classList.add("dot");
    dot.setAttribute("data-slide-to", i + 1);
    if (i == 0) {
      dot.classList.add("active__dot");
    }
    dotsWrapper.append(dot);
    dots.push(dot);
  }

  nextBtn.addEventListener("click", () => {
    if (baseOffset == wrapperWidth * (slides.length - 1)) {
      baseOffset = 0;
    } else {
      baseOffset += wrapperWidth;
    }
    mathCurrentAndTotal("next");
    setCurrentAndTotal(current, slideIndex);
    setSliderTransform();
    setActiveDot();
  });

  prevBtn.addEventListener("click", () => {
    if (baseOffset == 0) {
      baseOffset = wrapperWidth * (slides.length - 1);
    } else {
      baseOffset -= wrapperWidth;
    }
    mathCurrentAndTotal("prev");
    setCurrentAndTotal(current, slideIndex);
    setSliderTransform();
    setActiveDot();
  });

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const slideTo = parseInt(e.target.dataset.slideTo);
      
      slideIndex = slideTo;
      baseOffset = wrapperWidth * (slideTo - 1);
      setSliderTransform();
      setActiveDot();
      setCurrentAndTotal(current, slideIndex);
    });
  });

  function mathCurrentAndTotal(state) {
    switch (state) {
      case "next":
        if (slideIndex == slides.length) {
          slideIndex = 1;
        } else {
          ++slideIndex;
        }
        break;
      case "prev":
        if (slideIndex == 1) {
          slideIndex = slides.length;
        } else {
          --slideIndex;
        }
        break;
    }
  }

  function setCurrentAndTotal(block, index) {
    if (slides.length < 10) {
      block.textContent = `0${index}`;
    } else {
      block.textContent = index;
    }
  }

  function setActiveDot() {
    dots.forEach(dot => dot.classList.remove("active__dot"));
    dots[slideIndex - 1].classList.add("active__dot");
  }

  function setSliderTransform() {
    slidesInner.style.transform = `translateX(-${baseOffset}px)`;
  }
  // slider new version end

  // slider old version start
  // let slideIndex = 1;

  // function setCurrentAndTotal(block, index) {
  //   if (slides.length < 10) {
  //     block.textContent = `0${index}`;
  //   } else {
  //     block.textContent = index; 
  //   }
  // }

  // function showSldes(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach(slide => {
  //     slide.classList.add("hide");
  //     slide.classList.remove("show", "fade");
  //   });

  //   slides[slideIndex - 1].classList.remove("hide");
  //   slides[slideIndex - 1].classList.add("show", "fade");

  //   setCurrentAndTotal(current, slideIndex);
  // }

  // function changeSlidesN(n) {
  //   showSldes(slideIndex += n);
  // }
  
  // changeSlidesN(0);
  // setCurrentAndTotal(total, slides.length);
  // prevBtn.addEventListener("click", () => changeSlidesN(-1));
  // nextBtn.addEventListener("click", () => changeSlidesN(1));
  // slider old version start
}