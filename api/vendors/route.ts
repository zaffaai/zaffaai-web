import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      businessName, contactName, email, phone,
      city, category, website, instagram, priceRange,
      availabilityMonth, notes
    } = body || {}

    if (!businessName || !email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const supabase = supabaseServer()

    // 1) Detailed vendor record
    const { error: vError } = await supabase.from('vendor_pre_registrations').insert({
      business_name: String(businessName).trim(),
      contact_name: contactName?.trim() || null,
      email: email.toLowerCase(),
      phone: phone?.trim() || null,
      city: city?.trim() || null,
      category: category?.trim() || null,
      website: website?.trim() || null,
      instagram: instagram?.trim() || null,
      price_range: priceRange?.trim() || null,
      availability_month: availabilityMonth?.trim() || null,
      notes: notes?.trim() || null,
    })
    if (vError) return NextResponse.json({ error: 'DB error (vendors)' }, { status: 500 })

    // 2) Also drop their email into the generic waitlist as Vendor (dedup not required now)
    const { error: wError } = await supabase.from('waitlist_submissions').insert({
      email: email.toLowerCase(),
      full_name: contactName?.trim() || null,
      role: 'Vendor',
    })
    if (wError) {
      // Not fatal for UX; we still registered the vendor details
      console.warn('waitlist insert warning:', wError.message)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
