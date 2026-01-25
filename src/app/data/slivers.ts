import { SliverCard } from '@/app/types/sliver';

// モックデータ：代表的なスリヴァーカード
export const SLIVER_CARDS: SliverCard[] = [
  {
    id: 'sliver-1',
    name: '筋肉スリヴァー',
    nameEn: 'Muscle Sliver',
    manaCost: '{1}{G}',
    abilities: [
      {
        id: 'ability-muscle-1',
        text: 'すべてのスリヴァー・クリーチャーは+1/+1の修正を受ける。',
        type: 'pt-modifier',
        scope: 'ALL',
        conditional: false,
        powerModifier: 1,
        toughnessModifier: 1,
      },
    ],
  },
  {
    id: 'sliver-2',
    name: '翼スリヴァー',
    nameEn: 'Winged Sliver',
    manaCost: '{1}{U}',
    abilities: [
      {
        id: 'ability-wing-1',
        keyword: '飛行',
        text: 'すべてのスリヴァー・クリーチャーは飛行を持つ。',
        type: 'keyword',
        scope: 'ALL',
        conditional: false,
      },
    ],
  },
  {
    id: 'sliver-3',
    name: '結晶スリヴァー',
    nameEn: 'Crystalline Sliver',
    manaCost: '{W}{U}',
    abilities: [
      {
        id: 'ability-crystal-1',
        keyword: '呪禁',
        text: 'すべてのスリヴァーは呪禁を持つ。',
        type: 'defensive',
        scope: 'ALL',
        conditional: false,
      },
    ],
  },
  {
    id: 'sliver-4',
    name: '心臓スリヴァー',
    nameEn: 'Heart Sliver',
    manaCost: '{1}{R}',
    abilities: [
      {
        id: 'ability-heart-1',
        keyword: '速攻',
        text: 'すべてのスリヴァー・クリーチャーは速攻を持つ。',
        type: 'keyword',
        scope: 'ALL',
        conditional: false,
      },
    ],
  },
  {
    id: 'sliver-5',
    name: '板金スリヴァー',
    nameEn: 'Plated Sliver',
    manaCost: '{W}',
    abilities: [
      {
        id: 'ability-plated-1',
        text: 'すべてのスリヴァー・クリーチャーは+0/+1の修正を受ける。',
        type: 'pt-modifier',
        scope: 'ALL',
        conditional: false,
        powerModifier: 0,
        toughnessModifier: 1,
      },
    ],
  },
  {
    id: 'sliver-6',
    name: '捕食スリヴァー',
    nameEn: 'Predatory Sliver',
    manaCost: '{1}{G}',
    abilities: [
      {
        id: 'ability-predatory-1',
        text: 'あなたがコントロールするスリヴァー・クリーチャーは+1/+1の修正を受ける。',
        type: 'pt-modifier',
        scope: 'YOU',
        conditional: false,
        powerModifier: 1,
        toughnessModifier: 1,
      },
    ],
  },
  {
    id: 'sliver-7',
    name: '歩哨スリヴァー',
    nameEn: 'Sentinel Sliver',
    manaCost: '{1}{W}',
    abilities: [
      {
        id: 'ability-sentinel-1',
        keyword: '警戒',
        text: 'あなたがコントロールするスリヴァー・クリーチャーは警戒を持つ。',
        type: 'keyword',
        scope: 'YOU',
        conditional: false,
      },
    ],
  },
  {
    id: 'sliver-8',
    name: '双頭スリヴァー',
    nameEn: 'Two-Headed Sliver',
    manaCost: '{1}{R}',
    abilities: [
      {
        id: 'ability-twoheaded-1',
        keyword: '威迫',
        text: 'すべてのスリヴァー・クリーチャーは威迫を持つ。',
        type: 'keyword',
        scope: 'ALL',
        conditional: false,
      },
    ],
  },
  {
    id: 'sliver-9',
    name: '有毒スリヴァー',
    nameEn: 'Virulent Sliver',
    manaCost: '{G}',
    abilities: [
      {
        id: 'ability-virulent-1',
        keyword: '毒性1',
        text: 'すべてのスリヴァー・クリーチャーは「このクリーチャーがプレイヤーに戦闘ダメージを与えるたび、そのプレイヤーは毒カウンターを1個得る。」を持つ。',
        type: 'triggered',
        scope: 'ALL',
        conditional: true,
        conditionText: 'プレイヤーに戦闘ダメージを与えたとき',
      },
    ],
  },
  {
    id: 'sliver-10',
    name: '共用スリヴァー',
    nameEn: 'Gemhide Sliver',
    manaCost: '{1}{G}',
    abilities: [
      {
        id: 'ability-gemhide-1',
        text: 'すべてのスリヴァー・クリーチャーは「{T}: あなたのマナ・プールに好きな色のマナ1点を加える。」を持つ。',
        type: 'activated',
        scope: 'ALL',
        conditional: false,
      },
    ],
  },
  {
    id: 'sliver-11',
    name: '守護スリヴァー',
    nameEn: 'Ward Sliver',
    manaCost: '{4}{W}',
    abilities: [
      {
        id: 'ability-ward-1',
        text: 'あなたがコントロールするスリヴァー・クリーチャーが与えられる、スリヴァーでない発生源からのダメージをすべて軽減する。',
        type: 'static',
        scope: 'YOU',
        conditional: true,
        conditionText: 'スリヴァーでない発生源からのダメージ',
      },
    ],
  },
  {
    id: 'sliver-12',
    name: '先制スリヴァー',
    nameEn: 'Striking Sliver',
    manaCost: '{R}',
    abilities: [
      {
        id: 'ability-striking-1',
        keyword: '先制攻撃',
        text: 'あなたがコントロールするスリヴァー・クリーチャーは先制攻撃を持つ。',
        type: 'keyword',
        scope: 'YOU',
        conditional: false,
      },
    ],
  },
  {
    id: 'sliver-13',
    name: '巨体スリヴァー',
    nameEn: 'Megantic Sliver',
    manaCost: '{5}{G}{W}',
    abilities: [
      {
        id: 'ability-megantic-1',
        text: 'あなたがコントロールするスリヴァー・クリーチャーは+3/+3の修正を受ける。',
        type: 'pt-modifier',
        scope: 'YOU',
        conditional: false,
        powerModifier: 3,
        toughnessModifier: 3,
      },
    ],
  },
  {
    id: 'sliver-14',
    name: '鎧スリヴァー',
    nameEn: 'Armored Sliver',
    manaCost: '{2}{W}',
    abilities: [
      {
        id: 'ability-armored-1',
        text: 'すべてのスリヴァー・クリーチャーは+0/+1の修正を受ける。',
        type: 'pt-modifier',
        scope: 'ALL',
        conditional: false,
        powerModifier: 0,
        toughnessModifier: 1,
      },
    ],
  },
  {
    id: 'sliver-15',
    name: '跳躍スリヴァー',
    nameEn: 'Shifting Sliver',
    manaCost: '{3}{U}',
    abilities: [
      {
        id: 'ability-shifting-1',
        text: 'すべてのスリヴァー・クリーチャーは「スリヴァー・クリーチャーはブロックされない。」を持つ。',
        type: 'static',
        scope: 'ALL',
        conditional: false,
      },
    ],
  },
];
