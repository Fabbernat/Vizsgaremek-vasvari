const SUPABASE_URL = "https://uqusahmtbaypepskpxxa.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_PUBLISHABLE_OR_ANON_KEY";

// GET all rows from users
fetch(`${SUPABASE_URL}/rest/v1/users?select=*`, {
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
})
  .then(res => res.json())
  .then(data => console.log(data));

  fetch(`${SUPABASE_URL}/rest/v1/users`, {
  method: "POST",
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation"
  },
  body: JSON.stringify({
    username: "bernat",
    email: "bernat@example.com",
    role: "admin"
  }),
})
  .then(res => res.json())
  .then(data => console.log(data));

  fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.1`, {
  method: "PATCH",
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation"
  },
  body: JSON.stringify({
    role: "owner"
  }),
})
  .then(res => res.json())
  .then(data => console.log(data));

  fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.1`, {
  method: "DELETE",
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
})
  .then(res => {
    console.log("Deleted", res.status);
  });

  import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uqusahmtbaypepskpxxa.supabase.co";
const supabaseKey = "YOUR_PUBLISHABLE_OR_ANON_KEY";

const supabase = createClient(supabaseUrl, supabaseKey);

// Read
const { data, error } = await supabase
  .from("users")
  .select("*");

// Insert
const { data: inserted, error: insertError } = await supabase
  .from("users")
  .insert([
    {
      username: "bernat",
      email: "bernat@example.com",
      role: "admin"
    }
  ])
  .select();

// Update
const { data: updated, error: updateError } = await supabase
  .from("users")
  .update({ role: "owner" })
  .eq("id", 1)
  .select();

// Delete
const { error: deleteError } = await supabase
  .from("users")
  .delete()
  .eq("id", 1);

