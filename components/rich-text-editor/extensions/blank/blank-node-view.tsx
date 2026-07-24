"use client";

import { useState } from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { BlankEditView } from "./blank-edit-view";
import { BlankView } from "./blank-view";

export function BlankNodeView({
  node,
  updateAttributes,
  deleteNode,
}: NodeViewProps) {
  const [editing, setEditing] = useState(
    node.attrs.placeholder.length === 0,
  );

  const placeholder = node.attrs.placeholder;

  function handleSave(value: string) {
    updateAttributes({
      placeholder: value.trim(),
    });

    setEditing(false);
  }

  function handleDelete() {
    deleteNode();
  }

  

  function handleEdit() {
    setEditing(true);
  }

  return (
    <NodeViewWrapper as="span" className="inline-flex align-middle">
      {editing ? (
        <BlankEditView
          value={placeholder}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      ) : (
        <BlankView
          placeholder={placeholder}
          onEdit={handleEdit}
        />
      )}
    </NodeViewWrapper>
  );
}