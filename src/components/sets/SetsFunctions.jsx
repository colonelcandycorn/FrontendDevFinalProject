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
      value: colorCount["Colorless"] || 0,
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

  //Set up data for price distribution
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

  console.log(rarityCount);

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
