import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rtnaydzwasuwltunjctn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bmF5ZHp3YXN1d2x0dW5qY3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NTQ2NjAsImV4cCI6MjA5MTIzMDY2MH0.iZJQYmq9ER6zCxLLD818yBR5lR3IQRcU7IOqXNuHmh8"; 

export const supabase = createClient(supabaseUrl, supabaseKey);