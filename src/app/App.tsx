import { useState, useMemo, useEffect } from 'react';
import { FieldCard, AggregatedAbility, SliverCard } from '@/app/types/sliver';
import { SLIVER_CARDS } from '@/app/data/slivers';
import { HomeScreen } from '@/app/components/HomeScreen';
import { SearchScreen } from '@/app/components/SearchScreen';
import { AddCardScreen } from '@/app/components/AddCardScreen';
import { EditFieldScreen } from '@/app/components/EditFieldScreen';

type Screen = 'home' | 'search' | 'add' | 'edit';

const LS_FIELD_KEY = 'sliver_field_v1';
const LS_RECENT_KEY = 'sliver_recent_v1';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [fieldCards, setFieldCards] = useState<FieldCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<SliverCard | null>(null);
  const [recentCards, setRecentCards] = useState<string[]>([]);

  // localStorage から復元（初回のみ）
  useEffect(() => {
    try {
      const rawField = localStorage.getItem(LS_FIELD_KEY);
      if (rawField) {
        const parsed = JSON.parse(rawField);
        if (Array.isArray(parsed)) setFieldCards(parsed);
      }
    } catch {}
  
    try {
      const rawRecent = localStorage.getItem(LS_RECENT_KEY);
      if (rawRecent) {
        const parsed = JSON.parse(rawRecent);
        if (Array.isArray(parsed)) setRecentCards(parsed);
      }
    } catch {}
  }, []);

  // localStorage に保存（fieldCards / recentCards が変わるたび）
  useEffect(() => {
    try {
      localStorage.setItem(LS_FIELD_KEY, JSON.stringify(fieldCards));
    } catch {}
  }, [fieldCards]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_RECENT_KEY, JSON.stringify(recentCards));
    } catch {}
  }, [recentCards]);

  // 能力を集計
  const aggregatedAbilities = useMemo(() => {
    const abilityMap = new Map<string, AggregatedAbility>();
    const ptModifierSources: AggregatedAbility['sources'] = [];

    fieldCards.forEach(fieldCard => {
      const card = SLIVER_CARDS.find(c => c.id === fieldCard.cardId);
      if (!card) return;

      card.abilities.forEach(ability => {
        // P/T修正値はすべて合算して1つにまとめる
        if (ability.type === 'pt-modifier') {
          // ✅ 自分に効くP/Tだけを対象にする（ALLは常に、YOUはME由来のみ）
          const appliesToMe =
            ability.scope === 'ALL' ||
            (ability.scope === 'YOU' && fieldCard.controller === 'ME');

          if (!appliesToMe) return;

          const existingSource = ptModifierSources.find(
            s => s.cardId === fieldCard.cardId && s.controller === fieldCard.controller
          );

          if (existingSource) {
            existingSource.count += fieldCard.count;
          } else {
            ptModifierSources.push({
              cardId: fieldCard.cardId,
              controller: fieldCard.controller,
              count: fieldCard.count,
            });
          }
        } else {
          // P/T修正値以外は従来通り個別に集計
          const existingKey = ability.id;
          
          if (abilityMap.has(existingKey)) {
            const existing = abilityMap.get(existingKey)!;
            const existingSource = existing.sources.find(
              s => s.cardId === fieldCard.cardId && s.controller === fieldCard.controller
            );
            
            if (existingSource) {
              existingSource.count += fieldCard.count;
            } else {
              existing.sources.push({
                cardId: fieldCard.cardId,
                controller: fieldCard.controller,
                count: fieldCard.count,
              });
            }
          } else {
            abilityMap.set(existingKey, {
              ability,
              sources: [{
                cardId: fieldCard.cardId,
                controller: fieldCard.controller,
                count: fieldCard.count,
              }],
            });
          }
        }
      });
    });

    // P/T修正値が1つ以上ある場合、合算
    if (ptModifierSources.length > 0) {
      // 合計値を計算
      let totalPower = 0;
      let totalToughness = 0;
      
      ptModifierSources.forEach(source => {
        const card = SLIVER_CARDS.find(c => c.id === source.cardId);
        if (card) {
          card.abilities.forEach(ability => {
            if (ability.type !== 'pt-modifier') return;

            // ✅ 自分に効くP/Tだけを足す（ALLは常に、YOUはME由来のみ）
            const appliesToMe =
              ability.scope === 'ALL' ||
              (ability.scope === 'YOU' && source.controller === 'ME');

            if (!appliesToMe) return;

            totalPower += (ability.powerModifier || 0) * source.count;
            totalToughness += (ability.toughnessModifier || 0) * source.count;
          });
        }
      });

      // 合算された能力を作成
      abilityMap.set('pt-modifier-combined', {
        ability: {
          id: 'pt-modifier-combined',
          text: `すべてのスリヴァー・クリーチャーは${totalPower >= 0 ? '+' : ''}${totalPower}/${totalToughness >= 0 ? '+' : ''}${totalToughness}の修正を受ける。`,
          type: 'pt-modifier',
          scope: 'ALL', // 実際には混在する可能性があるが、表示上はALLとする
          conditional: false,
          powerModifier: totalPower,
          toughnessModifier: totalToughness,
        },
        sources: ptModifierSources,
      });
    }

    return Array.from(abilityMap.values());
  }, [fieldCards]);

  // カード追加
  const handleAddCard = (cardId: string, controller: 'ME' | 'OPP', count: number) => {
    setFieldCards(prev => {
      const existing = prev.find(fc => fc.cardId === cardId && fc.controller === controller);
      if (existing) {
        return prev.map(fc =>
          fc.cardId === cardId && fc.controller === controller
            ? { ...fc, count: fc.count + count }
            : fc
        );
      }
      return [...prev, { cardId, controller, count }];
    });

    // 最近追加リストを更新
    setRecentCards(prev => {
      const filtered = prev.filter(id => id !== cardId);
      return [cardId, ...filtered].slice(0, 5);
    });

    setCurrentScreen('home');
  };

  // カード数更新
  const handleUpdateCount = (cardId: string, controller: 'ME' | 'OPP', delta: number) => {
    setFieldCards(prev =>
      prev
        .map(fc =>
          fc.cardId === cardId && fc.controller === controller
            ? { ...fc, count: Math.max(0, fc.count + delta) }
            : fc
        )
        .filter(fc => fc.count > 0)
    );
  };

  // カード削除
  const handleRemoveCard = (cardId: string, controller: 'ME' | 'OPP') => {
    setFieldCards(prev => prev.filter(fc => !(fc.cardId === cardId && fc.controller === controller)));
  };

  // コントローラー切替
  const handleSwitchController = (cardId: string, currentController: 'ME' | 'OPP') => {
    const newController = currentController === 'ME' ? 'OPP' : 'ME';
    setFieldCards(prev => {
      const card = prev.find(fc => fc.cardId === cardId && fc.controller === currentController);
      if (!card) return prev;

      const filtered = prev.filter(fc => !(fc.cardId === cardId && fc.controller === currentController));
      const existing = filtered.find(fc => fc.cardId === cardId && fc.controller === newController);

      if (existing) {
        return filtered.map(fc =>
          fc.cardId === cardId && fc.controller === newController
            ? { ...fc, count: fc.count + card.count }
            : fc
        );
      }

      return [...filtered, { ...card, controller: newController }];
    });
  };

  // リセット
  const handleReset = () => {
    if (confirm('盤面をリセットしてもよろしいですか？')) {
      setFieldCards([]);
      setRecentCards([]); // ✅ 追加（履歴もリセット）
    }
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'home' && (
        <HomeScreen
          fieldCards={fieldCards}
          aggregatedAbilities={aggregatedAbilities}
          onNavigateToSearch={() => setCurrentScreen('search')}
          onNavigateToEdit={() => setCurrentScreen('edit')}
        />
      )}

      {currentScreen === 'search' && (
        <SearchScreen
          recentCards={recentCards}
          onBack={() => setCurrentScreen('home')}
          onSelectCard={(card) => {
            setSelectedCard(card);
            setCurrentScreen('add');
          }}
        />
      )}

      {currentScreen === 'add' && selectedCard && (
        <AddCardScreen
          card={selectedCard}
          onBack={() => setCurrentScreen('search')}
          onAdd={handleAddCard}
        />
      )}

      {currentScreen === 'edit' && (
        <EditFieldScreen
          fieldCards={fieldCards}
          onBack={() => setCurrentScreen('home')}
          onUpdateCount={handleUpdateCount}
          onRemoveCard={handleRemoveCard}
          onSwitchController={handleSwitchController}
          onReset={handleReset}
        />
      )}
    </div>
  );
}