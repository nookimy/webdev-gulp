function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
});

/*Модальные окна*/

const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const modalLinks = document.querySelectorAll('.modal-link');
let unlock = true;
const timeout = 800;


// Клик по ссылке для открытия модального окна
if (modalLinks.length > 0) {
    for (let index = 0; index < modalLinks.length; index++) {
        const modalLink = modalLinks[index];
        modalLink.addEventListener("click", function (e) {
            const modalName = modalLink.getAttribute('href').replace('#', '');
            const curentModal = document.getElementById(modalName);
            modalOpen(curentModal);
            e.preventDefault();
        });
    }
}

// Закрытие модального окна при клике
const modalCloseIcon = document.querySelectorAll('.modal__close-btn');
if (modalCloseIcon.length > 0) {
    for (let index = 0; index < modalCloseIcon.length; index++) {
        const el = modalCloseIcon[index];
        el.addEventListener("click", function (e) {            
            modalClose(el.closest('.modal'));
            e.preventDefault();
        });
    }
}

// Открытие модального окна
function modalOpen(curentModal) {
    if (curentModal && unlock) {
        const modalActive = document.querySelector('.modal--open');
        if (modalActive) {
            modalClose(modalActive, false);
        } else {
            bodyLock();
        }
        curentModal.classList.add('modal--open');
        curentModal.addEventListener("click", function (e) {
            if (!e.target.closest('.modal__content')) {
                modalClose(e.target.closest('.modal'));
            }
        });
    }
}

function modalClose(modalActive, doUnlock = true) {
    if (unlock) {
        modalActive.classList.remove('modal--open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {

    const lockPaddingValue = window.innerWidth - document.querySelector('main').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight =  '0px';
            }
        }

        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const modalActive = document.querySelector('.modal--open');
        modalClose(modalActive);
    }
});

(function () {
    // проверяем поддержку
    if (!Element.prototype.closest) {
        // реализуем
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

(function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {
        // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();