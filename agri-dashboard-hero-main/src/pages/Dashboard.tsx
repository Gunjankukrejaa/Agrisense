import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useFarm } from '@/context/FarmContext';
import { FarmProvider } from '@/context/FarmContext';
import CropList from '@/components/crops/CropList';
import TaskList from '@/components/tasks/TaskList';
import EnvironmentMonitor from '@/components/environment/EnvironmentMonitor';
import Chatbot from '@/components/chatbot/Chatbot';
import { cn } from '@/lib/utils';

const DashboardContent = () => {
  const { t } = useTranslation();
  const { crops, tasks } = useFarm();
  
  // Calculate statistics
  const totalCrops = crops.length;
  const harvestReadyCrops = crops.filter(crop => new Date(crop.harvestDate) <= new Date()).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {t('welcome')}, Gunjan
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center gap-4 bg-krishi-50 border-krishi-100">
          <div className="h-12 w-12 bg-krishi-100 rounded-full flex items-center justify-center">
            <Calendar className="h-6 w-6 text-krishi-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('totalCrops')}</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalCrops}</h3>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center gap-4 bg-soil-50 border-soil-100">
          <div className="h-12 w-12 bg-soil-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-soil-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('harvestReady')}</p>
            <h3 className="text-2xl font-bold text-gray-800">{harvestReadyCrops}</h3>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center gap-4 bg-water-50 border-water-100">
          <div className="h-12 w-12 bg-water-100 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-water-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('pendingTasks')}</p>
            <h3 className="text-2xl font-bold text-gray-800">{pendingTasks}</h3>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center gap-4 bg-growth-50 border-growth-100">
          <div className="h-12 w-12 bg-growth-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-growth-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('completedTasks')}</p>
            <h3 className="text-2xl font-bold text-gray-800">{completedTasks}</h3>
          </div>
        </Card>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Crops and Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Environment Monitor */}
          <EnvironmentMonitor />
          
          {/* Crops Section */}
          <CropList />
          
          {/* Tasks Section */}
          <TaskList />
        </div>
        
        {/* Right Column - Chatbot */}
        <div className="lg:col-span-1">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <FarmProvider>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </FarmProvider>
  );
};

export default Dashboard;