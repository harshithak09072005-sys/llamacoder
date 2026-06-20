const diseases = [
  { key: 'lateBlight', confidenceRange: [85, 98] },
  { key: 'leafRust', confidenceRange: [80, 95] },
  { key: 'powderyMildew', confidenceRange: [88, 97] },
  { key: 'bacterialSpot', confidenceRange: [82, 94] },
  { key: 'anthracnose', confidenceRange: [86, 96] },
];

export function detectDisease(imageData: string): any {
  const imageHash = imageData.length % 5;
  const selectedDisease = diseases[imageHash];

  const minConfidence = selectedDisease.confidenceRange[0];
  const maxConfidence = selectedDisease.confidenceRange[1];
  const confidence = Math.floor(Math.random() * (maxConfidence - minConfidence + 1)) + minConfidence;

  return {
    diseaseKey: selectedDisease.key,
    confidence: confidence,
    timestamp: new Date().toISOString(),
  };
}