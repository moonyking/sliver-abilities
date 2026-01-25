import { SliverCard } from '@/app/types/sliver';

interface SliverCardItemProps {
  card: SliverCard;
  onClick?: () => void;
  showAbilities?: boolean;
}

export function SliverCardItem({ card, onClick, showAbilities = true }: SliverCardItemProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg border-2 border-slate-400/30 shadow p-3 ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}`}
    >
      {/* カード名とマナコスト */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="font-bold text-slate-900 dark:text-slate-100">
            {card.name}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {card.nameEn}
          </div>
        </div>
        <div className="text-xs font-mono text-slate-600 dark:text-slate-400 ml-2">
          {card.manaCost}
        </div>
      </div>
      
      {/* 能力抜粋 */}
      {showAbilities && (
        <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
          {card.abilities.slice(0, 2).map(ability => (
            <div key={ability.id}>
              {ability.keyword || ability.text.substring(0, 60) + (ability.text.length > 60 ? '...' : '')}
            </div>
          ))}
          {card.abilities.length > 2 && (
            <div className="text-slate-500">...他{card.abilities.length - 2}個</div>
          )}
        </div>
      )}
    </div>
  );
}
