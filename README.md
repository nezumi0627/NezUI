# NezUI

React 19 / TypeScript / Vanilla CSSのUIコンポーネント集。

## 起動

```sh
pnpm install
pnpm build
pnpm dev
```

`http://localhost:5173`でカタログを開く。検索、テーマ切り替え、実物の操作、コードコピー、モーション比較が利用できる。

## 利用

```tsx
import { Button, Input, Switch, Motion } from '@nezui/ui';
import '@nezui/ui/styles.css';

export function Example() {
  return (
    <div data-nezui-theme="dark">
      <Input label="メールアドレス" type="email" />
      <Switch label="通知を受け取る" defaultChecked />
      <Button>保存</Button>
    </div>
  );
}
```

npm公開前のローカルworkspaceパッケージ。Light / Dark / Autoは`data-nezui-theme`で指定する。

## 収録

| カテゴリ | コンポーネント |
| --- | --- |
| 操作 | Button, IconButton |
| フォーム | Input, SearchField, Textarea, Checkbox, Radio, Switch, NativeSelect, Select, Slider |
| 表示 | Badge, Card, Separator, Avatar, ScrollArea |
| 切り替え | Tabs, SegmentedControl, Accordion |
| オーバーレイ | Dialog, Popover, Tooltip, DropdownMenu, ContextMenu |
| フィードバック | Alert, Progress, Spinner, Skeleton, Toast |
| ナビゲーション | Breadcrumb, Pagination |
| モーション | Motion: fade, rise, scale, slide |

## モーション

```tsx
<Motion show={visible} preset="rise" duration={200}>
  <Card>変更を保存しました。</Card>
</Motion>
```

`show`を変更して出入りを制御する。非表示時は`inert`と`aria-hidden`を適用する。非表示コンテンツをアンマウントしないため、子コンポーネントのstateを維持する。フォーカスが内側にある状態で非表示にする場合、利用側で適切なトリガーへ戻すこと。`reduced`またはOSのReduced Motionで移動を停止する。

## 確認

```sh
pnpm typecheck
pnpm build
```

設計の基準は[マスター設計書](docs/MASTER_SPECIFICATION.md)。公開前の制約・未実装事項は同文書21章に記録する。

## AIハーネス

カタログの「AIハーネス」に16項目を追加。AIComposer、添付、音声入力状態、モデル選択、コマンドパレット、会話管理、メッセージ、ツール実行、承認、成果物、コンテキスト使用量を提供する。公開されるReact部品と統合デモを合わせ、カタログは48項目。

```tsx
<AIComposer
  value={draft}
  onValueChange={setDraft}
  onSend={send}
  running={running}
  onStop={stop}
  commands={commands}
  onFiles={addFiles}
  attachments={attachments}
  onRemoveFile={removeFile}
/>
```

[ハーネスの設計・接続契約](docs/HARNESS_UI.md)を参照。カタログのAI応答と音声状態はUIデモであり、APIやマイクには接続しない。

## 選択UIの使い分け

- フォームの単一／複数選択: `ChoiceGroup`（`layout="list" | "cards" | "chips"`）。既存Radio／Checkboxを再利用。
- チャット・設定の現在地: `NavigationItem`。ChatSidebarも共通利用。
- 独立したON/OFF: `ToggleButton`。Buttonを共通利用。
- 丸いボタン: `IconButton shape="circle"`。中身は`children`、色は`variant`、大きさは`size`で変更。

追加後のカタログは51項目。アイコン違いを別部品として数えず、既存ページでバリエーションを比較できる。
