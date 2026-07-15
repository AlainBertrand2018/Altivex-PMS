import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ioqmwarytolmglazbbim.supabase.co";
const supabaseServiceKey = "sb_publishable_Ko6vJMXDs89ej8-7eda_RA_vywlL2r6";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  const email = "Direction.altivexgroup@gmail.com";
  const password = "Wr@280765";
  const name = "Wesley";
  const role = "admin";

  // Step 1: Create user in Supabase Auth
  console.log("Creating user in Supabase Auth...");
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) {
    console.error("Auth error:", authError.message);
    return;
  }

  console.log("Auth user created:", authData.user.id);

  // Step 2: Insert user record into users table
  console.log("Inserting user record into users table...");
  const { error: dbError } = await supabase.from("users").insert({
    id: authData.user.id,
    name,
    email,
    role,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (dbError) {
    console.error("Database error:", dbError.message);
    return;
  }

  console.log("Admin user created successfully!");
  console.log("  Name:", name);
  console.log("  Email:", email);
  console.log("  Role:", role);
  console.log("  ID:", authData.user.id);
}

createAdminUser();
