"use client";
import React, { useEffect, useRef } from "react";
import { QuizAttemptRuntime } from "../types/runtime-types";
import { useRuntimeStore } from "../store";
import { InitializeGameplay } from "./initialize-gameplay";
import GamePlayHeader from "./header/game-play-header";
import GamePlayActions from "./actions-bar/game-play-actions";

type GameplayLayoutProps = {
  attempt: QuizAttemptRuntime;
};

export default function Gameplay({ attempt }: GameplayLayoutProps) {
  return (
    <InitializeGameplay attempt={attempt}>
      <div className="flex h-dvh flex-col overflow-hidden">
        <div className="shrink-0">
          <GamePlayHeader />
        </div>

        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain"></main>

        <footer className="shrink-0">
          <GamePlayActions />
        </footer>
      </div>
    </InitializeGameplay>
  );
}
