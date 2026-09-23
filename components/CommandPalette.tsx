"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./Icons";

export type Command = {
  id: string;
  label: string;
  group: string;
  icon: string;
  hint?: string;
  run: () => void;
};

export function CommandPalette({
  open,
  onClose,
  commands,
  placeholder,
  empty,
}: {
  open: boolean;
  onClose: () => void;
  commands: Command[];
  placeholder: string;
  empty: string;
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return commands;
    return commands.filter((c) => (c.label + " " + c.group).toLowerCase().includes(s));
  }, [q, commands]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const exec = (c?: Command) => {
    if (!c) return;
    onClose();
    setTimeout(c.run, 10);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      exec(filtered[active]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  let lastGroup = "";
  return (
    <div className="cmdk-overlay" onMouseDown={onClose}>
      <div className="cmdk" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <div className="cmdk-input">
          <Icon name="search" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
          />
          <kbd>esc</kbd>
        </div>
        <div className="cmdk-list" ref={listRef} role="listbox">
          {filtered.length === 0 && <p className="cmdk-empty">{empty}</p>}
          {filtered.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <div key={c.id}>
                {header && <p className="cmdk-group">{header}</p>}
                <button
                  data-idx={i}
                  role="option"
                  aria-selected={i === active}
                  className="cmdk-item"
                  onMouseMove={() => setActive(i)}
                  onClick={() => exec(c)}
                >
                  <Icon name={c.icon} />
                  <span>{c.label}</span>
                  {c.hint && <kbd>{c.hint}</kbd>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
