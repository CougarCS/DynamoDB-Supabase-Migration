import { createClient } from "@supabase/supabase-js";
import * as storage from "node-localstorage";
require("dotenv").config();

const localStorage = new storage.LocalStorage("./authStorage");

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || "",
  {
    auth: {
      storage: localStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export default supabase;
