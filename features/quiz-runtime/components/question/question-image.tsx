
"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Maximize2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


type QuestionImageProps = {
  src?: string;
};

export default function QuestionImage({
  src = "/assets/images/login-image.jpg",
}: QuestionImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full min-w-0">
        <div className="group relative w-full overflow-hidden rounded-2xl border bg-muted shadow-sm">
          <div className="relative aspect-[16/9] w-full sm:aspect-[2/1] lg:aspect-[4/3]">
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 1023px) 100vw, 35vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />

            <DialogTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Preview image"
                className="absolute right-2 top-2 z-10 size-9 rounded-xl shadow-md"
              >
                <Maximize2 className="size-4" />
              </Button>
            </DialogTrigger>
          </div>
        </div>
      </div>

      <DialogContent className="flex max-h-[95dvh] w-[calc(100%-1rem)] max-w-6xl flex-col gap-4 overflow-hidden rounded-2xl p-3 sm:p-5">
        <DialogHeader>
          <DialogTitle>Image preview</DialogTitle>
          <DialogDescription>
            View the full-size image.
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-xl bg-muted/40 p-1 sm:p-3">
          <Image
            src={src}
            alt=""
            width={1920}
            height={1080}
            sizes="95vw"
            className="h-auto max-h-[calc(95dvh-8rem)] w-auto max-w-full rounded-lg object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}


