import { MenuItem, PromoOffer, SeatingArea } from '../types/cafe';

import heroAmbiance from '../assets/images/hero_cafe_ambiance_1790578973387.jpg';
import latteImg from '../assets/images/cafe_specialty_latte_1790578990257.jpg';
import pastryImg from '../assets/images/cafe_artisan_pastry_1790579001675.jpg';
import pizzaImg from '../assets/images/cafe_woodfired_pizza_1790579016287.jpg';
import pastaImg from '../assets/images/cafe_truffle_pasta_1790579029644.jpg';

export { heroAmbiance, latteImg, pastryImg, pizzaImg, pastaImg };

export const MENU_ITEMS: MenuItem[] = [
  // 1. Specialty Coffee & Brews
  {
    id: 'coffee-1',
    name: 'Velvet Flat White',
    teluguName: 'వెల్వెట్ ఫ్లాట్ వైట్',
    category: 'coffee',
    categoryLabel: 'Specialty Coffee',
    price: 240,
    originalPrice: 280,
    description: 'Double ristretto shot of single-origin Chikmagalur Arabica with silky microfoam milk and delicate rosetta art.',
    tag: "Chef's Signature 🌟",
    dietary: 'veg',
    prepTime: '6-8 mins',
    rating: 4.9,
    reviewsCount: 342,
    image: latteImg,
    customizationGroups: [
      {
        id: 'milk',
        name: 'Milk Choice',
        required: true,
        options: [
          { id: 'whole', label: 'Farm Whole Milk', price: 0, default: true },
          { id: 'oat', label: 'Barista Oat Milk', price: 50 },
          { id: 'almond', label: 'Roasted Almond Milk', price: 60 },
          { id: 'soy', label: 'Silken Soy Milk', price: 40 }
        ]
      },
      {
        id: 'temp',
        name: 'Temperature',
        required: true,
        options: [
          { id: 'hot', label: 'Hot (Silky Microfoam)', price: 0, default: true },
          { id: 'iced', label: 'Over Hand-Carved Ice', price: 20 }
        ]
      },
      {
        id: 'syrup',
        name: 'Artisan Flavor Shot',
        required: false,
        options: [
          { id: 'madagascar_vanilla', label: 'Madagascar Vanilla Bean', price: 45 },
          { id: 'salted_caramel', label: 'Smoked Sea Salt Caramel', price: 45 },
          { id: 'roasted_hazelnut', label: 'Piedmont Hazelnut', price: 45 }
        ]
      }
    ]
  },
  {
    id: 'coffee-2',
    name: 'Spanish Honey Cortado',
    teluguName: 'స్పానిష్ హనీ కోర్టాడో',
    category: 'coffee',
    categoryLabel: 'Specialty Coffee',
    price: 260,
    originalPrice: 300,
    description: 'Equal parts dark espresso and velvety steamed milk layered over wildflower forest honey and a dash of Ceylon cinnamon.',
    tag: 'Bestseller 🔥',
    dietary: 'veg',
    prepTime: '5-7 mins',
    rating: 4.8,
    reviewsCount: 219,
    image: latteImg,
    customizationGroups: [
      {
        id: 'milk',
        name: 'Milk Choice',
        required: true,
        options: [
          { id: 'whole', label: 'Whole Milk', price: 0, default: true },
          { id: 'oat', label: 'Oat Milk', price: 50 },
          { id: 'almond', label: 'Almond Milk', price: 60 }
        ]
      },
      {
        id: 'shots',
        name: 'Espresso Strength',
        required: true,
        options: [
          { id: 'regular', label: 'Double Ristretto (Standard)', price: 0, default: true },
          { id: 'triple', label: 'Triple Shot Roast', price: 60 }
        ]
      }
    ]
  },
  {
    id: 'coffee-3',
    name: 'Cold Foam Lotus Biscoff Latte',
    teluguName: 'కోల్డ్ ఫోమ్ బిస్కాఫ్ లాట్టే',
    category: 'coffee',
    categoryLabel: 'Specialty Coffee',
    price: 310,
    description: '18-hour cold brew layered with caramelized speculoos cookie butter milk and crowned with aerated sea-salt sweet cream.',
    tag: 'Trending ⚡',
    dietary: 'veg',
    prepTime: '7-9 mins',
    rating: 4.95,
    reviewsCount: 512,
    image: latteImg,
    customizationGroups: [
      {
        id: 'sweetness',
        name: 'Sweetness Level',
        required: true,
        options: [
          { id: 'standard', label: 'Café Standard (Balanced)', price: 0, default: true },
          { id: 'less', label: 'Less Sweet (50%)', price: 0 },
          { id: 'extra', label: 'Sweet Tooth (+Biscoff Drizzle)', price: 30 }
        ]
      }
    ]
  },
  {
    id: 'coffee-4',
    name: 'Aeropress Single-Origin Pour Over',
    teluguName: 'ఏరోప్రెస్ సింగిల్ ఆరిజిన్ కాఫీ',
    category: 'coffee',
    categoryLabel: 'Specialty Coffee',
    price: 280,
    description: 'Ethiopian Yirgacheffe washed beans with bright bergamot, jasmine florals, and subtle peach nectar notes.',
    tag: 'Single-Origin ☕',
    dietary: 'vegan',
    prepTime: '8-10 mins',
    rating: 4.85,
    reviewsCount: 164,
    image: latteImg,
    customizationGroups: [
      {
        id: 'serving',
        name: 'Serving Style',
        required: true,
        options: [
          { id: 'hot', label: 'Hot in Tasting Carafe', price: 0, default: true },
          { id: 'iced', label: 'Flash Chilled on Clear Ice', price: 20 }
        ]
      }
    ]
  },

  // 2. Bakery & Viennoiserie
  {
    id: 'bakery-1',
    name: 'French Butter Croissant & Pistachio Pain',
    teluguName: 'ఫ్రెంచ్ బటర్ క్రొయిసెంట్',
    category: 'bakery',
    categoryLabel: 'Bakery & Viennoiserie',
    price: 220,
    originalPrice: 260,
    description: '72-layer laminated AOP Normandy butter croissant with bronzed honeycomb crumb, paired with roasted pistachio frangipane.',
    tag: 'Freshly Baked Daily 🥐',
    dietary: 'veg',
    prepTime: '5 mins',
    rating: 4.9,
    reviewsCount: 418,
    image: pastryImg,
    customizationGroups: [
      {
        id: 'warmth',
        name: 'Warmth',
        required: true,
        options: [
          { id: 'warmed', label: 'Warm & Crispy (Oven Re-toasted)', price: 0, default: true },
          { id: 'room', label: 'Room Temperature', price: 0 }
        ]
      },
      {
        id: 'dip',
        name: 'House Dip / Spread',
        required: false,
        options: [
          { id: 'clotted_cream', label: 'English Clotted Cream & Jam', price: 60 },
          { id: 'nutella', label: 'Warm Gianduja Hazelnut Dip', price: 50 }
        ]
      }
    ]
  },
  {
    id: 'bakery-2',
    name: 'San Sebastián Basque Burnt Cheesecake',
    teluguName: 'బాస్క్ బర్న్ట్ చీజ్ కేక్',
    category: 'bakery',
    categoryLabel: 'Bakery & Viennoiserie',
    price: 320,
    description: 'Intentionally caramelized crust with an oozing, velvety molten cream cheese center infused with real Bourbon vanilla.',
    tag: 'Bestseller 🔥',
    dietary: 'veg',
    prepTime: '5 mins',
    rating: 4.95,
    reviewsCount: 680,
    image: pastryImg,
    customizationGroups: [
      {
        id: 'sauce',
        name: 'Accompaniment',
        required: false,
        options: [
          { id: 'salted_caramel', label: 'Warm Salted Caramel drizzle', price: 40 },
          { id: 'berry_coulis', label: 'Wild Forest Berry Coulis', price: 45 }
        ]
      }
    ]
  },
  {
    id: 'bakery-3',
    name: 'Sourdough Cinnamon Cruffin',
    teluguName: 'సిన్నమోన్ క్రఫిన్',
    category: 'bakery',
    categoryLabel: 'Bakery & Viennoiserie',
    price: 240,
    description: 'Hybrid between a croissant and muffin dusted with aromatic Saigon cinnamon sugar and filled with whipped vanilla pastry cream.',
    tag: 'Freshly Baked Daily 🥐',
    dietary: 'veg',
    prepTime: '5 mins',
    rating: 4.75,
    reviewsCount: 188,
    image: pastryImg
  },

  // 3. Wood-Fired Artisan Pizzas
  {
    id: 'pizza-1',
    name: 'Fresh Burrata & Heirloom Margherita',
    teluguName: 'వుడ్-ఫైర్డ్ బురాతా మార్గరీటా',
    category: 'pizza',
    categoryLabel: 'Wood-Fired Pizza',
    price: 520,
    originalPrice: 590,
    description: '48-hour slow-fermented sourdough crust blistered at 450°C, San Marzano tomato DOP sauce, whole fresh burrata ball, basil oil.',
    tag: "Chef's Signature 🌟",
    dietary: 'veg',
    prepTime: '15-18 mins',
    rating: 4.95,
    reviewsCount: 820,
    image: pizzaImg,
    customizationGroups: [
      {
        id: 'crust',
        name: 'Crust Style',
        required: true,
        options: [
          { id: 'classic_leopard', label: 'Neapolitan Charred Sourdough', price: 0, default: true },
          { id: 'garlic_butter', label: 'Garlic Herb Butter Brushed Crust', price: 50 },
          { id: 'cheese_stuffed', label: 'Smoked Mozzarella Stuffed Crust', price: 90 }
        ]
      },
      {
        id: 'extra_toppings',
        name: 'Extra Gourmet Add-ons',
        required: false,
        options: [
          { id: 'truffle_oil', label: 'White Truffle Oil Drizzle', price: 70 },
          { id: 'hot_honey', label: 'Calabrian Hot Chili Honey', price: 50 },
          { id: 'kalamata_olives', label: 'Kalamata Olives & Roasted Garlic', price: 60 }
        ]
      }
    ]
  },
  {
    id: 'pizza-2',
    name: 'Wild Forest Mushroom & Truffle Cream',
    teluguName: 'వైల్డ్ మష్రూమ్ ట్రఫుల్ పిజ్జా',
    category: 'pizza',
    categoryLabel: 'Wood-Fired Pizza',
    price: 560,
    description: 'Roasted portobello, king oyster and shimeji mushrooms, fontina & fior di latte cheese, garlic mascarpone base, black truffle tapenade.',
    tag: 'Stone-Oven Crust 🍕',
    dietary: 'veg',
    prepTime: '15-18 mins',
    rating: 4.9,
    reviewsCount: 390,
    image: pizzaImg,
    customizationGroups: [
      {
        id: 'crust',
        name: 'Crust Style',
        required: true,
        options: [
          { id: 'classic', label: 'Neapolitan Sourdough Crust', price: 0, default: true },
          { id: 'garlic_butter', label: 'Garlic Herb Crust', price: 50 }
        ]
      }
    ]
  },
  {
    id: 'pizza-3',
    name: 'Calabrian Smoked Pepperoni & Hot Honey',
    teluguName: 'పెప్పరోని & హాట్ హనీ పిజ్జా',
    category: 'pizza',
    categoryLabel: 'Wood-Fired Pizza',
    price: 610,
    originalPrice: 680,
    description: 'Artisan spiced smoked pepperoni cups crisped to golden curls, buffalo mozzarella, fresh oregano, and spicy wildflower hot honey drizzle.',
    tag: 'Bestseller 🔥',
    dietary: 'non-veg',
    prepTime: '15-18 mins',
    rating: 4.95,
    reviewsCount: 540,
    image: pizzaImg,
    customizationGroups: [
      {
        id: 'spice',
        name: 'Spice Level',
        required: true,
        options: [
          { id: 'medium', label: 'Medium Hot (Balanced)', price: 0, default: true },
          { id: 'extra_hot', label: 'Extra Calabrian Chili Kick', price: 30 }
        ]
      }
    ]
  },

  // 4. Handcrafted Pastas
  {
    id: 'pasta-1',
    name: 'Handcrafted Truffle Fettuccine & Parmigiano',
    teluguName: 'క్రీమీ ట్రఫుల్ ఫెట్టుచీని పాస్తా',
    category: 'pasta',
    categoryLabel: 'Handmade Pasta',
    price: 490,
    originalPrice: 550,
    description: 'House-extruded egg fettuccine tossed in a rich cultured butter sauce, shaved Umbrian black truffles, and 24-month Parmigiano-Reggiano.',
    tag: "Chef's Signature 🌟",
    dietary: 'veg',
    prepTime: '14-16 mins',
    rating: 4.9,
    reviewsCount: 460,
    image: pastaImg,
    customizationGroups: [
      {
        id: 'pasta_shape',
        name: 'Pasta Shape',
        required: true,
        options: [
          { id: 'fettuccine', label: 'Hand-Cut Fettuccine (Recommended)', price: 0, default: true },
          { id: 'penne', label: 'Bronze-Cut Rigatoni / Penne', price: 0 },
          { id: 'gluten_free', label: 'Gluten-Free Artisan Fusilli', price: 60 }
        ]
      },
      {
        id: 'protein_addon',
        name: 'Optional Add-on',
        required: false,
        options: [
          { id: 'charred_chicken', label: 'Charred Herb Butter Chicken Strips', price: 110 },
          { id: 'garlic_mushrooms', label: 'Sautéed Garlic Porcini Mushrooms', price: 80 }
        ]
      }
    ]
  },
  {
    id: 'pasta-2',
    name: 'Slow-Simmered Pomodoro & Burrata Rigatoni',
    teluguName: 'పోమోడోరో బురాతా రిగటోని',
    category: 'pasta',
    categoryLabel: 'Handmade Pasta',
    price: 460,
    description: 'San Marzano tomatoes simmered with sweet basil and extra virgin olive oil, topped with creamy burrata heart and toasted pine nuts.',
    tag: 'Bestseller 🔥',
    dietary: 'veg',
    prepTime: '12-14 mins',
    rating: 4.85,
    reviewsCount: 310,
    image: pastaImg,
    customizationGroups: [
      {
        id: 'cheese',
        name: 'Cheese Level',
        required: true,
        options: [
          { id: 'standard', label: 'Standard Burrata Heart', price: 0, default: true },
          { id: 'extra_parm', label: 'Extra Aged Parmigiano Shavings', price: 50 }
        ]
      }
    ]
  },
  {
    id: 'pasta-3',
    name: 'Basil Pesto Genovese & Charred Chicken Tagliatelle',
    teluguName: 'బేసిల్ పెస్టో చికెన్ పాస్తా',
    category: 'pasta',
    categoryLabel: 'Handmade Pasta',
    price: 520,
    description: 'Fresh aromatic Genovese basil pounded with garlic, pine nuts, Pecorino Romano, tossed with tender rosemary grilled chicken breast.',
    tag: 'Artisan Crafted ✨',
    dietary: 'non-veg',
    prepTime: '14-16 mins',
    rating: 4.88,
    reviewsCount: 295,
    image: pastaImg
  },

  // 5. Gourmet Craft Burgers
  {
    id: 'burger-1',
    name: 'Smoked Truffle & Portobello Smash Burger',
    teluguName: 'స్మోక్డ్ ట్రఫుల్ స్మాష్ బర్గర్',
    category: 'burger',
    categoryLabel: 'Gourmet Burgers',
    price: 440,
    originalPrice: 490,
    description: 'Seared double portobello mushroom & lentil smash patty, smoked English cheddar, truffle garlic aioli, caramelized shallots on toasted brioche.',
    tag: "Chef's Signature 🌟",
    dietary: 'veg',
    prepTime: '12-15 mins',
    rating: 4.9,
    reviewsCount: 380,
    image: pizzaImg, // Fallback visual with styled wrapper
    customizationGroups: [
      {
        id: 'bun',
        name: 'Brioche Bun Selection',
        required: true,
        options: [
          { id: 'butter_brioche', label: 'Golden Butter Toasted Brioche', price: 0, default: true },
          { id: 'sesame_charcoal', label: 'Black Sesame Activated Charcoal Bun', price: 30 },
          { id: 'lettuce_wrap', label: 'Low-Carb Crisp Butterhead Lettuce Wrap', price: 0 }
        ]
      },
      {
        id: 'sides',
        name: 'Side Accompaniment',
        required: true,
        options: [
          { id: 'regular_fries', label: 'Hand-Cut Rosemary Sea Salt Fries', price: 0, default: true },
          { id: 'truffle_fries', label: 'Parmesan Truffle Fries Upgrade', price: 90 },
          { id: 'onion_rings', label: 'Beer-Battered Crisp Onion Rings', price: 70 }
        ]
      }
    ]
  },
  {
    id: 'burger-2',
    name: 'Crispy Buttermilk Herb Chicken Burger',
    teluguName: 'క్రిస్పీ బటర్‌మిల్క్ చికెన్ బర్గర్',
    category: 'burger',
    categoryLabel: 'Gourmet Burgers',
    price: 470,
    originalPrice: 530,
    description: '24-hour spiced buttermilk marinated chicken thigh with shatteringly crisp crust, house dill pickles, Nashville hot glaze, and brioche bun.',
    tag: 'Bestseller 🔥',
    dietary: 'non-veg',
    prepTime: '12-15 mins',
    rating: 4.94,
    reviewsCount: 710,
    image: pizzaImg,
    customizationGroups: [
      {
        id: 'spice',
        name: 'Glaze Style',
        required: true,
        options: [
          { id: 'honey_garlic', label: 'Smoked Honey Garlic Butter (Mild)', price: 0 },
          { id: 'nashville', label: 'Nashville Hot Cayenne Glaze (Spicy)', price: 0, default: true }
        ]
      },
      {
        id: 'cheese',
        name: 'Cheese Melt',
        required: false,
        options: [
          { id: 'extra_cheddar', label: 'Aged Sharp Cheddar Melt', price: 50 },
          { id: 'jalapeno_jack', label: 'Pepper Jack Slice', price: 50 }
        ]
      }
    ]
  },

  // 6. Artisanal Coolers & Refreshers
  {
    id: 'drinks-1',
    name: 'Yuzu Sparkling Cold Brew Fizz',
    teluguName: 'యుజు కోల్డ్ బ్రూ ఫిజ్',
    category: 'drinks',
    categoryLabel: 'Artisanal Coolers',
    price: 260,
    description: 'Single-estate light roast cold brew infused with Japanese Yuzu citrus cordial, fresh mint leaves, and effervescent botanical tonic.',
    tag: 'House Refreshment ✨',
    dietary: 'vegan',
    prepTime: '4-5 mins',
    rating: 4.8,
    reviewsCount: 175,
    image: latteImg
  },
  {
    id: 'drinks-2',
    name: 'Wild Hibiscus Berry Blossom Iced Tea',
    teluguName: 'హైబిస్కస్ బెర్రీ ఐస్‌డ్ టీ',
    category: 'drinks',
    categoryLabel: 'Artisanal Coolers',
    price: 230,
    description: 'Cold-steeped organic Nile hibiscus flowers with macerated raspberries, sweet basil seeds, and sparkling Himalayan spring water.',
    tag: 'Refreshing 🍃',
    dietary: 'vegan',
    prepTime: '4-5 mins',
    rating: 4.88,
    reviewsCount: 220,
    image: latteImg
  },

  // 7. Decadent Desserts
  {
    id: 'dessert-1',
    name: 'Belgian Dark Chocolate Ganache Tart',
    teluguName: 'డార్క్ చాక్లెట్ గానాష్ టార్ట్',
    category: 'desserts',
    categoryLabel: 'Artisan Desserts',
    price: 290,
    description: '70% Valrhona dark chocolate silk ganache in a crisp sable breton shell, topped with gold leaf and sea salt flakes.',
    tag: "Chef's Signature 🌟",
    dietary: 'veg',
    prepTime: '5 mins',
    rating: 4.96,
    reviewsCount: 430,
    image: pastryImg
  }
];

export const SEATING_AREAS: SeatingArea[] = [
  {
    id: 'garden',
    name: 'Garden Veranda & Patio',
    description: 'Sunlit outdoor terrace enveloped in lush monstera plants, fragrant jasmine blooms, and natural breeze.',
    ambiance: 'Open Air · Natural Sunlight · Pet Friendly',
    tag: 'Most Popular for Brunch',
    availableTables: 6,
    image: heroAmbiance
  },
  {
    id: 'library',
    name: 'Cozy Library & Book Nook',
    description: 'Intimate leather armchairs, floor-to-ceiling curated art books, gentle jazz music, and amber incandescent glow.',
    ambiance: 'Quiet & Serene · Warm Oak · Plugs Available',
    tag: 'Perfect for Conversations & Deep Work',
    availableTables: 4,
    image: heroAmbiance
  },
  {
    id: 'espresso_bar',
    name: 'Barista Espresso Counter',
    description: 'Front-row high marble stools facing our La Marzocco espresso station. Watch the pour-over craft up close.',
    ambiance: 'Aromatic & Lively · Barista Interaction',
    tag: 'Coffee Connoisseurs Favorite',
    availableTables: 5,
    image: latteImg
  },
  {
    id: 'rooftop',
    name: 'Rooftop Sunset Terrace',
    description: 'Open-air elevated deck with panoramic city skyline views, festoon fairy lights, and evening breeze.',
    ambiance: 'Panoramic Views · Romantic Sunset Glow',
    tag: 'Ideal for Dates & Celebrations',
    availableTables: 7,
    image: heroAmbiance
  }
];

export const PROMO_OFFERS: PromoOffer[] = [
  {
    code: 'WELCOME15',
    title: 'First Sip Welcome Offer',
    discountType: 'percentage',
    discountValue: 15,
    minOrder: 350,
    description: '15% discount on your first online order. Experience our craft coffees & oven bakes.',
    tag: 'New Customer Special'
  },
  {
    code: 'BREWCLUB',
    title: 'Brew Club ₹100 Flat OFF',
    discountType: 'fixed',
    discountValue: 100,
    minOrder: 699,
    description: 'Flat ₹100 off on gourmet wood-fired pizzas, handmade pastas, and specialty brews.',
    tag: 'Members Privilege'
  },
  {
    code: 'MONSOON20',
    title: 'Artisan Combo 20% OFF',
    discountType: 'percentage',
    discountValue: 20,
    minOrder: 999,
    description: '20% off on all weekend family feast orders above ₹999. Includes free dessert upgrade.',
    tag: 'Weekend Special'
  }
];

export const LOYALTY_REWARDS_CATALOG = [
  {
    id: 'rew-1',
    beansRequired: 60,
    title: 'French Butter Croissant',
    value: '₹220',
    description: 'Enjoy a warm, freshly baked butter croissant with your morning coffee.',
    category: 'Bakery'
  },
  {
    id: 'rew-2',
    beansRequired: 80,
    title: 'Any Signature Specialty Latte',
    value: '₹280',
    description: 'Redeem for any hot or iced specialty coffee, flat white, or Spanish cortado.',
    category: 'Coffee'
  },
  {
    id: 'rew-3',
    beansRequired: 150,
    title: 'Burrata Margherita or Truffle Pizza',
    value: '₹520',
    description: 'Complimentary full 11-inch Neapolitan wood-fired sourdough pizza.',
    category: 'Kitchen'
  },
  {
    id: 'rew-4',
    beansRequired: 180,
    title: 'Handcrafted Truffle Pasta Feast',
    value: '₹490',
    description: 'Indulge in freshly pulled egg tagliatelle with shaved black truffles.',
    category: 'Kitchen'
  }
];
