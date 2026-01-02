
import React, { useState } from 'react';
import { Product } from '../types';
import { editProductImage } from '../services/geminiService';

interface ImageEditorProps {
  product: Product;
  onClose: () => void;
  onSave: (newImageUrl: string) => void;
}

const PRESET_PROMPTS = [
  "添加怀旧复古滤镜",
  "把背景换成阳光明媚的牧场",
  "移除背景中的杂物",
  "在产品旁边放一朵小花",
  "调亮画面并增加饱和度",
  "背景变成温馨的婴儿房"
];

const ImageEditor: React.FC<ImageEditorProps> = ({ product, onClose, onSave }) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(product.imageUrl);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async (customPrompt?: string) => {
    const activePrompt = customPrompt || prompt;
    if (!activePrompt) return;

    setIsProcessing(true);
    setError(null);
    
    const result = await editProductImage(previewUrl, activePrompt);
    
    if (result) {
      setPreviewUrl(result);
      setPrompt('');
    } else {
      setError('生成失败，请重试。');
    }
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-lg text-slate-800">AI 定制图片</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full">
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto no-scrollbar space-y-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            {isProcessing && (
              <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-sky-700 font-medium">AI 正在绘制...</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">尝试快捷指令:</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => handleEdit(p)}
                  disabled={isProcessing}
                  className="text-xs bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-600 px-3 py-2 rounded-full border border-slate-200 transition-colors disabled:opacity-50"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">或输入您的要求:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：调成黑白风格"
                className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                disabled={isProcessing}
              />
              <button
                onClick={() => handleEdit()}
                disabled={isProcessing || !prompt}
                className="bg-sky-500 text-white px-4 py-2 rounded-xl font-medium disabled:opacity-50 hover:bg-sky-600 active:scale-95 transition-all shadow-md shadow-sky-100"
              >
                生成
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-white"
          >
            取消
          </button>
          <button
            onClick={() => onSave(previewUrl)}
            disabled={previewUrl === product.imageUrl}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-900 disabled:opacity-50"
          >
            确认使用此图
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
