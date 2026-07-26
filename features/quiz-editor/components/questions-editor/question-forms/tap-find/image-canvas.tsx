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
                return (
                  <RectHotspot
                  id={target.id}
                    key={target.id}
                    selected={selectedId === target.id}
                    x={imageBounds.x + target.x * imageBounds.width}
                    y={imageBounds.y + target.y * imageBounds.height}
                    width={target.width * imageBounds.width}
                    height={target.height * imageBounds.height}
                    onSelect={() => onSelectedChange(target.id)}
                    onChange={(values) =>
                      updateTarget(target.id, (t) => ({
                        ...t,
                        x: (values.x - imageBounds.x) / imageBounds.width,
                        y: (values.y - imageBounds.y) / imageBounds.height,
                        width: values.width / imageBounds.width,
                        height: values.height / imageBounds.height,
                      }))
                    }
                  />
                );
              }

              return (
                <CircleHotspot
                  key={target.id}
                  selected={selectedId === target.id}
                  x={imageBounds.x + target.x * imageBounds.width}
                  y={imageBounds.y + target.y * imageBounds.height}
                  radius={target.radius * imageBounds.width}
                  onSelect={() => onSelectedChange(target.id)}
                  onChange={(values) =>
                    updateTarget(target.id, (t) => ({
                      ...t,
                      x: (values.x - imageBounds.x) / imageBounds.width,
                      y: (values.y - imageBounds.y) / imageBounds.height,
                      radius: values.radius / imageBounds.width,
                    }))
                  }
                />
              );
            })}
        </Layer>
      </Stage>
    </div>
  );
}