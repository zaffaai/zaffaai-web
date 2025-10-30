'use client'
import { useState, useEffect } from 'react'


type Role = 'User' | 'Vendor' | 'Other'


export default function WaitlistForm() {
const [email, setEmail] = useState('')
const [name, setName] = useState('')
const [role, setRole] = useState<Role>('User')
const [status, setStatus] = useState<'idle'|'loading'|'ok'|'error'>('idle')


async function submit(e: React.FormEvent) {
e.preventDefault()
setStatus('loading')
try {
const res = await fetch('/api/join', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, fullName: name, role }),
})
if (!res.ok) throw new Error('failed')
setStatus('ok')
setEmail('')
setName('')
} catch {
setStatus('error')
}
}


// Mount inside Hero slot without prop drilling
useEffect(() => {
const slot = document.getElementById('waitlist-slot')
if (slot) {
const form = document.createElement('div')
form.innerHTML = `
<h2 class="text-xl font-semibold">Join the early list</h2>
<p class="mt-1 text-sm text-gray-600">Be first to access the beta.</p>
`
slot.appendChild(form)
}
}, [])


return (
<form onSubmit={submit} className="mt-2">
<label className="mt-4 block text-sm font-medium">Full name</label>
{/* Updated placeholder to be more generic */}
<input 
  className="mt-1 w-full rounded-md border px-3 py-2" 
  value={name} 
  onChange={(e)=>setName(e.target.value)} 
  placeholder="Your Full Name" 
/>


<label className="mt-4 block text-sm font-medium">Email</label>
<input className="mt-1 w-full rounded-md border px-3 py-2" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required />


<label className="mt-4 block text-sm font-medium">I am a</label>
<select className="mt-1 w-full rounded-md border px-3 py-2" value={role} onChange={(e)=>setRole(e.target.value as Role)}>
<option>User</option>
<option>Vendor</option>
<option>Other</option>
</select>


<button type="submit" disabled={status==='loading'} className="mt-6 w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-60">
{status==='loading' ? 'Submitting…' : 'Get Early Access'}
</button>


{status==='ok' && <p className="mt-3 text-sm text-green-600">Thanks! We’ll be in touch soon.</p>}
{status==='error' && <p className="mt-3 text-sm text-red-600">Something went wrong. Try again.</p>}
</form>
)
}