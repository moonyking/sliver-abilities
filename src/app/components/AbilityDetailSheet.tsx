import { AggregatedAbility } from '@/app/types/sliver';
import { SLIVER_CARDS } from '@/app/data/slivers';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { X } from 'lucide-react';

interface AbilityDetailSheetProps {
  aggregatedAbility: AggregatedAbility;
  onClose: () => void;
  onEditField?: () => void;
}

export function AbilityDetailSheet({ aggregatedAbility, onClose, onEditField }: AbilityDetailSheetProps) {
  const { ability, sources } = aggregatedAbility;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end" onClick={onClose}>
      <div 
        className="w-full bg-white dark:bg-slate-900 rounded-t-2xl shadow-xl max-h-[80vh] overflow-auto pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">能力詳細</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* コンテンツ */}
        <div className="p-4 space-y-4">
          {/* 能力要約とバッジ */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant={ability.scope === 'ALL' ? 'default' : 'secondary'}
                className="font-bold"
              >
                {ability.scope === 'ALL' ? 'すべてのスリヴァー' : 'あなたのスリヴァー'}
              </Badge>
              {ability.conditional && (
                <Badge variant="outline">条件付き</Badge>
              )}
            </div>
            {ability.keyword && (
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {ability.keyword}
              </h3>
            )}
          </div>
          
          {/* 能力本文 */}
          <div className="bg-amber-50 dark:bg-slate-800 rounded-lg p-4 border-2 border-amber-900/20">
            <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {ability.text}
            </div>
            {ability.conditionText && (
              <div className="mt-3 pt-3 border-t border-slate-300 dark:border-slate-600 text-xs text-slate-600 dark:text-slate-400">
                <strong>条件:</strong> {ability.conditionText}
              </div>
            )}
          </div>
          
          {/* P/T修正値の合算 */}
          {ability.type === 'pt-modifier' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                合計修正値
              </div>
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                {ability.powerModifier && ability.powerModifier >= 0 ? '+' : ''}{ability.powerModifier || 0}
                /
                {ability.toughnessModifier && ability.toughnessModifier >= 0 ? '+' : ''}{ability.toughnessModifier || 0}
              </div>
            </div>
          )}
          
          {/* ソース一覧 */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">
              付与元カード ({sources.reduce((sum, s) => sum + s.count, 0)}枚)
            </h4>
            <div className="space-y-2">
              {sources.map((source) => {
                const card = SLIVER_CARDS.find(c => c.id === source.cardId);
                if (!card) return null;
                
                // このカードが提供するP/T修正値を計算
                let cardPowerMod = 0;
                let cardToughnessMod = 0;
                if (ability.type === 'pt-modifier') {
                  card.abilities.forEach(ab => {
                    if (ab.type === 'pt-modifier') {
                      cardPowerMod += (ab.powerModifier || 0) * source.count;
                      cardToughnessMod += (ab.toughnessModifier || 0) * source.count;
                    }
                  });
                }
                
                return (
                  <div 
                    key={`${source.cardId}-${source.controller}`}
                    className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {card.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {card.nameEn}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={source.controller === 'ME' ? 'default' : 'destructive'}>
                        {source.controller}
                      </Badge>
                      <span className="font-bold text-lg text-slate-900 dark:text-slate-100">
                        ×{source.count}
                      </span>
                    </div>
                    {ability.type === 'pt-modifier' && (
                      <div className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                        ({cardPowerMod >= 0 ? '+' : ''}{cardPowerMod}/{cardToughnessMod >= 0 ? '+' : ''}{cardToughnessMod})
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 盤面編集へジャンプ */}
          {onEditField && (
            <Button 
              onClick={onEditField} 
              variant="outline" 
              className="w-full"
            >
              盤面を編集
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}