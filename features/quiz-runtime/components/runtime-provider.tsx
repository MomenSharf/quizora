"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useStore } from "zustand";
import type { StoreApi } from "zustand";
import { createStore } from "zustand/vanilla";

import type { QuizAttemptRuntime } from "../types/runtime-types";
import { RuntimeStore } from "../store";

interface RuntimeProviderProps {
  initialAttempt: QuizAttemptRuntime;
  children: ReactNode;
}

type RuntimeStoreApi = StoreApi<RuntimeStore>;

const RuntimeStoreContext = createContext<RuntimeStoreApi | null>(null);

export function RuntimeProvider({
  initialAttempt,
  children,
}: RuntimeProviderProps) {
  const storeRef = useRef<RuntimeStoreApi | null>(null);
  const previousAttemptId = useRef(initialAttempt.id);

  if (!storeRef.current) {
    storeRef.current = createRuntimeStore();
  }

  const store = storeRef.current;

  useEffect(() => {
    if (previousAttemptId.current !== initialAttempt.id) {
      previousAttemptId.current = initialAttempt.id;
    }

    store.getState().initializeAttempt(initialAttempt);
  }, [store, initialAttempt]);

  return (
    <RuntimeStoreContext.Provider value={store}>
      {children}
    </RuntimeStoreContext.Provider>
  );
}

export function useRuntimeStore<T>(
  selector: (state: RuntimeStore) => T,
): T {
  const store = useContext(RuntimeStoreContext);

  if (!store) {
    throw new Error(
      "useRuntimeStore must be used within a RuntimeProvider",
    );
  }

  return useStore(store, selector);
}

export function useRuntimeStoreApi(): RuntimeStoreApi {
  const store = useContext(RuntimeStoreContext);

  if (!store) {
    throw new Error(
      "useRuntimeStoreApi must be used within a RuntimeProvider",
    );
  }

  return store;
}

function createRuntimeStore(): RuntimeStoreApi {
  return createStore<RuntimeStore>()((set, get) => ({
    ...defaultRuntimeState,

    initializeAttempt: (attempt) => {
      set({
        ...defaultRuntimeState,
        attempt,
      });
    },

    // Move the rest of your existing runtime actions here.
  }));
}