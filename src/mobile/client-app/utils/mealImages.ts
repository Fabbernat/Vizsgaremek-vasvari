// utils/mealImages.ts
export const mealImages: Record<string, any> = {
  "margherita-pizza.jpg": require("../assets/mine/margherita-pizza.jpg"),
  "caesar-salata.jpg": require("../assets/mine/caesar-salata.jpg"),
"carbonara.jpg": require("../assets/mine/carbonara.jpg"),
"pepperoni-pizza.jpg": require("../assets/mine/pepperoni-pizza.jpg"),
"hawaii-pizza.jpg": require("../assets/mine/hawaii-pizza.jpg"),
"vegetarianus-pizza.jpg": require("../assets/mine/vegetarianus-pizza.jpg"),
"california-roll.jpg": require("../assets/mine/california-roll.jpg"),
"spicy-tuna-roll.jpg": require("../assets/mine/spicy-tuna-roll.jpg"),
"salmon-nigiri.jpg": require("../assets/mine/salmon-nigiri.jpg"),
"gyros-tal.jpg": require("../assets/mine/gyros-tal.jpg"),
"hamburger.jpg": require("../assets/mine/hamburger.jpg"),
"sult-csirke.jpg": require("../assets/mine/sult-csirke.jpg"),
"rantott-sajt.jpg": require("../assets/mine/rantott-sajt.jpg"),
"lazac-steak.jpg": require("../assets/mine/lazac-steak.jpg"),
"vegetarianus-lasagne.jpg": require("../assets/mine/vegetarianus-lasagne.jpg"),
"sult-zoldsegek.jpg": require("../assets/mine/sult-zoldsegek.jpg"),
"sult-krumpli.jpg": require("../assets/mine/sult-krumpli.jpg"),
"kola.jpg": require("../assets/mine/kola.jpg"),
"kiralyi-burger.jpg": require("../assets/mine/kiralyi-burger.jpg"),
"arany-krumpli.jpg": require("../assets/mine/arany-krumpli.jpg"),
"koronas-limonade.jpg": require("../assets/mine/koronas-limonade.jpg"),
"placeholder.jpg": require("../assets/mine/placeholder.jpg"),
};

export const getMealImage = (imageUrl?: string) => {
if (!imageUrl) return mealImages["placeholder.jpg"];
return mealImages[imageUrl] ?? mealImages["placeholder.jpg"];
};
