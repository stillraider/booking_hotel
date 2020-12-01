@@include('wNumb.min.js')
@@include('nouislider.min.js')
@@include('utility.js')
@@include('rangeSlider.js')
@@include('inputGeolocation.js')
@@include('filter.js')
@@include('WebP.js')

InitButtonDisclosure();

function InitButtonDisclosure() {
    let optionHeader = document.querySelectorAll('.filter__option_header');

    for (let i = 0; i < optionHeader.length; i++) {
        optionHeader[i].addEventListener('click', function () {
            let parent = this.parentNode;
            let heightBasic = this.offsetHeight;

            if(parent.offsetHeight > heightBasic) {
                parent.style.height = heightBasic +'px';
                this.querySelector('.filter__option_arrow').style.transform = 'rotate(0deg)';
                parent.style.overflow = 'hidden';
            }
            else {
                parent.style.height = heightBasic + parent.querySelector('.filter__option_footer').offsetHeight + "px";
                this.querySelector('.filter__option_arrow').style.transform = 'rotate(180deg)';
            }
        })
    }
}