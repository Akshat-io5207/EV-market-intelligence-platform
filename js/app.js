// Global Electric Vehicle Market & Technology Intelligence Platform
// Interactive Core Application Engine

// Global Data Store
window.EV_APP = {
  activeTab: 'scenario1',
  models: [],
  batteries: [],
  manufacturers: [],
  geography: [],
  filters: {
    category: 'ALL',
    batteryTech: 'ALL',
    country: 'ALL',
    search: '',
    sortBy: 'sales',
    sortOrder: 'desc'
  },
  simulatorState: {
    batteryCostReductionPct: 20,
    techCommercializationSpeed: 'baseline', // conservative, baseline, accelerated
    subsidyPolicyLevel: 'moderate', // low, moderate, aggressive
    gridCleanlinessPct: 55
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initData();
  setupNavigation();
  setupFilters();
  setupSimulator();
  renderActiveView();
  renderStatsRibbon();
});

function initData() {
  // Direct embedded fallback data so it works 100% offline and via file:// protocol
  window.EV_APP.models = [
    { id: "EV-001", modelName: "Model Y", manufacturer: "Tesla", category: "SUV", segment: "Premium", batteryTech: "NMC", batteryCapacityKwh: 75.0, drivingRangeKm: 533, efficiencyKwhPer100km: 15.5, chargingTimeMin10to80: 25, basePriceUsd: 44990, annualSalesVolume2025: 1285000, annualRevenueUsdM: 57812, salesGrowthYoY: 14.2, customerRating: 4.7, customerNetPromoterScore: 68, manufacturingCountry: "USA", co2EmbodiedKg: 11200, co2OperationalSavingsTonPerYear: 4.6 },
    { id: "EV-002", modelName: "Model 3 Highland", manufacturer: "Tesla", category: "Sedan", segment: "Mass-Premium", batteryTech: "LFP", batteryCapacityKwh: 60.0, drivingRangeKm: 513, efficiencyKwhPer100km: 13.2, chargingTimeMin10to80: 26, basePriceUsd: 38990, annualSalesVolume2025: 610000, annualRevenueUsdM: 23783, salesGrowthYoY: 8.5, customerRating: 4.6, customerNetPromoterScore: 64, manufacturingCountry: "China", co2EmbodiedKg: 9400, co2OperationalSavingsTonPerYear: 4.4 },
    { id: "EV-003", modelName: "Song Plus / Seal U", manufacturer: "BYD", category: "SUV", segment: "Mass", batteryTech: "LFP", batteryCapacityKwh: 71.8, drivingRangeKm: 520, efficiencyKwhPer100km: 15.1, chargingTimeMin10to80: 28, basePriceUsd: 27500, annualSalesVolume2025: 485000, annualRevenueUsdM: 13337, salesGrowthYoY: 28.4, customerRating: 4.6, customerNetPromoterScore: 62, manufacturingCountry: "China", co2EmbodiedKg: 8900, co2OperationalSavingsTonPerYear: 4.5 },
    { id: "EV-004", modelName: "Dolphin", manufacturer: "BYD", category: "Hatchback", segment: "Entry-Mass", batteryTech: "LFP", batteryCapacityKwh: 44.9, drivingRangeKm: 427, efficiencyKwhPer100km: 12.8, chargingTimeMin10to80: 29, basePriceUsd: 18900, annualSalesVolume2025: 395000, annualRevenueUsdM: 7465, salesGrowthYoY: 22.1, customerRating: 4.5, customerNetPromoterScore: 59, manufacturingCountry: "China", co2EmbodiedKg: 6400, co2OperationalSavingsTonPerYear: 3.8 },
    { id: "EV-005", modelName: "Seagull / Dolphin Mini", manufacturer: "BYD", category: "Hatchback", segment: "Entry", batteryTech: "Sodium-Ion", batteryCapacityKwh: 38.0, drivingRangeKm: 305, efficiencyKwhPer100km: 11.5, chargingTimeMin10to80: 30, basePriceUsd: 11500, annualSalesVolume2025: 440000, annualRevenueUsdM: 5060, salesGrowthYoY: 48.6, customerRating: 4.4, customerNetPromoterScore: 55, manufacturingCountry: "China", co2EmbodiedKg: 4800, co2OperationalSavingsTonPerYear: 3.2 },
    { id: "EV-006", modelName: "Han EV Flagship", manufacturer: "BYD", category: "Sedan", segment: "Premium", batteryTech: "LFP", batteryCapacityKwh: 85.4, drivingRangeKm: 610, efficiencyKwhPer100km: 15.6, chargingTimeMin10to80: 30, basePriceUsd: 36000, annualSalesVolume2025: 235000, annualRevenueUsdM: 8460, salesGrowthYoY: 12.0, customerRating: 4.7, customerNetPromoterScore: 65, manufacturingCountry: "China", co2EmbodiedKg: 10500, co2OperationalSavingsTonPerYear: 4.8 },
    { id: "EV-007", modelName: "ID.4 Pro", manufacturer: "Volkswagen Group", category: "SUV", segment: "Mass-Premium", batteryTech: "NMC", batteryCapacityKwh: 77.0, drivingRangeKm: 535, efficiencyKwhPer100km: 16.2, chargingTimeMin10to80: 28, basePriceUsd: 43900, annualSalesVolume2025: 215000, annualRevenueUsdM: 9438, salesGrowthYoY: 7.4, customerRating: 4.2, customerNetPromoterScore: 48, manufacturingCountry: "Germany", co2EmbodiedKg: 11800, co2OperationalSavingsTonPerYear: 4.5 },
    { id: "EV-008", modelName: "ID.3 Pure", manufacturer: "Volkswagen Group", category: "Hatchback", segment: "Mass", batteryTech: "LFP", batteryCapacityKwh: 52.0, drivingRangeKm: 388, efficiencyKwhPer100km: 14.8, chargingTimeMin10to80: 32, basePriceUsd: 32500, annualSalesVolume2025: 165000, annualRevenueUsdM: 5362, salesGrowthYoY: 11.2, customerRating: 4.1, customerNetPromoterScore: 45, manufacturingCountry: "Germany", co2EmbodiedKg: 8200, co2OperationalSavingsTonPerYear: 3.7 },
    { id: "EV-009", modelName: "Ioniq 5 AWD Long Range", manufacturer: "Hyundai-Kia", category: "SUV", segment: "Mass-Premium", batteryTech: "NMC", batteryCapacityKwh: 84.0, drivingRangeKm: 570, efficiencyKwhPer100km: 16.5, chargingTimeMin10to80: 18, basePriceUsd: 46500, annualSalesVolume2025: 178000, annualRevenueUsdM: 8277, salesGrowthYoY: 19.3, customerRating: 4.7, customerNetPromoterScore: 71, manufacturingCountry: "South Korea", co2EmbodiedKg: 11900, co2OperationalSavingsTonPerYear: 4.7 },
    { id: "EV-010", modelName: "EV6 GT-Line", manufacturer: "Hyundai-Kia", category: "SUV", segment: "Premium", batteryTech: "NMC", batteryCapacityKwh: 77.4, drivingRangeKm: 528, efficiencyKwhPer100km: 16.3, chargingTimeMin10to80: 18, basePriceUsd: 48900, annualSalesVolume2025: 132000, annualRevenueUsdM: 6454, salesGrowthYoY: 15.6, customerRating: 4.6, customerNetPromoterScore: 67, manufacturingCountry: "South Korea", co2EmbodiedKg: 11400, co2OperationalSavingsTonPerYear: 4.5 },
    { id: "EV-011", modelName: "Ioniq 6 Streamliner", manufacturer: "Hyundai-Kia", category: "Sedan", segment: "Mass-Premium", batteryTech: "NMC", batteryCapacityKwh: 77.4, drivingRangeKm: 614, efficiencyKwhPer100km: 13.9, chargingTimeMin10to80: 18, basePriceUsd: 43500, annualSalesVolume2025: 92000, annualRevenueUsdM: 4002, salesGrowthYoY: 21.0, customerRating: 4.5, customerNetPromoterScore: 63, manufacturingCountry: "South Korea", co2EmbodiedKg: 11000, co2OperationalSavingsTonPerYear: 4.9 },
    { id: "EV-012", modelName: "EX30 Compact", manufacturer: "Geely-Volvo", category: "SUV", segment: "Premium", batteryTech: "LFP", batteryCapacityKwh: 51.0, drivingRangeKm: 344, efficiencyKwhPer100km: 15.7, chargingTimeMin10to80: 26, basePriceUsd: 35900, annualSalesVolume2025: 145000, annualRevenueUsdM: 5205, salesGrowthYoY: 65.8, customerRating: 4.5, customerNetPromoterScore: 60, manufacturingCountry: "China", co2EmbodiedKg: 7600, co2OperationalSavingsTonPerYear: 3.6 },
    { id: "EV-013", modelName: "Zeekr 001 FR / LR", manufacturer: "Geely-Volvo", category: "Sedan", segment: "Luxury", batteryTech: "Solid-State", batteryCapacityKwh: 100.0, drivingRangeKm: 750, efficiencyKwhPer100km: 15.2, chargingTimeMin10to80: 15, basePriceUsd: 52000, annualSalesVolume2025: 84000, annualRevenueUsdM: 4368, salesGrowthYoY: 42.1, customerRating: 4.8, customerNetPromoterScore: 74, manufacturingCountry: "China", co2EmbodiedKg: 12500, co2OperationalSavingsTonPerYear: 5.4 },
    { id: "EV-014", modelName: "SU7 Max", manufacturer: "Xiaomi Auto", category: "Sedan", segment: "Premium", batteryTech: "NMC", batteryCapacityKwh: 101.0, drivingRangeKm: 800, efficiencyKwhPer100km: 14.1, chargingTimeMin10to80: 19, basePriceUsd: 42000, annualSalesVolume2025: 150000, annualRevenueUsdM: 6300, salesGrowthYoY: 95.0, customerRating: 4.8, customerNetPromoterScore: 76, manufacturingCountry: "China", co2EmbodiedKg: 13100, co2OperationalSavingsTonPerYear: 5.8 },
    { id: "EV-015", modelName: "i4 eDrive40 Gran Coupe", manufacturer: "BMW Group", category: "Sedan", segment: "Luxury", batteryTech: "NMC", batteryCapacityKwh: 83.9, drivingRangeKm: 590, efficiencyKwhPer100km: 16.1, chargingTimeMin10to80: 30, basePriceUsd: 57900, annualSalesVolume2025: 115000, annualRevenueUsdM: 6658, salesGrowthYoY: 18.5, customerRating: 4.6, customerNetPromoterScore: 66, manufacturingCountry: "Germany", co2EmbodiedKg: 12800, co2OperationalSavingsTonPerYear: 4.9 },
    { id: "EV-016", modelName: "iX3 / Neue Klasse SUV", manufacturer: "BMW Group", category: "SUV", segment: "Luxury", batteryTech: "NMC", batteryCapacityKwh: 80.0, drivingRangeKm: 520, efficiencyKwhPer100km: 17.5, chargingTimeMin10to80: 32, basePriceUsd: 62000, annualSalesVolume2025: 98000, annualRevenueUsdM: 6076, salesGrowthYoY: 14.0, customerRating: 4.5, customerNetPromoterScore: 61, manufacturingCountry: "Germany", co2EmbodiedKg: 12600, co2OperationalSavingsTonPerYear: 4.5 },
    { id: "EV-017", modelName: "EQE 350+ SUV", manufacturer: "Mercedes-Benz", category: "SUV", segment: "Luxury", batteryTech: "NCA", batteryCapacityKwh: 90.6, drivingRangeKm: 590, efficiencyKwhPer100km: 17.8, chargingTimeMin10to80: 31, basePriceUsd: 77900, annualSalesVolume2025: 74000, annualRevenueUsdM: 5764, salesGrowthYoY: 9.2, customerRating: 4.5, customerNetPromoterScore: 58, manufacturingCountry: "Germany", co2EmbodiedKg: 14200, co2OperationalSavingsTonPerYear: 4.8 },
    { id: "EV-018", modelName: "MG4 EV Standard", manufacturer: "SAIC Motor", category: "Hatchback", segment: "Mass", batteryTech: "LFP", batteryCapacityKwh: 51.0, drivingRangeKm: 350, efficiencyKwhPer100km: 16.0, chargingTimeMin10to80: 35, basePriceUsd: 28500, annualSalesVolume2025: 155000, annualRevenueUsdM: 4417, salesGrowthYoY: 24.3, customerRating: 4.4, customerNetPromoterScore: 54, manufacturingCountry: "China", co2EmbodiedKg: 7400, co2OperationalSavingsTonPerYear: 3.6 },
    { id: "EV-019", modelName: "Peugeot e-208 / e-2008", manufacturer: "Stellantis", category: "Hatchback", segment: "Mass", batteryTech: "NMC", batteryCapacityKwh: 54.0, drivingRangeKm: 410, efficiencyKwhPer100km: 14.5, chargingTimeMin10to80: 30, basePriceUsd: 33900, annualSalesVolume2025: 142000, annualRevenueUsdM: 4813, salesGrowthYoY: 8.0, customerRating: 4.2, customerNetPromoterScore: 46, manufacturingCountry: "Spain", co2EmbodiedKg: 8600, co2OperationalSavingsTonPerYear: 3.7 },
    { id: "EV-020", modelName: "Fiat 500e", manufacturer: "Stellantis", category: "Hatchback", segment: "Entry-Mass", batteryTech: "NMC", batteryCapacityKwh: 42.0, drivingRangeKm: 320, efficiencyKwhPer100km: 14.0, chargingTimeMin10to80: 35, basePriceUsd: 29000, annualSalesVolume2025: 88000, annualRevenueUsdM: 2552, salesGrowthYoY: -4.2, customerRating: 4.1, customerNetPromoterScore: 42, manufacturingCountry: "Italy", co2EmbodiedKg: 6900, co2OperationalSavingsTonPerYear: 3.1 },
    { id: "EV-021", modelName: "Mustang Mach-E Ext", manufacturer: "Ford", category: "SUV", segment: "Mass-Premium", batteryTech: "NMC", batteryCapacityKwh: 91.0, drivingRangeKm: 490, efficiencyKwhPer100km: 19.5, chargingTimeMin10to80: 36, basePriceUsd: 49500, annualSalesVolume2025: 96000, annualRevenueUsdM: 4752, salesGrowthYoY: 6.8, customerRating: 4.4, customerNetPromoterScore: 56, manufacturingCountry: "Mexico", co2EmbodiedKg: 13800, co2OperationalSavingsTonPerYear: 4.3 },
    { id: "EV-022", modelName: "R1S Adventure SUV", manufacturer: "Rivian", category: "SUV", segment: "Luxury", batteryTech: "NCA", batteryCapacityKwh: 135.0, drivingRangeKm: 643, efficiencyKwhPer100km: 23.5, chargingTimeMin10to80: 38, basePriceUsd: 75900, annualSalesVolume2025: 46000, annualRevenueUsdM: 3491, salesGrowthYoY: 28.5, customerRating: 4.7, customerNetPromoterScore: 73, manufacturingCountry: "USA", co2EmbodiedKg: 19800, co2OperationalSavingsTonPerYear: 5.1 },
    { id: "EV-023", modelName: "R1T Quad Truck", manufacturer: "Rivian", category: "Truck", segment: "Commercial-Luxury", batteryTech: "NCA", batteryCapacityKwh: 141.0, drivingRangeKm: 610, efficiencyKwhPer100km: 25.0, chargingTimeMin10to80: 40, basePriceUsd: 79000, annualSalesVolume2025: 38000, annualRevenueUsdM: 3002, salesGrowthYoY: 14.5, customerRating: 4.7, customerNetPromoterScore: 72, manufacturingCountry: "USA", co2EmbodiedKg: 20900, co2OperationalSavingsTonPerYear: 6.2 },
    { id: "EV-024", modelName: "Cybertruck AWD", manufacturer: "Tesla", category: "Truck", segment: "Commercial-Luxury", batteryTech: "NMC", batteryCapacityKwh: 123.0, drivingRangeKm: 547, efficiencyKwhPer100km: 24.2, chargingTimeMin10to80: 34, basePriceUsd: 79990, annualSalesVolume2025: 65000, annualRevenueUsdM: 5199, salesGrowthYoY: 85.0, customerRating: 4.3, customerNetPromoterScore: 51, manufacturingCountry: "USA", co2EmbodiedKg: 18500, co2OperationalSavingsTonPerYear: 6.1 },
    { id: "EV-025", modelName: "F-150 Lightning Pro", manufacturer: "Ford", category: "Truck", segment: "Commercial", batteryTech: "NMC", batteryCapacityKwh: 131.0, drivingRangeKm: 515, efficiencyKwhPer100km: 27.2, chargingTimeMin10to80: 41, basePriceUsd: 54990, annualSalesVolume2025: 42000, annualRevenueUsdM: 2309, salesGrowthYoY: 11.2, customerRating: 4.4, customerNetPromoterScore: 57, manufacturingCountry: "USA", co2EmbodiedKg: 19400, co2OperationalSavingsTonPerYear: 6.4 },
    { id: "EV-026", modelName: "Tesla Semi Long Range", manufacturer: "Tesla", category: "Truck", segment: "Commercial", batteryTech: "NMC", batteryCapacityKwh: 750.0, drivingRangeKm: 805, efficiencyKwhPer100km: 105.0, chargingTimeMin10to80: 30, basePriceUsd: 250000, annualSalesVolume2025: 3800, annualRevenueUsdM: 950, salesGrowthYoY: 140.0, customerRating: 4.6, customerNetPromoterScore: 68, manufacturingCountry: "USA", co2EmbodiedKg: 82000, co2OperationalSavingsTonPerYear: 85.0 },
    { id: "EV-027", modelName: "FH Electric Heavy Duty", manufacturer: "Volvo Trucks", category: "Truck", segment: "Commercial", batteryTech: "NMC", batteryCapacityKwh: 540.0, drivingRangeKm: 380, efficiencyKwhPer100km: 125.0, chargingTimeMin10to80: 90, basePriceUsd: 320000, annualSalesVolume2025: 5200, annualRevenueUsdM: 1664, salesGrowthYoY: 48.0, customerRating: 4.7, customerNetPromoterScore: 70, manufacturingCountry: "Sweden", co2EmbodiedKg: 61000, co2OperationalSavingsTonPerYear: 92.0 },
    { id: "EV-028", modelName: "eActros 600 Long-Haul", manufacturer: "Mercedes-Benz Trucks", category: "Truck", segment: "Commercial", batteryTech: "LFP", batteryCapacityKwh: 621.0, drivingRangeKm: 500, efficiencyKwhPer100km: 118.0, chargingTimeMin10to80: 30, basePriceUsd: 340000, annualSalesVolume2025: 4100, annualRevenueUsdM: 1394, salesGrowthYoY: 110.0, customerRating: 4.8, customerNetPromoterScore: 75, manufacturingCountry: "Germany", co2EmbodiedKg: 58000, co2OperationalSavingsTonPerYear: 94.0 },
    { id: "EV-029", modelName: "K9 Pure City Bus", manufacturer: "BYD", category: "Bus", segment: "Commercial", batteryTech: "LFP", batteryCapacityKwh: 422.0, drivingRangeKm: 370, efficiencyKwhPer100km: 95.0, chargingTimeMin10to80: 120, basePriceUsd: 420000, annualSalesVolume2025: 14200, annualRevenueUsdM: 5964, salesGrowthYoY: 26.5, customerRating: 4.6, customerNetPromoterScore: 65, manufacturingCountry: "China", co2EmbodiedKg: 44000, co2OperationalSavingsTonPerYear: 72.0 },
    { id: "EV-030", modelName: "E12 Ultra Clean Bus", manufacturer: "Yutong Bus", category: "Bus", segment: "Commercial", batteryTech: "LFP", batteryCapacityKwh: 422.0, drivingRangeKm: 385, efficiencyKwhPer100km: 92.0, chargingTimeMin10to80: 110, basePriceUsd: 395000, annualSalesVolume2025: 16800, annualRevenueUsdM: 6636, salesGrowthYoY: 21.0, customerRating: 4.6, customerNetPromoterScore: 64, manufacturingCountry: "China", co2EmbodiedKg: 42500, co2OperationalSavingsTonPerYear: 74.5 },
    { id: "EV-031", modelName: "7900 Electric Articulated", manufacturer: "Volvo Group", category: "Bus", segment: "Commercial", batteryTech: "NMC", batteryCapacityKwh: 560.0, drivingRangeKm: 320, efficiencyKwhPer100km: 135.0, chargingTimeMin10to80: 45, basePriceUsd: 580000, annualSalesVolume2025: 3200, annualRevenueUsdM: 1856, salesGrowthYoY: 18.0, customerRating: 4.5, customerNetPromoterScore: 62, manufacturingCountry: "Sweden", co2EmbodiedKg: 63000, co2OperationalSavingsTonPerYear: 88.0 },
    { id: "EV-032", modelName: "Urbino 12 Electric", manufacturer: "Solaris", category: "Bus", segment: "Commercial", batteryTech: "LFP", batteryCapacityKwh: 520.0, drivingRangeKm: 360, efficiencyKwhPer100km: 110.0, chargingTimeMin10to80: 60, basePriceUsd: 475000, annualSalesVolume2025: 4100, annualRevenueUsdM: 1947, salesGrowthYoY: 24.0, customerRating: 4.5, customerNetPromoterScore: 63, manufacturingCountry: "Poland", co2EmbodiedKg: 51000, co2OperationalSavingsTonPerYear: 76.0 },
    { id: "EV-033", modelName: "S1 Pro Gen 2", manufacturer: "Ola Electric", category: "Two-Wheeler", segment: "Mass", batteryTech: "NMC", batteryCapacityKwh: 4.0, drivingRangeKm: 180, efficiencyKwhPer100km: 2.4, chargingTimeMin10to80: 70, basePriceUsd: 1650, annualSalesVolume2025: 360000, annualRevenueUsdM: 594, salesGrowthYoY: 34.0, customerRating: 4.1, customerNetPromoterScore: 48, manufacturingCountry: "India", co2EmbodiedKg: 490, co2OperationalSavingsTonPerYear: 0.85 },
    { id: "EV-034", modelName: "450 Apex / 450X", manufacturer: "Ather Energy", category: "Two-Wheeler", segment: "Premium", batteryTech: "NMC", batteryCapacityKwh: 3.7, drivingRangeKm: 150, efficiencyKwhPer100km: 2.5, chargingTimeMin10to80: 45, basePriceUsd: 1950, annualSalesVolume2025: 145000, annualRevenueUsdM: 282, salesGrowthYoY: 29.5, customerRating: 4.7, customerNetPromoterScore: 73, manufacturingCountry: "India", co2EmbodiedKg: 470, co2OperationalSavingsTonPerYear: 0.82 },
    { id: "EV-035", modelName: "Nexon EV Max / 45", manufacturer: "Tata Motors", category: "SUV", segment: "Mass", batteryTech: "LFP", batteryCapacityKwh: 45.0, drivingRangeKm: 489, efficiencyKwhPer100km: 11.8, chargingTimeMin10to80: 40, basePriceUsd: 18500, annualSalesVolume2025: 78000, annualRevenueUsdM: 1443, salesGrowthYoY: 31.0, customerRating: 4.4, customerNetPromoterScore: 58, manufacturingCountry: "India", co2EmbodiedKg: 6300, co2OperationalSavingsTonPerYear: 3.6 },
    { id: "EV-036", modelName: "MQi GT EVO", manufacturer: "NIU Technologies", category: "Two-Wheeler", segment: "Mass-Premium", batteryTech: "LFP", batteryCapacityKwh: 3.74, drivingRangeKm: 100, efficiencyKwhPer100km: 2.8, chargingTimeMin10to80: 80, basePriceUsd: 3800, annualSalesVolume2025: 210000, annualRevenueUsdM: 798, salesGrowthYoY: 18.0, customerRating: 4.3, customerNetPromoterScore: 52, manufacturingCountry: "China", co2EmbodiedKg: 440, co2OperationalSavingsTonPerYear: 0.78 },
    { id: "EV-037", modelName: "SR/F Naked Street", manufacturer: "Zero Motorcycles", category: "Two-Wheeler", segment: "Luxury", batteryTech: "NMC", batteryCapacityKwh: 17.3, drivingRangeKm: 272, efficiencyKwhPer100km: 6.2, chargingTimeMin10to80: 60, basePriceUsd: 20495, annualSalesVolume2025: 12500, annualRevenueUsdM: 256, salesGrowthYoY: 16.5, customerRating: 4.7, customerNetPromoterScore: 69, manufacturingCountry: "USA", co2EmbodiedKg: 2100, co2OperationalSavingsTonPerYear: 1.25 },
    { id: "EV-038", modelName: "EM1 e: Urban Moped", manufacturer: "Honda", category: "Two-Wheeler", segment: "Entry", batteryTech: "LFP", batteryCapacityKwh: 1.47, drivingRangeKm: 48, efficiencyKwhPer100km: 2.2, chargingTimeMin10to80: 95, basePriceUsd: 2400, annualSalesVolume2025: 185000, annualRevenueUsdM: 444, salesGrowthYoY: 54.0, customerRating: 4.3, customerNetPromoterScore: 50, manufacturingCountry: "Japan", co2EmbodiedKg: 210, co2OperationalSavingsTonPerYear: 0.52 },
    { id: "EV-039", modelName: "ES6 Smart SUV", manufacturer: "NIO", category: "SUV", segment: "Luxury", batteryTech: "Solid-State", batteryCapacityKwh: 150.0, drivingRangeKm: 930, efficiencyKwhPer100km: 17.2, chargingTimeMin10to80: 18, basePriceUsd: 56000, annualSalesVolume2025: 82000, annualRevenueUsdM: 4592, salesGrowthYoY: 36.5, customerRating: 4.9, customerNetPromoterScore: 79, manufacturingCountry: "China", co2EmbodiedKg: 16500, co2OperationalSavingsTonPerYear: 6.0 },
    { id: "EV-040", modelName: "G6 Ultra Smart Coupe", manufacturer: "XPeng", category: "SUV", segment: "Mass-Premium", batteryTech: "NMC", batteryCapacityKwh: 87.5, drivingRangeKm: 570, efficiencyKwhPer100km: 14.8, chargingTimeMin10to80: 16, basePriceUsd: 33000, annualSalesVolume2025: 115000, annualRevenueUsdM: 3795, salesGrowthYoY: 52.0, customerRating: 4.6, customerNetPromoterScore: 66, manufacturingCountry: "China", co2EmbodiedKg: 11500, co2OperationalSavingsTonPerYear: 4.8 },
    { id: "EV-041", modelName: "e-tron GT Quattro", manufacturer: "Volkswagen Group", category: "Sedan", segment: "Luxury", batteryTech: "NMC", batteryCapacityKwh: 93.4, drivingRangeKm: 488, efficiencyKwhPer100km: 19.9, chargingTimeMin10to80: 21, basePriceUsd: 106500, annualSalesVolume2025: 18500, annualRevenueUsdM: 1970, salesGrowthYoY: 5.4, customerRating: 4.6, customerNetPromoterScore: 64, manufacturingCountry: "Germany", co2EmbodiedKg: 15200, co2OperationalSavingsTonPerYear: 4.7 },
    { id: "EV-042", modelName: "Taycan Turbo S", manufacturer: "Volkswagen Group", category: "Sedan", segment: "Luxury", batteryTech: "NMC", batteryCapacityKwh: 97.0, drivingRangeKm: 590, efficiencyKwhPer100km: 18.2, chargingTimeMin10to80: 18, basePriceUsd: 195000, annualSalesVolume2025: 22000, annualRevenueUsdM: 4290, salesGrowthYoY: 12.0, customerRating: 4.8, customerNetPromoterScore: 77, manufacturingCountry: "Germany", co2EmbodiedKg: 16400, co2OperationalSavingsTonPerYear: 5.1 },
    { id: "EV-043", modelName: "Wuling Hongguang Mini", manufacturer: "SAIC-GM-Wuling", category: "Hatchback", segment: "Entry", batteryTech: "Sodium-Ion", batteryCapacityKwh: 17.3, drivingRangeKm: 170, efficiencyKwhPer100km: 9.8, chargingTimeMin10to80: 45, basePriceUsd: 5200, annualSalesVolume2025: 380000, annualRevenueUsdM: 1976, salesGrowthYoY: 16.0, customerRating: 4.0, customerNetPromoterScore: 38, manufacturingCountry: "China", co2EmbodiedKg: 2500, co2OperationalSavingsTonPerYear: 2.1 },
    { id: "EV-044", modelName: "Ariya e-4ORCE", manufacturer: "Nissan", category: "SUV", segment: "Mass-Premium", batteryTech: "NMC", batteryCapacityKwh: 87.0, drivingRangeKm: 500, efficiencyKwhPer100km: 18.1, chargingTimeMin10to80: 35, basePriceUsd: 43500, annualSalesVolume2025: 58000, annualRevenueUsdM: 2523, salesGrowthYoY: 14.8, customerRating: 4.3, customerNetPromoterScore: 51, manufacturingCountry: "Japan", co2EmbodiedKg: 12400, co2OperationalSavingsTonPerYear: 4.4 },
    { id: "EV-045", modelName: "bZ4X AWD", manufacturer: "Toyota", category: "SUV", segment: "Mass-Premium", batteryTech: "NMC", batteryCapacityKwh: 71.4, drivingRangeKm: 416, efficiencyKwhPer100km: 17.8, chargingTimeMin10to80: 38, basePriceUsd: 44400, annualSalesVolume2025: 62000, annualRevenueUsdM: 2752, salesGrowthYoY: 28.0, customerRating: 4.1, customerNetPromoterScore: 40, manufacturingCountry: "Japan", co2EmbodiedKg: 11200, co2OperationalSavingsTonPerYear: 4.1 }
  ];

  window.EV_APP.batteries = [
    { id: "LFP", name: "Lithium Iron Phosphate (LiFePO4)", marketShare2025: 43.5, costPerKwhUsd: 78, cellEnergyDensityWhKg: 195, packEnergyDensityWhKg: 155, volumetricDensityWhL: 380, cycleLifeTo80: 4200, thermalRunawayTempC: 270, fastChargingMin: 25, lowTempRetentionPct: 68, embodiedCo2Kg: 62, rawMaterialRisk: "Low (No Cobalt/Nickel)", keyProducers: "CATL, BYD (Blade), Gotion, CALB" },
    { id: "NMC", name: "Nickel Manganese Cobalt (NMC 811)", marketShare2025: 44.0, costPerKwhUsd: 112, cellEnergyDensityWhKg: 285, packEnergyDensityWhKg: 225, volumetricDensityWhL: 620, cycleLifeTo80: 2200, thermalRunawayTempC: 210, fastChargingMin: 18, lowTempRetentionPct: 84, embodiedCo2Kg: 88, rawMaterialRisk: "High (Cobalt, High Nickel)", keyProducers: "LG Energy, CATL, Samsung SDI, SK On" },
    { id: "NCA", name: "Nickel Cobalt Aluminum (NCA)", marketShare2025: 6.5, costPerKwhUsd: 125, cellEnergyDensityWhKg: 295, packEnergyDensityWhKg: 235, volumetricDensityWhL: 650, cycleLifeTo80: 1800, thermalRunawayTempC: 195, fastChargingMin: 20, lowTempRetentionPct: 82, embodiedCo2Kg: 96, rawMaterialRisk: "High (Cobalt & Nickel reliance)", keyProducers: "Panasonic, Samsung SDI" },
    { id: "Sodium-Ion", name: "Sodium-Ion (Na-ion)", marketShare2025: 4.2, costPerKwhUsd: 52, cellEnergyDensityWhKg: 160, packEnergyDensityWhKg: 125, volumetricDensityWhL: 300, cycleLifeTo80: 3800, thermalRunawayTempC: 310, fastChargingMin: 15, lowTempRetentionPct: 92, embodiedCo2Kg: 41, rawMaterialRisk: "Extremely Low (Abundant Salt/Iron)", keyProducers: "CATL, HiNa Battery, BYD, Faradion" },
    { id: "Solid-State", name: "All-Solid-State (SSB)", marketShare2025: 1.8, costPerKwhUsd: 175, cellEnergyDensityWhKg: 420, packEnergyDensityWhKg: 340, volumetricDensityWhL: 820, cycleLifeTo80: 2600, thermalRunawayTempC: 400, fastChargingMin: 12, lowTempRetentionPct: 88, embodiedCo2Kg: 79, rawMaterialRisk: "Moderate (Lithium metal / Sulfides)", keyProducers: "WeLion, QuantumScape, Toyota JV, Factorial" }
  ];

  window.EV_APP.manufacturers = [
    { name: "BYD", hq: "China", salesUnits: 3020000, marketSharePct: 21.4, revenueM: 62500, growthPct: 28.2, grossMarginPct: 22.8, dominantTech: "LFP (94%)", integrationIdx: 92, rating: 4.56 },
    { name: "Tesla", hq: "USA", salesUnits: 1960000, marketSharePct: 13.9, revenueM: 86800, growthPct: 11.4, grossMarginPct: 18.5, dominantTech: "NMC (55%) / LFP (42%)", integrationIdx: 85, rating: 4.55 },
    { name: "Volkswagen Group", hq: "Germany", salesUnits: 980000, marketSharePct: 6.9, revenueM: 41200, growthPct: 9.5, grossMarginPct: 14.2, dominantTech: "NMC (72%) / LFP (28%)", integrationIdx: 64, rating: 4.34 },
    { name: "Geely Group", hq: "China/Sweden", salesUnits: 920000, marketSharePct: 6.5, revenueM: 32800, growthPct: 44.0, grossMarginPct: 16.5, dominantTech: "LFP (52%) / NMC (44%)", integrationIdx: 76, rating: 4.60 },
    { name: "SAIC Motor", hq: "China", salesUnits: 880000, marketSharePct: 6.2, revenueM: 19600, growthPct: 19.4, grossMarginPct: 12.1, dominantTech: "LFP (65%) / Na-ion (22%)", integrationIdx: 68, rating: 4.22 },
    { name: "Hyundai-Kia", hq: "South Korea", salesUnits: 640000, marketSharePct: 4.5, revenueM: 26900, growthPct: 18.5, grossMarginPct: 15.8, dominantTech: "NMC (86%) / LFP (14%)", integrationIdx: 70, rating: 4.60 },
    { name: "Stellantis", hq: "EU/US", salesUnits: 490000, marketSharePct: 3.5, revenueM: 17800, growthPct: 6.8, grossMarginPct: 13.5, dominantTech: "NMC (68%) / LFP (32%)", integrationIdx: 55, rating: 4.17 },
    { name: "BMW Group", hq: "Germany", salesUnits: 435000, marketSharePct: 3.1, revenueM: 24200, growthPct: 16.2, grossMarginPct: 17.8, dominantTech: "NMC (94%)", integrationIdx: 62, rating: 4.57 }
  ];

  window.EV_APP.geography = [
    { country: "China", sharePct: 59.8, units2025: 8450000, batteryCellShare: 74.2, gridIntensity: 530, costIndex: 65, exports: 1650000 },
    { country: "Europe (EU+UK)", sharePct: 16.6, units2025: 2350000, batteryCellShare: 9.5, gridIntensity: 240, costIndex: 125, exports: 380000 },
    { country: "United States", sharePct: 12.9, units2025: 1820000, batteryCellShare: 8.1, gridIntensity: 375, costIndex: 115, exports: 220000 },
    { country: "South Korea", sharePct: 4.0, units2025: 560000, batteryCellShare: 5.4, gridIntensity: 415, costIndex: 95, exports: 410000 },
    { country: "India", sharePct: 4.1, units2025: 580000, batteryCellShare: 0.7, gridIntensity: 630, costIndex: 55, exports: 75000 },
    { country: "Japan", sharePct: 2.8, units2025: 390000, batteryCellShare: 2.1, gridIntensity: 460, costIndex: 98, exports: 190000 }
  ];
}

function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('active', 'border-blue-600', 'text-blue-600'));
      tab.classList.add('active', 'border-blue-600', 'text-blue-600');
      window.EV_APP.activeTab = tab.getAttribute('data-tab');
      renderActiveView();
    });
  });
}

function renderStatsRibbon() {
  const models = window.EV_APP.models;
  const totalVolume = models.reduce((acc, m) => acc + m.annualSalesVolume2025, 0);
  const totalRevenueB = (models.reduce((acc, m) => acc + m.annualRevenueUsdM, 0) / 1000).toFixed(1);
  const avgRange = Math.round(models.reduce((acc, m) => acc + m.drivingRangeKm, 0) / models.length);
  const totalCo2SavedM = (models.reduce((acc, m) => acc + (m.annualSalesVolume2025 * m.co2OperationalSavingsTonPerYear), 0) / 1000000).toFixed(1);

  const ribbonEl = document.getElementById('stats-ribbon');
  if (!ribbonEl) return;

  ribbonEl.innerHTML = `
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <div class="glass-panel p-3 rounded-lg border-l-4 border-blue-500">
        <span class="text-xs text-slate-500 font-medium">Analyzed EV Models</span>
        <div class="text-xl font-bold text-slate-800">${models.length} <span class="text-xs font-normal text-slate-500">vehicles</span></div>
        <span class="text-[11px] text-emerald-600 font-medium">6 Categories</span>
      </div>
      <div class="glass-panel p-3 rounded-lg border-l-4 border-indigo-500">
        <span class="text-xs text-slate-500 font-medium">Dataset Sales Volume</span>
        <div class="text-xl font-bold text-slate-800">${(totalVolume / 1000000).toFixed(2)}M <span class="text-xs font-normal text-slate-500">units</span></div>
        <span class="text-[11px] text-emerald-600 font-medium">+24.8% YoY</span>
      </div>
      <div class="glass-panel p-3 rounded-lg border-l-4 border-emerald-500">
        <span class="text-xs text-slate-500 font-medium">Annual EV Revenue</span>
        <div class="text-xl font-bold text-slate-800">$${totalRevenueB}B</div>
        <span class="text-[11px] text-emerald-600 font-medium">Gross Margin 18.2%</span>
      </div>
      <div class="glass-panel p-3 rounded-lg border-l-4 border-amber-500">
        <span class="text-xs text-slate-500 font-medium">Fleet Mean Range</span>
        <div class="text-xl font-bold text-slate-800">${avgRange} km</div>
        <span class="text-[11px] text-slate-500">WLTP/EPA Combined</span>
      </div>
      <div class="glass-panel p-3 rounded-lg border-l-4 border-purple-500">
        <span class="text-xs text-slate-500 font-medium">LFP Market Share</span>
        <div class="text-xl font-bold text-slate-800">43.5%</div>
        <span class="text-[11px] text-emerald-600 font-medium">Surging in Mass & Com.</span>
      </div>
      <div class="glass-panel p-3 rounded-lg border-l-4 border-teal-500">
        <span class="text-xs text-slate-500 font-medium">CO2 Abatement</span>
        <div class="text-xl font-bold text-slate-800">${totalCo2SavedM} Mt <span class="text-xs font-normal text-slate-500">/yr</span></div>
        <span class="text-[11px] text-teal-600 font-medium">Clean Air Impact</span>
      </div>
    </div>
  `;
}

function renderActiveView() {
  const container = document.getElementById('view-container');
  if (!container) return;

  switch (window.EV_APP.activeTab) {
    case 'scenario1':
      renderScenario1View(container);
      break;
    case 'scenario2':
      renderScenario2View(container);
      break;
    case 'scenario3':
      renderScenario3View(container);
      break;
    case 'explorer':
      renderExplorerView(container);
      break;
    case 'simulator':
      renderSimulatorView(container);
      break;
    default:
      renderScenario1View(container);
  }
}

// -------------------------------------------------------------
// SCENARIO 1: Emily Johnson (Market Strategy Director)
// -------------------------------------------------------------
function renderScenario1View(container) {
  // Aggregate sales and revenue by Category
  const categories = ['SUV', 'Sedan', 'Hatchback', 'Bus', 'Truck', 'Two-Wheeler'];
  const catStats = categories.map(cat => {
    const list = window.EV_APP.models.filter(m => m.category === cat);
    const volume = list.reduce((a, b) => a + b.annualSalesVolume2025, 0);
    const revenue = list.reduce((a, b) => a + b.annualRevenueUsdM, 0);
    const avgRange = Math.round(list.reduce((a, b) => a + b.drivingRangeKm, 0) / (list.length || 1));
    const avgCsat = (list.reduce((a, b) => a + b.customerRating, 0) / (list.length || 1)).toFixed(2);
    const avgGrowth = (list.reduce((a, b) => a + b.salesGrowthYoY, 0) / (list.length || 1)).toFixed(1);
    return { category: cat, volume, revenue, avgRange, avgCsat, avgGrowth, count: list.length };
  });

  const totalRev = catStats.reduce((a, b) => a + b.revenue, 0);

  // SVG Chart for Revenue share
  let currentAngle = 0;
  const colors = ['#2563eb', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  const svgSlices = catStats.map((item, idx) => {
    const share = item.revenue / totalRev;
    const strokeDash = `${(share * 314).toFixed(1)} 314`;
    const strokeOffset = (-currentAngle * 314).toFixed(1);
    currentAngle += share;
    return `
      <circle cx="60" cy="60" r="50" fill="transparent" stroke="${colors[idx]}" stroke-width="20"
        stroke-dasharray="${strokeDash}" stroke-dashoffset="${strokeOffset}" class="chart-circle">
        <title>${item.category}: $${(item.revenue / 1000).toFixed(1)}B (${(share * 100).toFixed(1)}%)</title>
      </circle>
    `;
  }).join('');

  // Range Comparison Bars
  const maxRange = Math.max(...catStats.map(c => c.avgRange));
  const rangeBarsHtml = catStats.map((c, i) => {
    const widthPct = Math.round((c.avgRange / maxRange) * 100);
    return `
      <div class="mb-3">
        <div class="flex justify-between text-xs mb-1">
          <span class="font-medium text-slate-700">${c.category} (${c.count} models)</span>
          <span class="font-semibold text-blue-700">${c.avgRange} km <span class="text-slate-500 font-normal">| CSAT: ${c.avgCsat}/5</span></span>
        </div>
        <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
          <div class="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-700" style="width: ${widthPct}%"></div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Persona Header Banner -->
      <div class="glass-panel p-5 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="bg-blue-500 text-xs uppercase px-2.5 py-0.5 rounded-full font-bold tracking-wider">Scenario 1</span>
            <h2 class="text-xl font-bold">Emily Johnson — EV Market Strategy Director</h2>
          </div>
          <p class="text-blue-200 text-sm mt-1 max-w-3xl">
            Portfolio optimization dashboard: Evaluating category revenue contribution, driving range across product tiers, battery chemistry adoption, and high-growth segments to support strategic expansion and launch cadence.
          </p>
        </div>
        <button onclick="window.EV_APP.activeTab='simulator'; setupSimulator(); renderActiveView();" 
          class="bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition">
          Launch Portfolio Simulator &rarr;
        </button>
      </div>

      <!-- Strategic Insight Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="glass-panel p-4 rounded-xl border-t-4 border-blue-600">
          <span class="text-xs font-semibold text-blue-600 uppercase">Primary Revenue Driver</span>
          <h3 class="text-lg font-bold text-slate-800 mt-1">Electric SUVs (58.4% Revenue)</h3>
          <p class="text-xs text-slate-600 mt-2">
            SUVs dominate both sales volume and corporate margin. Tesla Model Y, BYD Song Plus, and Hyundai Ioniq 5 set the global benchmark. Strategy recommendation: prioritize next-gen midsize electric crossovers with 800V fast-charging.
          </p>
        </div>

        <div class="glass-panel p-4 rounded-xl border-t-4 border-emerald-600">
          <span class="text-xs font-semibold text-emerald-600 uppercase">Fastest Growth Segment</span>
          <h3 class="text-lg font-bold text-slate-800 mt-1">Affordable LFP & Sodium-Ion (+48.6%)</h3>
          <p class="text-xs text-slate-600 mt-2">
            Entry hatchbacks (BYD Seagull, Dolphin, Wuling) and commercial long-haul trucks (+110%) are the fastest expanding tiers. High consumer price elasticity demands sub-$20k platforms powered by Sodium-ion and localized LFP.
          </p>
        </div>

        <div class="glass-panel p-4 rounded-xl border-t-4 border-purple-600">
          <span class="text-xs font-semibold text-purple-600 uppercase">Range & CSAT Correlation</span>
          <h3 class="text-lg font-bold text-slate-800 mt-1">500km+ WLTP Sweet Spot (CSAT 4.68)</h3>
          <p class="text-xs text-slate-600 mt-2">
            Customer satisfaction peaks when vehicles cross the 500 km range threshold and 20-min 10-80% charge speed. Beyond 650km, incremental CSAT gains diminish while battery cost/weight penalize vehicle agility.
          </p>
        </div>
      </div>

      <!-- Category Performance & Range Analysis -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Revenue Share Donut & Breakdown -->
        <div class="glass-panel p-5 rounded-xl lg:col-span-5">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-slate-800 text-sm">Vehicle Category Revenue Breakdown ($B)</h3>
            <span class="text-xs text-slate-500 font-medium">Total: $${(totalRev / 1000).toFixed(1)}B</span>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-6">
            <div class="relative w-36 h-36 flex-shrink-0">
              <svg viewBox="0 0 120 120" class="w-full h-full transform -rotate-90">
                ${svgSlices}
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span class="text-xs text-slate-400">Top Tier</span>
                <span class="text-sm font-bold text-slate-800">SUV</span>
              </div>
            </div>
            <div class="w-full space-y-1.5 text-xs">
              ${catStats.map((c, i) => `
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${colors[i]}"></span>
                    <span class="text-slate-700 font-medium">${c.category}</span>
                  </div>
                  <div class="text-right">
                    <span class="font-bold text-slate-800">$${(c.revenue / 1000).toFixed(1)}B</span>
                    <span class="text-slate-400 ml-1">(${(c.revenue / totalRev * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Driving Range & CSAT Benchmark -->
        <div class="glass-panel p-5 rounded-xl lg:col-span-7">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h3 class="font-bold text-slate-800 text-sm">Driving Range Benchmarking Across Categories</h3>
              <p class="text-xs text-slate-500">Fleet average real-world driving range (km) vs customer satisfaction rating</p>
            </div>
            <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded font-medium">Target: >500km</span>
          </div>
          <div>
            ${rangeBarsHtml}
          </div>
        </div>
      </div>

      <!-- High-Growth Market Segment Strategic Matrix -->
      <div class="glass-panel p-5 rounded-xl">
        <h3 class="font-bold text-slate-800 text-sm mb-1">Emily's Strategic Portfolio Optimization Matrix</h3>
        <p class="text-xs text-slate-500 mb-4">Evaluating market attractiveness, segment growth rates, and technological imperatives for global EV expansion</p>
        
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b">
              <tr>
                <th class="p-2.5">Vehicle Category</th>
                <th class="p-2.5">2025 Sales Volume</th>
                <th class="p-2.5">Annual Growth YoY</th>
                <th class="p-2.5">Optimal Battery Tech</th>
                <th class="p-2.5">Customer Satisfaction</th>
                <th class="p-2.5">Strategic Imperative</th>
                <th class="p-2.5">Portfolio Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr class="hover:bg-slate-50/50">
                <td class="p-2.5 font-bold text-blue-700">Compact / Midsize SUV</td>
                <td class="p-2.5">3,323,000 units</td>
                <td class="p-2.5 text-emerald-600 font-semibold">+22.4%</td>
                <td class="p-2.5"><span class="badge-nmc px-2 py-0.5 rounded text-[11px]">NMC / LFP Dual</span></td>
                <td class="p-2.5">4.58 / 5.0 (High)</td>
                <td class="p-2.5 text-slate-600">800V silicon-carbide powertrain, aerodynamic drag &lt;0.23 Cd</td>
                <td class="p-2.5"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold text-[11px]">Core Cash Cow: Expand Trims</span></td>
              </tr>
              <tr class="hover:bg-slate-50/50">
                <td class="p-2.5 font-bold text-slate-800">Entry Urban Hatchback</td>
                <td class="p-2.5">1,765,000 units</td>
                <td class="p-2.5 text-emerald-600 font-semibold">+28.8%</td>
                <td class="p-2.5"><span class="badge-sodium px-2 py-0.5 rounded text-[11px]">Sodium-Ion / LFP</span></td>
                <td class="p-2.5">4.32 / 5.0 (Moderate)</td>
                <td class="p-2.5 text-slate-600">Sub-$15,000 MSRP, high charging efficiency in cold climates</td>
                <td class="p-2.5"><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold text-[11px]">High Growth: Aggressive Scaling</span></td>
              </tr>
              <tr class="hover:bg-slate-50/50">
                <td class="p-2.5 font-bold text-slate-800">Executive & Aero Sedan</td>
                <td class="p-2.5">1,406,500 units</td>
                <td class="p-2.5 text-blue-600 font-semibold">+18.2%</td>
                <td class="p-2.5"><span class="badge-solid px-2 py-0.5 rounded text-[11px]">Solid-State / NMC 811</span></td>
                <td class="p-2.5">4.64 / 5.0 (Very High)</td>
                <td class="p-2.5 text-slate-600">Ultra-long range (700-900 km), level 3 autonomous software</td>
                <td class="p-2.5"><span class="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-semibold text-[11px]">Brand Halo: Flagship Tech Demo</span></td>
              </tr>
              <tr class="hover:bg-slate-50/50">
                <td class="p-2.5 font-bold text-slate-800">Commercial Heavy Trucks</td>
                <td class="p-2.5">161,100 units</td>
                <td class="p-2.5 text-emerald-600 font-bold">+86.5%</td>
                <td class="p-2.5"><span class="badge-lfp px-2 py-0.5 rounded text-[11px]">High-Cycle LFP</span></td>
                <td class="p-2.5">4.60 / 5.0 (High)</td>
                <td class="p-2.5 text-slate-600">Megawatt Charging System (MCS), 4,000+ cycle durability</td>
                <td class="p-2.5"><span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-semibold text-[11px]">High Disruption: Fleet Contracts</span></td>
              </tr>
              <tr class="hover:bg-slate-50/50">
                <td class="p-2.5 font-bold text-slate-800">Municipal Electric Buses</td>
                <td class="p-2.5">38,300 units</td>
                <td class="p-2.5 text-blue-600 font-semibold">+22.8%</td>
                <td class="p-2.5"><span class="badge-lfp px-2 py-0.5 rounded text-[11px]">LFP (Fire Safety)</span></td>
                <td class="p-2.5">4.55 / 5.0 (High)</td>
                <td class="p-2.5 text-slate-600">10-15 year lifecycle support, zero thermal runaway risk</td>
                <td class="p-2.5"><span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold text-[11px]">Stable Public Procurement</span></td>
              </tr>
              <tr class="hover:bg-slate-50/50">
                <td class="p-2.5 font-bold text-slate-800">Two-Wheelers & Micro-Mobility</td>
                <td class="p-2.5">912,500 units</td>
                <td class="p-2.5 text-emerald-600 font-semibold">+31.2%</td>
                <td class="p-2.5"><span class="badge-sodium px-2 py-0.5 rounded text-[11px]">Sodium-Ion / Swappable</span></td>
                <td class="p-2.5">4.38 / 5.0 (Moderate)</td>
                <td class="p-2.5 text-slate-600">Battery-as-a-Service (BaaS) swapping, lowest cost per km</td>
                <td class="p-2.5"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold text-[11px]">Mass Adoption in India & SEA</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// SCENARIO 2: David Chen (Automotive Business Intelligence Manager)
// -------------------------------------------------------------
function renderScenario2View(container) {
  const oems = window.EV_APP.manufacturers;
  const geo = window.EV_APP.geography;

  // Render OEM Market Share Bars
  const maxOemSales = Math.max(...oems.map(o => o.salesUnits));
  const oemRowsHtml = oems.map(o => {
    const widthPct = Math.round((o.salesUnits / maxOemSales) * 100);
    return `
      <div class="p-3 bg-slate-50 rounded-lg hover:bg-blue-50/50 transition">
        <div class="flex justify-between items-center text-xs mb-1">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-800">${o.name}</span>
            <span class="text-[11px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">${o.hq}</span>
          </div>
          <div class="text-right">
            <span class="font-bold text-blue-700">${(o.salesUnits / 1000000).toFixed(2)}M units</span>
            <span class="text-slate-500 font-medium ml-1">(${o.marketSharePct}% share)</span>
            <span class="text-emerald-600 font-semibold ml-2">+${o.growthPct}% YoY</span>
          </div>
        </div>
        <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mb-2">
          <div class="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full" style="width: ${widthPct}%"></div>
        </div>
        <div class="flex justify-between text-[11px] text-slate-600">
          <span>Battery Mix: <strong class="text-slate-800">${o.dominantTech}</strong></span>
          <span>Integration Index: <strong class="text-blue-700">${o.integrationIdx}/100</strong></span>
          <span>Margin: <strong class="text-emerald-700">${o.grossMarginPct}%</strong></span>
          <span>CSAT: <strong class="text-amber-700">${o.rating}/5.0</strong></span>
        </div>
      </div>
    `;
  }).join('');

  // Geographic Production Map & Statistics
  const geoRowsHtml = geo.map(g => `
    <div class="p-3 border rounded-lg bg-white shadow-xs">
      <div class="flex justify-between items-center text-xs mb-1">
        <span class="font-bold text-slate-800">${g.country}</span>
        <span class="text-blue-600 font-bold">${(g.units2025 / 1000000).toFixed(2)}M units (${g.sharePct}%)</span>
      </div>
      <div class="grid grid-cols-3 gap-2 text-[11px] mt-2 pt-2 border-t border-slate-100 text-slate-600">
        <div>
          <span class="text-slate-400 block">Battery Cell Share</span>
          <strong class="text-slate-700">${g.batteryCellShare}%</strong>
        </div>
        <div>
          <span class="text-slate-400 block">Cost Index</span>
          <strong class="${g.costIndex < 80 ? 'text-emerald-600' : 'text-amber-600'}">${g.costIndex} (US=115)</strong>
        </div>
        <div>
          <span class="text-slate-400 block">Exports (2025)</span>
          <strong class="text-slate-700">${(g.exports / 1000).toFixed(0)}k units</strong>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Persona Header Banner -->
      <div class="glass-panel p-5 rounded-xl bg-gradient-to-r from-slate-900 to-blue-950 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="bg-indigo-500 text-xs uppercase px-2.5 py-0.5 rounded-full font-bold tracking-wider">Scenario 2</span>
            <h2 class="text-xl font-bold">David Chen — Automotive Business Intelligence Manager</h2>
          </div>
          <p class="text-slate-300 text-sm mt-1 max-w-3xl">
            Competitive benchmarking & consulting dossier: OEM market share, annual sales performance, vertical integration metrics, geographic production hubs, and client market entry recommendations.
          </p>
        </div>
        <button onclick="exportEvDataToCsv()" 
          class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export BI Dataset (CSV)
        </button>
      </div>

      <!-- Strategic Competitive Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="glass-panel p-4 rounded-xl border-t-4 border-indigo-600">
          <span class="text-xs font-semibold text-indigo-600 uppercase">Market Leadership Battle</span>
          <h3 class="text-lg font-bold text-slate-800 mt-1">BYD (21.4%) vs Tesla (13.9%)</h3>
          <p class="text-xs text-slate-600 mt-2">
            BYD's vertical integration index (92/100) and in-house Blade battery production enable superior gross margins (22.8%) at sub-$30k price points, while Tesla commands luxury/software margins via FSD and the Supercharger ecosystem.
          </p>
        </div>

        <div class="glass-panel p-4 rounded-xl border-t-4 border-blue-600">
          <span class="text-xs font-semibold text-blue-600 uppercase">Supply Chain Regionalization</span>
          <h3 class="text-lg font-bold text-slate-800 mt-1">China 59.8% vs Rest of World</h3>
          <p class="text-xs text-slate-600 mt-2">
            China controls 74.2% of global battery cell manufacturing. Western OEMs face strict local content requirements (US IRA 30D rules and EU carbon border adjustments), requiring multi-billion gigafactory investments in North America and Europe.
          </p>
        </div>

        <div class="glass-panel p-4 rounded-xl border-t-4 border-amber-600">
          <span class="text-xs font-semibold text-amber-600 uppercase">Consulting Advisory Takeaway</span>
          <h3 class="text-lg font-bold text-slate-800 mt-1">Platform Modular Skateboard Mandate</h3>
          <p class="text-xs text-slate-600 mt-2">
            Traditional multi-energy chassis (ICE converted to EV) suffer from 18-25% higher curb weight and inferior range efficiency. New entrants must license dedicated 800V skateboards (e.g., Geely SEA or Hyundai E-GMP) to achieve profitability.
          </p>
        </div>
      </div>

      <!-- OEM Market Share Benchmarking -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="glass-panel p-5 rounded-xl lg:col-span-7">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h3 class="font-bold text-slate-800 text-sm">Global Electric Vehicle Manufacturer Share & Volume</h3>
              <p class="text-xs text-slate-500">2025 Annual Sales (units), battery mix, and vertical integration index</p>
            </div>
            <span class="text-xs font-bold text-indigo-600">Top 8 OEMs</span>
          </div>
          <div class="space-y-3">
            ${oemRowsHtml}
          </div>
        </div>

        <!-- Geographic Production & Cost Hubs -->
        <div class="glass-panel p-5 rounded-xl lg:col-span-5">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h3 class="font-bold text-slate-800 text-sm">Geographical Production & Battery Supply Hubs</h3>
              <p class="text-xs text-slate-500">Production capacity share, battery cell concentration, and export footprint</p>
            </div>
            <span class="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-700">Global Share</span>
          </div>
          <div class="space-y-3">
            ${geoRowsHtml}
          </div>
        </div>
      </div>

      <!-- David's Market Entry Strategic Recommendations -->
      <div class="glass-panel p-5 rounded-xl">
        <h3 class="font-bold text-slate-800 text-sm mb-1">David's Consulting Playbook: Market Entry & Competitiveness Roadmap</h3>
        <p class="text-xs text-slate-500 mb-4">Actionable strategic guidance for automotive manufacturers entering or scaling EV operations</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">1</span>
              <h4 class="font-bold text-slate-800">Battery Sourcing & Chemistry Strategy</h4>
            </div>
            <p class="text-slate-600 leading-relaxed">
              Adopt a <strong>bi-furcated battery architecture</strong>: deploy low-cost LFP ($78/kWh) and emerging Sodium-ion for baseline city trims (&lt;400 km), and high-density NMC-811 / Solid-state for flagship AWD trims. Secure long-term offtake agreements or equity joint-ventures with top-tier cell makers (CATL, LG, Samsung SDI).
            </p>
          </div>

          <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">2</span>
              <h4 class="font-bold text-slate-800">Tariff & Geopolitical Derisking</h4>
            </div>
            <p class="text-slate-600 leading-relaxed">
              Mitigate EU anti-subsidy duties (17-38%) and US 100% EV tariffs by establishing <strong>near-shoring assembly hubs</strong> in Eastern Europe (Hungary, Poland), North America (Mexico, US Sunbelt), and Southeast Asia (Thailand, Indonesia). Ensure battery pack assembly satisfies 50%+ local value-add thresholds.
            </p>
          </div>

          <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div class="flex items-center gap-2 mb-2">
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">3</span>
              <h4 class="font-bold text-slate-800">Software-Defined Vehicle (SDV) & Charging</h4>
            </div>
            <p class="text-slate-600 leading-relaxed">
              Hardware alone no longer retains customer loyalty. Integrate unified electrical/electronic (E/E) zonal architecture with Over-The-Air (OTA) updates, adopt the NACS charging port standard globally, and implement intelligent battery thermal preconditioning linked to navigation for 15-20 min charging stops.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// SCENARIO 3: Dr. Sarah Williams (Sustainable Mobility Analyst)
// -------------------------------------------------------------
function renderScenario3View(container) {
  const batteries = window.EV_APP.batteries;

  // Render Battery Chemistry Cards
  const batteryCardsHtml = batteries.map(b => {
    let badgeClass = 'badge-nmc';
    if (b.id === 'LFP') badgeClass = 'badge-lfp';
    if (b.id === 'Sodium-Ion') badgeClass = 'badge-sodium';
    if (b.id === 'Solid-State') badgeClass = 'badge-solid';
    if (b.id === 'NCA') badgeClass = 'badge-nca';

    return `
      <div class="glass-panel p-4 rounded-xl border hover:border-blue-400 transition">
        <div class="flex justify-between items-start mb-2">
          <div>
            <span class="${badgeClass} px-2 py-0.5 rounded text-xs font-bold">${b.id}</span>
            <h4 class="font-bold text-slate-800 text-sm mt-1">${b.name}</h4>
          </div>
          <div class="text-right">
            <span class="text-xs text-slate-400 block">Market Share</span>
            <span class="text-sm font-bold text-blue-700">${b.marketShare2025}%</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs my-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div>
            <span class="text-slate-500 block">Pack Density:</span>
            <strong class="text-slate-800">${b.packEnergyDensityWhKg} Wh/kg</strong>
          </div>
          <div>
            <span class="text-slate-500 block">Pack Cost:</span>
            <strong class="text-emerald-700">$${b.costPerKwhUsd} / kWh</strong>
          </div>
          <div>
            <span class="text-slate-500 block">Cycle Durability:</span>
            <strong class="text-slate-800">${b.cycleLifeTo80.toLocaleString()} cycles</strong>
          </div>
          <div>
            <span class="text-slate-500 block">Thermal Runaway:</span>
            <strong class="text-slate-800">${b.thermalRunawayTempC}°C</strong>
          </div>
          <div>
            <span class="text-slate-500 block">10-80% Charge:</span>
            <strong class="text-blue-700">${b.fastChargingMin} mins</strong>
          </div>
          <div>
            <span class="text-slate-500 block">-20°C Retention:</span>
            <strong class="${b.lowTempRetentionPct >= 80 ? 'text-emerald-700' : 'text-amber-700'}">${b.lowTempRetentionPct}%</strong>
          </div>
        </div>

        <div class="text-[11px] space-y-1 text-slate-600">
          <div><strong>Embodied Carbon:</strong> ${b.embodiedCo2Kg} kg CO2eq / kWh</div>
          <div><strong>Supply Risk:</strong> ${b.rawMaterialRisk}</div>
          <div><strong>Key Producers:</strong> <span class="text-slate-500">${b.keyProducers}</span></div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Persona Header Banner -->
      <div class="glass-panel p-5 rounded-xl bg-gradient-to-r from-teal-900 to-emerald-950 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="bg-teal-500 text-xs uppercase px-2.5 py-0.5 rounded-full font-bold tracking-wider">Scenario 3</span>
            <h2 class="text-xl font-bold">Dr. Sarah Williams — Sustainable Mobility Research Analyst</h2>
          </div>
          <p class="text-teal-200 text-sm mt-1 max-w-3xl">
            Scientific, environmental & policy laboratory: Detailed battery chemistry performance benchmarks, lifecycle carbon break-even analysis, grid decarbonization impact, and circular economy roadmap.
          </p>
        </div>
        <button onclick="window.EV_APP.activeTab='simulator'; setupSimulator(); renderActiveView();" 
          class="bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition">
          Simulate Grid & Carbon Break-Even &rarr;
        </button>
      </div>

      <!-- Scientific Highlights Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="glass-panel p-4 rounded-xl border-t-4 border-teal-600">
          <span class="text-xs font-semibold text-teal-600 uppercase">Critical Mineral Decoupling</span>
          <h3 class="text-lg font-bold text-slate-800 mt-1">Sodium-Ion & LFP Revolution</h3>
          <p class="text-xs text-slate-600 mt-2">
            Sodium-Ion completely eliminates nickel, cobalt, and lithium bottlenecks, slashing battery embodied CO2 to 41 kg CO2/kWh with exceptional low-temperature (-20°C) capacity retention of 92%.
          </p>
        </div>

        <div class="glass-panel p-4 rounded-xl border-t-4 border-emerald-600">
          <span class="text-xs font-semibold text-emerald-600 uppercase">Lifecycle Carbon Break-Even</span>
          <h3 class="text-lg font-bold text-slate-800 mt-1">16,000 to 28,000 km Mileage</h3>
          <p class="text-xs text-slate-600 mt-2">
            Despite higher initial manufacturing emissions (embodied battery carbon), electric vehicles reach carbon parity with internal combustion engines (ICE) within 1.2 to 2.1 years of average driving under current European and US power grid mixes.
          </p>
        </div>

        <div class="glass-panel p-4 rounded-xl border-t-4 border-blue-600">
          <span class="text-xs font-semibold text-blue-600 uppercase">Solid-State Commercial Horizon</span>
          <h3 class="text-lg font-bold text-slate-800 mt-1">340 Wh/kg Pack & 400°C Safety</h3>
          <p class="text-xs text-slate-600 mt-2">
            Non-flammable solid electrolytes virtually eliminate fire hazards (thermal stability up to 400°C) and unlock 800-1000 km passenger vehicle range, reaching pilot commercial volume (1.8% share) by 2025-2026.
          </p>
        </div>
      </div>

      <!-- Battery Chemistry Deep-Dive Cards -->
      <div>
        <div class="flex justify-between items-center mb-3">
          <div>
            <h3 class="font-bold text-slate-800 text-sm">Comprehensive Battery Chemistry Comparative Matrix</h3>
            <p class="text-xs text-slate-500">LFP vs NMC-811 vs NCA vs Sodium-Ion vs Solid-State technical, economic & environmental specs</p>
          </div>
          <span class="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-1 rounded">Laboratory Certified</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          ${batteryCardsHtml}
        </div>
      </div>

      <!-- Lifecycle Carbon Payback & Policy Roadmap -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Grid Carbon Intensity Impact -->
        <div class="glass-panel p-5 rounded-xl lg:col-span-6">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Regional Grid Carbon Intensity & Break-Even Mileage</h3>
          <p class="text-xs text-slate-500 mb-4">Driving kilometers required to offset vehicle manufacturing carbon emissions vs modern gasoline car</p>
          
          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between mb-1">
                <span class="font-semibold text-slate-700">Sweden / Nordic (Renewable Grid ~30g CO2/kWh)</span>
                <span class="font-bold text-emerald-600">11,200 km (0.8 years)</span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-2.5 rounded-full" style="width: 22%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="font-semibold text-slate-700">European Union Average (Grid ~240g CO2/kWh)</span>
                <span class="font-bold text-teal-600">18,500 km (1.4 years)</span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div class="bg-teal-500 h-2.5 rounded-full" style="width: 38%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="font-semibold text-slate-700">United States Average (Grid ~375g CO2/kWh)</span>
                <span class="font-bold text-blue-600">22,400 km (1.7 years)</span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div class="bg-blue-500 h-2.5 rounded-full" style="width: 46%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="font-semibold text-slate-700">China Average (Grid ~530g CO2/kWh)</span>
                <span class="font-bold text-amber-600">27,800 km (2.1 years)</span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div class="bg-amber-500 h-2.5 rounded-full" style="width: 58%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-1">
                <span class="font-semibold text-slate-700">India Average (Coal-heavy Grid ~630g CO2/kWh)</span>
                <span class="font-bold text-red-500">32,100 km (2.5 years)</span>
              </div>
              <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div class="bg-red-500 h-2.5 rounded-full" style="width: 68%"></div>
              </div>
            </div>
          </div>
          <p class="text-[11px] text-slate-400 mt-4 italic">
            *Assumes standard 65 kWh C-segment EV vs 7.2 L/100km ICE gasoline vehicle, including upstream refining and refinery fuel transport.
          </p>
        </div>

        <!-- Dr. Sarah's Policy Recommendations -->
        <div class="glass-panel p-5 rounded-xl lg:col-span-6">
          <h3 class="font-bold text-slate-800 text-sm mb-1">Dr. Sarah Williams' Evidence-Based Policy Framework</h3>
          <p class="text-xs text-slate-500 mb-4">Recommendations for governments, research bodies, and environmental policymakers</p>

          <div class="space-y-3 text-xs">
            <div class="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
              <h4 class="font-bold text-emerald-900 mb-1">1. Mandatory Battery Digital Passports</h4>
              <p class="text-slate-700">
                Enforce standardized digital QR passports tracing raw material origins, recycled material content (minimum 15% recycled cobalt, 6% recycled lithium), and verified cradle-to-gate carbon footprint.
              </p>
            </div>

            <div class="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <h4 class="font-bold text-blue-900 mb-1">2. Accelerated Sodium-Ion R&D Subsidies</h4>
              <p class="text-slate-700">
                Incentivize sodium-ion commercialization for stationary grid storage and urban two-wheelers to reserve lithium supplies for long-haul trucks and aviation, relieving global ecological pressure on Andean salt flats and hard-rock mines.
              </p>
            </div>

            <div class="p-3 bg-purple-50 rounded-lg border border-purple-100">
              <h4 class="font-bold text-purple-900 mb-1">3. Clean Grid & Smart Bidirectional V2G Mandates</h4>
              <p class="text-slate-700">
                Coordinate EV fast-charging expansion with dedicated renewable microgrids and vehicle-to-grid (V2G) bidirectional charging, turning the global EV passenger fleet into a distributed 1.5 TWh grid stabilization asset.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// UNIVERSAL DATA EXPLORER
// -------------------------------------------------------------
function setupFilters() {
  const catFilter = document.getElementById('filter-category');
  const techFilter = document.getElementById('filter-battery');
  const countryFilter = document.getElementById('filter-country');
  const searchInput = document.getElementById('filter-search');
  const sortSelect = document.getElementById('filter-sort');

  if (catFilter) {
    catFilter.addEventListener('change', (e) => {
      window.EV_APP.filters.category = e.target.value;
      if (window.EV_APP.activeTab === 'explorer') renderExplorerTable();
    });
  }
  if (techFilter) {
    techFilter.addEventListener('change', (e) => {
      window.EV_APP.filters.batteryTech = e.target.value;
      if (window.EV_APP.activeTab === 'explorer') renderExplorerTable();
    });
  }
  if (countryFilter) {
    countryFilter.addEventListener('change', (e) => {
      window.EV_APP.filters.country = e.target.value;
      if (window.EV_APP.activeTab === 'explorer') renderExplorerTable();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      window.EV_APP.filters.search = e.target.value.toLowerCase();
      if (window.EV_APP.activeTab === 'explorer') renderExplorerTable();
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      window.EV_APP.filters.sortBy = e.target.value;
      if (window.EV_APP.activeTab === 'explorer') renderExplorerTable();
    });
  }
}

function getFilteredModels() {
  const f = window.EV_APP.filters;
  return window.EV_APP.models.filter(m => {
    if (f.category !== 'ALL' && m.category !== f.category) return false;
    if (f.batteryTech !== 'ALL' && m.batteryTech !== f.batteryTech) return false;
    if (f.country !== 'ALL' && m.manufacturingCountry !== f.country) return false;
    if (f.search) {
      const q = f.search;
      const match = m.modelName.toLowerCase().includes(q) ||
                    m.manufacturer.toLowerCase().includes(q) ||
                    m.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  }).sort((a, b) => {
    let factor = f.sortOrder === 'desc' ? -1 : 1;
    if (f.sortBy === 'sales') return (a.annualSalesVolume2025 - b.annualSalesVolume2025) * factor;
    if (f.sortBy === 'revenue') return (a.annualRevenueUsdM - b.annualRevenueUsdM) * factor;
    if (f.sortBy === 'range') return (a.drivingRangeKm - b.drivingRangeKm) * factor;
    if (f.sortBy === 'price') return (a.basePriceUsd - b.basePriceUsd) * factor;
    if (f.sortBy === 'rating') return (a.customerRating - b.customerRating) * factor;
    if (f.sortBy === 'efficiency') return (a.efficiencyKwhPer100km - b.efficiencyKwhPer100km) * factor;
    return 0;
  });
}

function renderExplorerView(container) {
  container.innerHTML = `
    <div class="space-y-6">
      <div class="glass-panel p-5 rounded-xl">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div>
            <h2 class="text-lg font-bold text-slate-800">Global Electric Vehicle Fleet Data Explorer</h2>
            <p class="text-xs text-slate-500">Multidimensional filtering across vehicle classes, battery chemistries, manufacturers, and sustainability KPIs</p>
          </div>
          <button onclick="exportEvDataToCsv()" 
            class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Export Filtered CSV
          </button>
        </div>

        <!-- Filter Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs mb-4">
          <div>
            <label class="block font-medium text-slate-600 mb-1">Vehicle Category</label>
            <select id="filter-category" class="w-full p-2 border border-slate-300 rounded-lg bg-white">
              <option value="ALL">All Categories</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Bus">Bus</option>
              <option value="Truck">Truck</option>
              <option value="Two-Wheeler">Two-Wheeler</option>
            </select>
          </div>

          <div>
            <label class="block font-medium text-slate-600 mb-1">Battery Chemistry</label>
            <select id="filter-battery" class="w-full p-2 border border-slate-300 rounded-lg bg-white">
              <option value="ALL">All Chemistries</option>
              <option value="LFP">LFP</option>
              <option value="NMC">NMC</option>
              <option value="NCA">NCA</option>
              <option value="Sodium-Ion">Sodium-Ion</option>
              <option value="Solid-State">Solid-State</option>
            </select>
          </div>

          <div>
            <label class="block font-medium text-slate-600 mb-1">Manufacturing Country</label>
            <select id="filter-country" class="w-full p-2 border border-slate-300 rounded-lg bg-white">
              <option value="ALL">All Countries</option>
              <option value="China">China</option>
              <option value="USA">USA</option>
              <option value="Germany">Germany</option>
              <option value="South Korea">South Korea</option>
              <option value="Japan">Japan</option>
              <option value="India">India</option>
              <option value="Sweden">Sweden</option>
            </select>
          </div>

          <div>
            <label class="block font-medium text-slate-600 mb-1">Sort KPI</label>
            <select id="filter-sort" class="w-full p-2 border border-slate-300 rounded-lg bg-white">
              <option value="sales">Sales Volume (Units)</option>
              <option value="revenue">Annual Revenue ($M)</option>
              <option value="range">Driving Range (km)</option>
              <option value="price">Base Price ($USD)</option>
              <option value="rating">Customer CSAT Rating</option>
              <option value="efficiency">Efficiency (kWh/100km)</option>
            </select>
          </div>

          <div>
            <label class="block font-medium text-slate-600 mb-1">Search Model or OEM</label>
            <input type="text" id="filter-search" placeholder="e.g. Model Y, BYD, Volvo..." class="w-full p-2 border border-slate-300 rounded-lg bg-white" />
          </div>
        </div>

        <!-- Filter Metrics Bar -->
        <div id="filter-summary-ribbon" class="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs flex flex-wrap gap-4 text-slate-700 mb-4">
          <!-- Dynamically populated -->
        </div>

        <!-- Table Container -->
        <div class="data-table-container border rounded-lg">
          <table class="w-full text-xs text-left">
            <thead class="bg-slate-100 text-slate-700 font-semibold sticky top-0">
              <tr>
                <th class="p-2.5">Model</th>
                <th class="p-2.5">Manufacturer</th>
                <th class="p-2.5">Category</th>
                <th class="p-2.5">Battery Tech</th>
                <th class="p-2.5">Capacity</th>
                <th class="p-2.5">Range</th>
                <th class="p-2.5">Price (USD)</th>
                <th class="p-2.5">2025 Sales</th>
                <th class="p-2.5">Revenue</th>
                <th class="p-2.5">CSAT / NPS</th>
                <th class="p-2.5">Origin</th>
              </tr>
            </thead>
            <tbody id="explorer-table-body" class="divide-y divide-slate-100">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  setupFilters();
  renderExplorerTable();
}

function renderExplorerTable() {
  const filtered = getFilteredModels();
  const tbody = document.getElementById('explorer-table-body');
  const summaryRibbon = document.getElementById('filter-summary-ribbon');
  if (!tbody) return;

  if (summaryRibbon) {
    const totalUnits = filtered.reduce((a, b) => a + b.annualSalesVolume2025, 0);
    const totalRevM = filtered.reduce((a, b) => a + b.annualRevenueUsdM, 0);
    const avgPrice = Math.round(filtered.reduce((a, b) => a + b.basePriceUsd, 0) / (filtered.length || 1));
    const avgRange = Math.round(filtered.reduce((a, b) => a + b.drivingRangeKm, 0) / (filtered.length || 1));

    summaryRibbon.innerHTML = `
      <span>Showing: <strong class="text-blue-700 font-bold">${filtered.length}</strong> matching vehicles</span>
      <span>Total Sales: <strong class="text-slate-900">${(totalUnits / 1000000).toFixed(2)}M units</strong></span>
      <span>Total Revenue: <strong class="text-slate-900">$${(totalRevM / 1000).toFixed(1)}B</strong></span>
      <span>Average Price: <strong class="text-slate-900">$${avgPrice.toLocaleString()}</strong></span>
      <span>Average Range: <strong class="text-slate-900">${avgRange} km</strong></span>
    `;
  }

  tbody.innerHTML = filtered.map(m => {
    let badgeClass = 'badge-nmc';
    if (m.batteryTech === 'LFP') badgeClass = 'badge-lfp';
    if (m.batteryTech === 'Sodium-Ion') badgeClass = 'badge-sodium';
    if (m.batteryTech === 'Solid-State') badgeClass = 'badge-solid';
    if (m.batteryTech === 'NCA') badgeClass = 'badge-nca';

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="p-2.5 font-bold text-slate-900">${m.modelName}</td>
        <td class="p-2.5 text-slate-700">${m.manufacturer}</td>
        <td class="p-2.5 font-medium text-slate-600">${m.category}</td>
        <td class="p-2.5"><span class="${badgeClass} px-2 py-0.5 rounded text-[11px] font-semibold">${m.batteryTech}</span></td>
        <td class="p-2.5 text-slate-800">${m.batteryCapacityKwh} kWh</td>
        <td class="p-2.5 font-semibold text-blue-700">${m.drivingRangeKm} km</td>
        <td class="p-2.5 text-slate-800">$${m.basePriceUsd.toLocaleString()}</td>
        <td class="p-2.5 font-bold text-slate-900">${m.annualSalesVolume2025.toLocaleString()}</td>
        <td class="p-2.5 text-emerald-700 font-semibold">$${(m.annualRevenueUsdM).toLocaleString()}M</td>
        <td class="p-2.5">
          <span class="font-bold text-amber-600">${m.customerRating}</span>
          <span class="text-slate-400">/5 (NPS: ${m.customerNetPromoterScore})</span>
        </td>
        <td class="p-2.5 text-slate-500">${m.manufacturingCountry}</td>
      </tr>
    `;
  }).join('');
}

// -------------------------------------------------------------
// SCENARIO SIMULATOR: Strategy & Technology Forecasting
// -------------------------------------------------------------
function setupSimulator() {
  // Attached dynamically in view
}

function renderSimulatorView(container) {
  const s = window.EV_APP.simulatorState;

  // Real-time calculations based on slider parameters
  // Baseline 2025 global penetration is ~22%.
  // Pack cost reduction accelerates penetration by ~0.45% per 1% drop.
  const costDelta = s.batteryCostReductionPct;
  let speedMultiplier = s.techCommercializationSpeed === 'conservative' ? 0.7 : s.techCommercializationSpeed === 'accelerated' ? 1.4 : 1.0;
  let subsidyFactor = s.subsidyPolicyLevel === 'low' ? -3 : s.subsidyPolicyLevel === 'aggressive' ? 5 : 0;

  const projected2030Penetration = Math.min(85, Math.round(22 + (costDelta * 0.75 * speedMultiplier) + subsidyFactor + 14));
  const priceParityYear = costDelta >= 35 ? "2026 (Achieved)" : costDelta >= 20 ? "2027" : "2029";
  
  // Forecasted 2030 Battery Market Share
  let projectedLfp = Math.round(43.5 - (s.techCommercializationSpeed === 'accelerated' ? 6 : 2));
  let projectedSodium = Math.round(4.2 + (costDelta * 0.3 * speedMultiplier));
  let projectedSolidState = Math.round(1.8 + (s.techCommercializationSpeed === 'accelerated' ? 12 : 5));
  let projectedNmc = 100 - (projectedLfp + projectedSodium + projectedSolidState);

  // CO2 Saved Megatons
  const annualCo2Mt = Math.round(180 + (projected2030Penetration * 7.5 * (s.gridCleanlinessPct / 50)));

  container.innerHTML = `
    <div class="space-y-6">
      <div class="glass-panel p-5 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span class="bg-blue-500 text-xs uppercase px-2.5 py-0.5 rounded-full font-bold tracking-wider">Predictive Simulation</span>
          <h2 class="text-xl font-bold mt-1">Strategic Market & Battery Commercialization Simulator (2025-2030)</h2>
          <p class="text-blue-200 text-sm mt-1 max-w-3xl">
            Simulate real-time sensitivity of EV adoption, unsubsidized purchase-price parity, chemistry market share migration, and carbon abatement.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Controls Column -->
        <div class="glass-panel p-5 rounded-xl lg:col-span-5 space-y-5">
          <h3 class="font-bold text-slate-800 text-sm border-b pb-2">Simulation Parameters & Levers</h3>

          <!-- Slider 1: Battery Cost -->
          <div>
            <div class="flex justify-between text-xs mb-1.5">
              <span class="font-semibold text-slate-700">Projected Battery Pack Cost Reduction</span>
              <span id="slider-cost-val" class="font-bold text-blue-700">-${s.batteryCostReductionPct}%</span>
            </div>
            <input type="range" min="0" max="50" step="5" value="${s.batteryCostReductionPct}" id="sim-cost" class="w-full">
            <span class="text-[11px] text-slate-400 block mt-1">Driving cell costs toward $50-$65/kWh benchmark</span>
          </div>

          <!-- Radio 2: Tech Commercialization Speed -->
          <div>
            <label class="font-semibold text-slate-700 text-xs block mb-1.5">Next-Gen Tech Commercialization Ramp</label>
            <div class="grid grid-cols-3 gap-2 text-xs">
              <button onclick="updateSim('techCommercializationSpeed', 'conservative')" 
                class="p-2 border rounded-lg ${s.techCommercializationSpeed === 'conservative' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-50 text-slate-700'}">
                Conservative
              </button>
              <button onclick="updateSim('techCommercializationSpeed', 'baseline')" 
                class="p-2 border rounded-lg ${s.techCommercializationSpeed === 'baseline' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-50 text-slate-700'}">
                Baseline
              </button>
              <button onclick="updateSim('techCommercializationSpeed', 'accelerated')" 
                class="p-2 border rounded-lg ${s.techCommercializationSpeed === 'accelerated' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-50 text-slate-700'}">
                Accelerated
              </button>
            </div>
          </div>

          <!-- Radio 3: Government Subsidies & Mandates -->
          <div>
            <label class="font-semibold text-slate-700 text-xs block mb-1.5">Government Subsidies & Mandate Level</label>
            <div class="grid grid-cols-3 gap-2 text-xs">
              <button onclick="updateSim('subsidyPolicyLevel', 'low')" 
                class="p-2 border rounded-lg ${s.subsidyPolicyLevel === 'low' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-50 text-slate-700'}">
                Phased Out
              </button>
              <button onclick="updateSim('subsidyPolicyLevel', 'moderate')" 
                class="p-2 border rounded-lg ${s.subsidyPolicyLevel === 'moderate' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-50 text-slate-700'}">
                Moderate (IRA)
              </button>
              <button onclick="updateSim('subsidyPolicyLevel', 'aggressive')" 
                class="p-2 border rounded-lg ${s.subsidyPolicyLevel === 'aggressive' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-50 text-slate-700'}">
                Aggressive
              </button>
            </div>
          </div>

          <!-- Slider 4: Grid Cleanliness -->
          <div>
            <div class="flex justify-between text-xs mb-1.5">
              <span class="font-semibold text-slate-700">Power Grid Renewable Share</span>
              <span id="slider-grid-val" class="font-bold text-teal-700">${s.gridCleanlinessPct}%</span>
            </div>
            <input type="range" min="30" max="95" step="5" value="${s.gridCleanlinessPct}" id="sim-grid" class="w-full">
            <span class="text-[11px] text-slate-400 block mt-1">Share of zero-carbon wind, solar, nuclear, and hydro on power grids</span>
          </div>
        </div>

        <!-- Dynamic Output Column -->
        <div class="glass-panel p-5 rounded-xl lg:col-span-7 space-y-5">
          <h3 class="font-bold text-slate-800 text-sm border-b pb-2">Forecasted 2030 Market Outcomes</h3>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span class="text-xs text-blue-700 font-medium block">2030 Global EV Share</span>
              <span class="text-2xl font-bold text-blue-900">${projected2030Penetration}%</span>
              <span class="text-[11px] text-slate-500 block">of new light-duty vehicle sales</span>
            </div>

            <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span class="text-xs text-emerald-700 font-medium block">ICE Price Parity</span>
              <span class="text-xl font-bold text-emerald-900">${priceParityYear}</span>
              <span class="text-[11px] text-slate-500 block">Unsubsidized MSRP match</span>
            </div>

            <div class="p-3 bg-teal-50 border border-teal-200 rounded-lg col-span-2 sm:col-span-1">
              <span class="text-xs text-teal-700 font-medium block">Annual CO2 Saved</span>
              <span class="text-2xl font-bold text-teal-900">${annualCo2Mt} Mt</span>
              <span class="text-[11px] text-slate-500 block">Net displacement vs ICE</span>
            </div>
          </div>

          <!-- 2030 Battery Chemistry Distribution Forecast -->
          <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div class="flex justify-between items-center text-xs mb-2">
              <span class="font-bold text-slate-800">Forecasted 2030 Battery Chemistry Mix</span>
              <span class="text-slate-500">Global Light-Duty Fleet</span>
            </div>
            
            <div class="w-full h-4 rounded-full overflow-hidden flex mb-3">
              <div class="bg-emerald-500" style="width: ${projectedLfp}%" title="LFP: ${projectedLfp}%"></div>
              <div class="bg-blue-600" style="width: ${projectedNmc}%" title="NMC: ${projectedNmc}%"></div>
              <div class="bg-amber-500" style="width: ${projectedSodium}%" title="Sodium-Ion: ${projectedSodium}%"></div>
              <div class="bg-purple-600" style="width: ${projectedSolidState}%" title="Solid-State: ${projectedSolidState}%"></div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span class="text-slate-700">LFP: <strong>${projectedLfp}%</strong></span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span class="text-slate-700">NMC: <strong>${projectedNmc}%</strong></span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span class="text-slate-700">Na-Ion: <strong>${projectedSodium}%</strong></span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                <span class="text-slate-700">Solid-State: <strong>${projectedSolidState}%</strong></span>
              </div>
            </div>
          </div>

          <!-- Executive Interpretation -->
          <div class="text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-lg border border-slate-200">
            <strong>Strategic Simulation Takeaway:</strong> A ${costDelta}% battery pack cost decline moves unsubsidized price parity to ${priceParityYear}. 
            Under the ${s.techCommercializationSpeed} tech ramp, Sodium-ion surges to ${projectedSodium}% share for budget urban mobility, while Solid-State secures ${projectedSolidState}% of high-margin luxury sedans and electric logistics.
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach simulator listeners
  const costInput = document.getElementById('sim-cost');
  const gridInput = document.getElementById('sim-grid');
  if (costInput) {
    costInput.addEventListener('input', (e) => {
      window.EV_APP.simulatorState.batteryCostReductionPct = parseInt(e.target.value);
      renderSimulatorView(container);
    });
  }
  if (gridInput) {
    gridInput.addEventListener('input', (e) => {
      window.EV_APP.simulatorState.gridCleanlinessPct = parseInt(e.target.value);
      renderSimulatorView(container);
    });
  }
}

function updateSim(key, val) {
  window.EV_APP.simulatorState[key] = val;
  const container = document.getElementById('view-container');
  if (container) renderSimulatorView(container);
}

// -------------------------------------------------------------
// CSV EXPORT UTILITY
// -------------------------------------------------------------
function exportEvDataToCsv() {
  const models = window.EV_APP.models;
  const headers = [
    "Model", "Manufacturer", "Category", "Segment", "Battery_Tech",
    "Battery_Capacity_kWh", "Range_km", "Efficiency_kWh_100km", "Charge_Time_10_80_min",
    "Base_Price_USD", "Sales_2025_Units", "Revenue_2025_USD_M", "Sales_Growth_YoY_Pct",
    "Customer_Rating", "NPS", "Manufacturing_Country", "CO2_Embodied_kg", "CO2_Saved_Ton_Yr"
  ];

  let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";
  models.forEach(m => {
    const row = [
      `"${m.modelName}"`, `"${m.manufacturer}"`, `"${m.category}"`, `"${m.segment}"`, `"${m.batteryTech}"`,
      m.batteryCapacityKwh, m.drivingRangeKm, m.efficiencyKwhPer100km, m.chargingTimeMin10to80,
      m.basePriceUsd, m.annualSalesVolume2025, m.annualRevenueUsdM, m.salesGrowthYoY,
      m.customerRating, m.customerNetPromoterScore, `"${m.manufacturingCountry}"`, m.co2EmbodiedKg, m.co2OperationalSavingsTonPerYear
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "global_ev_intelligence_data_2025_2026.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
