import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ImageUploader } from './components/ImageUploader';
import { DiseaseResult } from './components/DiseaseResult';
import { Leaf, Shield, WifiOff } from 'lucide-react';
import { Card, CardContent } from './components/ui/card';
import { motion } from 'framer-motion';

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const { t } = useLanguage();

  const handleDetection = (result: any) => {
    setDetectionResult(result);
  };

  const handleReset = () => {
    setDetectionResult(null);
  };

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg shadow-sm">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">CropGuard AI</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {t('app.subtitle')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('app.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="mb-8 border-2 border-green-200 shadow-lg overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <ImageUploader onDetection={handleDetection} onReset={handleReset} hasResult={!!detectionResult} />
            </CardContent>
          </Card>
        </motion.div>

        {detectionResult && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DiseaseResult result={detectionResult} onReset={handleReset} />
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <FeatureCard icon={<Shield className="w-10 h-10 text-green-600" />} title={t('features.organic')} desc={t('features.organicDesc')} delay={0.3} />
          <FeatureCard icon={<WifiOff className="w-10 h-10 text-green-600" />} title={t('features.offline')} desc={t('features.offlineDesc')} delay={0.4} />
          <FeatureCard icon={<Leaf className="w-10 h-10 text-green-600" />} title={t('features.languages')} desc={t('features.languagesDesc')} delay={0.5} />
        </div>
      </main>

      <footer className="bg-white border-t border-green-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-600 text-sm mb-2">{t('footer.offline')}</p>
          <p className="text-gray-500 text-xs">{t('footer.powered')}</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="border-green-200 hover:shadow-md transition-shadow h-full">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">{icon}</div>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default App;