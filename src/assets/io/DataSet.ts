/**
 * @fileoverview [유틸] 데이터셋  
 *
 * @author 
 * @version 1.0.0
 */
export interface DataSetType {
    [key: string]: string | number | boolean | JSON | unknown;

    getString(key: string, defaultValue?: string): string;
    getNumber(key: string, defaultValue?: number): number;
    getBoolean(key: string, defaultValue?: boolean): boolean;
    getObj<T = JSON>(key: string, defaultValue?: T): T;
    getList<T = any>(key: string, defaultValue?: T[]): T[];

    putString(key: string, value: string): void;
    putNumber(key: string, value: number): void;
    putBoolean(key: string, value: boolean): void;
    putObj<T = Record<string, unknown>>(key: string, value: T): void;
    putList<T = any>(key: string, value: T[]): void;
}

export class DataSet implements DataSetType {
    // 인덱스 시그니처를 클래스 자체에 직접 적용
    [key: string]: string | number | boolean | Record<string, unknown> | unknown | Function;

    constructor(data: Record<string, unknown> = {}) {
        Object.keys(data).forEach((key) => {
            this[key] = data[key];
        });
    }

    getString(key: string, defaultValue: string = ""): string {
        const value = this[key];
        return typeof value === "string" ? value : defaultValue;
    }

    getNumber(key: string, defaultValue: number = 0): number {
        const value = this[key];
        return typeof value === "number" ? value : defaultValue;
    }

    getBoolean(key: string, defaultValue: boolean = false): boolean {
        const value = this[key];
        return typeof value === "boolean" ? value : defaultValue;
    }

    getObj<T = Record<string, unknown>>(key: string, defaultValue: T = {} as T): T {
        const value = this[key];
        return typeof value === "object" && value !== null ? (value as T) : defaultValue;
    }

    getList<T = any>(key: string, defaultValue: T[] = []): T[] {
        const value = this[key];
        return Array.isArray(value) ? (value as T[]) : defaultValue;
    }

    putString(key: string, value: string): void {
        this[key] = value;
    }

    putNumber(key: string, value: number): void {
        this[key] = value;
    }

    putBoolean(key: string, value: boolean): void {
        this[key] = value;
    }

    putObj<T = Record<string, unknown>>(key: string, value: T): void {
        this[key] = value;
    }

    putList<T = any>(key: string, value: T[]): void {
        this[key] = value;
    }
}

export default DataSet;