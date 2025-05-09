interface CropRecommendation {
    crop: string;
    conditions: string;
    description: string;
  }
  
  interface DiseaseInfo {
    disease: string;
    symptoms: string[];
    treatment: string[];
  }
  
  export const cropDatabase: CropRecommendation[] = [
    {
      crop: "Rice",
      conditions: "pH: 5.5-6.5, Temperature: 20-35°C, Rainfall: 100-200cm",
      description: "Staple food crop requiring flooded conditions"
    },
    {
      crop: "Wheat",
      conditions: "pH: 6.0-7.0, Temperature: 15-25°C, Rainfall: 50-75cm",
      description: "Winter crop best suited for well-drained soils"
    },
    {
      crop: "Cotton",
      conditions: "pH: 5.5-8.5, Temperature: 20-30°C, Rainfall: 60-100cm",
      description: "Cash crop requiring moderate water and full sunlight"
    }
  ];
  
  export const diseaseDatabase: DiseaseInfo[] = [
    {
      disease: "Leaf Blight",
      symptoms: ["Brown lesions on leaves", "Yellowing around lesions", "Wilting"],
      treatment: [
        "Remove infected leaves",
        "Apply copper-based fungicides",
        "Improve air circulation"
      ]
    },
    {
      disease: "Powdery Mildew",
      symptoms: ["White powdery spots", "Leaf curling", "Stunted growth"],
      treatment: [
        "Apply sulfur-based fungicides",
        "Increase plant spacing",
        "Reduce humidity"
      ]
    }
  ];
  
  export const generateAgriResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
  
    // Crop management responses
    if (lowercaseInput.includes("add crop") || lowercaseInput.includes("manage crop")) {
      return "To add a new crop, go to the dashboard and click on 'Add Crop'. You'll need to provide the crop name and type. You can manage your crops from the dashboard.";
    }
  
    // Task management responses
    if (lowercaseInput.includes("task") || lowercaseInput.includes("todo")) {
      return "You can manage tasks from the dashboard. Click 'Add Task' to create a new task, specify the details, and mark it as complete when done.";
    }
  
    // Disease detection responses
    if (lowercaseInput.includes("disease") || lowercaseInput.includes("plant health")) {
      return "To check for plant diseases, use our Disease Detection feature. Upload a clear photo of the affected plant part, and our system will analyze it for potential diseases, symptoms, and treatments.";
    }
  
    // Crop recommendation responses
    if (lowercaseInput.includes("recommend") || lowercaseInput.includes("which crop")) {
      return "For crop recommendations, use our Crop Recommendation tool. Enter your soil parameters (pH, nitrogen, phosphorus levels) and city. We'll suggest suitable crops based on your conditions and local weather.";
    }
  
    // Weather information
    if (lowercaseInput.includes("weather") || lowercaseInput.includes("climate")) {
      return "Check current weather conditions in the Crop Recommendation section. Enter your city to get real-time weather updates relevant for farming.";
    }
  
    // Budget planning responses
    if (lowercaseInput.includes("budget") || lowercaseInput.includes("finance")) {
      return "Use our Budget Planning module to manage your farming finances. Enter your total budget, and we'll help you allocate it across different farming activities. You can adjust the allocations as needed.";
    }
  
    // Default response
    return "I can help you with crop management, task tracking, disease detection, crop recommendations, weather information, and budget planning. What would you like to know more about?";
  };
  
  