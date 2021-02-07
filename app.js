//search meal by alphabetically
const searchByAlphabet = (alphabet) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${alphabet}`)
    .then(response => response.json())
    .then(data => getInputData(data.meals));
}


//fuction for search button
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    const inputMeal = document.getElementById('search-input').value;
    searchByAlphabet(inputMeal);
});


//
const getInputData = meals => {
    const mealsDiv = document.getElementById('meal');

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal-item';

        const mealInfo = `
        <div class = "meal-img">
            <img src = "${meal.strMealThumb}" alt = "food">
        </div>
        <div class = "meal-name">
            <h3>${meal.strMeal}</h3>
        </div>
       
        `;
        mealDiv.innerHTML = mealInfo;

        mealDiv.onclick = function(){
            displayMealDetail('${meal.strMeal}');
        }
        mealsDiv.appendChild(mealDiv);

    });
        
};


//display ingredients for one meal when clicked
const displayMealDetail = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
    .then(response => response.json())
    .then(data => renderMealInfo(data.meals[0]))

};


//rendering meal info
const renderMealInfo = meal => {
    const mealDiv = document.getElementById('meal-details-content');

    mealDiv.innerHTML = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruction">
      <h3>Ingredients:</h3>
      <p>${meal.strIngredient1}</p>
      <p>${meal.strIngredient2}</p>
      <p>${meal.strIngredient3}</p>
      <p>${meal.strIngredient4}</p>
      <p>${meal.strIngredient5}</p>
      <p>${meal.strIngredient6}</p>
    </div>
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="" srcset="">
    </div>
    <div class="recipe-order">
      <a href="#" target="_blank">Order Recipe</a>
    </div>
    `;
}










