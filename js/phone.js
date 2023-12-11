const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
};


const displayPhones = (phones,isShowAll) => {
    console.log(phones);
    // step:1
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards using ( .innerHTML or .textContent)
    phoneContainer.innerHTML = '';

    // display show all button if there are more than 12 phones 
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    console.log('is show all', isShowAll)
    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        //  step:2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // step:3 set innerHTML
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
    alt="Shoes" /></figure>
    <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
    <button class="btn btn-primary">Buy Now</button>
     </div>
    </div>
    `;
        // step:4 appendChild
        phoneContainer.appendChild(phoneCard)
    });

    // hide loading spinner 
    toggleLoadingSpinner(false);
};

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText,isShowAll);
};

// handle search button recap
/* const handleSearch2 = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    loadPhone(searchText);
}; */

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    } else {
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all 
const handleShowAll = () => {
    handleSearch(true);
}

// loadPhone();