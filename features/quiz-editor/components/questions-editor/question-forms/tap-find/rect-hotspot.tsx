"use client";

import { useEffect, useRef } from "react";
import { Rect, Transformer } from "react-konva";
import Konva from "konva";

type RectHotspotProps = {
  id: string;

  selected: boolean;

  x: number;
  y: number;

  width: number;
  height: number;

  onSelect: () => void;

  onChange: (values: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
};

export function RectHotspot({
  selected,
  x,
  y,
  width,
  height,
  onSelect,
  onChange,
}: RectHotspotProps) {
  const shapeRef = useRef<Konva.Rect>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (!selected) return;

    transformerRef.current?.nodes([shapeRef.current!]);
    transformerRef.current?.getLayer()?.batchDraw();
  }, [selected]);

  return (
    <>
      <Rect
        ref={shapeRef}
        x={x}
        y={y}
        width={width}
        height={height}
        draggable
        fill="rgba(59,130,246,.08)"
        stroke="rgb(59,130,246)"
        strokeWidth={2}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
            width,
            height,
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current!;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(20, node.width() * scaleX),
            height: Math.max(20, node.height() * scaleY),
          });
        }}
      />

      {selected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={false}
          flipEnabled={false}
          keepRatio={false}
          anchorSize={8}
          borderStroke="rgb(59,130,246)"
          anchorStroke="rgb(59,130,246)"
          anchorFill="white"
          borderStrokeWidth={2}
          enabledAnchors={[
            "top-left",
            "top-center",
            "top-right",
            "middle-left",
            "middle-right",
            "bottom-left",
            "bottom-center",
            "bottom-right",
          ]}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20 || newBox.height < 20) {
              return oldBox;
            }

            return newBox;
          }}
        />
      )}
    </>
  );
}