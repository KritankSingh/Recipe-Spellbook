const book = document.getElementById('book');
const recipeList = document.getElementById('recipe-list');
const page1 = document.getElementById('page-1');
const page2 = document.getElementById('page-2');
const backButton = document.getElementById('back-button');
const recipeTitle = document.getElementById('recipe-title');
const ingredientsList = document.getElementById('ingredients-list');
const cauldron = document.getElementById('cauldron');
const tooltip = document.getElementById('incantation-tooltip');

const recipes = [
  {
    title: "Potion of Focus",
    ingredients: [
      { name: "Mandrake Root", incantation: "Concentra Mentis" },
      { name: "Dragonfly Wings", incantation: "Lucidus Volatus" },
      { name: "Moonlit Water", incantation: "Aqua Luna" }
    ]
  },
  {
    title: "Elixir of Calm",
    ingredients: [
      { name: "Lavender Petals", incantation: "Serenitas" },
      { name: "Chamomile Blossoms", incantation: "Pacem Animi" },
      { name: "Crystal Dew", incantation: "Clarus Spiritus" }
    ]
  },
  {
    title: "Flameguard Draught",
    ingredients: [
      { name: "Phoenix Feather", incantation: "Ignis Protectus" },
      { name: "Ashen Bark", incantation: "Cinis Defensor" },
      { name: "Ember Essence", incantation: "Flamma Aegis" }
    ]
  }
];

// Populate recipe list
recipes.forEach((recipe, index) => {
  const li = document.createElement('li');
  li.textContent = recipe.title;
  li.tabIndex = 0;
  li.setAttribute('role', 'button');
  li.addEventListener('click', () => openRecipe(index));
  li.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openRecipe(index);
    }
  });
  recipeList.appendChild(li);
});

function openRecipe(index) {
  const recipe = recipes[index];
  recipeTitle.textContent = recipe.title;
  ingredientsList.innerHTML = '';
  cauldron.innerHTML = '';

  recipe.ingredients.forEach((ingredient, i) => {
    const li = document.createElement('li');
    li.textContent = ingredient.name;
    li.dataset.incantation = ingredient.incantation;
    li.addEventListener('mouseenter', showTooltip);
    li.addEventListener('mouseleave', hideTooltip);
    ingredientsList.appendChild(li);

    // Create floating bubble for ingredient
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.width = `${20 + Math.random() * 20}px`;
    bubble.style.height = bubble.style.width;
    bubble.style.left = `${Math.random() * 90}%`;
    bubble.style.bottom = `${-Math.random() * 50}px`;
    bubble.style.animationDelay = `${i * 1.5}s`;
    cauldron.appendChild(bubble);
  });

  book.classList.add('flipped');
  page2.setAttribute('aria-hidden', 'false');
  page1.setAttribute('aria-hidden', 'true');
  page2.focus();
}

function showTooltip(e) {
  const incantation = e.target.dataset.incantation;
  tooltip.textContent = incantation;
  tooltip.style.opacity = '1';
  tooltip.style.left = `${e.target.getBoundingClientRect().right + 10}px`;
  tooltip.style.top = `${e.target.getBoundingClientRect().top}px`;
  tooltip.setAttribute('aria-hidden', 'false');
}

function hideTooltip() {
  tooltip.style.opacity = '0';
  tooltip.setAttribute('aria-hidden', 'true');
}

backButton.addEventListener('click', () => {
  book.classList.remove('flipped');
  page2.setAttribute('aria-hidden', 'true');
  page1.setAttribute('aria-hidden', 'false');
  page1.focus();
});

// Accessibility: allow back button with keyboard
backButton.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    backButton.click();
  }
});
