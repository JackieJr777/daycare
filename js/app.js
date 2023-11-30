/* ===================================================================================== */
// Константы

const header = document.querySelector(".header");


const burgerParent = document.querySelector(".top-header__body");
const burgerIcon = document.querySelector(".icon-burger");


const subLists = document.querySelectorAll(".menu-header__sub-list");
const arrows = document.querySelectorAll(".menu-header__arrow");

/* ===================================================================================== */


/* ===================================================================================== */
// Прослушка на весь документ, делегирование событий

document.addEventListener('click', function(e) {
  const targetElement = e.target;
  // console.log(targetElement); 

  /* -----------форма поиска------------- */
  if(targetElement.closest(".search-item__icon")) {
    header.classList.toggle("_form-active");
  } else if(!targetElement.closest(".form-header")) {
    if(header.classList.contains("_form-active")) {
      header.classList.remove("_form-active");
    }
  }
  /* -----------/форма поиска------------ */


  /* -------------подменю---------------- */

  if(window.innerWidth >= 768) {
    if(targetElement.closest(".menu-header__arrow")) {
      targetElement.closest(".menu-header__arrow").classList.toggle("_sub-list-active");
      targetElement.closest(".menu-header__arrow").nextElementSibling.classList.toggle("_sub-list-active"); 
    } else if (!targetElement.closest(".menu-header__sub-list")) {
      removeClasses(subLists, '_sub-list-active');
      removeClasses(arrows, '_sub-list-active');
    }
  } else {
      if(targetElement.closest(".menu-header__arrow")) {
        targetElement.closest(".menu-header__arrow").classList.toggle("_sub-list-active");
        targetElement.closest(".menu-header__arrow").nextElementSibling.classList.toggle("_sub-list-active");
    
        if(targetElement.closest(".menu-header__arrow").nextElementSibling.classList.contains('_sub-list-active') ) {
            targetElement.closest(".menu-header__arrow").nextElementSibling.style.maxHeight = `${targetElement.closest(".menu-header__arrow").nextElementSibling.scrollHeight}px`;
            // targetElement.closest(".menu-header__arrow").nextElementSibling.style.paddingTop = `${30}px`;
          } else {
              targetElement.closest(".menu-header__arrow").nextElementSibling.style.maxHeight = null;
              // targetElement.closest(".menu-header__arrow").nextElementSibling.style.paddingTop = `${0}px`;
          }
      }     
    }
  /* -------------/подменю--------------- */


  /* ------------меню-бургер------------- */
  if(targetElement.closest(".icon-burger")) {
    burgerParent.classList.toggle("_menu-active");
    document.body.parentElement.classList.toggle("_lock");

    // при клике по крестику(точнее, по кнопке бургера) закрываем подменю, если было открыто
    subLists.forEach(function(subList) {
      if(subList.classList.contains("_sub-list-active") && subList.style.maxHeight != null) {
        subList.classList.remove("_sub-list-active");
        subList.style.maxHeight = null;
      }
    })
    // и также разворачиваем стрелочки пунктов подменю в изначальное положение
    removeClasses(arrows, '_sub-list-active');
  }
  /* -----------/меню-бургер------------- */




  /* ---------спойлер в футере----------- */

  if(window.innerWidth < 768 && targetElement.closest("[class*=_spoiler-footer-btn]")) {
    console.log(targetElement);
    targetElement.closest("[class*=_spoiler-footer-btn]").classList.toggle("_spoiler-btn-active");
    targetElement.closest("[class*=_spoiler-footer-btn]").nextElementSibling.classList.toggle("_spoiler-footer-active");
    if(targetElement.closest("[class*=_spoiler-footer-btn]").nextElementSibling.classList.contains("_spoiler-footer-active")) {
      targetElement.closest("[class*=_spoiler-footer-btn]").nextElementSibling.style.maxHeight = `${targetElement.closest("[class*=_spoiler-footer-btn]").nextElementSibling.scrollHeight}px`;
    }else {
      targetElement.closest("[class*=_spoiler-footer-btn]").nextElementSibling.style.maxHeight = null;
    }
    // Закрытие спойлеров ниже по коду в прослушке ресайза окна
  }

  /* ---------/спойлер в футере---------- */

})
/* ===================================================================================== */





/* ===================================================================================== */
/* ----------------табы---------------- */

// Получаем кнопки
 const tabBtns = document.querySelectorAll(".btns-tabs__button"); 

// Получаем родителя кнопок (необязательно непосредственного)
const btnsContainer = document.querySelector(".btns-tabs");

// Получаем сами вкладки (картинки)
const contentImgs = document.querySelectorAll(".content-tabs__img");




// Вешаем прослушку на родителя кнопок, предварительно проверив, существует ли он
if(btnsContainer) {
  btnsContainer.addEventListener('click', function(e){
    // Получаем ИМЕННО кликнутую кнопку (т. е. только тот объект, у предка которого или у него самого есть класс .btns-tabs__button)
    const clickedBtn = e.target.closest(".btns-tabs__button");

    // Чтобы избежать ошибки, если мы кликнем за пределами родителя кнопок (т. к. прослушка висит именно на нём), выполняем проверку:
    if(!clickedBtn) return; // т. е. если мы кликнули не по кнопке(не по объекту, у предка которого или у него самого есть класс .btns-tabs__button), то мы возвращаемся из слушателя событий. Это называется Guard clause - в переводе Пункт Охраны, т. е. тут мы проверяем какое-то условие, и, если это условие возвращает нам false, то мы мгновенно прерываем дальнейший ход функции и выходим из неё, чтобы следующий код не запускался. Если же условие возвращает true, то функция продолжает выполняться дальше.
    

    // АКТИВНЫЕ КНОПКИ
    // Прежде, чем добавить класс .btns-tabs__button_active, мы убираем этот класс у всех кнопок (если этот класс есть)
    tabBtns.forEach(tabBtn => {
      if(tabBtn.classList.contains("btns-tabs__button_active")) {
        tabBtn.classList.remove("btns-tabs__button_active");
      }
    });
    // и делаем активной ТОЛЬКО нажатую кнопку (т. е. передаём класс .btns-tabs__button_active ТОЛЬКО нажатой кнопке )
    clickedBtn.classList.add("btns-tabs__button_active");

    
    // АКТИВНЫЕ ВКЛАДКИ (Показываем нужную вкладку (в данном примере показываем картинку внутри вкладки, вкладка одна, а картинок в ней 4!!!))
    // по аналогии с кнопками, перед тем, как добавить класс .content-tabs__img_active активной вкладке(картинке), мы сначала убираем этот класс у всех вкладок(картинок) (чтобы ненужные вкладки(картинки) не показывались):
    contentImgs.forEach(contentImg => {
      if(contentImg.classList.contains("content-tabs__img_active")) {
        contentImg.classList.remove("content-tabs__img_active");
      }
    });
    // а потом добавляем этот класс только нужной вкладке (КАРТИНКЕ) таким способом:
    document.querySelector(`.content-tabs__img_${clickedBtn.dataset.tab}`).classList.add("content-tabs__img_active");// тут мы добавляем класс .content-tabs__img_active ТОЛЬКО той вкладке (КАРТИНКЕ), цифра в модикаторе которой равна значению дата-атрибута НЕПОСРЕДСТВЕННО кликнутой кнопки
  })
}
// Я решил использовать не 4 вкладки, а 1 вкладку, но в ней просто 4 картинки (чтобы анимировать появления картинок через opacity)

/* ---------------/табы---------------- */
/* ===================================================================================== */



/* ===================================================================================== */
/* -------------спойлер в блоке Gallery & Streams---------------- */

const spoilerContainer = document.querySelector(".spoiler-gallery");


if(spoilerContainer) {
  spoilerContainer.addEventListener('click', liteSpoiler)
}

function liteSpoiler(e) {
  const targetElement = e.target;

  if(targetElement.closest(".spoiler-gallery__btn")) {
    targetElement.closest(".spoiler-gallery__btn").classList.toggle("_spoiler-gallery__btn_active");
    targetElement.closest(".spoiler-gallery__btn").nextElementSibling.classList.toggle("_spoiler-gallery__image_active");
  }
}

/* -------------/спойлер в блоке Gallery & Streams--------------- */
/* ===================================================================================== */




/* ===================================================================================== */
// Прослушивание ресайза окна
window.addEventListener('resize', function() {
  // если ширина вьюпорта больше или равна 768px:
  if(window.innerWidth >= 768) {
    // то

    // 1) закрываем бургер меню и убираем класс _lock у HTML
    if(burgerParent.classList.contains("_menu-active") && document.body.parentElement.classList.contains("_lock")) {
      burgerParent.classList.remove("_menu-active");
      document.body.parentElement.classList.remove("_lock");
    }
    // 2) закрываем подменю, если было открыто
    subLists.forEach(function(subList) {
      if(subList.classList.contains("_sub-list-active") && subList.style.maxHeight != null) {
        subList.classList.remove("_sub-list-active");
        subList.style.maxHeight = null;
      }
    })
    // 3) разворачиваем стрелочки у пунктов подменю в изначальное положение
    removeClasses(arrows, '_sub-list-active');


    
    
    // 4) Закрываем спойлеры в футере
    const spoilerBtns = document.querySelectorAll("[class*=_spoiler-footer-btn]");
    console.log(spoilerBtns);
    spoilerBtns.forEach(function(spoilerBtn) {
      if(spoilerBtn.classList.contains("_spoiler-btn-active")) {
        spoilerBtn.classList.remove("_spoiler-btn-active");
      }
      if(spoilerBtn.nextElementSibling.classList.contains("_spoiler-footer-active")) {
        spoilerBtn.nextElementSibling.classList.remove("_spoiler-footer-active");
        spoilerBtn.nextElementSibling.style.maxHeight = null;
      }
    })
  }
});
/* ===================================================================================== */
  


/* ===================================================================================== */
// Функция удаления классов
function removeClasses(elements, className) {
  elements.forEach(function(element) {
    if(element.classList.contains(className)) {
      element.classList.remove(className);
    }
  })
}
/* ===================================================================================== */




/* ===================================================================================== */
// Меняем цвет фона шапки при скролле

const BlockTop = document.querySelector(".top-mainpage");

window.addEventListener('scroll', function() {
  /* let headerHeight = header.offsetHeight;
  let moment = headerHeight + 15;
  console.log(document.querySelector(".top-mainpage__title").getBoundingClientRect().top);
  console.log(headerHeight);
  console.log(moment);
  if(document.querySelector(".top-mainpage__title").getBoundingClientRect().top > moment) {
    console.log('Блок достиг момента!')
    header.classList.add("_header-color-start");
  } *//* else {
    if(header.classList.contains("_header-color-start")) {
      header.classList.remove("_header-color-start");
      header.classList.add("_header-color-finish");
    }
  } */
  if(BlockTop.getBoundingClientRect().top < 0) {
    header.classList.add("_header-bgcolor");
  }else {
    header.classList.remove("_header-bgcolor");
  }

})
/* ===================================================================================== */