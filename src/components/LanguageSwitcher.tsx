import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en' as const, name: 'English', flag: '🇬🇧' },
  { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳' },
  { code: 'kn' as const, name: 'ಕನ್ನಡ', flag: '🇮🇳' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-500 hidden sm:block" />
      <div className="flex space-x-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1.5 text-sm font-medium transition-all ${
              language === lang.code
                ? 'bg-green-600 text-white hover:bg-green-700 hover:text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-green-50'
            }`}
          >
            <span className="mr-1">{lang.flag}</span>
            <span className="hidden sm:inline">{lang.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}