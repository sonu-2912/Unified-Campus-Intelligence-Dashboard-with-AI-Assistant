const weeklyMenu = {
  monday: {
    breakfast: [
      { name: "Masala Dosa", price: 40, type: "veg", calories: 350 },
      { name: "Idli Sambar (4 pcs)", price: 30, type: "veg", calories: 280 },
      { name: "Bread Omelette", price: 35, type: "non-veg", calories: 320 },
      { name: "Fresh Fruit Bowl", price: 50, type: "vegan", calories: 150 },
    ],
    lunch: [
      { name: "Rajma Chawal", price: 60, type: "veg", calories: 450 },
      { name: "Chicken Biryani", price: 90, type: "non-veg", calories: 550 },
      { name: "Paneer Butter Masala + Roti", price: 80, type: "veg", calories: 480 },
      { name: "Dal Tadka + Rice", price: 50, type: "vegan", calories: 400 },
    ],
    dinner: [
      { name: "Chole Bhature", price: 60, type: "veg", calories: 520 },
      { name: "Egg Curry + Rice", price: 65, type: "non-veg", calories: 430 },
      { name: "Mixed Veg + Chapati", price: 55, type: "vegan", calories: 380 },
    ],
  },
  tuesday: {
    breakfast: [
      { name: "Poha", price: 25, type: "veg", calories: 250 },
      { name: "Aloo Paratha", price: 35, type: "veg", calories: 380 },
      { name: "Egg Bhurji + Toast", price: 40, type: "non-veg", calories: 340 },
      { name: "Oats Porridge", price: 30, type: "vegan", calories: 200 },
    ],
    lunch: [
      { name: "Veg Thali (Dal, Sabji, Roti, Rice)", price: 70, type: "veg", calories: 500 },
      { name: "Fish Curry + Rice", price: 95, type: "non-veg", calories: 480 },
      { name: "Mushroom Masala + Naan", price: 75, type: "veg", calories: 420 },
      { name: "Lemon Rice", price: 45, type: "vegan", calories: 350 },
    ],
    dinner: [
      { name: "Pav Bhaji", price: 55, type: "veg", calories: 460 },
      { name: "Chicken Tikka + Rumali Roti", price: 85, type: "non-veg", calories: 400 },
      { name: "Vegetable Pulao", price: 50, type: "vegan", calories: 370 },
    ],
  },
  wednesday: {
    breakfast: [
      { name: "Upma", price: 25, type: "veg", calories: 230 },
      { name: "Medu Vada (3 pcs)", price: 30, type: "veg", calories: 300 },
      { name: "Boiled Eggs (2) + Toast", price: 30, type: "non-veg", calories: 280 },
      { name: "Cornflakes + Milk", price: 35, type: "veg", calories: 220 },
    ],
    lunch: [
      { name: "Kadhi Pakora + Rice", price: 55, type: "veg", calories: 430 },
      { name: "Mutton Rogan Josh + Naan", price: 120, type: "non-veg", calories: 580 },
      { name: "Palak Paneer + Roti", price: 75, type: "veg", calories: 400 },
      { name: "Sambar Rice", price: 45, type: "vegan", calories: 380 },
    ],
    dinner: [
      { name: "Aloo Gobi + Chapati", price: 50, type: "veg", calories: 360 },
      { name: "Keema Pav", price: 80, type: "non-veg", calories: 490 },
      { name: "Jeera Rice + Dal", price: 50, type: "vegan", calories: 390 },
    ],
  },
  thursday: {
    breakfast: [
      { name: "Puri Bhaji", price: 40, type: "veg", calories: 420 },
      { name: "Rava Dosa", price: 35, type: "veg", calories: 300 },
      { name: "Cheese Omelette", price: 45, type: "non-veg", calories: 350 },
      { name: "Sprouts Salad", price: 35, type: "vegan", calories: 180 },
    ],
    lunch: [
      { name: "South Indian Thali", price: 75, type: "veg", calories: 520 },
      { name: "Butter Chicken + Naan", price: 100, type: "non-veg", calories: 600 },
      { name: "Malai Kofta + Roti", price: 80, type: "veg", calories: 480 },
      { name: "Curd Rice", price: 40, type: "veg", calories: 320 },
    ],
    dinner: [
      { name: "Bhindi Masala + Chapati", price: 50, type: "veg", calories: 340 },
      { name: "Chicken Fried Rice", price: 75, type: "non-veg", calories: 520 },
      { name: "Tomato Rice", price: 45, type: "vegan", calories: 360 },
    ],
  },
  friday: {
    breakfast: [
      { name: "Chole Kulche", price: 45, type: "veg", calories: 450 },
      { name: "Set Dosa", price: 30, type: "veg", calories: 270 },
      { name: "French Toast", price: 35, type: "non-veg", calories: 310 },
      { name: "Banana Smoothie", price: 40, type: "vegan", calories: 200 },
    ],
    lunch: [
      { name: "Veg Biryani", price: 65, type: "veg", calories: 470 },
      { name: "Prawn Curry + Rice", price: 110, type: "non-veg", calories: 500 },
      { name: "Shahi Paneer + Naan", price: 85, type: "veg", calories: 500 },
      { name: "Bisi Bele Bath", price: 50, type: "vegan", calories: 400 },
    ],
    dinner: [
      { name: "Pizza Night - Margherita", price: 80, type: "veg", calories: 550 },
      { name: "Pizza Night - Chicken Tikka", price: 100, type: "non-veg", calories: 600 },
      { name: "Pasta Arrabiata", price: 70, type: "vegan", calories: 420 },
    ],
  },
  saturday: {
    breakfast: [
      { name: "Pancakes + Maple Syrup", price: 50, type: "veg", calories: 400 },
      { name: "Sandwich Platter", price: 45, type: "veg", calories: 350 },
      { name: "Sausage + Egg Muffin", price: 55, type: "non-veg", calories: 420 },
    ],
    lunch: [
      { name: "Special Thali", price: 90, type: "veg", calories: 600 },
      { name: "Chicken Tandoori + Naan", price: 110, type: "non-veg", calories: 550 },
      { name: "Paneer Tikka Wrap", price: 70, type: "veg", calories: 400 },
    ],
    dinner: [
      { name: "Burger Night - Veg Burger", price: 70, type: "veg", calories: 480 },
      { name: "Burger Night - Chicken Burger", price: 85, type: "non-veg", calories: 550 },
      { name: "Sweet Corn Soup + Garlic Bread", price: 60, type: "veg", calories: 350 },
    ],
  },
  sunday: {
    breakfast: [
      { name: "Special Sunday Brunch", price: 80, type: "veg", calories: 550 },
      { name: "Egg Benedict", price: 65, type: "non-veg", calories: 450 },
      { name: "Fruit Salad + Yogurt", price: 45, type: "veg", calories: 200 },
    ],
    lunch: [
      { name: "Hyderabadi Biryani", price: 100, type: "non-veg", calories: 580 },
      { name: "Dal Makhani + Butter Naan", price: 80, type: "veg", calories: 520 },
      { name: "Veg Hakka Noodles", price: 60, type: "veg", calories: 400 },
    ],
    dinner: [
      { name: "Light Dinner - Soup + Sandwich", price: 55, type: "veg", calories: 320 },
      { name: "Chicken Soup + Garlic Bread", price: 65, type: "non-veg", calories: 350 },
      { name: "Khichdi + Papad", price: 40, type: "vegan", calories: 300 },
    ],
  },
};

const timings = {
  breakfast: { start: "7:30 AM", end: "9:30 AM" },
  lunch: { start: "12:00 PM", end: "2:30 PM" },
  snacks: { start: "4:00 PM", end: "5:30 PM" },
  dinner: { start: "7:00 PM", end: "9:30 PM" },
};

function getDayName() {
  return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date().getDay()];
}

export const toolDefinitions = [
  {
    name: "getTodayMenu",
    description: "Get today's cafeteria menu including breakfast, lunch, and dinner items with prices and dietary tags.",
    parameters: { type: "object", properties: {}, required: [] }
  },
  {
    name: "getWeekMenu",
    description: "Get the full weekly cafeteria menu for all days.",
    parameters: { type: "object", properties: {}, required: [] }
  },
  {
    name: "getCafeteriaTimings",
    description: "Get cafeteria operating hours for breakfast, lunch, snacks, and dinner.",
    parameters: { type: "object", properties: {}, required: [] }
  },
  {
    name: "searchMenu",
    description: "Search the cafeteria menu for specific food items or dietary preferences (veg, non-veg, vegan).",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Food item name or dietary preference to search for" }
      },
      required: ["query"]
    }
  }
];

export function handleTool(name, args) {
  switch (name) {
    case "getTodayMenu": {
      const day = getDayName();
      return { day, menu: weeklyMenu[day], timings };
    }
    case "getWeekMenu":
      return { menu: weeklyMenu, timings };
    case "getCafeteriaTimings":
      return { timings };
    case "searchMenu": {
      const q = (args.query || "").toLowerCase();
      const results = {};
      for (const [day, meals] of Object.entries(weeklyMenu)) {
        for (const [meal, items] of Object.entries(meals)) {
          const matches = items.filter(i =>
            i.name.toLowerCase().includes(q) || i.type.toLowerCase().includes(q)
          );
          if (matches.length) {
            if (!results[day]) results[day] = {};
            results[day][meal] = matches;
          }
        }
      }
      return { query: args.query, results };
    }
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

export function getWidgetData() {
  const day = getDayName();
  return {
    today: day,
    menu: weeklyMenu[day],
    timings,
    nextMeal: getNextMeal()
  };
}

function getNextMeal() {
  const hour = new Date().getHours();
  if (hour < 9) return { meal: "Breakfast", time: timings.breakfast.start };
  if (hour < 14) return { meal: "Lunch", time: timings.lunch.start };
  if (hour < 17) return { meal: "Snacks", time: timings.snacks.start };
  if (hour < 21) return { meal: "Dinner", time: timings.dinner.start };
  return { meal: "Breakfast (Tomorrow)", time: timings.breakfast.start };
}
