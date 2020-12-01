let panelGeolocation = new PanelGeolocation();
let inputGeolocation = new InputGeolocation();


function PanelGeolocation() {
    this.input = document.querySelector('.filter__option_input');
    this.footerOption = document.querySelector('.filter__option_footer-inner');
    this.locationPanel = document.querySelector('.filter__option_location');
    let that = this;

    this.input.addEventListener('click',function() {
        that.showPanel();
    });

    this.showPanel = function () {
        visibleLocation('Visible', 'block');

        document.body.addEventListener('click', eventHideLocation);
    }

    function eventHideLocation(e) {
        if(!e.target.parentNode.classList.contains('filter__option_footer-inner')) {
            that.hidePanel();
        }
    }

    this.hidePanel = function () {
        visibleLocation('hidden', 'none');

        document.body.removeEventListener('click', eventHideLocation);
    }

    function visibleLocation(overflow,  display) {
        that.input.closest('.filter__option').style.overflow = overflow;
        that.locationPanel.style.display = display;
    }
}

function InputGeolocation() {
    let input = document.querySelector('#input-search');

    InitSearchInputLocation();

    function InitSearchInputLocation() {
        input.addEventListener('input', function () {
            let val = this.value.trim().toLowerCase();
            let filterOptionIitem = document.querySelectorAll('.filter__option_location-item');

            if (val != '') {
                let isShow = false;

                for (let i = 0; i < filterOptionIitem.length; i++) {
                    let item = filterOptionIitem[i];
                    let search = item.innerText.toLowerCase().search(val);

                    if (search == -1) {
                        item.classList.add('hide');
                        item.innerHTML = item.innerText;
                    }
                    else {
                        isShow = true;
                        item.classList.remove('hide');
                        let str = item.innerText;
                        item.innerHTML = insertMark(str, search, val.length)
                    }
                }

                if(!isShow) panelGeolocation.hidePanel();
                else panelGeolocation.showPanel();
            }
            else {
                for (let i = 0; i < filterOptionIitem.length; i++) {
                    let item = filterOptionIitem[i];

                    item.classList.remove('hide');
                    item.innerHTML = item.innerText;
                }
                panelGeolocation.hidePanel()
            }

            function insertMark(string, pos, len) {
                return string.slice(0, pos) +'<mark>' + string.slice(pos, pos+len) + '</mark>' + string.slice(pos+len);
            }
        });
    }

    this.Discharge = function() {
        input.value = '';
    }
}
