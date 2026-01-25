import { AggregatedAbility } from '@/app/types/sliver';
import { Badge } from '@/app/components/ui/badge';

interface AbilityCardProps {
  aggregatedAbility: AggregatedAbility;
  onClick: () => void;
}

export function AbilityCard({ aggregatedAbility, onClick }: AbilityCardProps) {
  const { ability, sources } = aggregatedAbility;
  
  // 能力の要約テキスト
  const getSummary = () => {
    if (ability.keyword) {
      return ability.keyword;
    }
    if (ability.type === 'pt-modifier') {
      const sign = (ability.powerModifier || 0) >= 0 ? '+' : '';
      const tSign = (ability.toughnessModifier || 0) >= 0 ? '+' : '';
      return `${sign}${ability.powerModifier || 0}/${tSign}${ability.toughnessModifier || 0}`;
    }
    return ability.text.substring(0, 50) + (ability.text.length > 50 ? '...' : '');
  };

  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-b from-amber-50 to-amber-100 dark:from-slate-800 dark:to-slate-900 rounded-lg border-2 border-amber-900/20 shadow-md p-3 cursor-pointer active:scale-[0.98] transition-transform"
    >
      {/* カードタイトルバー */}
      <div className="flex items-start justify-between mb-2 gap-1">
        <div className="flex-1 min-w-0">
          <span className="font-bold text-base text-slate-900 dark:text-slate-100 block">
            {getSummary()}
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end flex-shrink-0">
          <Badge 
            variant={ability.scope === 'ALL' ? 'default' : 'secondary'}
            className="text-xs font-bold"
          >
            {ability.scope}
          </Badge>
          {ability.conditional && (
            <Badge variant="outline" className="text-xs">
              条件
            </Badge>
          )}
        </div>
      </div>
      
      {/* 能力テキスト抜粋 - コンパクト版 */}
      <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-2">
        {ability.text}
      </div>
      
      {/* ソース数表示 */}
      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {sources.reduce((sum, s) => sum + s.count, 0)}枚
      </div>
    </div>
  );
}