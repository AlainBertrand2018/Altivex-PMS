import { supabaseDb } from "./supabase-repository";
import { generateId } from "./store";
export type { IRepository } from "./repository";

export const db = supabaseDb;
export { generateId };
