import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Upload, X, Loader2, Camera } from 'lucide-react';
import { detectDisease } from '../utils/detectDisease';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
  onDetection: (result: any) => void;
  onReset: () => void;
  hasResult: boolean;
}

export function ImageUploader({ onDetection, onReset, hasResult }: ImageUploaderProps) {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        onReset();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        onReset();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDetect = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2200));
    const result = detectDisease(selectedImage);
    onDetection(result);
    setIsProcessing(false);
  };

  const handleClear = () => {
    setSelectedImage(null);
    onReset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!selectedImage ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-2 border-dashed border-green-300 rounded-xl p-8 md:p-12 text-center hover:border-green-400 hover:bg-green-100 transition-all cursor-pointer bg-green-50"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-green-200 p-4 rounded-full">
                <Upload className="w-10 h-10 text-green-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('upload.title')}</h3>
                <p className="text-gray-600">{t('upload.dragText')}</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Camera className="w-4 h-4" />
                <span>{t('upload.supportedFormats')}</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <img
                src={selectedImage}
                alt="Selected plant"
                className="w-full h-64 md:h-80 object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-3 right-3 shadow-lg"
                onClick={(e) => { e.stopPropagation(); handleClear(); }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                onClick={handleDetect}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg font-semibold shadow-md transition-all disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t('upload.processing')}
                  </>
                ) : (
                  t('upload.detectButton')
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}