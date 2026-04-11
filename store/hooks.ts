import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";

// ─── Typed Hooks ──────────────────────────────────────────────────────────────
// Use these throughout the app instead of plain useDispatch / useSelector
// for full TypeScript inference.

/** Typed dispatch hook — use everywhere instead of `useDispatch` */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** Typed selector hook — use everywhere instead of `useSelector` */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
