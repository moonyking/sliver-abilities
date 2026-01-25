import { FieldCard } from '@/app/types/sliver';
import { SLIVER_CARDS } from '@/app/data/slivers';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { ArrowLeft, Trash2, RotateCcw, ArrowLeftRight } from 'lucide-react';

interface EditFieldScreenProps {
  fieldCards: FieldCard[];
  onBack: () => void;
  onUpdateCount: (cardId: string, controller: 'ME' | 'OPP', delta: number) => void;
  onRemoveCard: (cardId: string, controller: 'ME' | 'OPP') => void;
  onSwitchController: (cardId: string, controller: 'ME' | 'OPP') => void;
  onReset: () => void;
}

export function EditFieldScreen({ 
  fieldCards, 
  onBack, 
  onUpdateCount,
  onRemoveCard,
  onSwitchController,
  onReset 
}: EditFieldScreenProps) {
  const meCards = fieldCards.filter(fc => fc.controller === 'ME');
  const oppCards = fieldCards.filter(fc => fc.controller === 'OPP');

  const renderCardRow = (fieldCard: FieldCard) => {
    const card = SLIVER_CARDS.find(c => c.id === fieldCard.cardId);
    if (!card) return null;

    return (
      <div 
        key={`${fieldCard.cardId}-${fieldCard.controller}`}
        className="bg-slate-800 rounded-lg p-4 space-y-3"
      >
        {/* カード情報 */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-bold text-white">{card.name}</div>
            <div className="text-xs text-slate-400">{card.nameEn}</div>
          </div>
          <Badge variant={fieldCard.controller === 'ME' ? 'default' : 'destructive'}>
            {fieldCard.controller}
          </Badge>
        </div>
        
        {/* コントロール */}
        <div className="flex items-center gap-2">
          {/* 数量コントロール */}
          <div className="flex-1 flex items-center justify-center gap-2 bg-slate-700 rounded-lg p-2">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => onUpdateCount(fieldCard.cardId, fieldCard.controller, -1)}
              className="h-12 w-12 text-xl"
            >
              -
            </Button>
            <div className="text-2xl font-bold text-white min-w-[3rem] text-center">
              {fieldCard.count}
            </div>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => onUpdateCount(fieldCard.cardId, fieldCard.controller, 1)}
              className="h-12 w-12 text-xl"
            >
              +
            </Button>
          </div>
          
          {/* コントローラー切替 */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onSwitchController(fieldCard.cardId, fieldCard.controller)}
            className="h-12 w-12"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </Button>
          
          {/* 削除 */}
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onRemoveCard(fieldCard.cardId, fieldCard.controller)}
            className="h-12 w-12"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-700 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
          <h1 className="text-xl font-bold text-white flex-1">盤面編集</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="text-xs"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            リセット
          </Button>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {/* MEセクション */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg font-bold text-blue-400">ME (自分)</h2>
            <span className="text-sm text-slate-400">
              {meCards.reduce((sum, c) => sum + c.count, 0)}枚
            </span>
          </div>
          <div className="space-y-2">
            {meCards.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                カードがありません
              </div>
            ) : (
              meCards.map(renderCardRow)
            )}
          </div>
        </div>
        
        {/* OPPセクション */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg font-bold text-red-400">OPP (相手)</h2>
            <span className="text-sm text-slate-400">
              {oppCards.reduce((sum, c) => sum + c.count, 0)}枚
            </span>
          </div>
          <div className="space-y-2">
            {oppCards.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                カードがありません
              </div>
            ) : (
              oppCards.map(renderCardRow)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
