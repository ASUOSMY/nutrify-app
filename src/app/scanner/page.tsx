'use client';

import { useState } from 'react';
import { ScanBarcode, Camera } from 'lucide-react';
import BottomNav from '@/components/bottom-nav';

export default function ScannerPage() {
  const [scannedProduct, setScannedProduct] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const mockScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedProduct({
        name: 'Whey Protein Concentrado',
        brand: 'Growth Supplements',
        barcode: '7898357410015',
        calories: 120,
        protein: 24,
        carbs: 3,
        fat: 1.5,
        portion: '30g (1 scoop)',
        score: 'A',
        ingredients: ['Proteína do soro do leite', 'Cacau', 'Aroma natural', 'Sucralose']
      });
      setIsScanning(false);
    }, 2000);
  };

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A': return 'text-[#4CAF50] bg-[#4CAF50]/20';
      case 'B': return 'text-[#8BC34A] bg-[#8BC34A]/20';
      case 'C': return 'text-[#FFC107] bg-[#FFC107]/20';
      case 'D': return 'text-[#FF9800] bg-[#FF9800]/20';
      case 'E': return 'text-[#F44336] bg-[#F44336]/20';
      default: return 'text-[#B0B0B0] bg-[#2A2A2A]';
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] pb-20">
      {/* Header */}
      <div className="bg-[#1E1E1E] p-6 border-b border-[#2A2A2A]">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-2">Scanner Nutricional</h1>
          <p className="text-[#B0B0B0]">Escaneie produtos para ver informações</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-6 space-y-6">
        {/* Scanner Area */}
        {!scannedProduct && (
          <div className="space-y-6">
            <div className="bg-[#1E1E1E] rounded-3xl p-8 border-2 border-dashed border-[#2A2A2A] aspect-square flex flex-col items-center justify-center">
              {isScanning ? (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 border-4 border-[#4CAF50] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-[#B0B0B0]">Escaneando...</p>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-[#4CAF50]/20 flex items-center justify-center mx-auto">
                    <ScanBarcode className="w-12 h-12 text-[#4CAF50]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Posicione o código de barras</h3>
                    <p className="text-sm text-[#B0B0B0]">
                      Centralize o código na câmera
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={mockScan}
              disabled={isScanning}
              className="w-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-[#4CAF50]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              {isScanning ? 'Escaneando...' : 'Escanear Produto'}
            </button>

            <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A]">
              <h3 className="font-semibold mb-3">Como funciona?</h3>
              <ul className="space-y-2 text-sm text-[#B0B0B0]">
                <li className="flex gap-2">
                  <span className="text-[#4CAF50]">1.</span>
                  <span>Aponte a câmera para o código de barras</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#4CAF50]">2.</span>
                  <span>Aguarde a leitura automática</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#4CAF50]">3.</span>
                  <span>Veja as informações nutricionais</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Scanned Product */}
        {scannedProduct && (
          <div className="space-y-6">
            {/* Product Info */}
            <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1">{scannedProduct.name}</h2>
                  <p className="text-sm text-[#B0B0B0]">{scannedProduct.brand}</p>
                </div>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getScoreColor(scannedProduct.score)}`}>
                  <span className="text-3xl font-bold">{scannedProduct.score}</span>
                </div>
              </div>
              <div className="text-xs text-[#666] mb-4">
                Código: {scannedProduct.barcode}
              </div>
            </div>

            {/* Nutrition Facts */}
            <div className="bg-gradient-to-br from-[#4CAF50]/20 to-[#66BB6A]/10 border border-[#4CAF50]/30 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Informações Nutricionais</h3>
              <div className="text-sm text-[#B0B0B0] mb-4">Porção: {scannedProduct.portion}</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#B0B0B0]">Calorias</span>
                  <span className="font-bold text-[#4CAF50] text-lg">{scannedProduct.calories} kcal</span>
                </div>
                <div className="h-px bg-[#2A2A2A]" />
                <div className="flex justify-between items-center">
                  <span className="text-[#B0B0B0]">Proteínas</span>
                  <span className="font-semibold">{scannedProduct.protein}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B0B0B0]">Carboidratos</span>
                  <span className="font-semibold">{scannedProduct.carbs}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B0B0B0]">Gorduras</span>
                  <span className="font-semibold">{scannedProduct.fat}g</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-[#2A2A2A]">
              <h3 className="font-semibold mb-3">Ingredientes</h3>
              <div className="flex flex-wrap gap-2">
                {scannedProduct.ingredients.map((ingredient: string, index: number) => (
                  <span
                    key={index}
                    className="bg-[#2A2A2A] px-3 py-1 rounded-full text-sm text-[#B0B0B0]"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setScannedProduct(null)}
                className="bg-[#2A2A2A] text-white py-3 rounded-xl font-semibold hover:bg-[#333] transition-colors"
              >
                Escanear Outro
              </button>
              <button className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#4CAF50]/20 transition-all">
                Adicionar à Dieta
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
