import { type Sheet } from '../parseSheet'

export const sheetResponse: Sheet = {
  table: {
    cols: [
      { id: 'A', label: 'Category', type: 'string' },
      { id: 'B', label: 'Order', type: 'number', pattern: 'General' },
      { id: 'C', label: 'Name', type: 'string' },
      { id: 'D', label: 'Price', type: 'number', pattern: '#,##0.00' },
      { id: 'E', label: 'Add Item', type: 'number', pattern: '#,##0.00' },
      { id: 'F', label: 'Available', type: 'boolean' },
      { id: 'G', label: 'Price Small', type: 'number', pattern: 'General' },
      {
        id: 'H',
        label: 'Price Medium',
        type: 'number',
        pattern: 'General',
      },
      { id: 'I', label: 'Price Large', type: 'number', pattern: 'General' },
      { id: 'J', label: 'Description', type: 'string' },
    ],
    rows: [
      {
        c: [
          { v: 'Pizza' },
          { v: 1, f: '1' },
          { v: 'Mini 7"' },
          { v: 5.49, f: '5.49' },
          { v: 0.9, f: '0.90' },
          { v: true, f: 'TRUE' },
          null,
          null,
          null,
          { v: null },
        ],
      },
      {
        c: [
          { v: 'Supreme' },
          { v: 2, f: '2' },
          { v: 'Meat Supreme' },
          null,
          null,
          { v: true, f: 'TRUE' },
          { v: 17.49, f: '17.49' },
          { v: 23.49, f: '23.49' },
          { v: 27.99, f: '27.99' },
          { v: 'Pepperoni, Ham, Sausage, Ground Beef, Bacon' },
        ],
      },
    ],
  },
}
