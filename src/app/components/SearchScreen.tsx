import { useState, useEffect, useRef } from 'react';
import { SliverCard } from '@/app/types/sliver';
import { SLIVER_CARDS } from '@/app/data/slivers';
import { SliverCardItem } from '@/app/components/SliverCardItem';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SearchScreenProps {
  recentCards: string[]; // カードID
  onBack: () => void;
  onSelectCard: (card: SliverCard) => void;
}

export function SearchScreen({ recentCards, onBack, onSelectCard }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState<SliverCard[]>(SLIVER_CARDS);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // 自動フォーカス
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // インクリメンタルサーチ
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCards(SLIVER_CARDS);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = SLIVER_CARDS.filter(card => {
      return (
        card.name.toLowerCase().includes(query) ||
        card.nameEn.toLowerCase().includes(query) ||
        card.abilities.some(ability => 
          ability.text.toLowerCase().includes(query) ||
          (ability.keyword && ability.keyword.toLowerCase().includes(query))
        )
      );
    });
    setFilteredCards(filtered);
  }, [searchQuery]);
  
  // 最近追加したカード
  const recentCardObjects = recentCards
    .map(id => SLIVER_CARDS.find(c => c.id === id))
    .filter(Boolean) as SliverCard[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* ヘッダー */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-700 p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
          <h1 className="text-xl font-bold text-white flex-1">スリヴァーを検索</h1>
        </div>
        
        {/* 検索入力 */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="カード名、能力で検索..."
          className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="p-4 space-y-4">
        {/* 最近追加したカード */}
        {!searchQuery && recentCardObjects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-400 mb-2">最近追加</h2>
            <div className="space-y-2">
              {recentCardObjects.slice(0, 3).map(card => (
                <SliverCardItem 
                  key={card.id}
                  card={card}
                  onClick={() => onSelectCard(card)}
                  showAbilities={false}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* 検索結果 */}
        <div>
          {searchQuery && (
            <h2 className="text-sm font-bold text-slate-400 mb-2">
              検索結果 ({filteredCards.length}件)
            </h2>
          )}
          <div className="space-y-2">
            {filteredCards.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                該当するカードが見つかりません
              </div>
            ) : (
              filteredCards.map(card => (
                <SliverCardItem 
                  key={card.id}
                  card={card}
                  onClick={() => onSelectCard(card)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
