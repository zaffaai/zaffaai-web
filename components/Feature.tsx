type Props = { 
  title: string
  desc: string
}

export function Feature({ title, desc }: Props) {
  return (
    <div className="group rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-base font-semibold text-brand-charcoal group-hover:text-brand-red transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  )
}
