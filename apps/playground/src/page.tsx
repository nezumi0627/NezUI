import { useState } from "react";
import { Button, Dialog, Input, type ButtonProps } from "@nezui/ui";

import { catalog, catalogNames, CatalogPanel, type CatalogName } from "./catalog";
type ComponentName = "Button" | "Input" | "Dialog" | CatalogName;
const components: ComponentName[] = ["Button", "Input", "Dialog", ...catalogNames];
const descriptions: Record<string, string> = {
  Button: "操作の優先順位を、形とコントラストで伝える。",
  Input: "入力内容と、そのために必要な情報をひとつに。",
  Dialog: "確認が必要な操作に、集中できる場所を用意する。",
};
const variants = ["primary", "secondary", "subtle", "outline", "ghost", "destructive"] as const;

export default function App() {
  const [selected, setSelected] = useState<ComponentName>("Button");
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [variant, setVariant] = useState<NonNullable<ButtonProps["variant"]>>("primary");
  const [size, setSize] = useState<NonNullable<ButtonProps["size"]>>("md");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("変更を保存");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const code = selected === "Button"
    ? `<Button variant="${variant}" size="${size}"${disabled ? " disabled" : ""}${loading ? " loading" : ""}>\n  ${label}\n</Button>`
    : selected === "Input" ? `<Input\n  label="メールアドレス"\n  type="email"\n  placeholder="you@example.com"${disabled ? "\n  disabled" : ""}${error ? '\n  error="メールアドレスを確認してください。"' : ""}\n/>`
    : '<Dialog\n  open={open}\n  onOpenChange={setOpen}\n  title="変更を保存"\n>\n  保存内容を確認してください。\n</Dialog>';
  const selectComponent = (name: ComponentName) => { setSelected(name); setStatus(""); setCopied(false); };

  return (
    <div className="nezui-workbench" data-nezui-theme={theme}>
      <a className="nezui-skip" href="#content">コンテンツへ移動</a>
      <header className="nezui-topbar">
        <a className="nezui-wordmark" href="#" onClick={() => selectComponent("Button")}>NezUI<span> / </span><small>Library</small></a>
        <span className="nezui-build">0.1.0 <span>・ 開発プレビュー</span></span>
        <label className="nezui-theme-label">テーマ<select aria-label="テーマ" value={theme} onChange={e => setTheme(e.target.value)}><option value="dark">Dark</option><option value="light">Light</option><option value="auto">System</option></select></label>
      </header>
      <aside className="nezui-sidebar">
        <input className="nezui-search" type="search" aria-label="コンポーネントを検索" placeholder="コンポーネントを検索…" value={query} onChange={e => setQuery(e.target.value)} />
        <p className="nezui-nav-label">コンポーネント <span>{components.length}</span></p>
        <nav aria-label="コンポーネント">{['選択パターン', 'AIハーネス', '操作', 'フォーム', '表示', '切り替え', 'オーバーレイ', 'フィードバック', 'ナビゲーション', 'モーション'].map(group => {
          const names = components.filter(name => (name === 'Button' ? '操作' : name === 'Input' ? 'フォーム' : name === 'Dialog' ? 'オーバーレイ' : catalog[name].group) === group && name.toLowerCase().includes(query.toLowerCase()));
          return names.length > 0 && <div className="nezui-nav-group" key={group}><span className="nezui-nav-group-title">{group}</span>{names.map(name => <button type="button" key={name} aria-current={selected === name ? 'page' : undefined} onClick={() => selectComponent(name)}><span>{name}</span><span className="nezui-nav-index">{String(components.indexOf(name) + 1).padStart(2, '0')}</span></button>)}</div>;
        })}</nav>
        {components.every(name => !name.toLowerCase().includes(query.toLowerCase())) && <p className="nezui-muted">該当する部品はありません。</p>}
        <div className="nezui-sidebar-note"><span>React + TypeScript</span><p>小さな部品から、<br />使いやすいインターフェースへ。</p><span>MIT License</span></div>
      </aside>
      <main id="content" className="nezui-content">
        <div className="nezui-breadcrumb">Components <span>/</span> {selected}</div>
        <div className="nezui-page-heading"><h1>{selected}</h1><code>@nezui/ui</code></div>
        <p className="nezui-description">{descriptions[selected] ?? catalog[selected as CatalogName]?.description}</p>
        {selected in catalog ? <CatalogPanel key={selected} name={selected as CatalogName} /> : <><div className="nezui-editor">
          <section className="nezui-preview" aria-label="プレビュー">
            <div className="nezui-panel-heading"><h2>プレビュー</h2><span>インタラクティブ</span></div>
            <div className="nezui-preview-stage">
              {selected === "Button" && <Button variant={variant} size={size} disabled={disabled} loading={loading} onClick={() => setStatus("クリックを受け取りました。")}>{label || "Button"}</Button>}
              {selected === "Input" && <Input label="メールアドレス" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} disabled={disabled} error={error ? "メールアドレスを確認してください。" : undefined} description="連絡先として使用するアドレスを入力してください。" />}
              {selected === "Dialog" && <Button onClick={() => setDialogOpen(true)}>変更を保存…</Button>}
              <span className="nezui-preview-feedback" role="status">{status}</span>
            </div>
            <div className="nezui-code-heading"><span>React</span><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(code); setCopied(true); } catch { setStatus("コピーできませんでした。コードを選択してコピーしてください。"); } }}>{copied ? "コピーしました" : "コピー"}</button></div>
            <pre><code>{code}</code></pre>
          </section>
          <aside className="nezui-controls" aria-label="プレビュー設定"><div className="nezui-panel-heading"><h2>設定</h2><button type="button" onClick={() => { setVariant("primary"); setSize("md"); setDisabled(false); setLoading(false); setLabel("変更を保存"); setError(false); setEmail(""); setStatus(""); setCopied(false); }}>リセット</button></div>
            {selected === "Button" && <><Input label="ラベル" value={label} onChange={e => { setLabel(e.target.value); setCopied(false); }} /><fieldset><legend>Variant</legend><div className="nezui-variant-options">{variants.map(value => <label key={value}><input type="radio" name="variant" value={value} checked={variant === value} onChange={() => { setVariant(value); setCopied(false); }} />{value}</label>)}</div></fieldset><fieldset><legend>Size</legend><div className="nezui-size-options">{(["sm", "md", "lg"] as const).map(value => <label key={value}><input type="radio" name="size" checked={size === value} onChange={() => { setSize(value); setCopied(false); }} /><span>{value.toUpperCase()}</span></label>)}</div></fieldset></>}
            {selected !== "Dialog" && <fieldset><legend>状態</legend><label className="nezui-check-row"><span>Disabled</span><input type="checkbox" checked={disabled} onChange={e => { setDisabled(e.target.checked); setCopied(false); }} /></label>{selected === "Button" ? <label className="nezui-check-row"><span>Loading</span><input type="checkbox" checked={loading} onChange={e => { setLoading(e.target.checked); setCopied(false); }} /></label> : <label className="nezui-check-row"><span>Error</span><input type="checkbox" checked={error} onChange={e => { setError(e.target.checked); setCopied(false); }} /></label>}</fieldset>}
            <p className="nezui-control-note">{selected === "Dialog" ? "開くとダイアログ内にフォーカスが移ります。Escapeで閉じて、元の操作に戻れます。" : "設定はプレビューとコードに反映されます。"}</p>
          </aside>
        </div>
        <section className="nezui-reference"><h2>{selected === "Button" ? "バリエーション" : "操作ガイド"}</h2>{selected === "Button" ? <div className="nezui-variant-reference">{variants.map(value => <div key={value}><Button variant={value} onClick={() => { setVariant(value); setCopied(false); setStatus(`${value}を選択しました。`); }}>{value === "destructive" ? "削除する" : "保存する"}</Button><code>{value}</code></div>)}</div> : <div className="nezui-guide"><p><kbd>Tab</kbd> {selected === "Input" ? "入力欄にフォーカスを移動" : "ダイアログ内の操作にフォーカスを移動"}</p><p><kbd>{selected === "Input" ? "Shift + Tab" : "Escape"}</kbd> {selected === "Input" ? "前の操作へ戻る" : "ダイアログを閉じる"}</p></div>}</section>
        </>}
        <footer className="nezui-page-footer"><span>NezUI / Component library</span><span>Vanilla CSS · ESM</span></footer>
      </main>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="変更を保存" actions={<><Button variant="ghost" onClick={() => setDialogOpen(false)}>キャンセル</Button><Button onClick={() => { setDialogOpen(false); setStatus("デモの保存操作が完了しました。"); }}>保存する</Button></>}>このプレビューでの変更を確定します。<br />実際のデータは送信されません。</Dialog>
    </div>
  );
}





