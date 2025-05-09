import { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTranslation } from "@/hooks/useTranslation";
import { Card } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

const DiseasePrediction = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{
    mainDisease?: {
      name?: string;
      symptoms?: string[];
      treatment?: string[];
      confidence?: number;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPG, PNG, JPEG)");
      return;
    }
    setError(null);
    setSelectedImage(file);
    setPrediction(null);
  };

  const resetImage = () => {
    setSelectedImage(null);
    setPrediction(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await fetch(`${backendUrl}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      if (!data || !data.mainDisease) {
        throw new Error("Invalid response from server");
      }

      setPrediction(data);
    } catch (error) {
      console.error("Prediction error:", error);
      setError(error instanceof Error ? error.message : "Failed to analyze the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isPlantHealthy = prediction?.mainDisease?.name?.toLowerCase().includes("healthy");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t("diseasePrediction")}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Upload an image of your plant to identify diseases and receive treatment recommendations.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Side: Upload and Image Preview */}
          <div className="lg:col-span-2">
            <Card className="border-gray-200 h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Upload Plant Image</h2>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                {!selectedImage ? (
                  <div
                    className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 h-64 transition-colors ${
                      isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center mb-4">Drag & drop an image, or click to upload</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Browse Files
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative mb-4 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected plant"
                      className="max-h-64 max-w-full mx-auto rounded-lg object-contain"
                    />
                    <button
                      onClick={resetImage}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                )}
                <button
                  onClick={analyzeImage}
                  disabled={loading || !selectedImage}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-70"
                >
                  {loading ? "Analyzing..." : "Analyze Image"}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {prediction && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-semibold">Prediction Result</h3>
                    <p>
                      <strong>Disease:</strong> {prediction.mainDisease?.name || "Unknown"}
                    </p>
                    <p>
                      <strong>Confidence:</strong>{" "}
                      {prediction.mainDisease?.confidence
                        ? `${(prediction.mainDisease.confidence * 100).toFixed(2)}%`
                        : "N/A"}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Side: Symptoms, Treatment, or Healthy Plant Message */}
          {prediction && (
            <div className="lg:col-span-3 space-y-6">
              {isPlantHealthy ? (
                // Healthy Plant Card
                <Card className="border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Healthy Plant</h2>
                  </div>
                  <div className="p-6">
                    <p>Your plant is healthy! No diseases detected.</p>
                  </div>
                </Card>
              ) : (
                <>
                  {/* Symptoms Card */}
                  <Card className="border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-xl font-semibold">Symptoms</h2>
                    </div>
                    <div className="p-6">
                      {prediction.mainDisease?.symptoms?.length ? (
                        <ul className="list-disc list-inside">
                          {prediction.mainDisease.symptoms.map((symptom, index) => (
                            <li key={index}>{symptom}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No symptoms available.</p>
                      )}
                    </div>
                  </Card>

                  {/* Treatment Card */}
                  <Card className="border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-xl font-semibold">Treatment</h2>
                    </div>
                    <div className="p-6">
                      {prediction.mainDisease?.treatment?.length ? (
                        <ul className="list-disc list-inside">
                          {prediction.mainDisease.treatment.map((treatment, index) => (
                            <li key={index}>{treatment}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No treatment available.</p>
                      )}
                    </div>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DiseasePrediction;