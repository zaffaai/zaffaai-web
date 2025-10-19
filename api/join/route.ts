import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'


export async function POST(req: Request) {
try {
const { email, fullName, role } = await req.json()


if (!email || typeof email !== 'string' || !email.includes('@')) {
return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
}


const supabase = supabaseServer()
const { error } = await supabase.from('waitlist_submissions').insert({
email: email.toLowerCase(),
full_name: fullName?.trim() || null,
role: role && ['User', 'Vendor', 'Other'].includes(role) ? role : 'Other',
})


if (error) {
console.error(error)
return NextResponse.json({ error: 'DB error' }, { status: 500 })
}


return NextResponse.json({ ok: true })
} catch (e) {
return NextResponse.json({ error: 'Bad request' }, { status: 400 })
}
}