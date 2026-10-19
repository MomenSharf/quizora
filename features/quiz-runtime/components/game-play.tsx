"use client";
import React, { useEffect, useRef } from "react";
import { QuizAttemptRuntime } from "../types/runtime-types";
import { useRuntimeStore } from "../store";
import { InitializeGameplay } from "./initialize-gameplay";
import GamePlayHeader from "./header/game-play-header";

type GameplayLayoutProps = {
  attempt: QuizAttemptRuntime;
};

export default function Gameplay({ attempt }: GameplayLayoutProps) {
  return (
    <InitializeGameplay attempt={attempt}>
      <div className="">
        <GamePlayHeader />
      </div>
    </InitializeGameplay>
  );
}
