// Helper functions
const randomInRange = (min, max, step = 1) => {
  return Math.round((Math.random() * (max - min) + min) / step) * step;
};

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Constants
const CONCRETE_DENSITY = 2400; // kg/m³
const STANDARD_MIX_PROPORTIONS = {
  M20: { cement: 320, water: 186, fineAgg: 700, coarseAgg: 1194 },
  M25: { cement: 350, water: 175, fineAgg: 676, coarseAgg: 1199 },
  M30: { cement: 380, water: 165, fineAgg: 652, coarseAgg: 1203 },
  M40: { cement: 430, water: 155, fineAgg: 628, coarseAgg: 1187 },
  M50: { cement: 480, water: 145, fineAgg: 604, coarseAgg: 1171 }
};

// Function to generate a single data point
const generateDataPoint = () => {
  const buildingArea = randomInRange(50, 1000, 50);
  const floorHeight = randomInRange(2.5, 4.0, 0.5);
  const numberOfFloors = randomInRange(1, 10);
  const structuralElementType = randomElement(['Beams', 'Columns', 'Slabs', 'Footings']);
  const loadType = randomElement(['Residential', 'Commercial', 'Industrial']);
  const liveLoad = randomInRange(2, 5, 0.5);
  const concreteGrade = randomElement(['M20', 'M25', 'M30', 'M40', 'M50']);
  const exposureCondition = randomElement(['Mild', 'Moderate', 'Severe', 'Very Severe', 'Extreme']);

  let elementDimensions;
  let concreteVolume;
  switch (structuralElementType) {
    case 'Beams':
      elementDimensions = `${randomInRange(200, 500, 50)}x${randomInRange(400, 800, 50)}`;
      concreteVolume = (parseInt(elementDimensions.split('x')[0]) / 1000) *
        (parseInt(elementDimensions.split('x')[1]) / 1000) *
        (buildingArea / 5);
      break;
    case 'Columns':
      elementDimensions = `${randomInRange(300, 600, 50)}x${randomInRange(300, 600, 50)}`;
      concreteVolume = (parseInt(elementDimensions.split('x')[0]) / 1000) *
        (parseInt(elementDimensions.split('x')[1]) / 1000) *
        floorHeight * (numberOfFloors + 1) *
        (buildingArea / 25);
      break;
    case 'Slabs':
      elementDimensions = `${randomInRange(100, 250, 25)}`;
      concreteVolume = (parseInt(elementDimensions) / 1000) * buildingArea * numberOfFloors;
      break;
    case 'Footings':
      elementDimensions = `${randomInRange(1000, 2000, 100)}x${randomInRange(1000, 2000, 100)}x${randomInRange(300, 600, 50)}`;
      concreteVolume = (parseInt(elementDimensions.split('x')[0]) / 1000) *
        (parseInt(elementDimensions.split('x')[1]) / 1000) *
        (parseInt(elementDimensions.split('x')[2]) / 1000) *
        (buildingArea / 25);
      break;
  }

  const mixProportion = STANDARD_MIX_PROPORTIONS[concreteGrade];
  const cementContent = mixProportion.cement;
  const waterCementRatio = mixProportion.water / mixProportion.cement;
  const fineAggregateContent = mixProportion.fineAgg;
  const coarseAggregateContent = mixProportion.coarseAgg;
  const admixtureDosage = randomInRange(0.5, 2.0, 0.1);

  const costPerM3 = cementContent * 0.1 + fineAggregateContent * 0.02 + coarseAggregateContent * 0.015 +
    admixtureDosage * cementContent * 0.5;
  const totalCost = costPerM3 * concreteVolume;

  return {
    buildingArea,
    floorHeight,
    numberOfFloors,
    structuralElementType,
    loadType,
    liveLoad,
    concreteGrade,
    exposureCondition,
    elementDimensions,
    concreteVolume: Math.round(concreteVolume * 100) / 100,
    cementContent,
    waterCementRatio: Math.round(waterCementRatio * 100) / 100,
    fineAggregateContent,
    coarseAggregateContent,
    admixtureDosage,
    costPerM3: Math.round(costPerM3 * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100
  };
};

// Function to generate dataset and display it
const generateAndDisplayDataset = () => {
  const dataset = [];
  for (let i = 0; i < 50; i++) {
    dataset.push(generateDataPoint());
  }
  document.getElementById('dataset').textContent = JSON.stringify(dataset, null, 2);
};
