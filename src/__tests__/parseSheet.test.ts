import { describe, expect, test, vi } from 'vitest'

import { sheetResponse } from '../__fixtures__/sheetResponse'
import { parseSheet } from '../parseSheet'
import { schema } from '../__fixtures__/schema'

describe('parseSheet', () => {
  test('parses valid sheet rows', () => {
    const res = parseSheet(sheetResponse, schema)

    expect(res).toEqual([
      {
        addItem: 0.9,
        available: true,
        category: 'Pizza',
        description: null,
        name: 'Mini 7"',
        order: 1,
        price: 5.49,
        priceLarge: null,
        priceMedium: null,
        priceSmall: null,
      },
      {
        addItem: null,
        available: true,
        category: 'Supreme',
        description: 'Pepperoni, Ham, Sausage, Ground Beef, Bacon',
        name: 'Meat Supreme',
        order: 2,
        price: null,
        priceLarge: 27.99,
        priceMedium: 23.49,
        priceSmall: 17.49,
      },
    ])
  })

  test('omits rows that are missing required', () => {
    const badSheet = structuredClone(sheetResponse)

    const badRowIndex = 0

    badSheet.table.rows[badRowIndex].c[2] = null

    const errorLogger = vi.fn()

    const res = parseSheet(badSheet, schema, { errorLogger })

    expect(res).toEqual([
      {
        addItem: null,
        available: true,
        category: 'Supreme',
        description: 'Pepperoni, Ham, Sausage, Ground Beef, Bacon',
        name: 'Meat Supreme',
        order: 2,
        price: null,
        priceLarge: 27.99,
        priceMedium: 23.49,
        priceSmall: 17.49,
      },
    ])

    expect(errorLogger).toHaveBeenCalledWith(
      expect.stringContaining('Invalid row at index ' + badRowIndex),
      expect.any(String),
    )
  })

  test('handles wrong type', () => {
    const badSheet = structuredClone(sheetResponse)

    badSheet.table.rows[0].c[3] = { v: 'foo' }

    const errorLogger = vi.fn()

    const res = parseSheet(badSheet, schema, { errorLogger })

    expect(res).toEqual([
      {
        addItem: null,
        available: true,
        category: 'Supreme',
        description: 'Pepperoni, Ham, Sausage, Ground Beef, Bacon',
        name: 'Meat Supreme',
        order: 2,
        price: null,
        priceLarge: 27.99,
        priceMedium: 23.49,
        priceSmall: 17.49,
      },
    ])

    expect(errorLogger).toHaveBeenCalledWith(
      expect.stringContaining('Invalid row at index 0'),
      expect.any(String),
    )
  })

  test('handles altered headers', () => {
    const badSheet = structuredClone(sheetResponse)

    badSheet.table.cols[6].label = 'Small Price'

    const errorLogger = vi.fn()

    expect(() => {
      parseSheet(badSheet, schema, { errorLogger })
    }).toThrow(/Column Price Small was renamed or removed/i)
  })

  test('warns on unknown header added', () => {
    const badSheet = structuredClone(sheetResponse)

    badSheet.table.cols.push({
      id: 'Z',
      label: 'Added Header',
      type: 'string',
    })

    badSheet.table.rows.forEach((r) => {
      r.c.push({ v: 'value' })
    })

    const errorLogger = vi.fn()

    const res = parseSheet(badSheet, schema, { errorLogger })

    expect(res).toEqual([
      {
        addItem: 0.9,
        available: true,
        category: 'Pizza',
        description: null,
        name: 'Mini 7"',
        order: 1,
        price: 5.49,
        priceLarge: null,
        priceMedium: null,
        priceSmall: null,
      },
      {
        addItem: null,
        available: true,
        category: 'Supreme',
        description: 'Pepperoni, Ham, Sausage, Ground Beef, Bacon',
        name: 'Meat Supreme',
        order: 2,
        price: null,
        priceLarge: 27.99,
        priceMedium: 23.49,
        priceSmall: 17.49,
      },
    ])

    expect(errorLogger).toHaveBeenCalledExactlyOnceWith(
      expect.stringMatching(/unknown header "added header"/i),
    )
  })
})
