import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Leaf, AlertCircle, RefreshCw, Info, ShieldCheck, Clock, Trophy, Sprout, FlaskConical } from 'lucide-react';

interface DiseaseResultProps {
  result: any;
  onReset: () => void;
}

export function DiseaseResult({ result, onReset }: DiseaseResultProps) {
  const { t } = useLanguage();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 75) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getConfidenceTextColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-700';
    if (confidence >= 75) return 'text-yellow-700';
    return 'text-orange-700';
  };

  const recoveryDays = t(`diseases.${result.diseaseKey}.recoveryDays`);
  const bestChoice = t(`diseases.${result.diseaseKey}.bestChoice`);

  return (
    <div className="space-y-6">
      {/* Disease Detection Card */}
      <Card className="border-l-4 border-green-500 shadow-md overflow-hidden">
        <CardHeader className="bg-green-50 pb-4">
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <AlertCircle className="w-6 h-6" />
            <span>{t('results.diseaseDetected')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('results.plantDetected')}</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {t(`diseases.${result.diseaseKey}.plantName`)}
              </h3>
            </div>
            <span className={`text-lg font-bold px-4 py-1 rounded-full bg-green-100 ${getConfidenceTextColor(result.confidence)}`}>
              {result.confidence}% {t('results.confidence')}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">{t('results.diseaseName')}</p>
            <h4 className="text-xl font-semibold text-red-700">
              {t(`diseases.${result.diseaseKey}.name`)}
            </h4>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${getConfidenceColor(result.confidence)}`}
              style={{ width: `${result.confidence}%` }}
            />
          </div>

          {/* Recovery Time */}
          <div className="flex items-center space-x-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mt-2">
            <Clock className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-amber-700 font-medium">{t('results.recoveryTime')}</p>
              <p className="text-lg font-bold text-amber-900">{recoveryDays}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison: Organic vs Chemical */}
      <Card className="border-2 border-green-300 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 pb-4">
          <CardTitle className="flex items-center space-x-2 text-green-800 text-lg">
            <Sprout className="w-6 h-6" />
            <span>{t('results.treatmentComparison')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Organic Solution */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 relative">
              {bestChoice === 'organic' && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                    <Trophy className="w-3 h-3" />
                    <span>{t('results.bestChoice')}</span>
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2 mb-3">
                <Leaf className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-green-800 text-lg">{t('results.organicSolution')}</h4>
              </div>
              <p className="text-gray-800 leading-relaxed mb-3">
                {t(`diseases.${result.diseaseKey}.organicSolution`)}
              </p>
              <div className="flex items-start space-x-2 text-sm text-green-700 bg-green-100 rounded-lg p-3">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{t(`diseases.${result.diseaseKey}.organicWhy`)}</span>
              </div>
            </div>

            {/* Chemical Solution */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5 relative">
              {bestChoice === 'chemical' && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                    <Trophy className="w-3 h-3" />
                    <span>{t('results.bestChoice')}</span>
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2 mb-3">
                <FlaskConical className="w-5 h-5 text-red-600" />
                <h4 className="font-bold text-red-800 text-lg">{t('results.chemicalSolution')}</h4>
              </div>
              <p className="text-gray-800 leading-relaxed mb-3">
                {t(`diseases.${result.diseaseKey}.chemicalSolution`)}
              </p>
              <div className="flex items-start space-x-2 text-sm text-red-700 bg-red-100 rounded-lg p-3">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{t(`diseases.${result.diseaseKey}.chemicalWhy`)}</span>
              </div>
            </div>
          </div>

          {/* Best Choice Banner */}
          <div className="mt-5 bg-emerald-100 border border-emerald-300 rounded-xl p-4 flex items-center space-x-3">
            <Trophy className="w-6 h-6 text-emerald-700 flex-shrink-0" />
            <div>
              <p className="font-bold text-emerald-900">{t('results.recommendation')}</p>
              <p className="text-emerald-800 text-sm mt-1">
                {t(`diseases.${result.diseaseKey}.recommendation`)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prevention Card */}
      <Card className="border-l-4 border-orange-500 shadow-md overflow-hidden">
        <CardHeader className="bg-orange-50 pb-4">
          <CardTitle className="flex items-center space-x-2 text-orange-800">
            <ShieldCheck className="w-6 h-6" />
            <span>{t('results.prevention')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-orange-50 p-5 rounded-lg border border-orange-100">
            <p className="text-gray-800 leading-relaxed">
              {t(`diseases.${result.diseaseKey}.prevention`)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center pt-4">
        <Button
          onClick={onReset}
          variant="outline"
          className="border-green-600 text-green-700 hover:bg-green-50 px-6 py-2 text-base font-medium"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          {t('results.detectAnother')}
        </Button>
      </div>
    </div>
  );
}