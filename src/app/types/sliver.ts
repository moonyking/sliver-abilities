// スリヴァーカードの型定義
export type AbilityScope = 'ALL' | 'YOU';

export interface Ability {
  id: string;
  keyword?: string; // キーワード能力（飛行、速攻など）
  text: string; // 能力の詳細テキスト
  type: 'keyword' | 'defensive' | 'pt-modifier' | 'static' | 'triggered' | 'activated';
  scope: AbilityScope; // ALL: すべてのスリヴァー, YOU: あなたがコントロールするスリヴァー
  conditional: boolean; // 条件付き能力か
  conditionText?: string; // 条件のテキスト
  powerModifier?: number; // パワー修正値
  toughnessModifier?: number; // タフネス修正値
}

export interface SliverCard {
  id: string;
  name: string; // 日本語名
  nameEn: string; // 英語名
  manaCost: string; // マナコスト（プレースホルダー可）
  abilities: Ability[];
}

export interface FieldCard {
  cardId: string;
  controller: 'ME' | 'OPP';
  count: number;
}

export interface AggregatedAbility {
  ability: Ability;
  sources: {
    cardId: string;
    controller: 'ME' | 'OPP';
    count: number;
  }[];
}
