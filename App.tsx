
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import EditTools from './components/EditTools';
import { HeadshotStyle } from './types';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!originalImage || !selectedStyle) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await geminiService.generateHeadshot(originalImage, selectedStyle.prompt);
      setGeneratedImage(result);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate headshot. Please try again or check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (instruction: string) => {
    const currentImg = generatedImage || originalImage;
    if (!currentImg) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await geminiService.editImage(currentImg, instruction);
      setGeneratedImage(result);
    } catch (err: any) {
      console.error(err);
      setError("Refinement failed. Try a simpler instruction.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetAll = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setSelectedStyle(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Professional AI Headshots <br className="hidden sm:block" />
            <span className="text-indigo-600 italic">In Seconds.</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our Nano-Banana-powered AI analyzes your selfie and regenerates it into a stunning corporate, creative, or natural portrait.
          </p>
        </div>

        {!originalImage ? (
          <div className="max-w-xl mx-auto">
            <ImageUploader onImageSelected={setOriginalImage} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Input & Styles */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-800">Your Source Photo</h3>
                  <button 
                    onClick={resetAll}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Replace Photo
                  </button>
                </div>
                <div className="relative group max-w-[200px] mx-auto sm:mx-0">
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="w-full aspect-square object-cover rounded-xl border-4 border-white shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center pointer-events-none">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Original</span>
                  </div>
                </div>

                <StyleSelector 
                  selectedStyleId={selectedStyle?.id || null} 
                  onStyleSelect={setSelectedStyle} 
                />

                <div className="mt-8">
                  <button
                    onClick={handleGenerate}
                    disabled={!selectedStyle || isLoading}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center space-x-3"
                  >
                    {isLoading ? (
                      <><i className="fas fa-spinner fa-spin"></i><span>Generating...</span></>
                    ) : (
                      <><i className="fas fa-wand-sparkles"></i><span>Generate Professional Headshot</span></>
                    )}
                  </button>
                  <p className="mt-3 text-[11px] text-gray-400 text-center">
                    Uses Gemini 2.5 Flash Image to transform your appearance into a professional setting.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Output & Edits */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                  <i className="fas fa-sparkles mr-2 text-indigo-500"></i>
                  Result Preview
                </h3>

                <div className="flex-grow flex flex-col">
                  {error && (
                    <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-start">
                      <i className="fas fa-exclamation-circle mt-0.5 mr-2"></i>
                      {error}
                    </div>
                  )}

                  {!generatedImage && !isLoading && (
                    <div className="aspect-[4/5] bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                        <i className="fas fa-image text-gray-300 text-2xl"></i>
                      </div>
                      <p className="text-sm text-gray-400 font-medium">Your new headshot will appear here after generation.</p>
                    </div>
                  )}

                  {isLoading && !generatedImage && (
                    <div className="aspect-[4/5] bg-indigo-50/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center animate-pulse">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 relative">
                         <div className="absolute inset-0 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                         <i className="fas fa-camera text-indigo-600 text-xl"></i>
                      </div>
                      <p className="text-lg font-bold text-indigo-900 mb-2">Capturing your best angle...</p>
                      <p className="text-sm text-indigo-600/70">Our AI photographer is working their magic.</p>
                    </div>
                  )}

                  {generatedImage && (
                    <div className="space-y-6">
                      <div className="relative group">
                        <img 
                          src={generatedImage} 
                          alt="Generated Professional Headshot" 
                          className={`w-full aspect-[4/5] object-cover rounded-2xl shadow-xl transition-all ${isLoading ? 'opacity-50 grayscale' : 'opacity-100'}`}
                        />
                        <a 
                          href={generatedImage} 
                          download="lumina-headshot.png"
                          className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur hover:bg-white text-indigo-600 rounded-full shadow-lg transition-all transform hover:scale-110"
                        >
                          <i className="fas fa-download"></i>
                        </a>
                      </div>

                      <EditTools onApplyEdit={handleRefine} isLoading={isLoading} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Informational Section */}
        <section className="mt-24 border-t border-gray-100 pt-16 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center px-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-id-card text-indigo-600"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Preserve Identity</h4>
              <p className="text-sm text-gray-500">Advanced facial feature preservation ensures your headshot looks exactly like you, just more professional.</p>
            </div>
            <div className="text-center px-4">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shirt text-violet-600"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Smart Wardrobe</h4>
              <p className="text-sm text-gray-500">Automatically swaps casual wear for boardroom-appropriate attire based on your chosen style.</p>
            </div>
            <div className="text-center px-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-lightbulb text-pink-600"></i>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Expert Lighting</h4>
              <p className="text-sm text-gray-500">Simulates expensive studio lighting setups from soft umbrellas to cinematic key lighting.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-10 border-t border-gray-100 text-gray-400 text-xs">
        &copy; 2024 LuminaShot AI. Powered by Gemini 2.5 Flash Image.
      </footer>
    </div>
  );
};

export default App;
