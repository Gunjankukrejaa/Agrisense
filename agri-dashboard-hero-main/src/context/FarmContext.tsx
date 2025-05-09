
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Crop, Task, WeatherData } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface FarmContextType {
  crops: Crop[];
  tasks: Task[];
  weatherData: WeatherData;
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  updateCrop: (crop: Crop) => void;
  deleteCrop: (id: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  getCropById: (id: string) => Crop | undefined;
  getTasksByCropId: (cropId: string) => Task[];
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  
  // Load initial data from localStorage if available
  const initialCrops = JSON.parse(localStorage.getItem('crops') || '[]');
  const initialTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  
  // Parse dates from localStorage JSON
  const parsedCrops = initialCrops.map((crop: any) => ({
    ...crop,
    plantingDate: new Date(crop.plantingDate),
    harvestDate: new Date(crop.harvestDate)
  }));
  
  const parsedTasks = initialTasks.map((task: any) => ({
    ...task,
    date: new Date(task.date)
  }));
  
  const [crops, setCrops] = useState<Crop[]>(parsedCrops);
  const [tasks, setTasks] = useState<Task[]>(parsedTasks);
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 28,
    moisture: 65
  });
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('crops', JSON.stringify(crops));
  }, [crops]);
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const addCrop = (cropData: Omit<Crop, 'id'>) => {
    const newCrop = {
      ...cropData,
      id: Date.now().toString()
    };
    setCrops([...crops, newCrop]);
    toast({
      title: "Success",
      description: "Crop added successfully",
    });
  };
  
  const updateCrop = (updatedCrop: Crop) => {
    setCrops(crops.map(crop => crop.id === updatedCrop.id ? updatedCrop : crop));
    toast({
      title: "Success",
      description: "Crop updated successfully",
    });
  };
  
  const deleteCrop = (id: string) => {
    setCrops(crops.filter(crop => crop.id !== id));
    // Also delete associated tasks
    setTasks(tasks.filter(task => task.cropId !== id));
    toast({
      title: "Success",
      description: "Crop deleted successfully",
    });
  };
  
  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString()
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };
  
  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    toast({
      title: "Success",
      description: "Task updated successfully",
    });
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Success",
      description: "Task deleted successfully",
    });
  };
  
  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const getCropById = (id: string) => {
    return crops.find(crop => crop.id === id);
  };
  
  const getTasksByCropId = (cropId: string) => {
    return tasks.filter(task => task.cropId === cropId);
  };
  
  return (
    <FarmContext.Provider value={{
      crops,
      tasks,
      weatherData,
      addCrop,
      updateCrop,
      deleteCrop,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskStatus,
      getCropById,
      getTasksByCropId
    }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
