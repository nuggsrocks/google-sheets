import * as z from 'zod'

import { toCamelCase, toHumanReadable } from './normalizeKeys'

export type Sheet = {
  table: {
    cols: SheetCol[]
    rows: SheetRow[]
  }
}

type SheetCol = { id: string; label: string; type: string; pattern?: string }

type SheetRow = {
  c: ({ v: unknown; f?: string } | null)[]
}

export function parseSheet(
  sheet: Sheet,
  schema: z.ZodType,
  options?: { errorLogger?: (...data: unknown[]) => void },
) {
  const result: Array<unknown> = []

  const table = sheet.table

  const headers = table.cols.map((col: SheetCol) => toCamelCase(col.label))

  const required = schema.toJSONSchema().required ?? []

  required.forEach((key) => {
    if (!headers.includes(key)) {
      throw new Error(
        `The sheet headers were edited. Column ${toHumanReadable(key)} was renamed or removed.`,
      )
    }
  })

  headers.forEach((h) => {
    if (!required.includes(h)) {
      if (options?.errorLogger) {
        options.errorLogger(`Unknown header "${toHumanReadable(h)}". Ignoring.`)
      }
    }
  })

  const verifiedHeaders = headers.filter((h) => required.includes(h))

  table.rows.forEach((row: SheetRow, i: number) => {
    const obj: { [key: string]: unknown } = {}

    verifiedHeaders.forEach((header: string, i: number) => {
      const value = row.c[i]?.v

      if (value === undefined || value === null) {
        obj[header] = null
      } else {
        obj[header] = value
      }
    })

    try {
      const parsed = schema.parse(obj)

      result.push(parsed)
    } catch (error: unknown) {
      if (options?.errorLogger && error instanceof z.ZodError) {
        options.errorLogger(
          `❌ Invalid row at index ${i}`,
          z.prettifyError(error),
        )
      }
    }
  })

  return result
}
