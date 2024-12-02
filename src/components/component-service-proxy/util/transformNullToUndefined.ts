export function transformNullToUndefined<T>(obj: T): T {
    if (obj === null) {
      return undefined as unknown as T;
    }
  
    if (Array.isArray(obj)) {
      return obj.map(transformNullToUndefined) as unknown as T;
    }
  
    if (typeof obj === "object" && obj !== null) {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, transformNullToUndefined(value)])
      ) as T;
    }
  
    return obj;
  }
