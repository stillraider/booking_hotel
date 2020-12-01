let filter = new Filter();
ControlsFilter();
filter.update()

function Filter() {
    const ADDITIONAL_ELEMENT = 6;
    let maxItems = ADDITIONAL_ELEMENT;
    let products = document.querySelectorAll('.product');
    let moreItemsButton = document.querySelector('#moreItems');
    let messageNotFound = document.querySelector('#messageNotFound');
    let arrayProducts = Array.prototype.slice.call(products);
    let data = {};

    InitMoreButon();

    this.getData = function(key) {
        if(typeof data[ key ] !== "object")
            data[ key ] = [];
        return data[ key ];
    }

    this.setData = function(key, newdata) {
        data[key] = newdata;
    }

    this.dischargeData = function() {
        data = {};
    }

    this.update = function() {
        arrayProducts = Array.prototype.slice.call(products);

        for (let i = 0; i < arrayProducts.length; i++) {
            let keysFilters = Object.keys(data);
            let itemElem = arrayProducts[i];
            let isMatched = true;


            for (let j = 0; j < keysFilters.length; j++) {
                let prop = keysFilters[j];
                let filterData = data[prop];

                if(prop == 'price') {
                    let price = parseInt(itemElem.querySelector('.price').innerText.replace(/\s/g,''));
                    isMatched = filterData[0] <= price && filterData[1] >= price;
                }
                else {
                    for (let k = 0; k < filterData.length; k++) {
                        let isFound = itemElem.getAttribute('data-' + prop) == filterData[k];
                        if(isFound) {
                            isMatched = true;
                            break;
                        }
                        else isMatched = false;
                    }
                }

                if(!isMatched) {
                    break;
                }
            }

            if(!isMatched) {
                arrayProducts.splice(i, 1);
                i--;
                itemElem.style.display = 'none';
            }
            else itemElem.style.display = 'flex';


        }

        ItemsOrderUpdate();
    }

    function ItemsOrderUpdate() {
        let itemsAmount = Math.min( arrayProducts.length, maxItems);

        let display = maxItems >= arrayProducts.length ? 'none' : 'tabel';
        moreItemsButton.setAttribute('style', 'display: ' + display);


        if(itemsAmount == 0) {
            messageNotFound.style.display = 'block';
            return;
        }
        else messageNotFound.style.display = 'none';


        for (let i = 0; i < itemsAmount; i++)
            arrayProducts[i].style.display = 'flex';
        for (let i = itemsAmount; i < arrayProducts.length; i++)
            arrayProducts[i].style.display = 'none';
    }

    function InitMoreButon() {
        moreItemsButton.onclick = function() {
            maxItems = Math.min(products.length, maxItems + ADDITIONAL_ELEMENT);

            ItemsOrderUpdate();
        }
    }


}

function ControlsFilter() {
    let type = document.querySelector('.option-type');
    let rating = document.querySelector('.option-rating');
    let price = document.querySelector('.option-price');

    let sliderGroup = new SliderGroup();

    toggleGroup();
    checkboxGroup();
    locationGroup();
    InitDischarge();

    function toggleGroup() {
        let filterGroup = type.getAttribute('data-filter-group');

        type.addEventListener( 'click', function(event) {
            if ( !matchesSelector( event.target, 'input' ) ) return;

            let data = filter.getData(filterGroup);

            event.target.classList.toggle('is-checked');

            if(event.target.classList.contains('is-checked')) {
                data.push(event.target.getAttribute('data-filter'));
            }
            else {
                let index = data.indexOf( event.target.getAttribute('data-filter') );
                data.splice(index, 1);
            }
            filter.update();
        });
    }

    function checkboxGroup() {
        let filterGroup = rating.getAttribute('data-filter-group');

        rating.addEventListener( 'change', function(event) {
            if ( !matchesSelector( event.target, 'input' ) ) return;

            let data = filter.getData(filterGroup);

            if(event.target.checked) {
                data.push(event.target.parentNode.getAttribute('data-filter'));
            }
            else {
                let index = data.indexOf( event.target.parentNode.getAttribute('data-filter') );
                data.splice(index, 1);
            }
            filter.update();
        });
    }

    function locationGroup() {
        let optionLocation = document.querySelector('.option-location');
        let filterGroup = optionLocation.getAttribute('data-filter-group');

        optionLocation.addEventListener( 'click', function(event) {
            if ( !matchesSelector( event.target, 'p' ) ) return;

            let data = filter.getData(filterGroup);

            this.querySelector('input').value = event.target.innerText;
            data[0] = event.target.getAttribute('data-filter');

            filter.update();
        });

        optionLocation.querySelector('#input-search').addEventListener('input', function() {
            if(this.value.length == 0) {
                filter.setData(filterGroup, []);
                filter.update();
            }
        });
    }

    function SliderGroup() {
        let that = this;
        let filterGroup = price.getAttribute('data-filter-group');


        this.initDataSlider = function () {
            let data = filter.getData(filterGroup);
            data[0] = rangeSlider.minPrice;
            data[1] = rangeSlider.maxPrice;
        }

        InitOnChangeSlider();

        function InitOnChangeSlider() {
            that.initDataSlider();
            snapSlider.noUiSlider.on('slide', function (values, handle) {
                let data = filter.getData(filterGroup);
                data[ handle ] = parseInt(values[handle]);
                filter.update();
            });
        }

    }

    function InitDischarge() {
        document.querySelector('.filter__discharge_text').onclick = function() {
            filter.dischargeData();
            dischargeToggle();
            dischargeCheckbox();
            inputGeolocation.Discharge();
            rangeSlider.Discharge();
            sliderGroup.initDataSlider();
            filter.update();
        }
    }

    function dischargeToggle() {
        let toggles = type.querySelectorAll('.is-checked');

        for (let i = 0; i < toggles.length; i++) {
            toggles[i].classList.remove('is-checked');
        }
    }

    function dischargeCheckbox() {
        let checkboxs = rating.querySelectorAll('input');

        for (let i = 0; i < checkboxs.length; i++) {
            checkboxs[i].checked = false;
        }
    }
}