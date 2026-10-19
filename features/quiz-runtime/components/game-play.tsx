"use client";
import React, { useEffect, useRef } from "react";
import { QuizAttemptRuntime } from "../types/runtime-types";
import { useRuntimeStore } from "../store";
import { InitializeGameplay } from "./initialize-gameplay";

type GameplayLayoutProps = {
  attempt: QuizAttemptRuntime;
};

export default function Gameplay({ attempt }: GameplayLayoutProps) {
  return (
    <InitializeGameplay attempt={attempt}>
      <div>Gameplay</div>
    </InitializeGameplay>
  );
}
