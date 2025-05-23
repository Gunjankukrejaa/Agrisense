import { useContext } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const translations = {
  english: {
    dashboard: 'Dashboard',
    cropRecommendation: 'Crop Recommendation',
    diseasePrediction: 'Disease Prediction',
    budgetPlanning: 'Budget Planning',
    logout: 'Logout',
    welcome: 'Welcome back',
    todayOverview: "Today's Overview",
    soilMoisture: 'Soil Moisture',
    temperature: 'Temperature',
    humidity: 'Humidity',
    rainfall: 'Rainfall',
    chatbot: 'KrishiBot Assistant',
    chatbotPlaceholder: 'Ask me anything about farming...',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    enterDetails: 'Please enter your details',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    signUp: 'Sign up',
    totalCrops: 'Total Crops',
    harvestReady: 'Harvest Ready',
    pendingTasks: 'Pending Tasks',
    completedTasks: 'Completed Tasks',
    recentActivity: 'Recent Activity',
    weatherForecast: 'Weather Forecast',
    nextSevenDays: 'Next 7 Days',
    cropHealth: 'Crop Health',
    morningDose: 'Morning Dose',
    afternoonDose: 'Afternoon Dose',
    eveningDose: 'Evening Dose',
    waterConsumption: 'Water Consumption',
    farmIncome: 'Farm Income',
    expenses: 'Expenses',
    revenue: 'Revenue',
    profit: 'Profit',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    thisYear: 'This Year'
  },
  hindi: {
    dashboard: 'डैशबोर्ड',
    cropRecommendation: 'फसल अनुशंसा',
    diseasePrediction: 'बीमारी की भविष्यवाणी',
    budgetPlanning: 'बजट योजना',
    logout: 'लॉग आउट',
    welcome: 'वापस स्वागत है',
    todayOverview: 'आज का अवलोकन',
    soilMoisture: 'मिट्टी की नमी',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    rainfall: 'वर्षा',
    chatbot: 'कृषिबॉट सहायक',
    chatbotPlaceholder: 'खेती के बारे में कुछ भी पूछें...',
    login: 'लॉग इन',
    register: 'रजिस्टर',
    email: 'ईमेल',
    password: 'पासवर्ड',
    name: 'नाम',
    enterDetails: 'कृपया अपना विवरण दर्ज करें',
    dontHaveAccount: "खाता नहीं है?",
    alreadyHaveAccount: "पहले से ही एक खाता है?",
    signUp: 'साइन अप',
    totalCrops: 'कुल फसलें',
    harvestReady: 'कटाई के लिए तैयार',
    pendingTasks: 'अपूर्ण कार्य',
    completedTasks: 'पूर्ण कार्य',
    recentActivity: 'हाल की गतिविधि',
    weatherForecast: 'मौसम का पूर्वानुमान',
    nextSevenDays: 'अगले 7 दिन',
    cropHealth: 'फसल स्वास्थ्य',
    morningDose: 'सुबह की खुराक',
    afternoonDose: 'दोपहर की खुराक',
    eveningDose: 'शाम की खुराक',
    waterConsumption: 'पानी की खपत',
    farmIncome: 'खेत की आय',
    expenses: 'खर्च',
    revenue: 'राजस्व',
    profit: 'लाभ',
    thisMonth: 'इस महीने',
    lastMonth: 'पिछले महीने',
    thisYear: 'इस साल'
  },
  marathi: {
    dashboard: 'डॅशबोर्ड',
    cropRecommendation: 'पीक शिफारस',
    diseasePrediction: 'रोग अंदाज',
    budgetPlanning: 'अंदाजपत्रक नियोजन',
    logout: 'बाहेर पडा',
    welcome: 'पुन्हा स्वागत आहे',
    todayOverview: 'आजचा आढावा',
    soilMoisture: 'मातीची ओलावा',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    rainfall: 'पाऊस',
    chatbot: 'कृषिबॉट सहाय्यक',
    chatbotPlaceholder: 'शेतीबद्दल काहीही विचारा...',
    login: 'लॉगिन',
    register: 'नोंदणी करा',
    email: 'ईमेल',
    password: 'पासवर्ड',
    name: 'नाव',
    enterDetails: 'कृपया आपले तपशील प्रविष्ट करा',
    dontHaveAccount: "खाते नाही?",
    alreadyHaveAccount: "आधीपासूनच खाते आहे?",
    signUp: 'साइन अप',
    totalCrops: 'एकूण पिके',
    harvestReady: 'कापणीसाठी तयार',
    pendingTasks: 'प्रलंबित कार्ये',
    completedTasks: 'पूर्ण केलेली कार्ये',
    recentActivity: 'अलीकडील क्रियाकलाप',
    weatherForecast: 'हवामान अंदाज',
    nextSevenDays: 'पुढील 7 दिवस',
    cropHealth: 'पीक आरोग्य',
    morningDose: 'सकाळची डोस',
    afternoonDose: 'दुपारची डोस',
    eveningDose: 'संध्याकाळची डोस',
    waterConsumption: 'पाणी वापर',
    farmIncome: 'शेतीचे उत्पन्न',
    expenses: 'खर्च',
    revenue: 'महसूल',
    profit: 'नफा',
    thisMonth: 'या महिन्यात',
    lastMonth: 'मागील महिन्यात',
    thisYear: 'या वर्षी'
  },
  punjabi: {
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    cropRecommendation: 'ਫਸਲ अनुशंसा',
    diseasePrediction: 'ਬਿਮਾਰੀ ਦੀ ਭਵਿੱਖਬਾਣੀ',
    budgetPlanning: 'ਬਜਟ ਯੋਜਨਾ',
    logout: 'ਲੌਗ ਆਉਟ',
    welcome: 'ਵਾਪਸ ਸਵਾਗਤ ਹੈ',
    todayOverview: 'ਅੱਜ ਦਾ ਸੰਖੇਪ ਜਾਣਕਾਰੀ',
    soilMoisture: 'ਮਿੱਟੀ ਨਮੀ',
    temperature: 'ਤਾਪਮਾਨ',
    humidity: 'ਨਮੀ',
    rainfall: 'ਵਰਖਾ',
    chatbot: 'ਕ੍ਰਿਸ਼ੀਬੋਟ ਸਹਾਇਕ',
    chatbotPlaceholder: 'ਖੇਤੀਬਾੜੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...',
    login: 'ਲੌਗ ਇਨ',
    register: 'ਰਜਿਸਟਰ',
    email: 'ਈਮੇਲ',
    password: 'ਪਾਸਵਰਡ',
    name: 'ਨਾਮ',
    enterDetails: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਵੇਰਵਾ ਦਰਜ ਕਰੋ',
    dontHaveAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ?",
    alreadyHaveAccount: "ਪਹਿਲਾਂ ਹੀ ਇੱਕ ਖਾਤਾ ਹੈ?",
    signUp: 'ਸਾਈਨ ਅੱਪ',
    totalCrops: 'ਕੁੱਲ ਫਸਲਾਂ',
    harvestReady: 'ਵਾਢੀ ਲਈ ਤਿਆਰ',
    pendingTasks: 'ਲੰਬਿਤ ਕੰਮ',
    completedTasks: 'ਪੂਰੇ ਕੀਤੇ ਕੰਮ',
    recentActivity: 'ਹਾਲ ਦੀ ਗਤੀਵਿਧੀ',
    weatherForecast: 'ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ',
    nextSevenDays: 'ਅਗਲੇ 7 ਦਿਨ',
    cropHealth: 'ਫਸਲ ਦੀ ਸਿਹਤ',
    morningDose: 'ਸਵੇਰ ਦੀ ਖੁਰਾਕ',
    afternoonDose: 'ਦੁਪਹਿਰ ਦੀ ਖੁਰਾਕ',
    eveningDose: 'ਸ਼ਾਮ ਦੀ ਖੁਰਾਕ',
    waterConsumption: 'ਪਾਣੀ ਦੀ ਖਪਤ',
    farmIncome: 'ਖੇਤੀਬਾੜੀ ਆਮਦਨ',
    expenses: 'ਖਰਚੇ',
    revenue: 'ਰਾਜਸਵ',
    profit: 'ਲਾਭ',
    thisMonth: 'ਇਸ ਮਹੀਨੇ',
    lastMonth: 'ਪਿਛਲੇ ਮਹੀਨੇ',
    thisYear: 'ਇਸ ਸਾਲ'
  },
  bengali: {
    dashboard: 'ড্যাশবোর্ড',
    cropRecommendation: 'ফসল সুপারিশ',
    diseasePrediction: 'রোগের পূর্বাভাস',
    budgetPlanning: 'বাজেট পরিকল্পনা',
    logout: 'লগ আউট',
    welcome: 'ফের স্বাগতম',
    todayOverview: 'আজকের সংক্ষিপ্ত বিবরণ',
    soilMoisture: 'মাটির আর্দ্রতা',
    temperature: 'তাপমাত্রা',
    humidity: 'আর্দ্রতা',
    rainfall: 'বৃষ্টিপাত',
    chatbot: 'কৃষি বট সহকারী',
    chatbotPlaceholder: 'কৃষি সম্পর্কে কিছু জিজ্ঞাসা করুন...',
    login: 'লগইন',
    register: 'নিবন্ধন',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    name: 'নাম',
    enterDetails: 'অনুগ্রহ করে আপনার বিবরণ লিখুন',
    dontHaveAccount: "অ্যাকাউন্ট নেই?",
    alreadyHaveAccount: "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?",
    signUp: 'সাইন আপ',
    totalCrops: 'মোট শস্য',
    harvestReady: 'ফসল কাটার জন্য প্রস্তুত',
    pendingTasks: 'অপেক্ষিত কাজ',
    completedTasks: 'সম্পূর্ণ কাজ',
    recentActivity: 'সাম্প্রতিক কার্যকলাপ',
    weatherForecast: 'मौसम पूर्वानुमान',
    nextSevenDays: 'পরবর্তী 7 দিন',
    cropHealth: 'ফসল স্বাস্থ্য',
    morningDose: 'সকালের ডোজ',
    afternoonDose: 'দুপুরের ডোজ',
    eveningDose: 'সন্ধ্যার ডোজ',
    waterConsumption: 'জল খরচ',
    farmIncome: 'কৃষি আয়',
    expenses: 'খরচ',
    revenue: 'রাজস্ব',
    profit: 'লাভ',
    thisMonth: 'এই মাসে',
    lastMonth: 'গত মাসে',
    thisYear: 'এই বছর'
  },
  tamil: {
    dashboard: 'டாஷ்போர்டு',
    cropRecommendation: 'பயிர் பரிந்துரை',
    diseasePrediction: 'நோய் முன்கணிப்பு',
    budgetPlanning: 'வரவு செலவு திட்டம்',
    logout: 'வெளியேறு',
    welcome: 'மீண்டும் வருக',
    todayOverview: 'இன்றைய கண்ணோட்டம்',
    soilMoisture: 'மண் ஈரப்பதம்',
    temperature: 'வெப்பநிலை',
    humidity: 'ஈரப்பதம்',
    rainfall: 'மழைவீழ்ச்சி',
    chatbot: 'கிருஷிபோட் உதவியாளர்',
    chatbotPlaceholder: 'விவசாயம் பற்றி என்னிடம் கேள்...',
    login: 'உள்நுழைய',
    register: 'பதிவு செய்',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    name: 'பெயர்',
    enterDetails: 'உங்கள் விவரங்களை உள்ளிடவும்',
    dontHaveAccount: "கணக்கு இல்லையா?",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    signUp: 'பதிவு செய்க',
    totalCrops: 'மொத்த பயிர்கள்',
    harvestReady: 'அறுவடைக்கு தயார்',
    pendingTasks: 'நிலுவையில் உள்ள பணிகள்',
    completedTasks: 'பூர்த்தி செய்யப்பட்ட பணிகள்',
    recentActivity: 'சமீபத்திய செயல்பாடு',
    weatherForecast: 'வானிலை முன்னறிவிப்பு',
    nextSevenDays: 'அடுத்த 7 நாட்கள்',
    cropHealth: 'பயிர் ஆரோக்கியம்',
    morningDose: 'காலை உணவு',
    afternoonDose: 'மதிய உணவு',
    eveningDose: 'மாலை உணவு',
    waterConsumption: 'நீர் நுகர்வு',
    farmIncome: 'விவசாய வருமானம்',
    expenses: 'செலவுகள்',
    revenue: 'வருவாய்',
    profit: 'லாபம்',
    thisMonth: 'இந்த மாதம்',
    lastMonth: 'கடந்த மாதம்',
    thisYear: 'இந்த ஆண்டு'
  },
};

export const useTranslation = () => {
  const { currentLanguage } = useLanguage();
  
  const t = (key: keyof typeof translations.english) => {
    const language = currentLanguage || 'english';
    return translations[language as keyof typeof translations][key] || key;
  };
  
  return { t };
};
