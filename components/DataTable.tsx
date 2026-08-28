'use client'

import type { ReactNode } from 'react'

export type DataTableColumn<T> = {
  key: string
  header: ReactNode
  className?: string
  render: (row: T) => ReactNode
}

export default function DataTable<T>({
  columns,
  rows,
  getRowKey,
  emptyText,
}: {
  columns: DataTableColumn<T>[]
  rows: T[]
  getRowKey: (row: T) => string
  emptyText: string
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-black/15 bg-white p-8 text-center text-sm text-black/55">
        {emptyText}
      </div>
    )
  }

  return (
    <div className="max-w-full overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-black/10 text-xs uppercase tracking-[0.13em] text-black/45">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-5 py-3 font-medium ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={getRowKey(row)}
                className="border-b border-black/10 last:border-b-0"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-5 py-4 align-middle ${column.className || ''}`}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
