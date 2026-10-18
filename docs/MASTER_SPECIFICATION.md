# NezUI Master Design & Architecture Specification

**Version:** 1.0.0 — Initial Design Specification  
**Project:** NezUI（ネズユーアイ）  
**Type:** React UI Component Library / Design System  
**Slogan:** Thoughtfully crafted interfaces.  
**License:** MIT  
**Status:** 設計確定・実装準備段階

この文書はNezUIの設計・実装・公開に関する単一の基準文書（Single Source of Truth）である。実装、ドキュメント、配布物に関する判断は本仕様に従う。仕様変更はこの文書に反映し、関連する実装とドキュメントの整合性を保つ。

## 1. プロジェクト概要

### 1.1 NezUIとは

NezUIはReactとTypeScriptによる軽量・高品質・高機能なUIコンポーネントライブラリである。Apple Human Interface Guidelines（HIG）から視覚的階層、自然な操作感、情報整理、アクセシビリティの設計思想を参考にするが、既存UIの単純な模倣はしない。独自性は装飾ではなく、細部まで一貫した品質と自然な使いやすさで表現する。

### 1.2 目標

開発者が複雑なUI設計を繰り返さず、少ないコードで美しく使いやすいアプリを構築できる状態を目指す。利用者が説明なしに操作でき、長時間使っても疲れにくく、視覚的な違和感がないことを重視する。

### 1.3 デザイン哲学

**Beautiful by nature. Effortless by design.** 美しさは装飾の追加ではなく、情報の優先順位、余白、コントラスト、形状、文字、操作反応を合理的に組み合わせた結果とする。芸術的な独創性より、幅広い人が自然に美しいと感じる普遍性を優先する。

基本原則：

1. **Clarity — 明瞭性:** 情報と操作方法が一目で分かる。
2. **Restraint — 抑制:** 不要な装飾、演出、アニメーションを加えない。
3. **Consistency — 一貫性:** 余白、文字、色、形状、操作感を統一する。
4. **Responsiveness — 応答性:** 操作に対して即座に明確なフィードバックを返す。
5. **Accessibility — アクセシビリティ:** マウス、タッチ、キーボード、支援技術から自然に使える。

## 2. ブランドとビジュアルアイデンティティ

正式名称は**NezUI**、旧名称はAuvryn UI。コード、ドキュメント、配布物ではNezUIに統一する。ロゴは視認性の高いシンプルなサンセリフ体を基本とし、過剰な装飾や立体化を避ける。

目指す印象は、静かで落ち着き、高級感と精密さがあり、柔らかいが幼稚でなく、モダンだが流行に依存せず、視認性が高く長時間見ても疲れにくいこと。ブラック、グラファイト、チャコール、シルバー、オフホワイトを中心に、背景と明度の異なるパネルで階層を作る。鮮やかなグラデーションや発光表現に頼らない。

採用しない表現：意味のないホバー拡大、過剰なバウンス、マウス追従、常時動く装飾、過剰なGlassmorphism、強いネオン色や不必要なグラデーション、装飾目的の3D、過大な角丸、読みにくい細字、小さすぎる操作領域、複雑で予測不能な操作、見た目を優先したアクセシビリティの犠牲。UIの意味や操作を改善しない視覚効果は採用しない。

## 3. 技術構成

| 分野 | 採用技術 |
| --- | --- |
| 言語・コンポーネント | TypeScript、React / TSX |
| スタイル・トークン | Vanilla CSS、CSS Custom Properties |
| 開発・ビルド | Vite、tsup（初期候補） |
| テスト | Vitest、React Testing Library、Playwright、axe-core |
| ドキュメント | React製の独自サイト |
| パッケージ管理・配布 | pnpm、npm |
| モジュール形式・ライセンス | ESM、MIT |

依存関係を少なくし、導入先への影響を抑える。ただしアクセシビリティ、正確性、保守性を犠牲にしない。ビルド・テストツールは開発依存とし、利用者のアプリに不要なコードを含めない。

### 3.1 ReactとTypeScript

初期リリースはReact専用で、React 19を基準とする。React 18対応は互換性テスト後に決定し、Vue・Svelteなどへの同時対応はしない。デザイントークンはフレームワークから独立させる。

TypeScript Strict Modeを有効にし、Props、イベント、Refを正確に型定義する。自然な補完を提供し、不要な型キャストと`any`を避ける。

### 3.2 CSS

CSS Modules、Tailwind CSS、CSS-in-JSを標準基盤にせず、通常のCSSとCSS Custom Propertiesを使う。スタイルは明示的なクラス名で管理し、グローバルクラス名には`nezui-`プレフィックスを付ける。テーマ切替はCSS変数と`data-*`属性を中心に行う。

## 4. デザインシステム

### 4.1 テーマ

標準モードはLight、Dark、Auto。ブランドの標準表示はDarkだが、導入側が初期テーマを指定できる。Autoは`prefers-color-scheme`に追従する。

| Token | Dark | Light |
| --- | --- | --- |
| Canvas | `#08090B` | `#F6F7F9` |
| Surface | `#101114` | `#FFFFFF` |
| Surface Raised | `#17191D` | `#FBFBFC` |
| Surface Elevated | `#202227` | — |
| Surface Interactive | `#292C32` | `#ECEEF1` |
| Border | `#303238` | `#D8DADE` |
| Text Primary | `#F6F7F9` | `#151619` |
| Text Secondary | `#A9ADB5` | `#555B64` |
| Text Muted | `#8C919B` | — |
| Action Primary | `#F6F7F9` | `#16181C` |
| Action Text | `#101114` | `#FFFFFF` |

値は初期基準であり、視覚検証とコントラスト検証後に調整する。

### 4.2 色、余白、形状

標準アクセントはニュートラル。Blue、Violet、Pink、Red、Orange、Yellow、Green、Cyanを追加設定として用意し、選択、フォーカス、Sliderなどに限定して使う。Success、Warning、Errorは意味色としてアクセント色と分離する。

余白の基本単位は4px。基準スケールは4、8、12、16、20、24、32、40、48、64px。意味のあるグループを作り、関係する情報は近づけ、独立した情報は離す。標準カード内余白は16〜24px。

| 対象 | 初期値 |
| --- | ---: |
| Small Controls | 6px |
| Button / Input | 10px |
| Card | 14px |
| Large Panel | 18px |
| Dialog | 20px |
| Pill | 9999px |

角丸はトークンから制御し、入れ子の形状が自然につながるよう調整する。

### 4.3 タイポグラフィ、境界、影

システムフォントを基本とし、Interは任意導入・外部読み込みなしとする。フォントスタックは`Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`。Hero 48px、Page Heading 32px、Section Heading 24px、Card Heading 16px、Body 14〜16px、Label 14px、Caption 12pxを初期値とする。本文行間は約1.5、ウェイトは400、500、600、700を基本とする。

境界線は原則1px。通常カードは控えめな境界線で区別する。Dropdown、Popover、Dialogなどの浮遊要素には深さを示す自然な影を使い、装飾として強調しない。半透明や背景ぼかしは意味のある浮遊パネルやオーバーレイに限定し、可読性を保てない場合は不透明にする。

## 5. アニメーション

アニメーションは操作結果や状態変化を理解するために使う。静止状態では原則動かさず、短く自然で妨げにならないことを優先する。

| 動作 | 初期時間 |
| --- | ---: |
| Press / Hover | 100ms |
| State Change | 140ms |
| Dropdown | 160ms |
| Tooltip | 140ms |
| Dialog Open | 220ms |
| Dialog Close | 160ms |
| Toast | 200ms |

Buttonはホバーで軽く明度を変え、標準では拡大しない。押下時は色や陰影を即時に変える。Dialogは短いフェードと微小なScale、DropdownはOpacityと2〜4pxの移動、Segmented Controlはインジケーター移動、Toastは短いフェードまたは小さな移動を使う。Springはドラッグ後の収束など自然な場合に限定し、強い反動や反復バウンスを避ける。

`prefers-reduced-motion: reduce`に対応し、不要な移動・拡大・バネ表現を抑える。動きがなくても状態変化と操作結果を理解できるようにする。

## 6. コンポーネント

### 6.1 共通仕様

各コンポーネントはTypeScript Props、`className`、`style`、Ref、Disabled、Focus Visible、キーボード操作、必要なARIA、テーマ、トークン上書き、SSR互換性、適切なHTML属性継承を考慮する。Controlled / Uncontrolledの双方が必要な場合はReactの慣例に沿う。

### 6.2 基本コンポーネント

| Component | 主な機能 |
| --- | --- |
| Button | Primary / Secondary / Ghost / Destructive |
| IconButton | アイコンのみ、アクセシブルな名前 |
| Input | Text / Email / Password / Validation |
| Textarea | 複数行、Resize |
| Checkbox | Checked / Unchecked / Indeterminate |
| Radio | Radio Group / Keyboard Navigation |
| Switch | On / Off |
| NativeSelect | ネイティブフォームコントロール |
| Badge | Neutral / Success / Warning / Error |
| Card | Surface / Header / Body / Footer |
| Separator | Horizontal / Vertical |

### 6.3 インタラクティブコンポーネント

Dialog（Modal / Focus Trap / Escape）、Select（Custom Listbox / Keyboard Support）、Tabs、SegmentedControl、Popover（Positioning / Dismiss）、Tooltip（Hover / Focus）、Toast、Slider、Progress（Determinate / Indeterminate）、Accordion。

### 6.4 追加候補

SearchField、Spinner、Skeleton、Avatar、ScrollArea、DropdownMenu、ContextMenu、Alert、Breadcrumb、Pagination。初期リリースでは基本コンポーネントを優先し、一括追加より個々の品質を優先する。

## 7. 主な操作仕様

- **Button:** Small / Medium / Large。Primary、Secondary、Subtle、Outline、Ghost、Destructive。Loading中に寸法を不自然に変えず、Disabled / Loading時の操作を適切に制御する。IconButtonにはスクリーンリーダー向けの名前を付ける。
- **Input:** Label、Description、Error Messageを組み合わせ可能にする。明瞭なフォーカスリングまたは境界を示す。エラーを色だけで表さず、テキストでも説明する。
- **Dialog:** フォーカス制御、背景操作の制限、Escape、閉じた後のフォーカス復帰を提供する。破壊的操作には明確な警告とDestructive Buttonを置く。
- **Select:** 初期段階ではNativeSelectを提供する。カスタムSelectは別コンポーネントとし、ARIA Listboxパターン、キーボード操作、画面端での位置調整、スクロール、フォーカス管理を扱う。
- **Tooltip:** 補助情報に使い、主要操作の説明をTooltipだけに依存させない。マウスとキーボードフォーカスの両方に対応する。
- **Toast:** 重要度に応じて表示時間と終了方法を選ぶ。対応が必要な通知や重要エラーを自動終了で見逃させない。

## 8. アクセシビリティ

目標はWCAG 2.2 AA。キーボード、スクリーンリーダー、セマンティックHTML、明瞭なフォーカス表示、色に依存しない状態、十分なコントラスト、文字拡大、十分な操作領域、Reduced Motion、適切なフォーカス復帰を必須品質とする。通常文字は原則4.5:1以上を目標とし、重要なUI境界・状態にも十分なコントラストを確保する。タップ領域は可能な限り44×44px程度とする。適切なネイティブHTML要素を独自実装より優先する。

## 9. テーマエンジン

React Contextによる`ThemeProvider`を提供し、Theme Mode、Accent Color、Border Radius、Motion Preferenceを設定可能にする。CSS変数を中心に適用する。基本形：

```html
<div data-nezui-theme="dark">
  <!-- NezUI components -->
</div>
```

初期テーマの設定・保存は導入アプリ側でも管理できる。SSRでは初期テーマのちらつきとHydration不一致に配慮する。

## 10. リポジトリ構成

```text
nezui/
├── apps/
│   ├── docs/                 # 公式ドキュメントサイト
│   └── playground/           # 試用環境
├── packages/
│   ├── ui/src/
│   │   ├── components/       # button/, input/, dialog/ ...
│   │   ├── hooks/
│   │   ├── primitives/
│   │   ├── providers/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── index.ts
│   └── tokens/src/
├── tests/
├── .github/workflows/
├── AGENTS.md
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
├── package.json
└── pnpm-workspace.yaml
```

コンポーネント、スタイル、テスト、ドキュメントを整理する。不要な階層や抽象化を避け、共有処理は複数箇所で必要になった時点で共通化する。

## 11. パッケージと公開

公開候補は`@nezui/ui`。npmのスコープ・パッケージ名の利用可否を公開前に確認する。利用例：

```tsx
import { Button } from "@nezui/ui";
import "@nezui/ui/styles.css";

export function App() {
  return <Button variant="primary">Get Started</Button>;
}
```

ESM、TypeScript Declarations、Source Maps、Tree Shaking、明示的なCSSエントリ、Package Exportsを提供する。ReactはpeerDependencyとする。未使用JavaScriptを除去でき、CSSがTree Shakingで誤除去されない構成にする。

Semantic Versioningを採用する。初期公開は0.x系とし、主要コンポーネントと公開APIの安定後に1.0.0へ進む。破壊的変更を明記し、Changelogを継続更新する。

## 12. 公式ドキュメント

ページはHome、Getting Started、Installation、Components、Theming、Design Tokens、Accessibility、Playground、Changelog。黒を中心とした背景、左ナビゲーション、中央のプレビューと説明、上部の検索・テーマ切替を基本構成とし、カード・入力・ボタンにはNezUI自身のコンポーネントを使う。

コンポーネント検索、動作するプレビュー、コードコピー、Props一覧、サイズ・Variant・テーマ切替、アクセント変更、レスポンシブ表示、キーボード操作説明、アクセシビリティ注意事項を提供する。プレビューはnpm配布対象と同じ実装を使い、見た目だけのダミーを使わない。

## 13. パフォーマンス

導入アプリを不必要に重くせず、必要なコンポーネントだけを利用可能にする。低性能端末でも基本操作を快適にする。不必要なReact再描画を避け、CSSによる状態表現を優先し、イベントリスナーを解除し、重いアニメーション依存、レイアウトスラッシング、不要DOMを避ける。SSRに対応し、非表示コンポーネントの処理を抑える。

Bundle Size、Gzip、Brotli、CSS Size、Rendering Cost、Interaction Latency、Memory Usage、Animation PerformanceをCIまたはベンチマークで継続計測する。容量目標は初回ベンチマークから定める。

## 14. テストと品質保証

使用技術はVitest、React Testing Library、Playwright、axe-core。検証対象は正常描画、Props、イベント、キーボード、フォーカス、ARIA、テーマ、Reduced Motion、SSR / Hydration、レスポンシブ、Visual Regression、実パッケージ利用。主要ブラウザはChrome、Firefox、Safari。Windows、macOS、iOS、Androidも考慮する。

## 15. セキュリティと安定性

任意HTMLの挿入を避け、ユーザー入力を無条件にHTMLとして解釈しない。`dangerouslySetInnerHTML`は原則避ける。外部依存を定期監査し、タイマー・Observerを解放する。SSRでブラウザAPIを前提にせず、コンポーネントの例外でアプリ全体を壊さない設計を心がける。

## 16. 開発ワークフローと完成条件

実装順序：要件決定 → API設計 → アクセシビリティ設計 → TypeScript実装 → Vanilla CSS → テスト → ドキュメント → ビジュアル検証 → パフォーマンス測定 → 完成条件確認。

コンポーネントは、意図した動作、Reactの慣例、正確な型、キーボード操作、支援技術で分かる状態、Dark / Light双方の自然さ、統一された余白・角丸・文字、不要な動きの不在、テスト通過、ドキュメント、ビルド後の正常動作を満たす。見た目だけ完成したものは公開しない。

## 17. ロードマップ

1. **Foundation:** GitHub初期化、pnpm workspace、TypeScript、React、ビルド、トークン、CSS基盤、ThemeProvider、テスト環境、Docs土台。
2. **Core UI:** Button、IconButton、Input、Textarea、Checkbox、Radio、Switch、NativeSelect、Badge、Card、Separator。
3. **Interactive UI:** Dialog、Select、Tabs、SegmentedControl、Popover、Tooltip、Toast、Slider、Progress、Accordion。
4. **Experience & Quality:** テーマ・モーション調整、Docs完成、アクセシビリティ監査、性能最適化、ブラウザ互換性、Visual Regression、API統一。
5. **Distribution:** npm公開、GitHub Release、導入ガイド、例、Changelog、MIT License、公開後の改善フロー。

## 18. AI開発エージェント向けルール

1. 本仕様を基準にする。
2. 既存実装との視覚・技術的一貫性を保つ。
3. UIを過剰に装飾しない。視覚効果には明確な目的を持たせる。
4. 型安全性とVanilla CSS方針を守る。
5. 不要な依存を追加せず、React標準のAPI慣例に従う。
6. アクセシビリティを後回しにしない。
7. ダミー実装を完成扱いせず、実装とドキュメントを一致させる。
8. 動作を確認せずに保証を宣言しない。
9. 性能改善は計測結果に基づいて行う。
10. 作業後に変更点、確認結果、残課題を報告する。

設計に迷ったら、使いやすさ、明瞭性、一貫性を優先する。

## 19. 最終品質基準

- **Visual:** 自然で、長時間使っても疲れない。
- **Usability:** 説明がなくても操作を理解できる。
- **Consistency:** 全コンポーネントが一つの設計思想で統一されている。
- **Accessibility:** 多様な入力方法と支援技術から利用できる。
- **Performance:** 不要な処理や依存がない。
- **Developer Experience:** 少ないコードで直感的に使える。
- **Maintainability:** 将来の変更と拡張に耐えられる。

## 20. 結論

NezUIは豪華な装飾で品質を演出するライブラリではない。整理されたレイアウト、自然なコントラスト、統一された形状、適切な余白、正確な操作反応で高品質を実現する。アニメーションは必要なときだけ存在し、操作対象は明確で、導入先は内部実装を意識せず安心して利用できる。目的は美しい部品の提供に留まらず、誰もが優れたユーザー体験を簡単に実現できる状態を作ることである。

---

**NezUI — Thoughtfully crafted interfaces.**  
End of Master Specification — v1.0.0 Draft

## 21. コンポーネント集の実装方針（2026-10-17）

ユーザー承認済みの作業画面を維持し、コンポーネント集を拡張する。大きな宣伝文句や均一なカード一覧を主役にせず、左側のカテゴリ別ナビゲーション、中央の実物とコード、右側の設定・操作説明を基本とする。

### 21.1 ビジュアルの更新

「既存UIから一味変えたモダンな外観」という追加要件に合わせ、青みを抑えたグラファイト、穏やかな内側のハイライト、淡いミントの選択色を採用する。ミントは選択・フォーカス・進捗のための色として使う。常時動く装飾、強い発光、意味のない拡大は追加しない。

ダーク基準: Canvas `#0D0F10`、Surface `#141718`、Raised `#1C2021`、Interactive `#2B3031`、Border `#363E40`、Text `#EDF1EF`、Secondary `#A5B0AC`、Action `#E4ECE8`、Action Text `#17241F`、Accent `#B1D9C5`。ライト基準: Canvas `#F1F4F1`、Surface `#FFFFFF`、Raised `#F7F9F7`、Interactive `#E4EAE5`、Border `#CBD5CE`、Text `#1B2922`、Secondary `#52635A`、Action `#263D32`、Action Text `#FFFFFF`、Accent `#32654C`。この調整は4章の初期値に優先する。

### 21.2 実装と公開状態

カタログは31コンポーネントとMotionの32項目。すべて`@nezui/ui`から同一の実装を読み込む。モーションはFade / Rise / Scale / Slideの4種類、100〜400msを比較でき、表示・非表示を途中でも反転できる。OSのReduced Motionとプレビュー内の明示設定に対応する。

各項目に使用例と操作説明を併記する。使用例で参照するstateやイベント処理はアプリ側の責務である。カタログの掲載をnpm公開・WCAG適合・全ブラウザ対応の保証とは扱わない。

カスタムSelectとメニューはネイティブPopover APIを土台に、画面端の位置補正、キーボード移動、Escape、フォーカス復帰を提供する。汎用Popoverは現段階では中央配置。ContextMenuにはタッチ用の操作ボタンを併設する。Toastは手動終了を標準とし、自動消去しない。Avatarは名前のイニシャル表示。Skeletonは静的表示。SegmentedControlは選択面の色が遷移する方式で、追従するスプリングインジケーターは未実装。

ThemeProvider、追加アクセント全色、フォームresetとカスタムSelectの同期、複雑な入れ子オーバーレイ、読み上げ実機確認、Firefox/Safari確認、公開APIの最終統一はリリース前に残る。基盤とカタログの提供をもって、元の全ロードマップが完了したとは扱わない。

## 22. AIハーネスUI（2026-10-17）

ユーザー要望により、チャット入力・添付・音声状態・モデル選択・@と/の候補・会話管理・ツール実行・承認・成果物・コンテキスト使用量をカタログへ追加した。個別部品と統合例の計16項目を追加し、カタログは48項目となった。機能の分担、公開Propsの利用契約、デモと実サービスの境界は[HARNESS_UI.md](HARNESS_UI.md)に記録する。

アイコンは提供画像の太めで丸い線を基準とし、24pxグリッド／線幅2.6／round capとround joinに統一する。既存のチェック、閉じる、選択矢印にも適用する。AI入力欄は複数行の入力と横並びの操作を包むため24pxの角丸を採用し、通常のButton/Inputの角丸は10pxを維持する。

## 23. 選択パターンと重複防止

追加要件に合わせ、選択を意味で分けて3部品を追加する。カタログは51項目。

| 部品 | 用途 | 再利用する基盤 |
| --- | --- | --- |
| ChoiceGroup | 単一・複数のフォーム値選択。list / cards / chipsを指定 | Radio / Checkbox |
| NavigationItem | チャット、設定、フォルダの現在地。補足、アイコン、件数を指定 | native button / aria-current |
| ToggleButton | 独立したON/OFFの操作 | Button / aria-pressed |

IconButtonはButtonを内部で再利用し、shape（rounded / circle）、size、variant、childrenで外観を切り替える。送信・追加・設定などアイコンだけが異なるボタンを別部品にしない。AIComposerの送信・停止もこの仕組みに統一する。VoiceInputButtonなどは音声状態という独自の意味を持つため、薄い組み合わせ部品として維持する。

ChatSidebarの項目はNavigationItemに移行。Selectは別コンポーネントを増やさずdescriptionを追加し、説明付き候補に対応する。ChoiceGroupはcontrolled / uncontrolled、disabled、nameによるフォーム送信、refに対応する。複数選択は配列、単一選択は文字列で型を分離する。全選択は既存Checkboxのchecked / indeterminateと組み合わせる。

NavigationItem内に他の操作要素を入れない。trailingは件数など非操作の表示に使用し、メニュー・削除は兄弟要素として置く。ChoiceGroupとSegmentedControlはフォーム選択、Tabsはパネル切替、NavigationItemは現在地、ToggleButtonは独立した状態という役割を維持する。

## 24. 全体再設計 — Ink & Porcelain

全51項目の見本を撮影して比較し、「温かい白・深い墨色・杏色の選択面」という新しい方向へ更新する。この章は21章のミント配色と従来のブランド表示の初期方針に優先する。カタログはLightで起動し、ライブラリはDark / Light / Autoの指定を引き続き提供する。

- 面は不透明。Dialog背景のぼかしを廃止し、深さは境界・下端・小さな影で示す。
- Light: Canvas `#EEECE4`、Surface `#FAF9F4`、Raised `#FFFFFF`、Text `#252D26`、Secondary `#586354`、Action `#263E30`、Accent `#85491F`、Selected `#F4E3D1`。
- Dark: Canvas `#171715`、Surface `#20211E`、Raised `#292B26`、Text `#F3F0E7`、Secondary `#B8BDAF`、Action / Accent `#EFBD8C`、Selected `#40352A`。
- 操作は8pxの角丸を基準に、Card・Composer・通知の右下は小さくして形の関係を揃える。太いアイコンは維持する。
- Buttonは2px押し下がり、下端の影が縮む。入力はfocusで面と下線が変わる。ChoiceGroupは選択面と端の線で区別する。TabsとSegmentedControlには選択先へ移動するインジケーターを用意する。Sliderは細長い角丸のつまみを使う。AccordionとToolRunは開閉状態を背景と回転で示す。

アニメーションは100〜200msを中心とし、操作がないときの装飾アニメーションは追加しない。Reduced Motionでは押下の移動、インジケーターの補間、開閉の回転遷移を停止する。選択状態とフォーカスは静止状態でも識別できるようにする。

確認資料: `artifacts/design-audit-before.png`と`artifacts/design-audit-after.png`に全項目の撮影一覧を保存。Chromiumで51項目×2テーマ×3画面幅の306通り、選択・ハーネスの操作回帰を確認する。スクリーンリーダー実機・Safari/Firefox・全面的なWCAG監査は別途必要。



ダーク表示の改善では、ナビ・補助文・設定・使用例の最小文字サイズを13px、入力ラベルを14pxにし、500相当の太さと行間1.7以上を適用する。

