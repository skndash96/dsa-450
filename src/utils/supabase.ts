import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://phpbftucotqtwbrrkloz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBocGJmdHVjb3RxdHdicnJrbG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NTY0OTYsImV4cCI6MjA1MjIzMjQ5Nn0.oVwhg5nQhCccldT2wuwKxrDNUckfmG1bAeihsaQEoYg";

if (!supabaseUrl || !supabaseKey) {
  console.log(supabaseUrl, supabaseKey);
  throw new Error("Missing Supabase URL or Key");
}

export const supabase = createClient(supabaseUrl, supabaseKey);