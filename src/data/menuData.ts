import { MenuItem, PromoOffer, SeatingArea } from '../types/cafe';

import heroAmbiance from '../assets/images/hero_cafe_ambiance_1790578973387.jpg';
import latteImg from '../assets/images/cafe_specialty_latte_1790578990257.jpg';
import cappuccinoImg from '../assets/images/artisan_cappuccino_cocoa_1790586266306.jpg';
import biscoffColdBrewImg from '../assets/images/biscoff_cold_brew_1790586331363.jpg';
import pastryImg from '../assets/images/cafe_artisan_pastry_1790579001675.jpg';
import basqueCheesecakeImg from '../assets/images/basque_cheesecake_1790586345575.jpg';
import burrataPizzaImg from '../assets/images/cafe_woodfired_pizza_1790579016287.jpg';
import paneerPizzaImg from '../assets/images/paneer_tikka_pizza_1790586281144.jpg';
import smokedChickenPizzaImg from '../assets/images/smoked_chicken_pizza_1790586293834.jpg';
import pastaImg from '../assets/images/cafe_truffle_pasta_1790579029644.jpg';
import smashBurgerImg from '../assets/images/smash_cheeseburger_1790586307555.jpg';
import crispyChickenBurgerImg from '../assets/images/crispy_chicken_burger_1790586319383.jpg';

export {
  heroAmbiance,
  latteImg,
  cappuccinoImg,
  biscoffColdBrewImg,
  pastryImg,
  basqueCheesecakeImg,
  burrataPizzaImg,
  paneerPizzaImg,
  smokedChickenPizzaImg,
  pastaImg,
  smashBurgerImg,
  crispyChickenBurgerImg,
};

export const MENU_ITEMS: MenuItem[] = [
  // 1. Specialty Coffee & Brews
  {
    id: 'coffee-latte',
    name: 'Silky Café Latte',
    teluguName: 'సిల్కీ కేఫ్ లాట్టే',
    category: 'coffee',
    categoryLabel: 'Specialty Coffee',
    price: 240,
    originalPrice: 280,
    description: 'Double shot of single-origin Chikmagalur Arabica blended with generous silky steamed milk and a delicate layer of microfoam art.',
    tag: "Milky & Mild ☕",
    dietary: 'veg',
    prepTime: '5-7 mins',
    rating: 4.88,
    reviewsCount: 380,
    image: latteImg,
    flavorTags: ['Mild Coffee', 'Creamy', 'Natural Sweetness', 'Silky'],
    differenceExplainer: {
      differsFrom: 'vs Cappuccino',
      explanation: 'Made with 70% silky steamed milk and only a thin microfoam cap. Much creamier, milder, and less intensely bitter than a Cappuccino.'
    },
    composition: {
      layers: [
        { name: 'Espresso', percentage: 20, color: '#3E2723' },
        { name: 'Steamed Milk', percentage: 65, color: '#F5EBE1' },
        { name: 'Microfoam Art', percentage: 15, color: '#FFF9F4' }
      ],
      notes: 'Dominant creamy milk sweetness with gentle nutty coffee undertones.'
    },
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
    id: 'coffee-cappuccino',
    name: 'Artisan Italian Cappuccino',
    teluguName: 'ట్రెడిషనల్ కాపుచినో (కోకో డస్ట్)',
    category: 'coffee',
    categoryLabel: 'Specialty Coffee',
    price: 250,
    originalPrice: 290,
    description: 'Classic 1:1:1 Italian ratio: intense dark espresso shot, textured warm milk, crowned with a thick, airy velvety foam dome dusted with Valrhona cocoa.',
    tag: 'Bold & Frothy ☁️',
    dietary: 'veg',
    prepTime: '5-7 mins',
    rating: 4.94,
    reviewsCount: 420,
    image: cappuccinoImg,
    flavorTags: ['Bold Espresso', 'Airy Dense Foam', 'Valrhona Cocoa Dust'],
    differenceExplainer: {
      differsFrom: 'vs Café Latte',
      explanation: 'Has equal 1:1:1 parts espresso, milk, and a thick airy foam pillow dusted in cocoa. Gives a stronger, more pronounced coffee punch than a Latte.'
    },
    composition: {
      layers: [
        { name: 'Espresso', percentage: 33, color: '#3E2723' },
        { name: 'Steamed Milk', percentage: 33, color: '#F5EBE1' },
        { name: 'Airy Foam & Cocoa', percentage: 34, color: '#8D6E63' }
      ],
      notes: 'Thick velvety foam pillow, lingering dark roast punch, and aromatic cocoa.'
    },
    customizationGroups: [
      {
        id: 'milk',
        name: 'Milk Choice',
        required: true,
        options: [
          { id: 'whole', label: 'Whole Farm Milk (Best Froth)', price: 0, default: true },
          { id: 'oat', label: 'Barista Oat Milk', price: 50 },
          { id: 'almond', label: 'Almond Milk', price: 60 }
        ]
      },
      {
        id: 'dusting',
        name: 'Topping Finish',
        required: true,
        options: [
          { id: 'valrhona_cocoa', label: 'Dark Valrhona Cocoa (Classic)', price: 0, default: true },
          { id: 'ceylon_cinnamon', label: 'Ceylon Cinnamon Dust', price: 0 },
          { id: 'none', label: 'No Dusting', price: 0 }
        ]
      }
    ]
  },
  {
    id: 'coffee-cortado',
    name: 'Spanish Honey Cortado',
    teluguName: 'స్పానిష్ హనీ కోర్టాడో',
    category: 'coffee',
    categoryLabel: 'Specialty Coffee',
    price: 260,
    originalPrice: 300,
    description: 'Equal 1:1 parts dark espresso and velvety steamed milk layered over wildflower forest honey and a dash of Ceylon cinnamon.',
    tag: 'Bestseller 🔥',
    dietary: 'veg',
    prepTime: '5-7 mins',
    rating: 4.85,
    reviewsCount: 219,
    image: latteImg,
    flavorTags: ['Equal 1:1', 'Wild Honey', 'Ceylon Cinnamon', 'Punchy'],
    differenceExplainer: {
      differsFrom: 'vs Latte & Cappuccino',
      explanation: 'Cortado means "cut" — equal 50/50 espresso and milk to cut the acidity without diluting the raw coffee kick.'
    },
    composition: {
      layers: [
        { name: 'Double Espresso', percentage: 50, color: '#3E2723' },
        { name: 'Steamed Milk', percentage: 50, color: '#F5EBE1' }
      ],
      notes: 'Concentrated coffee kick with subtle sweetness of raw forest honey.'
    }
  },
  {
    id: 'coffee-biscoff',
    name: 'Cold Foam Lotus Biscoff Cold Brew',
    teluguName: 'కోల్డ్ ఫోమ్ బిస్కాఫ్ లాట్టే',
    category: 'coffee',
    categoryLabel: 'Specialty Coffee',
    price: 310,
    description: '18-hour cold brew layered with caramelized speculoos cookie butter milk and crowned with aerated sea-salt sweet cream and a Lotus biscuit.',
    tag: 'Trending ⚡',
    dietary: 'veg',
    prepTime: '6-8 mins',
    rating: 4.96,
    reviewsCount: 512,
    image: biscoffColdBrewImg,
    flavorTags: ['Caramelized Speculoos', 'Cold Brew', 'Sea-Salt Foam', 'Sweet & Chilled'],
    differenceExplainer: {
      differsFrom: 'vs Hot Espresso',
      explanation: 'Slow steeped for 18 hours in cold water, delivering 70% less natural acidity, combined with thick spiced cookie butter.'
    }
  },

  // 2. Wood-Fired Artisan Pizzas
  {
    id: 'pizza-paneer',
    name: 'Charred Tandoori Malai Paneer Sourdough Pizza',
    teluguName: 'చార్డ్ మలై పనీర్ టిక్కా పిజ్జా',
    category: 'pizza',
    categoryLabel: 'Wood-Fired Pizza',
    price: 530,
    originalPrice: 590,
    description: '48-hour slow-fermented leopard sourdough crust, San Marzano sauce, golden roasted malai paneer cubes, charred bell peppers, fior di latte, and fresh mint pesto drops.',
    tag: "100% Pure Veg Star 🧀",
    dietary: 'veg',
    prepTime: '14-16 mins',
    rating: 4.94,
    reviewsCount: 640,
    image: paneerPizzaImg,
    flavorTags: ['Melt-in-mouth Paneer', 'Mint Herb Pesto', 'Wood-fired Char', 'Pure Veg'],
    differenceExplainer: {
      differsFrom: 'vs Smoked Chicken Pizza',
      explanation: '100% vegetarian. Generously topped with soft malai cottage cheese cubes infused with roasted cumin and house mint pesto, with zero poultry.'
    },
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
        id: 'spice',
        name: 'Spice Level',
        required: true,
        options: [
          { id: 'mild', label: 'Mild Spiced (Creamy & Herby)', price: 0 },
          { id: 'medium', label: 'Medium Desi Char Kick', price: 0, default: true },
          { id: 'extra', label: 'Extra Green Chili & Chaat Spritz', price: 20 }
        ]
      }
    ]
  },
  {
    id: 'pizza-chicken',
    name: 'Smoked Herb & Barbecue Chicken Wood-Fired Pizza',
    teluguName: 'స్మోక్డ్ చికెన్ బార్బెక్యూ పిజ్జా',
    category: 'pizza',
    categoryLabel: 'Wood-Fired Pizza',
    price: 580,
    originalPrice: 650,
    description: 'Hickory-wood smoked tender chicken breast chunks, charred sweet red onions, fior di latte, molten smoked gouda, tangy artisanal BBQ glaze, and fresh parsley.',
    tag: "Meaty & Savory 🍗",
    dietary: 'non-veg',
    prepTime: '15-18 mins',
    rating: 4.96,
    reviewsCount: 780,
    image: smokedChickenPizzaImg,
    flavorTags: ['Hickory Smoked Chicken', 'Smoked Gouda', 'Tangy BBQ Glaze', 'Savory Char'],
    differenceExplainer: {
      differsFrom: 'vs Paneer Pizza',
      explanation: 'Made with slow-smoked pulled chicken breast, melted smoked gouda cheese, and sweet-tangy barbecue sauce for deep meaty umami.'
    },
    customizationGroups: [
      {
        id: 'crust',
        name: 'Crust Style',
        required: true,
        options: [
          { id: 'classic', label: 'Charred Sourdough Crust', price: 0, default: true },
          { id: 'garlic_butter', label: 'Garlic Herb Crust', price: 50 }
        ]
      },
      {
        id: 'chicken_extra',
        name: 'Meat Portion',
        required: false,
        options: [
          { id: 'extra_smoked_chicken', label: 'Extra Double Smoked Chicken (+80g)', price: 95 },
          { id: 'crispy_bacon', label: 'Crispy Smoked Bacon Bits', price: 90 }
        ]
      }
    ]
  },
  {
    id: 'pizza-burrata',
    name: 'Fresh Burrata & Heirloom Margherita',
    teluguName: 'వుడ్-ఫైర్డ్ బురాతా మార్గరీటా',
    category: 'pizza',
    categoryLabel: 'Wood-Fired Pizza',
    price: 520,
    originalPrice: 590,
    description: 'Blistered sourdough crust, San Marzano tomato DOP sauce, whole fresh 120g burrata ball that oozes upon slicing, and aromatic cold-pressed basil oil.',
    tag: "Chef's Signature 🌟",
    dietary: 'veg',
    prepTime: '15-18 mins',
    rating: 4.95,
    reviewsCount: 820,
    image: burrataPizzaImg,
    flavorTags: ['Fresh Burrata Heart', 'San Marzano DOP', 'Cold-pressed Basil Oil', 'Authentic Italian'],
    differenceExplainer: {
      differsFrom: 'vs Standard Margherita',
      explanation: 'Features an artisanal whole chilled burrata ball with oozing stracciatella cream in the center rather than cooked flat cheese.'
    }
  },

  // 3. Gourmet Craft Burgers
  {
    id: 'burger-smash',
    name: 'Smoked Truffle Portobello Smash Burger',
    teluguName: 'స్మోక్డ్ ట్రఫుల్ స్మాష్ బర్గర్',
    category: 'burger',
    categoryLabel: 'Gourmet Burgers',
    price: 440,
    originalPrice: 490,
    description: 'Double seared smashed mushroom & lentil patties with shatteringly crisp lace edges, molten sharp cheddar, black truffle aioli, and caramelized sweet shallots on brioche.',
    tag: "Crispy Lace Edges 🍔",
    dietary: 'veg',
    prepTime: '12-15 mins',
    rating: 4.9,
    reviewsCount: 380,
    image: smashBurgerImg,
    flavorTags: ['Double Smashed Patty', 'Truffle Aioli', 'Lace Edges', 'Melted Cheddar'],
    differenceExplainer: {
      differsFrom: 'vs Fried Chicken Burger',
      explanation: 'Cast-iron smashed for caramelized crispy lace edges and rich black truffle umami, paired with house sweet shallots.'
    },
    customizationGroups: [
      {
        id: 'bun',
        name: 'Brioche Bun Selection',
        required: true,
        options: [
          { id: 'butter_brioche', label: 'Golden Butter Toasted Brioche', price: 0, default: true },
          { id: 'sesame_charcoal', label: 'Black Sesame Activated Charcoal Bun', price: 30 }
        ]
      },
      {
        id: 'sides',
        name: 'Side Accompaniment',
        required: true,
        options: [
          { id: 'regular_fries', label: 'Hand-Cut Rosemary Sea Salt Fries', price: 0, default: true },
          { id: 'truffle_fries', label: 'Parmesan Truffle Fries Upgrade', price: 90 }
        ]
      }
    ]
  },
  {
    id: 'burger-chicken',
    name: 'Crispy Nashville Buttermilk Chicken Burger',
    teluguName: 'క్రిస్పీ బటర్‌మిల్క్ చికెన్ బర్గర్',
    category: 'burger',
    categoryLabel: 'Gourmet Burgers',
    price: 470,
    originalPrice: 530,
    description: '24-hour spiced buttermilk brined chicken thigh with jagged crunch crust, spicy Nashville cayenne chili oil dip, crunchy purple slaw, and thick house pickles.',
    tag: 'Ultra Crunchy 🔥',
    dietary: 'non-veg',
    prepTime: '12-15 mins',
    rating: 4.95,
    reviewsCount: 710,
    image: crispyChickenBurgerImg,
    flavorTags: ['24-hr Buttermilk Brined', 'Nashville Hot Oil', 'Purple Cabbage Slaw', 'Crunchy'],
    differenceExplainer: {
      differsFrom: 'vs Smash Burger',
      explanation: 'Deep-fried whole marinated chicken thigh with jagged, audible crunch and hot spiced glaze rather than seared flat patties.'
    }
  },

  // 4. Bakery & Viennoiserie
  {
    id: 'bakery-croissant',
    name: 'French Butter Croissant & Pistachio Pain',
    teluguName: 'ఫ్రెంచ్ బటర్ క్రొయిసెంట్',
    category: 'bakery',
    categoryLabel: 'Bakery & Viennoiserie',
    price: 220,
    originalPrice: 260,
    description: '72-layer laminated AOP Normandy butter croissant with bronzed honeycomb crumb, paired with roasted Sicilian pistachio frangipane.',
    tag: 'Freshly Baked Daily 🥐',
    dietary: 'veg',
    prepTime: '5 mins',
    rating: 4.9,
    reviewsCount: 418,
    image: pastryImg,
    flavorTags: ['72 Laminated Layers', 'Normandy AOP Butter', 'Honeycomb Crumb'],
    differenceExplainer: {
      differsFrom: 'vs Cake / Cruffin',
      explanation: 'Pure laminated puff pastry crafted over 3 days with alternating sheets of Normandy cold butter and fermented dough.'
    }
  },
  {
    id: 'bakery-cheesecake',
    name: 'San Sebastián Basque Burnt Cheesecake',
    teluguName: 'బాస్క్ బర్న్ట్ చీజ్ కేక్',
    category: 'bakery',
    categoryLabel: 'Bakery & Viennoiserie',
    price: 320,
    description: 'Intentionally caramelized scorched crust with an oozing, velvety molten cream cheese center infused with real Madagascar Bourbon vanilla.',
    tag: 'Molten Center 🍰',
    dietary: 'veg',
    prepTime: '5 mins',
    rating: 4.97,
    reviewsCount: 680,
    image: basqueCheesecakeImg,
    flavorTags: ['Caramelized Scorched Top', 'Molten Custard Center', 'Madagascar Vanilla'],
    differenceExplainer: {
      differsFrom: 'vs New York Cheesecake',
      explanation: 'No biscuit crust! Baked at high heat so the exterior caramelizes dark like roasted caramel while the interior remains completely molten and gooey.'
    }
  },

  // 5. Handcrafted Pastas
  {
    id: 'pasta-truffle',
    name: 'Handcrafted Truffle Fettuccine & Parmigiano',
    teluguName: 'క్రీమీ ట్రఫుల్ ఫెట్టుచీని పాస్తా',
    category: 'pasta',
    categoryLabel: 'Handmade Pasta',
    price: 490,
    originalPrice: 550,
    description: 'House-extruded egg fettuccine tossed in rich cultured butter, shaved Umbrian black truffles, and 24-month Parmigiano-Reggiano.',
    tag: "Chef's Signature 🌟",
    dietary: 'veg',
    prepTime: '14-16 mins',
    rating: 4.9,
    reviewsCount: 460,
    image: pastaImg,
    flavorTags: ['Hand-pulled Fettuccine', 'Black Umbrian Truffle', '24mo Parmigiano'],
    differenceExplainer: {
      differsFrom: 'vs Dried Box Pasta',
      explanation: 'Freshly extruded with organic Italian semolina and fresh egg yolks every morning for a tender, silky bite that clings to the sauce.'
    }
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
    image: cappuccinoImg
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
    description: '20% off on all weekend feast orders above ₹999.',
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
    title: 'Any Signature Specialty Latte / Cappuccino',
    value: '₹280',
    description: 'Redeem for any hot or iced specialty coffee, flat white, or Italian cappuccino.',
    category: 'Coffee'
  },
  {
    id: 'rew-3',
    beansRequired: 150,
    title: 'Paneer Tikka or Smoked Chicken Pizza',
    value: '₹530',
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
