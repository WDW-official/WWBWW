'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Option = {
  label: string
  value: string
}

export default function AutoFilterSelect({
  name,
  defaultValue,
  options,
  resetFields = [],
  className = 'bg-transparent text-xs outline-none',
}: {
  name: string
  defaultValue: string
  options: Option[]
  resetFields?: string[]
  className?: string
}) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateFilter(value: string) {
    const params = new URLSearchParams(searchParams.toString())

    if (value === 'all') {
      params.delete(name)
    } else {
      params.set(name, value)
    }

    resetFields.forEach((field) => params.delete(field))

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <select
      name={name}
      defaultValue={defaultValue}
      onChange={(event) => updateFilter(event.target.value)}
      className={className}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
