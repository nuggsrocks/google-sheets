import * as z from 'zod';
export type Sheet = {
    table: {
        cols: SheetCol[];
        rows: SheetRow[];
    };
};
type SheetCol = {
    id: string;
    label: string;
    type: string;
    pattern?: string;
};
type SheetRow = {
    c: ({
        v: unknown;
        f?: string;
    } | null)[];
};
export declare function parseSheet(sheet: Sheet, schema: z.ZodType, options?: {
    errorLogger?: (...data: unknown[]) => void;
}): unknown[];
export {};
