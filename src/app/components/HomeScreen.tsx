import { useState } from 'react';
import { AggregatedAbility, FieldCard } from '@/app/types/sliver';
import { AbilityCard } from '@/app/components/AbilityCard';
import { AbilityDetailSheet } from '@/app/components/AbilityDetailSheet';
import { Button } from '@/app/components/ui/button';
import { Search, Edit3 } from 'lucide-react';

interface HomeScreenProps {
  fieldCards: FieldCard[];
  aggregatedAbilities: AggregatedAbility[];
  onNavigateToSearch: () => void;
  onNavigateToEdit: () => void;
}

export function HomeScreen({ 
  fieldCards, 
  aggregatedAbilities, 
  onNavigateToSearch,
  onNavigateToEdit 
}: HomeScreenProps) {
  const [selectedAbility, setSelectedAbility] = useState<AggregatedAbility | null>(null);
  
  // ME/OPPの枚数カウント
  const meCount = fieldCards.filter(c => c.controller === 'ME').reduce((sum, c) => sum + c.count, 0);
  const oppCount = fieldCards.filter(c => c.controller === 'OPP').reduce((sum, c) => sum + c.count, 0);
  
  // 能力をタイプ別にソート
  const sortedAbilities = [...aggregatedAbilities].sort((a, b) => {
    const typeOrder = {
      'keyword': 1,
      'defensive': 2,
      'pt-modifier': 3,
      'static': 4,
      'triggered': 5,
      'activated': 6,
    };
    return typeOrder[a.ability.type] - typeOrder[b.ability.type];
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Sliver Abilities</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onNavigateToEdit}
          >
            <Edit3 className="h-5 w-5 text-white" />
          </Button>
        </div>
        
        {/* 検索バー */}
        <button
          onClick={onNavigateToSearch}
          className="w-full bg-slate-800 text-slate-400 rounded-lg px-4 py-3 text-left flex items-center gap-2 active:bg-slate-700 transition-colors"
        >
          <Search className="h-5 w-5" />
          <span>スリヴァーを検索...</span>
        </button>
        
        {/* サマリー */}
        <div className="mt-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">ME:</span>
            <span className="font-bold text-blue-400 text-lg">{meCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">OPP:</span>
            <span className="font-bold text-red-400 text-lg">{oppCount}</span>
          </div>
        </div>
      </div>
      
      {/* 能力一覧 */}
      <div className="p-4 space-y-3">
        {sortedAbilities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">
              盤面にスリヴァーがありません
            </p>
            <Button onClick={onNavigateToSearch}>
              スリヴァーを追加
            </Button>
          </div>
        ) : (
          <>
            <div className="text-sm text-slate-400 mb-2">
              {sortedAbilities.length}個の能力
            </div>
            {/* 2列グリッドレイアウト */}
            <div className="grid grid-cols-2 gap-3">
              {sortedAbilities.map((agg, index) => (
                <AbilityCard 
                  key={`${agg.ability.id}-${index}`}
                  aggregatedAbility={agg}
                  onClick={() => setSelectedAbility(agg)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* 能力詳細ボトムシート */}
      {selectedAbility && (
        <AbilityDetailSheet 
          aggregatedAbility={selectedAbility}
          onClose={() => setSelectedAbility(null)}
          onEditField={() => {
            setSelectedAbility(null);
            onNavigateToEdit();
          }}
        />
      )}
    </div>
  );
}