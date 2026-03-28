export const menuData = {
  categories: [
    {
      id: "starters",
      title: "Starters",
      items: [
        {
          id: "1",
          name: "Roasted Heirloom Carrots",
          description: "Whipped feta, pistachio dukkah, hot honey drizzle",
          price: "$14",
          isVegetarian: true,
          isGlutenFree: true
        },
        {
          id: "2",
          name: "Charred Octopus",
          description: "Smoked paprika purée, fingerling potatoes, salsa verde",
          price: "$22",
          isGlutenFree: true
        },
        {
          id: "3",
          name: "Artisan Burrata",
          description: "Blistered cherry tomatoes, basil oil, toasted sourdough",
          price: "$18",
          isVegetarian: true
        }
      ]
    },
    {
      id: "mains",
      title: "Mains",
      items: [
        {
          id: "4",
          name: "Pan-Seared Scallops",
          description: "Sweet corn risotto, crispy pancetta, micro cilantro",
          price: "$36",
          isGlutenFree: true
        },
        {
          id: "5",
          name: "Braised Short Rib",
          description: "Root vegetable mash, red wine reduction, gremolata",
          price: "$42"
        },
        {
          id: "6",
          name: "Mushroom Tagliatelle",
          description: "Wild foraging mushrooms, truffle cream, aged pecorino",
          price: "$28",
          isVegetarian: true
        }
      ]
    },
    {
      id: "sides",
      title: "Sides",
      items: [
        {
          id: "7",
          name: "Truffle Fries",
          description: "Parmesan, garlic aioli",
          price: "$11"
        },
        {
          id: "8",
          name: "Charred Broccolini",
          description: "Chili flakes, lemon zest, toasted almonds",
          price: "$12",
          isVegan: true,
          isGlutenFree: true
        }
      ]
    },
    {
      id: "desserts",
      title: "Desserts",
      items: [
        {
          id: "9",
          name: "Olive Oil Cake",
          description: "Citrus mascarpone, macerated berries",
          price: "$14"
        },
        {
          id: "10",
          name: "Dark Chocolate Tart",
          description: "Sea salt, espresso crema, candied hazelnuts",
          price: "$16"
        }
      ]
    }
  ],
  notes: [
    "Please inform us of any allergies before ordering.",
    "A 20% gratuity is added to parties of 6 or more."
  ]
};
