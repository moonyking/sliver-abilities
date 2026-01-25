import { useState } from 'react';
import { SliverCard } from '@/app/types/sliver';
import { SliverCardItem } from '@/app/components/SliverCardItem';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Plus } from 'lucide-react';

interface AddCardScreenProps {
  card: SliverCard;
  onBack: () => void;
  onAdd: (cardId: string, controller: 'ME' | 'OPP', count: number) => void;
}

export function AddCardScreen({ card, onBack, onAdd }: AddCardScreenProps) {
  const [controller, setController] = useState<'ME' | 'OPP'>('ME');
  const [count, setCount] = useState(1);

  const handleAdd = () => {
    onAdd(card.id, controller, count);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
          <h1 className="text-xl font-bold text-white flex-1">カードを追加</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {/* 選択されたカード */}
        <div>
          <h2 className="text-sm font-bold text-slate-400 mb-2">選択されたカード</h2>
          <SliverCardItem card={card} />
        </div>
        
        {/* コントローラー選択 */}
        <div>
          <h2 className="text-sm font-bold text-slate-400 mb-3">コントローラー</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setController('ME')}
              className={`flex-1 py-4 rounded-lg border-2 font-bold transition-all ${
                controller === 'ME'
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-slate-800 border-slate-600 text-slate-400'
              }`}
            >
              ME (自分)
            </button>
            <button
              onClick={() => setController('OPP')}
              className={`flex-1 py-4 rounded-lg border-2 font-bold transition-all ${
                controller === 'OPP'
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'bg-slate-800 border-slate-600 text-slate-400'
              }`}
            >
              OPP (相手)
            </button>
          </div>
        </div>
        
        {/* 枚数選択 */}
        <div>
          <h2 className="text-sm font-bold text-slate-400 mb-3">枚数</h2>
          <div className="flex items-center justify-center gap-4 bg-slate-800 rounded-lg p-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCount(Math.max(1, count - 1))}
              className="h-14 w-14 text-2xl"
            >
              -
            </Button>
            <div className="text-4xl font-bold text-white min-w-[4rem] text-center">
              {count}
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCount(count + 1)}
              className="h-14 w-14 text-2xl"
            >
              +
            </Button>
          </div>
        </div>
        
        {/* 能力プレビュー */}
        <div>
          <h2 className="text-sm font-bold text-slate-400 mb-2">付与される能力</h2>
          <div className="space-y-2">
            {card.abilities.map(ability => (
              <div 
                key={ability.id}
                className="bg-amber-50 dark:bg-slate-800 rounded-lg p-3 border-2 border-amber-900/20"
              >
                <div className="flex items-start gap-2 mb-1">
                  {ability.keyword && (
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {ability.keyword}
                    </span>
                  )}
                  <Badge 
                    variant={ability.scope === 'ALL' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {ability.scope}
                  </Badge>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  {ability.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 固定フッター */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-4 pb-safe">
        <Button 
          onClick={handleAdd}
          className="w-full h-14 text-lg font-bold"
        >
          <Plus className="h-5 w-5 mr-2" />
          盤面に追加 ({count}枚)
        </Button>
      </div>
    </div>
  );
}
