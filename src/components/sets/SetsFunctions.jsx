export const getColorData = (data) => {
  //Refine data for later use
  const { sets } = data || null;
  let { cards } = {};
  //   let latestPrices = {};
  if (sets && sets.length > 0) {
    cards = sets[0].cards || {};

    // latestPrices = cards.map(function (card) {
    //   return card.latestPrice?.price ?? 0;
    // });
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
      value: colorCount["Colorless"],
    },
    {
      id: "White",
      label: "White",
      value: colorCount["W"],
    },
    {
      id: "Blue",
      label: "Blue",
      value: colorCount["U"],
    },
    {
      id: "Black",
      label: "Black",
      value: colorCount["B"],
    },
    {
      id: "Red",
      label: "Red",
      value: colorCount["R"],
    },
    {
      id: "Green",
      label: "Green",
      value: colorCount["G"],
    },
  ];
  return colorData;
};
