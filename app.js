//search meal by alphabetically
const searchByAlphabet = (alphabet) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${alphabet}`)
    .then(response => response.json())
    .then(data => getInputData(data.meals));
}


//fuction for search button
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    const inputMeal = document.getElementById('search-input').value;
    searchByAlphabet(inputMeal);

    document.getElementById('search-input').value = "";
});


//function getInputData
const getInputData = meals => {
    const mealsDiv = document.getElementById('meal');
    mealsDiv.innerHTML = "";
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal-item';

        const mealInfo = `
        <div class = "meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "meal-name">
            <h3>${meal.strMeal}</h3>
        </div>
       
        `;
        mealDiv.innerHTML = mealInfo;

        mealsDiv.appendChild(mealDiv);

        
        mealDiv.onclick = function(){
            displayMealDetail(meal.strMeal);
        }



    });
        
};


//display ingredients for one meal when clicked
const displayMealDetail = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
    .then(response => response.json())
    .then(data => renderMealInfo(data.meals[0]));

};


//rendering meal info
const renderMealInfo = meal => {
    const mealDiv = document.getElementById('meal-details-content');
    
    mealDiv.innerHTML = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="" srcset="">
    </div>
    <div class="recipe-instruction">
      <h3>Ingredients:</h3>
      <p><i class="fas fa-hand-point-right"></i>  ${meal.strIngredient1}</p>
      <p><i class="fas fa-hand-point-right"></i>  ${meal.strIngredient2}</p>
      <p><i class="fas fa-hand-point-right"></i>  ${meal.strIngredient3}</p>
      <p><i class="fas fa-hand-point-right"></i>  ${meal.strIngredient4}</p>
      <p><i class="fas fa-hand-point-right"></i>  ${meal.strIngredient5}</p>
      <p><i class="fas fa-hand-point-right"></i>  ${meal.strIngredient6}</p>
    </div>
    
    <div class="recipe-order">
      <button href="#" target="_blank">Order Recipe</button>
    </div>
    `;

    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener("click", function(){
        mealDiv.innerText = "";
    })
}
