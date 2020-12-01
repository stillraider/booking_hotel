let snapSlider = document.querySelector('.slider-snap');
let rangeSlider = new RangeSlider();

function RangeSlider() {
    let that = this;
    this.minPrice = 0;
    this.maxPrice = 0;

    findMinMaxPrice();
    initRangeSlider();
    initTooltip();

    function findMinMaxPrice() {
        let allPrice = document.querySelectorAll('.price');
        that.maxPrice = 0;
        that.minPrice = Number.MAX_SAFE_INTEGER;


        for (let i = 0; i < allPrice.length; i++) {
            let price = allPrice[i].innerText.replace(/\s/g,'');

            that.maxPrice = Math.max(that.maxPrice, price);
            that.minPrice = Math.min(that.minPrice, price);
        }
    }

    function initRangeSlider() {
        noUiSlider.create(snapSlider, {
            start: [ that.minPrice, that.maxPrice ],
            connect: true,
            tooltips: [ wNumb({decimals: 0, thousand: ' '}), wNumb({decimals: 0, thousand: ' '})],
            range: {
                'min': [ that.minPrice ],
                'max': [ that.maxPrice ]
            }
        });
    }

    function initTooltip() {
        let touchHandles = snapSlider.querySelectorAll('.noUi-handle');
        let panelButton = snapSlider.closest('.filter__option');

        for (let i = 0; i < touchHandles.length; i++) {
            let handle = touchHandles[i];
            handle.onmousedown = function() {
                handle.querySelector('.noUi-tooltip').style.opacity = '1';
                document.body.addEventListener('mouseup', mouseup);

                function mouseup() {
                    handle.querySelector('.noUi-tooltip').style = '';
                    document.body.removeEventListener('mouseup', mouseup);
                }
            }
            handle.onmouseover = function() {
                panelButton.style.overflow = 'visible';
            }

        }
    }

    this.Discharge = function() {
        snapSlider.noUiSlider.setHandle(0, that.minPrice);
        snapSlider.noUiSlider.setHandle(1, that.maxPrice);
    }
}

