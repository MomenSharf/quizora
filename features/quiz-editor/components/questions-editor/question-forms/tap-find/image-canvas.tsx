"use client";

import { useEffect, useMemo, useState } from "react";
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { CircleHotspot } from "./circle-hotspot";
import { RectHotspot } from "./rect-hotspot";
import { TapFindTarget } from "@/features/quiz-editor/validation/question";

type ImageCanvasProps = {
  image: string;
  targets: TapFindTarget[];
  selectedId?: string;
  onSelectedChange(id?: string): void;
  onTargetsChange(targets: TapFindTarget[]): void;
};

export function ImageCanvas({
  image,
  targets,
  selectedId,
  onSelectedChange,
  onTargetsChange,
}: ImageCanvasProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const [konvaImage] = useImage(image, "anonymous");

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!container) return;

    const resize = () => {
      setSize({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    resize();

    const observer = new ResizeObserver(resize);

    observer.observe(container);

    return () => observer.disconnect();
  }, [container]);

  const imageBounds = useMemo(() => {
    if (!konvaImage || !size.width || !size.height) {
      return null;
    }

    const scale = Math.min(
      size.width / konvaImage.width,
      size.height / konvaImage.height,
    );

    const width = konvaImage.width * scale;
    const height = konvaImage.height * scale;

    return {
      x: (size.width - width) / 2,
      y: (size.height - height) / 2,
      width,
      height,
    };
  }, [konvaImage, size]);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const updateTarget = (
    id: string,
    updater: (target: TapFindTarget) => TapFindTarget,
  ) => {
    onTargetsChange(
      targets.map((target) =>
        target.id === id ? updater(target) : target,
      ),
    );
  };

  return (
    <div
      ref={setContainer}
      className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted/20"
    >
      <Stage
        width={size.width}
        height={size.height}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            onSelectedChange(undefined);
          }
        }}
      >
        <Layer>
          {konvaImage && imageBounds && (
            <KonvaImage
              image={konvaImage}
              x={imageBounds.x}
              y={imageBounds.y}
              width={imageBounds.width}
              height={imageBounds.height}
            />
          )}

          {imageBounds &&
            targets.map((target) => {
              if (target.shape === "RECT") {
                const x =
                  imageBounds.x +
                  target.x * imageBounds.width;

                const y =
                  imageBounds.y +
                  target.y * imageBounds.height;

                const width =
                  target.width * imageBounds.width;

                const height =
                  target.height * imageBounds.height;

                return (
                  <RectHotspot
                    id={target.id}
                    key={target.id}
                    selected={selectedId === target.id}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    onSelect={() =>
                      onSelectedChange(target.id)
                    }
                    onChange={(values) => {
                      const relativeX =
                        values.x - imageBounds.x;

                      const relativeY =
                        values.y - imageBounds.y;

                      const clampedWidth = clamp(
                        values.width,
                        0,
                        imageBounds.width,
                      );

                      const clampedHeight = clamp(
                        values.height,
                        0,
                        imageBounds.height,
                      );

                      const clampedX = clamp(
                        relativeX,
                        0,
                        imageBounds.width - clampedWidth,
                      );

                      const clampedY = clamp(
                        relativeY,
                        0,
                        imageBounds.height - clampedHeight,
                      );

                      updateTarget(target.id, (t) => ({
                        ...t,
                        x:
                          clampedX /
                          imageBounds.width,
                        y:
                          clampedY /
                          imageBounds.height,
                        width:
                          clampedWidth /
                          imageBounds.width,
                        height:
                          clampedHeight /
                          imageBounds.height,
                      }));
                    }}
                  />
                );
              }

              const x =
                imageBounds.x +
                target.x * imageBounds.width;

              const y =
                imageBounds.y +
                target.y * imageBounds.height;

              const radius =
                target.radius * imageBounds.width;

              return (
                <CircleHotspot
                  key={target.id}
                  selected={selectedId === target.id}
                  x={x}
                  y={y}
                  radius={radius}
                  onSelect={() =>
                    onSelectedChange(target.id)
                  }
                  onChange={(values) => {
                    const maxRadius =
                      Math.min(
                        imageBounds.width,
                        imageBounds.height,
                      ) / 2;

                    const clampedRadius = clamp(
                      values.radius,
                      0,
                      maxRadius,
                    );

                    const relativeX =
                      values.x - imageBounds.x;

                    const relativeY =
                      values.y - imageBounds.y;

                    const clampedX = clamp(
                      relativeX,
                      clampedRadius,
                      imageBounds.width -
                        clampedRadius,
                    );

                    const clampedY = clamp(
                      relativeY,
                      clampedRadius,
                      imageBounds.height -
                        clampedRadius,
                    );

                    updateTarget(target.id, (t) => ({
                      ...t,
                      x:
                        clampedX /
                        imageBounds.width,
                      y:
                        clampedY /
                        imageBounds.height,
                      radius:
                        clampedRadius /
                        imageBounds.width,
                    }));
                  }}
                />
              );
            })}
        </Layer>
      </Stage>
    </div>
  );
}