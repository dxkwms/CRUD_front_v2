import { store } from "@/lib/store/store";

export type RootState = ReturnType<typeof store.getState>;
