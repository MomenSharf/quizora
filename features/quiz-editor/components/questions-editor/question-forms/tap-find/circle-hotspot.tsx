"use client";

import { useEffect, useRef } from "react";
import { Circle, Transformer } from "react-konva";
import Konva from "konva";

type CircleHotspotProps = {
  selected: boolean;

  x: number;
  y: number;

  radius: number;

  onSelect: () => void;

  onChange: (values: {
    x: number;
    y: number;
    radius: number;
  }) => void;
};

export function CircleHotspot({
  selected,
  x,
  y,
  radius,
  onSelect,
  onChange,
}: CircleHotspotProps) {
  const shapeRef = useRef<Konva.Circle>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (!selected || !shapeRef.current || !transformerRef.current) {
      return;
    }

    transformerRef.current.nodes([shapeRef.current]);
    transformerRef.current.getLayer()?.batchDraw();
  }, [selected]);

  return (
    <>
      <Circle
        ref={shapeRef}
        x={x}
        y={y}
        radius={radius}
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
            radius,
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current!;

          const scale = Math.max(node.scaleX(), node.scaleY());

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            x: node.x(),
            y: node.y(),
            radius: Math.max(10, radius * scale),
          });
        }}
      />

      {selected && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={false}
          flipEnabled={false}
          keepRatio
          anchorSize={8}
          borderStroke="rgb(59,130,246)"
          borderStrokeWidth={2}
          anchorStroke="rgb(59,130,246)"
          anchorFill="white"
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
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