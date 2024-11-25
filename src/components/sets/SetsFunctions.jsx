export const getColorData = (data) => {
  //Refine data for later use
  const { sets } = data || null;
  let { cards } = {};
  if (sets && sets.length > 0) {
    cards = sets[0].cards || {};
  }

  //Set up data for color pie chart
  let colorCount = cards.reduce((colorAccumulator, card) => {
    if (card.colors.length === 0) {
      if (colorAccumulator["Colorless"]) {
        colorAccumulator["Colorless"] += 1;
      } else {
        colorAccumulator["Colorless"] = 1;
      }
    } else if (card.colors.length > 1) {
      if (colorAccumulator["Multicolored"]) {
        colorAccumulator["Multicolored"] += 1;
      } else {
        colorAccumulator["Multicolored"] = 1;
      }
    } else {
      card.colors.forEach((color) => {
        if (colorAccumulator[color]) {
          colorAccumulator[color] += 1;
        } else {
          colorAccumulator[color] = 1;
        }
      });
    }
    return colorAccumulator;
  }, {});

  // Data object for color chart
  const colorData = [
    {
      id: "Colorless",
      label: "Colorless",
      //Always have a fail state for when a count does not exist
      value: colorCount["Colorless"] || 0,
    },
    {
      id: "Multicolored",
      label: "Multicolored",
      value: colorCount["Multicolored"] || 0,
    },
    {
      id: "White",
      label: "White",
      value: colorCount["W"] || 0,
    },
    {
      id: "Blue",
      label: "Blue",
      value: colorCount["U"] || 0,
    },
    {
      id: "Black",
      label: "Black",
      value: colorCount["B"] || 0,
    },
    {
      id: "Red",
      label: "Red",
      value: colorCount["R"] || 0,
    },
    {
      id: "Green",
      label: "Green",
      value: colorCount["G"] || 0,
    },
  ];
  return colorData;
};

export const getCardPriceData = (data) => {
  //Refine data for later use
  const { sets } = data || null;
  let { cards } = {};
  let latestPrices = {};
  if (sets && sets.length > 0) {
    cards = sets[0].cards || {};

    latestPrices = cards.map(function (card) {
      return card.latestPrice?.price ?? 0;
    });
  }

  //Set up data for price distribution (PGT = Price Greater Than)
  let priceCount = latestPrices.reduce((priceAccumulator, latestPrice) => {
    if (latestPrice >= 0.5) {
      if (priceAccumulator["PGT.5"]) {
        priceAccumulator["PGT.5"] += 1;
      } else {
        priceAccumulator["PGT.5"] = 1;
      }
    }
    if (latestPrice >= 1) {
      if (priceAccumulator["PGT1"]) {
        priceAccumulator["PGT1"] += 1;
      } else {
        priceAccumulator["PGT1"] = 1;
      }
    }
    if (latestPrice >= 3) {
      if (priceAccumulator["PGT3"]) {
        priceAccumulator["PGT3"] += 1;
      } else {
        priceAccumulator["PGT3"] = 1;
      }
    }
    if (latestPrice >= 10) {
      if (priceAccumulator["PGT10"]) {
        priceAccumulator["PGT10"] += 1;
      } else {
        priceAccumulator["PGT10"] = 1;
      }
    }
    if (latestPrice >= 30) {
      if (priceAccumulator["PGT30"]) {
        priceAccumulator["PGT30"] += 1;
      } else {
        priceAccumulator["PGT30"] = 1;
      }
    }
    if (latestPrice >= 50) {
      if (priceAccumulator["PGT50"]) {
        priceAccumulator["PGT50"] += 1;
      } else {
        priceAccumulator["PGT50"] = 1;
      }
    }
    if (latestPrice >= 100) {
      if (priceAccumulator["PGT100"]) {
        priceAccumulator["PGT100"] += 1;
      } else {
        priceAccumulator["PGT100"] = 1;
      }
    }
    return priceAccumulator;
  }, {});

  // Create data object for price distribution
  const priceData = [
    {
      id: "SetColorData",
      data: [
        {
          x: "Over .50$",
          y: priceCount["PGT.5"] || 0,
        },
        {
          x: "Over 1.00$",
          y: priceCount["PGT1"] || 0,
        },
        {
          x: "Over 3.00$",
          y: priceCount["PGT3"] || 0,
        },
        {
          x: "Over 10.00$",
          y: priceCount["PGT10"] || 0,
        },
        {
          x: "Over 30.00$",
          y: priceCount["PGT30"] || 0,
        },
        {
          x: "Over 50.00$",
          y: priceCount["PGT50"] || 0,
        },
        {
          x: "Over 100.00$",
          y: priceCount["PGT100"] || 0,
        },
      ],
    },
  ];

  return priceData;
};

export const getRarityData = (data) => {
  //Refine data for later use
  const { sets } = data || null;
  let { cards } = {};
  if (sets && sets.length > 0) {
    cards = sets[0].cards || {};
  }

  //Set up data for rarity bar chart
  let rarityCount = cards.reduce((rarityAccumulator, card) => {
    if (card.rarity === "mythic") {
      if (rarityAccumulator["Mythic"]) {
        rarityAccumulator["Mythic"] += 1;
      } else {
        rarityAccumulator["Mythic"] = 1;
      }
    } else if (card.rarity === "rare") {
      if (rarityAccumulator["Rare"]) {
        rarityAccumulator["Rare"] += 1;
      } else {
        rarityAccumulator["Rare"] = 1;
      }
    } else if (card.rarity === "uncommon") {
      if (rarityAccumulator["Uncommon"]) {
        rarityAccumulator["Uncommon"] += 1;
      } else {
        rarityAccumulator["Uncommon"] = 1;
      }
    } else if (card.rarity === "common") {
      if (rarityAccumulator["Common"]) {
        rarityAccumulator["Common"] += 1;
      } else {
        rarityAccumulator["Common"] = 1;
      }
    }
    return rarityAccumulator;
  }, {});

  const rarityData = [
    {
      rarity: "Mythic",
      count: rarityCount["Mythic"] || 0,
    },
    {
      rarity: "Rare",
      count: rarityCount["Rare"] || 0,
    },
    {
      rarity: "Uncommon",
      count: rarityCount["Uncommon"] || 0,
    },
    {
      rarity: "Common",
      count: rarityCount["Common"] || 0,
    },
  ];

  return rarityData;
};

export const getCardTypesData = (data) => {
  //Refine data for later use
  const { sets } = data || null;
  let { cards } = {};
  if (sets && sets.length > 0) {
    cards = sets[0].cards || {};
  }

  //Set up data for rarity bar chart
  let typeCount = cards.reduce((typeAccumulator, card) => {
    if (card.type.includes("Artifact")) {
      if (typeAccumulator["Artifact"]) {
        typeAccumulator["Artifact"] += 1;
      } else {
        typeAccumulator["Artifact"] = 1;
      }
    }
    if (card.type.includes("Battle")) {
      if (typeAccumulator["Battle"]) {
        typeAccumulator["Battle"] += 1;
      } else {
        typeAccumulator["Battle"] = 1;
      }
    }
    if (card.type.includes("Conspiracy")) {
      if (typeAccumulator["Conspiracy"]) {
        typeAccumulator["Conspiracy"] += 1;
      } else {
        typeAccumulator["Conspiracy"] = 1;
      }
    }
    if (card.type.includes("Creature")) {
      if (typeAccumulator["Creature"]) {
        typeAccumulator["Creature"] += 1;
      } else {
        typeAccumulator["Creature"] = 1;
      }
    }
    if (card.type.includes("Dungeon")) {
      if (typeAccumulator["Dungeon"]) {
        typeAccumulator["Dungeon"] += 1;
      } else {
        typeAccumulator["Dungeon"] = 1;
      }
    }
    if (card.type.includes("Enchantment")) {
      if (typeAccumulator["Enchantment"]) {
        typeAccumulator["Enchantment"] += 1;
      } else {
        typeAccumulator["Enchantment"] = 1;
      }
    }
    if (card.type.includes("Instant")) {
      if (typeAccumulator["Instant"]) {
        typeAccumulator["Instant"] += 1;
      } else {
        typeAccumulator["Instant"] = 1;
      }
    }
    if (card.type.includes("Kindred")) {
      if (typeAccumulator["Kindred"]) {
        typeAccumulator["Kindred"] += 1;
      } else {
        typeAccumulator["Kindred"] = 1;
      }
    }
    if (card.type.includes("Land")) {
      if (typeAccumulator["Land"]) {
        typeAccumulator["Land"] += 1;
      } else {
        typeAccumulator["Land"] = 1;
      }
    }
    if (card.type.includes("Planeswalker")) {
      if (typeAccumulator["Planeswalker"]) {
        typeAccumulator["Planeswalker"] += 1;
      } else {
        typeAccumulator["Planeswalker"] = 1;
      }
    }
    if (card.type.includes("Scheme")) {
      if (typeAccumulator["Scheme"]) {
        typeAccumulator["Scheme"] += 1;
      } else {
        typeAccumulator["Scheme"] = 1;
      }
    }
    if (card.type.includes("Sorcery")) {
      if (typeAccumulator["Sorcery"]) {
        typeAccumulator["Sorcery"] += 1;
      } else {
        typeAccumulator["Sorcery"] = 1;
      }
    }
    return typeAccumulator;
  }, {});

  // Data object for color chart
  const typeData = [
    {
      id: "Artifact",
      label: "Artifact",
      value: typeCount["Artifact"] || 0,
    },
    {
      id: "Battle",
      label: "Battle",
      value: typeCount["Battle"] || 0,
    },
    {
      id: "Conspiracy",
      label: "Conspiracy",
      value: typeCount["Conspiracy"] || 0,
    },
    {
      id: "Creature",
      label: "Creature",
      value: typeCount["Creature"] || 0,
    },
    {
      id: "Dungeon",
      label: "Dungeon",
      value: typeCount["Dungeon"] || 0,
    },
    {
      id: "Enchantment",
      label: "Enchantment",
      value: typeCount["Enchantment"] || 0,
    },
    {
      id: "Instant",
      label: "Instant",
      value: typeCount["Instant"] || 0,
    },
    {
      id: "Kindred",
      label: "Kindred",
      value: typeCount["Kindred"] || 0,
    },
    {
      id: "Land",
      label: "Land",
      value: typeCount["Land"] || 0,
    },
    {
      id: "Planeswalker",
      label: "Planeswalker",
      value: typeCount["Planeswalker"] || 0,
    },
    {
      id: "Scheme",
      label: "Scheme",
      value: typeCount["Scheme"] || 0,
    },
    {
      id: "Sorcery",
      label: "Sorcery",
      value: typeCount["Sorcery"] || 0,
    },
  ];

  return typeData;
};
