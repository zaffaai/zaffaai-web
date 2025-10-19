import { createClient } from '@supabase/supabase-js'


export function supabaseServer() {
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const service = process.env.SUPABASE_SERVICE_ROLE_KEY!
return createClient(url, service, { auth: { persistSession: false } })
}