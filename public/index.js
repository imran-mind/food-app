console.log('Running food app');

const restraunts = [{
        id: 1,
        name: 'Rotiwala.com',
        image: 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/xxmr9pqr1o5pwlyn9b68',
        ratings: 4.5,
        menu: ['Veg Biryani', 'Bhurji', 'Matar paneer'],
        type: ['veg', 'non-veg']
    },
    {
        id: 2,
        name: 'Al-Daaz',
        image: 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/f54knxzegyikeqov8cpy',
        ratings: 4.8,
        menu: ['biryani', 'chicken korma', 'mutton korma', 'pizza'],
        type: ['non-veg']
    },
    {
        id: 3,
        name: 'Al-Bek',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        ratings: 4.9,
        menu: ['Veg biryani', 'Palak Paneer', 'Paneer korma', 'pizza'],
        type: ['veg']
    },
    {
        id: 4,
        name: 'Empire',
        image: 'https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        ratings: 4.1,
        menu: ['biryani', 'chicken korma', 'mutton korma', 'pizza'],
        type: ['veg', 'non-veg']
    },
    {
        id: 5,
        name: 'Kota Kachori',
        image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/3/22/0/FNCC_bobby-flay-salmon-brown-sugar-mustard_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382541357316.jpeg',
        ratings: 4.3,
        menu: ['Veg biryani', 'Palak Paneer', 'Paneer korma', 'pizza'],
        type: ['veg']
    },
    {
        id: 6,
        name: 'Biryani House',
        image: 'https://c.ndtvimg.com/2018-10/ohqcobr_handi-biryani_625x300_08_October_18.jpg',
        ratings: 4.3,
        menu: ['biryani', 'chicken korma', 'mutton korma', 'pizza'],
        type: ['veg', 'non-veg']
    }
]

let inputBox = document.getElementById('search-box');
inputBox.addEventListener('keyup', _.debounce(searchRestraurents, 300));

let checkBox1 = document.getElementById('veg');
let checkBox1Checked = false;

let sortElement = document.getElementById('sort-item');
sortElement.addEventListener('change', handleSort);

function handleSort(e) {
    let sortedData = customSort(restraunts, e.target.value);
    console.log('cards sorted ', sortedData);
    let cards = document.getElementsByClassName('.col-md-3')
    for (let n = 0; n < cards.length; n++) {
        cards[n].getElementsByTagName('img')[0].src = sortedData[n].image;
    }
    let cardElemets = document.getElementsByClassName('cart-text')
    for (let k = 0; k < cardElemets.length; k++) {
        cardElemets[k].querySelector('h4').innerText = sortedData[k].name;

        cardElemets[k].querySelectorAll('p')[0].innerText = sortedData[k].type.length === 1 ?
            sortedData[k].type[0] : sortedData[k].type[0] + " , " + sortedData[k].type[1]
        cardElemets[k].querySelectorAll('p')[1].innerText = sortedData[k].ratings;

        let menus = '';
        let menuLen = sortedData[k].menu.length;
        for (let j = 0; j < menuLen; j++) {
            let comma = j === 0 ? ' ' : ', ';
            menus = menus + comma + sortedData[k].menu[j];
        }
        cardElemets[k].querySelectorAll('p')[2].innerText = 'Menus : ' + menus;
        // let favItems = Array.from(new Set(JSON.parse(localStorage.getItem('favts4'))));
        // if (favItems.includes("" + favBox.getAttribute('id'))) {
        //     favBox.setAttribute('checked', new Boolean(true));
        // }

        console.log(cardElemets[k].querySelector('input').checked)
    }
}


function customSort(data, type) {
    let searchKey = type;
    data.sort(function (item1, item2) {
        if (item1[searchKey] > item2[searchKey]) {
            return 1;
        } else {
            return -1;
        }
    });
    return data;
}

function searchForVeg(e) {
    checkBox1Checked = e.checked;
    // console.log(e.id)
    // [1,2,3]
    searchRestraurentsForVeg(e.checked);
}

function handleFavourate(id, isChecked) {
    console.log('---handleFavourate--', id)
    let items = Array.from(new Set(JSON.parse(localStorage.getItem('favts4'))));
    if (id && isChecked) {
        items.push(id);
        localStorage.setItem('favts4', JSON.stringify(items));
    } else {
        _.remove(items, (n) => n == id);
        localStorage.setItem('favts4', JSON.stringify(items));
    }
}

function searchRestraurentsForVeg(checked) {
    let cards = document.getElementsByClassName('.col-md-3')
    if (checked) {
        for (let j = 0; j < cards.length; j++) {
            let card = cards[j];
            let restrauntType = card.childNodes[1].childNodes[1].textContent.toLocaleLowerCase().split(':')[1];
            let types = restrauntType ? restrauntType.split(',') : restrauntType;
            let vegType = types.length === 1 && types[0].trim() == 'veg' ? true : false;
            if (vegType) {
                card.className = card.className.replace(/\s+?hidden/, '');
            } else {
                card.className = card.className + ' hidden';
            }
            console.log(' card.className : ', card.className)
        }
    } else {
        for (let i = 0; i < cards.length; i++) {
            let item = cards[i];
            console.log(' inside zero', item)
            item.className = item.className.replace(/\s+?hidden/, '');
        }
    }
}

function searchRestraurentsForFav(e) {
    let items = Array.from(new Set(JSON.parse(localStorage.getItem('favts4'))));
    let cards = document.getElementsByClassName('.col-md-3');
    if (items.length == 0) {
        alert('There is no Fav Item');
    }
    if (e.checked) {
        for (let j = 0; j < cards.length; j++) {
            let card = cards[j];
            let favRest = card.childNodes[1].childNodes[5].getAttribute('id');
            console.log('favRest => ', favRest)
            if (items.includes("" + favRest)) {
                card.className = card.className.replace(/\s+?hidden/, '');
            } else {
                card.className = card.className + ' hidden';
            }
            console.log(' card.className : ', card.className)
        }
    } else {
        for (let i = 0; i < cards.length; i++) {
            let item = cards[i];
            console.log(' inside zero', item)
            item.className = item.className.replace(/\s+?hidden/, '');
        }
    }
}

function searchRestraurents(e) {
    console.log('----count---')
    e.preventDefault();
    console.log(e.target.value);
    let searchText = e.target.value.toLocaleLowerCase();
    let cards = document.getElementsByClassName('.col-md-3')

    if (searchText.length === 0 || e.key === 'Backspace') {
        for (let i = 0; i < cards.length; i++) {
            let item = cards[i];
            item.className = item.className.replace(/\s+?hidden/, '');
        }
    } else {
        for (let j = 0; j < cards.length; j++) {
            let card = cards[j];
            let restrauntName = card.childNodes[1].firstChild.textContent.toLocaleLowerCase();
            if (restrauntName.indexOf(searchText) !== -1) {
                card.className = card.className.replace(/\s+?hidden/, '');
            } else if (searchText.length !== 0) {
                card.className = card.className + ' hidden';
            }
        }
    }
}

function genearteCards(restraurentsInfo) {
    let mainULList = document.getElementsByClassName('ul-list')[0];

    // createing li
    let liElement = document.createElement('li');
    liElement.setAttribute('class', '.col-md-3');

    // creating img tag under li
    let imgElement = document.createElement('img');
    imgElement.setAttribute('src', restraurentsInfo.image);

    // appending img tag to li
    liElement.appendChild(imgElement);

    // creating div under li
    let childDiv = document.createElement('div');
    childDiv.setAttribute('class', 'cart-text');

    // h4 tag
    let h4Tag = document.createElement('h4');
    h4Tag.textContent = restraurentsInfo.name;

    // p tag for rating
    pRatingTag = document.createElement('p');
    pRatingTag.setAttribute('id', 'rating');
    pRatingTag.textContent = 'Ratings : ' + restraurentsInfo.ratings;

    pTypeTag = document.createElement('p');
    pTypeTag.setAttribute('id', 'type');
    // let veg = restraurentsInfo.isVeg ? ' Veg ' : '';
    // let nonVeg = restraurentsInfo.isNonVeg ? ' NonVeg ' : '';
    // p tag for menus
    pTypeTag.textContent = 'Type : ';
    pTypeTag.textContent += restraurentsInfo.type.length === 1 ?
        restraurentsInfo.type[0] : restraurentsInfo.type[0] + " , " + restraurentsInfo.type[1]
    let pMenuTag = document.createElement('p');
    let menus = '';
    let menuLen = restraurentsInfo.menu.length;
    for (let j = 0; j < menuLen; j++) {
        let comma = j === 0 ? ' ' : ', ';
        menus = menus + comma + restraurentsInfo.menu[j];
    }
    pMenuTag.textContent = 'Menus : ' + menus;
    pMenuTag.setAttribute('id', 'menu');

    let favItems = Array.from(new Set(JSON.parse(localStorage.getItem('favts4'))));

    let favBox = document.createElement('input');
    favBox.setAttribute('type', 'checkbox');
    favBox.setAttribute('id', restraurentsInfo.id)
    favBox.setAttribute('class', 'fav-input-box')
    // console.log('-----> ', favItems)
    if (favItems.includes("" + favBox.getAttribute('id'))) {
        favBox.setAttribute('checked', new Boolean(true));
    }
    favBox.addEventListener('click', function (e) {
        // console.log('on changed ', e.target.id)
        if (e.target && e.target.id) {
            //do something
            handleFavourate(e.target.id, e.target.checked);
        }
    });

    // console.log(favBox);
    let label = document.createElement('lable');
    label.innerText = 'Favorate : ';

    childDiv.appendChild(h4Tag);
    childDiv.appendChild(pTypeTag);
    childDiv.appendChild(pRatingTag);
    childDiv.appendChild(pMenuTag);
    childDiv.appendChild(label);
    childDiv.appendChild(favBox);

    // appending child div to li
    liElement.append(childDiv);

    // appending li to ul
    mainULList.appendChild(liElement);

}

function createCards(restrauntsList) {
    for (let i = 0; i < restrauntsList.length; i++) {
        genearteCards(restrauntsList[i]);
    }

    // fetch('https://5d3c88a7301f26001416ae7a.mockapi.io/food/restraurents')
    //     .then(function (response) {
    //         // The response is a Response instance.
    //         // You parse the data into a useable format using `.json()`
    //         return response.json();
    //     }).then(function (data) {
    //         // `data` is the parsed version of the JSON returned from the above endpoint.
    //         console.log(data.data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
    //         for (let i = 0; i < data.data.length; i++) {
    //             genearteCards(data[i]);
    //         }
    //     });
}

createCards(restraunts);