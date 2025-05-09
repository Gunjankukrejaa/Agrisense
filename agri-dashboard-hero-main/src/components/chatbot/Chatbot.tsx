
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { useFarm } from '@/context/FarmContext';

const Chatbot = () => {
  const { t } = useTranslation();
  const { crops, tasks } = useFarm();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ text: string; isBot: boolean }[]>([]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatMessages([...chatMessages, { text: message, isBot: false }]);
    
    // Generate contextual response based on user's crops and tasks
    let response = "I'm your KrishiBot assistant. How can I help you with your farming needs today?";
    
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('crop') && lowerMsg.includes('recommend')) {
      response = "Based on the current season and your location, I'd recommend planting tomatoes, peppers, or cucumbers. They grow well in this climate!";
    } else if (lowerMsg.includes('pest') || lowerMsg.includes('disease')) {
      response = "To identify plant diseases or pests, it's best to upload a clear photo of the affected area. For general prevention, ensure proper spacing between plants and regular monitoring.";
    } else if (lowerMsg.includes('water') || lowerMsg.includes('irrigation')) {
      response = "The current soil moisture is " + '65' + "%. Consider watering your crops if it drops below 40%. Early morning is the best time for irrigation.";
    } else if (lowerMsg.includes('fertilizer') || lowerMsg.includes('nutrient')) {
      response = "For organic farming, consider compost, vermicompost, or fish emulsion. Apply fertilizers according to your specific crop needs.";
    } else if (lowerMsg.includes('weather')) {
      response = "The weather forecast shows sunny conditions for the next 3 days with temperatures between 25-30°C. Plan your field activities accordingly.";
    } else if (lowerMsg.includes('harvest')) {
      const harvestReadyCrops = crops.filter(crop => 
        new Date(crop.harvestDate) <= new Date()
      );
      if (harvestReadyCrops.length > 0) {
        response = `You have ${harvestReadyCrops.length} crops ready for harvest: ${harvestReadyCrops.map(c => c.name).join(', ')}.`;
      } else {
        response = "None of your crops are ready for harvest yet. The closest one will be ready in a few weeks.";
      }
    } else if (lowerMsg.includes('task') || lowerMsg.includes('todo')) {
      const pendingTasks = tasks.filter(task => !task.completed);
      if (pendingTasks.length > 0) {
        response = `You have ${pendingTasks.length} pending tasks. The most urgent one is "${pendingTasks[0].title}" scheduled for ${new Date(pendingTasks[0].date).toLocaleDateString()}.`;
      } else {
        response = "You don't have any pending tasks. Great job keeping up with your farm work!";
      }
    }
    
    // Simulate bot response with delay
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        { text: response, isBot: true }
      ]);
    }, 1000);
    
    setMessage('');
  };

  return (
    <Card className="border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-700">{t('chatbot')}</h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-[300px] max-h-[400px]">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 bg-krishi-100 rounded-full flex items-center justify-center mb-4">
              <Send className="h-8 w-8 text-krishi-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">KrishiBot Assistant</h3>
            <p className="text-gray-500 mt-2">
              Ask me anything about crop recommendations, disease identification, or budget planning.
            </p>
          </div>
        ) : (
          chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.isBot
                  ? 'bg-gray-100 text-gray-800 self-start'
                  : 'bg-krishi-600 text-white self-end ml-auto'
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('chatbotPlaceholder')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-krishi-500"
          />
          <Button
            type="submit"
            className="p-2 bg-krishi-600 text-white rounded-md hover:bg-krishi-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default Chatbot;
