'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/nutrify/bottom-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockFoods } from '@/lib/mock-data';
import { calculateFoodScore } from '@/lib/calculations';
import { Scan, Camera, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ScannerPage() {
  const router = useRouter();
  const [barcode, setBarcode] = useState('');
  const [scannedFood, setScannedFood] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);

    // Simulate scanning
    setTimeout(() => {
      // Find random food from mock data
      const randomFood = mockFoods[Math.floor(Math.random() * mockFoods.length)];
      const { score, grade } = calculateFoodScore(randomFood);

      setScannedFood({
        ...randomFood,
        score,
        grade,
      });
      setIsScanning(false);
    }, 2000);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-500';
      case 'B':
        return 'bg-blue-500';
      case 'C':
        return 'bg-yellow-500';
      case 'D':
        return 'bg-orange-500';
      case 'E':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAlerts = (food: any) => {
    const alerts = [];

    if (food.isUltraProcessed) {
      alerts.push({
        type: 'warning',
        message: 'Alimento ultraprocessado',
      });
    }

    if (food.sugar && food.sugar > 10) {
      alerts.push({
        type: 'warning',
        message: 'Alto teor de açúcar',
      });
    }

    if (food.sodium && food.sodium > 400) {
      alerts.push({
        type: 'warning',
        message: 'Alto teor de sódio',
      });
    }

    if (food.fiber && food.fiber > 5) {
      alerts.push({
        type: 'success',
        message: 'Rico em fibras',
      });
    }

    if (food.protein > 15) {
      alerts.push({
        type: 'success',
        message: 'Boa fonte de proteína',
      });
    }

    return alerts;
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] dark:bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white p-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-2">Scanner</h1>
          <p className="text-white/80">Escaneie códigos de barras</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {!scannedFood ? (
          <>
            {/* Scanner Area */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-8">
              <div className="text-center space-y-6">
                {isScanning ? (
                  <>
                    <div className="w-32 h-32 mx-auto rounded-full bg-[#4CAF50]/10 flex items-center justify-center animate-pulse">
                      <Scan className="w-16 h-16 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Escaneando...</h3>
                      <p className="text-gray-500">Procurando produto no banco de dados</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-32 h-32 mx-auto rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                      <Camera className="w-16 h-16 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Pronto para escanear</h3>
                      <p className="text-gray-500">
                        Aponte a câmera para o código de barras do produto
                      </p>
                    </div>
                    <Button
                      onClick={handleScan}
                      className="w-full bg-[#4CAF50] hover:bg-[#2E7D32]"
                      size="lg"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Abrir Câmera
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Manual Entry */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg p-6">
              <h3 className="font-bold mb-4">Busca Manual</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o código de barras"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleScan} className="bg-[#4CAF50] hover:bg-[#2E7D32]">
                  Buscar
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900 dark:text-blue-100">
                  <p className="font-semibold mb-1">Como funciona?</p>
                  <p>
                    Escaneie o código de barras de qualquer produto alimentício para ver
                    informações nutricionais detalhadas e uma avaliação de qualidade.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Scanned Result */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-lg overflow-hidden">
              {/* Grade Badge */}
              <div className={`${getGradeColor(scannedFood.grade)} p-6 text-white text-center`}>
                <div className="text-6xl font-bold mb-2">{scannedFood.grade}</div>
                <div className="text-lg">Nota: {scannedFood.score}/100</div>
              </div>

              <div className="p-6 space-y-6">
                {/* Product Info */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">{scannedFood.name}</h2>
                  <p className="text-gray-500">{scannedFood.category}</p>
                </div>

                {/* Nutrition Facts */}
                <div>
                  <h3 className="font-bold mb-3">Informação Nutricional</h3>
                  <div className="text-sm text-gray-500 mb-2">
                    Por {scannedFood.servingSize}{scannedFood.servingUnit}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-[#4CAF50]">
                        {scannedFood.calories}
                      </div>
                      <div className="text-sm text-gray-500">Calorias</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold">{scannedFood.protein}g</div>
                      <div className="text-sm text-gray-500">Proteína</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold">{scannedFood.carbs}g</div>
                      <div className="text-sm text-gray-500">Carboidratos</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold">{scannedFood.fat}g</div>
                      <div className="text-sm text-gray-500">Gordura</div>
                    </div>
                  </div>
                </div>

                {/* Alerts */}
                {getAlerts(scannedFood).length > 0 && (
                  <div>
                    <h3 className="font-bold mb-3">Alertas</h3>
                    <div className="space-y-2">
                      {getAlerts(scannedFood).map((alert, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg ${
                            alert.type === 'warning'
                              ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100'
                              : 'bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
                          }`}
                        >
                          {alert.type === 'warning' ? (
                            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          )}
                          <span className="text-sm font-medium">{alert.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      router.push('/nutrition');
                    }}
                    className="flex-1 bg-[#4CAF50] hover:bg-[#2E7D32]"
                  >
                    Adicionar à Refeição
                  </Button>
                  <Button
                    onClick={() => setScannedFood(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Escanear Outro
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
