import { choiceEntries, ChoiceDemo, IconButtonVariants, type ChoiceName } from './choice-catalog';
import { harnessEntries, HarnessDemo, type HarnessName } from './harness-catalog';
import { useState } from 'react';
import { Icon, SearchField, Select, DropdownMenu, ContextMenu, Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Card, Checkbox, IconButton, Motion, NativeSelect, Pagination, Popover, Progress, Radio, ScrollArea, SegmentedControl, Separator, Skeleton, Slider, Spinner, Switch, Tabs, Textarea, Toast, Tooltip, type MotionPreset } from '@nezui/ui';

export const catalog = {
 ...harnessEntries,
 ...choiceEntries,
 SearchField: { group: 'フォーム', description: '入力した言葉で、必要な項目に絞り込む。', code: '<SearchField label="ファイルを検索" value={query}\n  onChange={e => setQuery(e.target.value)} />', guide: 'ネイティブのsearch入力です。検索ロジックは利用側で定義します。この見本はファイル名を絞り込みます。' },
 Select: { group: 'フォーム', description: '統一された見た目で、選択肢を探す。', code: '<Select label="公開範囲" options={[\n  { value: "private", label: "自分のみ" },\n  { value: "team", label: "チーム" },\n  { value: "public", label: "全員", disabled: true }\n]} />', guide: '上下キー・Home / Endで移動、文字入力で検索、Enterで確定、Escapeで閉じます。画面端で位置を補正します。' },
 DropdownMenu: { group: 'オーバーレイ', description: '関連する操作を、ひとつのメニューに。', code: '<DropdownMenu label="ファイル操作" items={[\n  { label: "複製", onSelect: duplicate },\n  { label: "アーカイブ", onSelect: archive }\n]} />', guide: '上下キー・Home / Endで項目を移動。Enterで実行。Escapeで閉じ、トリガーへ戻ります。' },
 ContextMenu: { group: 'オーバーレイ', description: '選んだ対象の操作を、その場で開く。', code: '<ContextMenu label="ファイル操作" items={items}>\n  design-tokens.json\n</ContextMenu>', guide: '右クリック、Shift + F10、Enterから開けます。タッチ用のボタンも用意しています。' },
 IconButton: { group: '操作', description: '同じボタンに、形・大きさ・中身のバリエーションを。', code: '<IconButton aria-label="送信" shape="circle" variant="primary">\n  <Icon name="send" />\n</IconButton>\n<IconButton aria-label="追加" shape="circle" variant="secondary">\n  <Icon name="plus" />\n</IconButton>', guide: 'Buttonを基盤に、shape=rounded/circle、size=sm/md/lg、variant、childrenで使い分けます。中身だけ違うボタンは別コンポーネントとして増やしません。' },
 Textarea: { group: 'フォーム', description: '長いテキストを、無理なく入力する。', code: '<Textarea label="メモ" placeholder="伝えておきたいこと" />', guide: '複数行の入力と縦方向のリサイズに対応。ラベルと補足を関連付けます。' },
 Checkbox: { group: 'フォーム', description: '独立した選択を、明確に切り替える。', code: '<Checkbox label="更新情報を受け取る" defaultChecked />', guide: 'Spaceで選択を切り替えます。indeterminateで一部選択を表現できます。' },
 Radio: { group: 'フォーム', description: '複数の候補から、ひとつを選ぶ。', code: '<fieldset>\n  <legend>公開範囲</legend>\n  <Radio name="visibility" value="private" label="自分のみ" defaultChecked />\n  <Radio name="visibility" value="team" label="チーム" />\n</fieldset>', guide: '同じnameでグループ化します。矢印キーで選択を移動できます。' },
 Switch: { group: 'フォーム', description: '今の状態が分かる、小さなスイッチ。', code: '<Switch label="通知を有効にする" defaultChecked />', guide: 'Spaceで切り替えます。状態は移動と色の両方で示します。' },
 NativeSelect: { group: 'フォーム', description: '端末になじむ、標準の選択操作。', code: '<NativeSelect label="言語" defaultValue="ja">\n  <option value="ja">日本語</option>\n  <option value="en">English</option>\n</NativeSelect>', guide: 'OS標準の選択UIを使用します。キーボード操作も端末の慣例に従います。' },
 Slider: { group: 'フォーム', description: '連続する値を、直接調整する。', code: '<Slider label="音量" min={0} max={100} value={volume}\n  onChange={e => setVolume(Number(e.target.value))} />', guide: '矢印キーで値を変更。Home / Endで最小値・最大値へ移動します。' },
 Badge: { group: '表示', description: '短い言葉で、状態を伝える。', code: '<Badge>下書き</Badge>\n<Badge tone="success">公開中</Badge>\n<Badge tone="warning">要確認</Badge>\n<Badge tone="error">失敗</Badge>', guide: '状態は必ず文字でも伝えます。neutral / success / warning / errorを用意しています。' },
 Card: { group: '表示', description: '関連する情報に、ひとつのまとまりを。', code: '<Card>\n  <Badge>Workspace</Badge>\n  <h3>デザインライブラリ</h3>\n  <p>チームで共有するコンポーネント。</p>\n</Card>', guide: '見出し、説明、操作を自由に組み合わせます。カード全体は自動で操作対象にはなりません。' },
 Separator: { group: '表示', description: '情報の境目を、静かに示す。', code: '<p>アカウント</p>\n<Separator />\n<p>ワークスペース</p>', guide: '意味のある区切りにhr要素を使います。' },
 Avatar: { group: '表示', description: '名前から生まれる、シンプルな識別子。', code: '<Avatar name="Ren Aoki" />\n<Avatar name="Mio Sato" />', guide: 'イニシャル表示。支援技術には省略前の名前を伝えます。画像アップロード機能は含みません。' },
 Alert: { group: 'フィードバック', description: '見逃してほしくない情報を、その場に。', code: '<Alert title="変更を保存しました" tone="success">\n  次回もこの設定で開きます。\n</Alert>', guide: 'errorはalertとして通知。他の状態はstatusとして穏やかに読み上げます。' },
 Progress: { group: 'フィードバック', description: '処理の進み具合を、数値と長さで伝える。', code: '<Progress label="アップロード" value={progress} />', guide: 'valueは0〜100。省略すると進捗不明のネイティブ表示になります。' },
 Spinner: { group: 'フィードバック', description: '処理中であることを、最小限の動きで。', code: '<Spinner aria-label="ファイルを読み込み中" />', guide: '読み込みが必要な間だけ表示します。Reduced Motionでは回転を抑えます。' },
 Skeleton: { group: 'フィードバック', description: '情報が入る場所を、先に確保する。', code: '<div aria-busy="true" aria-label="読み込み中">\n  <Skeleton />\n  <Skeleton style={{ width: "65%" }} />\n</div>', guide: '装飾は読み上げから除外。親要素で読み込み状態を伝えます。常時動く演出は使いません。' },
 Toast: { group: 'フィードバック', description: '操作の結果を、短く知らせる。', code: '{visible && <Toast title="リンクをコピーしました"\n  onDismiss={() => setVisible(false)}>共有の準備ができました。</Toast>}', guide: '手動で閉じるまで表示。重要な通知が時間切れで消えることを防ぎます。' },
 Tabs: { group: '切り替え', description: '同じ場所で、関連する内容を切り替える。', code: '<Tabs label="プロジェクト" items={[\n  { value: "overview", label: "概要", content: "プロジェクトの概要です。" },\n  { value: "activity", label: "履歴", content: "最近の変更はありません。" },\n  { value: "settings", label: "設定", content: "個人用ワークスペースです。" }\n]} />', guide: '左右キーでタブを移動。Home / Endも対応。Tabでパネルへ進めます。' },
 SegmentedControl: { group: '切り替え', description: '少数の選択肢を、ひと続きの操作に。', code: '<SegmentedControl label="表示密度" options={[\n  { value: "compact", label: "コンパクト" },\n  { value: "normal", label: "標準" }\n]} />', guide: 'ネイティブのラジオグループとして動作。矢印キーで変更できます。' },
 Accordion: { group: '切り替え', description: '必要なときに、詳しい情報を開く。', code: '<Accordion title="商用利用できますか？">\n  MITライセンスで商用利用できます。\n</Accordion>', guide: 'Enter / Spaceで開閉。details / summaryの標準動作を使います。' },
 Popover: { group: 'オーバーレイ', description: '補助的な操作を、必要なときに呼び出す。', code: '<Popover label="表示オプション">\n  <Switch label="補足を表示" defaultChecked />\n</Popover>', guide: 'ネイティブPopover APIを使用。Escapeや外側クリックで閉じます。現在の配置は画面中央です。' },
 Tooltip: { group: 'オーバーレイ', description: '操作を妨げずに、短い補足を添える。', code: '<Tooltip label="保存について" text="変更はこの端末に保存されます。" />', guide: 'ホバーとフォーカスで表示。Escapeで閉じます。主要な説明はTooltipだけに置かないでください。' },
 ScrollArea: { group: '表示', description: '限られた領域で、長い内容を読む。', code: '<ScrollArea aria-label="更新履歴">\n  {/* 更新項目 */}\n</ScrollArea>', guide: '領域にフォーカスすると、矢印キーやPage Downでスクロールできます。' },
 Breadcrumb: { group: 'ナビゲーション', description: '今いる場所と、上位への道筋を示す。', code: '<Breadcrumb items={[\n  { label: "ライブラリ", href: "#content" },\n  { label: "コンポーネント", href: "#content" },\n  { label: "Button" }\n]} />', guide: '最後の項目を現在地として読み上げます。リンク先はアプリ側で指定します。' },
 Pagination: { group: 'ナビゲーション', description: '一覧の続きを、区切って読む。', code: '<Pagination page={page} totalPages={8} onPageChange={setPage} />', guide: '最初と最後のページでは、それぞれ前へ・次への操作を無効にします。' },
 Motion: { group: 'モーション', description: '変化の意味に合わせて、動きと速さを選ぶ。', code: '', guide: 'Fade: 状態の出入り / Rise: 通知 / Scale: ダイアログ / Slide: 補助パネル。OSのReduced Motionを常に尊重します。' },
} as const;
export type CatalogName = keyof typeof catalog;
export const catalogNames = Object.keys(catalog) as CatalogName[];

function Demo({ name }: { name: CatalogName }) {
 const [number, setNumber] = useState(40); const [saved, setSaved] = useState(false); const [visible, setVisible] = useState(true); const [page, setPage] = useState(1); const [query, setQuery] = useState(''); const [result, setResult] = useState('');
 if (name in choiceEntries) return <ChoiceDemo name={name as ChoiceName} />;
 if (name in harnessEntries) return <HarnessDemo name={name as HarnessName} />;
 switch (name) {
 case 'SearchField': return <><SearchField label="ファイルを検索" value={query} onChange={e => setQuery(e.target.value)} /><div role="status" className="nezui-muted">{['design-tokens.json', 'components.tsx', 'theme.css'].filter(file => file.includes(query.toLowerCase())).join(' / ') || '該当するファイルはありません。'}</div></>;
 case 'Select': return <Select label="公開範囲" options={[{ value: 'private', label: '自分のみ', description: 'このアカウントだけに表示' }, { value: 'team', label: 'チーム', description: 'ワークスペースのメンバーに共有' }, { value: 'public', label: '全員', disabled: true }]} />;
 case 'DropdownMenu': return <><DropdownMenu label="ファイル操作" items={[{ label: '複製', onSelect: () => setResult('デモ：複製を実行しました。') }, { label: 'アーカイブ', onSelect: () => setResult('デモ：アーカイブを実行しました。') }, { label: '削除', destructive: true, disabled: true, onSelect: () => {} }]} /><span role="status">{result}</span></>;
 case 'ContextMenu': return <><ContextMenu label="ファイル操作" items={[{ label: 'ファイル名をコピー', onSelect: () => { navigator.clipboard.writeText('design-tokens.json').then(() => setResult('ファイル名をコピーしました。')).catch(() => setResult('コピーできませんでした。')); } }, { label: '詳細を表示', onSelect: () => setResult('design-tokens.json · デザイントークンの設定ファイル') }]}>design-tokens.json</ContextMenu><span role="status">{result}</span></>;
 case 'IconButton': return <IconButtonVariants />;
 case 'Textarea': return <Textarea label="メモ" placeholder="伝えておきたいこと" />;
 case 'Checkbox': return <div><Checkbox label="更新情報を受け取る" defaultChecked /><Checkbox label="一部を選択" indeterminate /><Checkbox label="変更できない項目" disabled /></div>;
 case 'Radio': return <fieldset className="nezui-demo-fieldset"><legend>公開範囲</legend><Radio name="visibility" value="private" label="自分のみ" defaultChecked /><Radio name="visibility" value="team" label="チーム" /></fieldset>;
 case 'Switch': return <div><Switch label="通知を有効にする" defaultChecked /><Switch label="サウンドを再生" /><Switch label="管理者が設定済み" disabled defaultChecked /></div>;
 case 'NativeSelect': return <NativeSelect label="言語" defaultValue="ja"><option value="ja">日本語</option><option value="en">English</option></NativeSelect>;
 case 'Slider': return <><Slider label="音量" min={0} max={100} value={number} onChange={e => setNumber(Number(e.target.value))} /><output className="nezui-demo-output">{number}%</output></>;
 case 'Badge': return <div className="nezui-demo-row"><Badge>下書き</Badge><Badge tone="success">公開中</Badge><Badge tone="warning">要確認</Badge><Badge tone="error">失敗</Badge></div>;
 case 'Card': return <Card><Badge>Workspace</Badge><h3 className="nezui-demo-card-title">デザインライブラリ</h3><p>チームで共有するコンポーネント。</p><Separator /><div className="nezui-demo-row"><Avatar name="Ren Aoki" /><span>個人用ワークスペース</span></div></Card>;
 case 'Separator': return <><p>アカウント</p><Separator /><p>ワークスペース</p></>;
 case 'Avatar': return <div className="nezui-demo-row"><Avatar name="Ren Aoki" /><Avatar name="Mio Sato" /><Avatar name="Kai Mori" /></div>;
 case 'Alert': return <div className="nezui-demo-stack"><Alert title="変更を保存しました" tone="success">次回もこの設定で開きます。</Alert><Alert title="入力内容を確認してください" tone="error">メールアドレスが入力されていません。</Alert></div>;
 case 'Progress': return <><Progress label="アップロード" value={number} /><Slider label="進捗を調整" value={number} onChange={e => setNumber(Number(e.target.value))} /></>;
 case 'Spinner': return <div className="nezui-demo-row"><Spinner aria-label="ファイルを読み込み中" /><span>ファイルを読み込み中</span></div>;
 case 'Skeleton': return <div aria-busy="true" aria-label="読み込み中" className="nezui-demo-stack"><Skeleton style={{ width: '40%', height: 28 }} /><Skeleton /><Skeleton style={{ width: '65%' }} /></div>;
 case 'Toast': return <div className="nezui-demo-stack"><Button variant="outline" onClick={() => setVisible(true)}>通知を表示</Button>{visible && <Toast title="リンクをコピーしました" onDismiss={() => setVisible(false)}>共有の準備ができました。</Toast>}</div>;
 case 'Tabs': return <Tabs label="プロジェクト" items={[{ value: 'overview', label: '概要', content: 'プロジェクトの概要です。' }, { value: 'activity', label: '履歴', content: '最近の変更はありません。' }, { value: 'settings', label: '設定', content: '個人用ワークスペースです。' }]} />;
 case 'SegmentedControl': return <SegmentedControl label="表示密度" options={[{ value: 'compact', label: 'コンパクト' }, { value: 'normal', label: '標準' }]} />;
 case 'Accordion': return <div><Accordion title="商用利用できますか？">MITライセンスで商用利用できます。</Accordion><Accordion title="テーマは変更できますか？">Light、Dark、Systemに対応しています。CSS変数でカスタマイズできます。</Accordion></div>;
 case 'Popover': return <Popover label="表示オプション"><Switch label="補足を表示" defaultChecked /></Popover>;
 case 'Tooltip': return <Tooltip label="保存について" text="変更はこの端末に保存されます。" />;
 case 'ScrollArea': return <ScrollArea aria-label="更新履歴">{Array.from({ length: 12 }, (_, i) => <p key={i}>更新 {String(i + 1).padStart(2, '0')} — コンポーネントを調整</p>)}</ScrollArea>;
 case 'Breadcrumb': return <Breadcrumb items={[{ label: 'ライブラリ', href: '#content' }, { label: 'コンポーネント', href: '#content' }, { label: 'Button' }]} />;
 case 'Pagination': return <><p className="nezui-muted">項目 {(page - 1) * 10 + 1}–{page * 10} / 80</p><Pagination page={page} totalPages={8} onPageChange={setPage} /></>;
 default: return null;
 }
}

export function CatalogPanel({ name }: { name: CatalogName }) {
 const entry = catalog[name]; const [copied, setCopied] = useState(''); const [preset, setPreset] = useState<MotionPreset>('rise'); const [duration, setDuration] = useState(160); const [show, setShow] = useState(true); const [reduced, setReduced] = useState(false);
 const code = name === 'Motion' ? `<Motion show={visible} preset="${preset}" duration={${duration}}${reduced ? ' reduced' : ''}>\n  <Card>変更を保存しました。</Card>\n</Motion>` : entry.code;
 return <><div className="nezui-editor"><section className="nezui-preview" aria-label="プレビュー"><div className="nezui-panel-heading"><h2>プレビュー</h2><span>{entry.group}</span></div><div className="nezui-preview-stage"><div className="nezui-demo-content">{name === 'Motion' ? <><Motion show={show} preset={preset} duration={duration} reduced={reduced}><Card><div className="nezui-demo-row"><span className="nezui-motion-check" aria-hidden="true"><Icon name="check" size={18} /></span><div><strong>変更を保存しました。</strong><p>すべての設定が最新です。</p></div></div></Card></Motion><Button variant="outline" onClick={() => setShow(!show)}>{show ? '非表示にする' : '表示する'}</Button></> : <Demo name={name} />}</div></div><div className="nezui-code-heading"><span>React · 使用例</span><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(code); setCopied('コピーしました'); } catch { setCopied('コードを選択してコピーしてください'); } }}>{copied || 'コピー'}</button></div><pre><code>{code}</code></pre></section><aside className="nezui-controls"><div className="nezui-panel-heading"><h2>{name === 'Motion' ? 'モーション設定' : '使い方'}</h2><span>React 19</span></div>{name === 'Motion' ? <div className="nezui-catalog-settings"><NativeSelect label="動き" value={preset} onChange={e => { setPreset(e.target.value as MotionPreset); setCopied(''); }}><option value="fade">Fade / フェード</option><option value="rise">Rise / 浮き上がる</option><option value="scale">Scale / 奥行き</option><option value="slide">Slide / 横から</option></NativeSelect><Slider label={`時間 · ${duration}ms`} min={100} max={400} step={20} value={duration} onChange={e => { setDuration(Number(e.target.value)); setCopied(''); }} /><Switch label="動きを減らす" checked={reduced} onChange={e => { setReduced(e.target.checked); setCopied(''); }} /><p className="nezui-muted">連続して切り替えると、現在位置から反転します。</p></div> : <><p className="nezui-control-note">{entry.guide}</p><div className="nezui-catalog-facts"><span>スタイル <b>Vanilla CSS</b></span><span>テーマ <b>Light / Dark</b></span><span>実装 <b>@nezui/ui</b></span></div></>}</aside></div><section className="nezui-reference"><h2>{name === 'Motion' ? '用途ごとのモーション' : '操作とアクセシビリティ'}</h2>{name === 'Motion' ? <div className="nezui-motion-presets">{([{ name: 'fade', time: 140, label: '補足・状態変化' }, { name: 'rise', time: 200, label: '通知・小さなパネル' }, { name: 'scale', time: 220, label: 'ダイアログ' }, { name: 'slide', time: 160, label: '補助パネル' }] as const).map(item => <button type="button" key={item.name} aria-pressed={preset === item.name} onClick={() => { setPreset(item.name); setDuration(item.time); setCopied(''); }}><strong>{item.name}</strong><span>{item.label}</span><code>{item.time}ms</code></button>)}</div> : <div className="nezui-guide"><p>{entry.guide}</p><p>プレビューは配布対象と同じコンポーネントです。コード中のstateは利用側で定義してください。</p></div>}</section></>;
}





