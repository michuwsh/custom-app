function addElementToMenu( slideNumber, elm ) {
    removeActive();
    let div = document.createElement("div");
    div.classList.add('slider__menu-box-item');
    div.classList.add('slider__menu-box-item--active');
    div.setAttribute('data-id', slideNumber );
    slideNumber = slideNumber + 1;
    div.append("Slide " + slideNumber );
    elm.append(div);
    div.addEventListener( "click", (e) => {
        changeActive(e.target);
    });
}

function addSlideToSlider( slideNumber, elm ) {
    let div = document.createElement("div");
    div.classList.add('slider__content-item');
    div.classList.add('slider__content-item--active');
    div.setAttribute('slide-id', slideNumber );
    div.insertAdjacentHTML('afterbegin', `
        <h1 class="slider__content-item-h1">
            Test ${slideNumber + 1}
        </h1>
        <p class="slider__content_item-p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id exercitationem aliquid suscipit et ipsum pariatur animi, provident at dolor repudiandae quidem ab iste dignissimos sit, quia omnis? Eos, ullam cum!
        </p>
        <span class="slider__content-item-remove" onclick="removeSlide('${slideNumber}')"></span>
    `);
    elm.append(div);
}

var addNew = document.querySelector('.slider__add-new-slide'); 

addNew.addEventListener('click', () => {
    let countElementMenu = document.querySelectorAll('.slider__menu-box-item').length - 1;
    let menu = document.querySelector( '.slider__menu-box ');
    let slider = document.querySelector( '.slider__content ');
    let slideNumber = countElementMenu + 1;
    addElementToMenu( slideNumber, menu);
    addSlideToSlider( slideNumber, slider );
});


let menuItem = document.querySelector( ' .slider__menu-box-item ');

menuItem.addEventListener( "click", (e) => {
    changeActive(e.target);
});

function removeActive() {
    if ( document.querySelector( '.slider__menu-box-item--active ') ) {
        document.querySelector( '.slider__menu-box-item--active ').classList.remove('slider__menu-box-item--active');
    }

   if ( document.querySelector( '.slider__content-item--active ') ) {
        document.querySelector( '.slider__content-item--active ').classList.remove('slider__content-item--active');
   }
}


function changeActive(elm) {
   removeActive();
   elm.classList.add( 'slider__menu-box-item--active' );
   document.querySelector( `[slide-id="${elm.getAttribute( 'data-id' )}"]`).classList.add('slider__content-item--active');
}

function removeSlide(elm) {
document.querySelector( '[data-id="' + elm + '"]' ).remove();
document.querySelector( `[slide-id="${elm}"]`).remove();

updateSlideId();

if ( document.querySelectorAll('.slider__menu-box-item').length > 0 ) {
    document.querySelector( `[data-id="0"]`).classList.add( 'slider__menu-box-item--active' );
    document.querySelector( `[slide-id="0"]`).classList.add('slider__content-item--active');
}
}

function updateSlideId() {
    document.querySelectorAll( '.slider__menu-box-item' ).forEach( ( item, index ) => {
       item.setAttribute('data-id', index );
       item.innerHTML = "Slide " + ( index + 1 ) + "";
    });

    document.querySelectorAll( '.slider__content-item' ).forEach( ( item, index ) => {
       item.setAttribute('slide-id', index ); 
    });

    document.querySelectorAll( '.slider__content-item-remove' ).forEach( ( item, index ) => {
       item.setAttribute('onclick', 'removeSlide(' + index + ')' ); 
    });
}