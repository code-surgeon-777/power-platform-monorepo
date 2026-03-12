/**
 * Dataverse Utility Functions
 * 
 * Helper functions for working with Dataverse entities.
 * Composable utilities - no external dependencies.
 * 
 * Note: Types are defined inline to avoid circular dependencies.
 * Import types from '@power-platform/models' when available.
 */

/**
 * Entity reference - used for lookup relationships
 */
export interface EntityReference {
  id: string;
  name?: string;
  entityType?: string;
}

/**
 * Formatted values from Dataverse (key-value pairs)
 */
export interface FormattedValues {
  [key: string]: string | undefined;
}

/**
 * Base entity interface (simplified for utilities)
 */
export interface EntityBase {
  [key: string]: unknown;
}

/**
 * Create an EntityReference from an entity
 * 
 * @example
 * const ref = toEntityReference(account, 'account');
 * // { id: 'guid', name: 'Acme Corp', entityType: 'account' }
 */
export function toEntityReference(
  entity: EntityBase,
  entityType: string
): EntityReference {
  const idKey = `${entityType}id`;
  const nameKey = 'name';
  
  return {
    id: String(entity[idKey] || ''),
    name: entity[nameKey] as string | undefined,
    entityType
  };
}

/**
 * Create an EntityReference from known id and name
 * 
 * @example
 * const ref = createEntityRef('guid-123', 'Acme Corp', 'account');
 */
export function createEntityRef(
  id: string,
  name: string,
  entityType: string
): EntityReference {
  return { id, name, entityType };
}

/**
 * Check if an EntityReference is valid
 * 
 * @example
 * if (isValidRef(account.primarycontactid)) {
 *   // safe to use
 * }
 */
export function isValidRef(ref: EntityReference | undefined): ref is EntityReference {
  return ref !== undefined && ref.id !== undefined && ref.id.length > 0;
}

/**
 * Extract formatted values from entity
 * Useful for displaying user-friendly values
 * 
 * @example
 * const formatted = getFormattedValues(account);
 * // { statuscodename: 'Active', ... }
 */
export function getFormattedValues(entity: EntityBase): FormattedValues {
  const result: FormattedValues = {};
  
  for (const [key, value] of Object.entries(entity)) {
    if (key.endsWith('name') && typeof value === 'string') {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Build OData select query parameter
 * 
 * @example
 * const select = buildSelect(['name', 'emailaddress1', 'createdon']);
 * // 'name,emailaddress1,createdon'
 */
export function buildSelect(fields: string[]): string {
  return fields.join(',');
}

/**
 * Build OData filter query parameter
 * 
 * @example
 * const filter = buildFilter('statecode', 'eq', 0);
 * // 'statecode eq 0'
 * 
 * @example
 * const filter = buildFilter('name', 'co', 'Acme');
 * // 'contains(name,'Acme')'
 */
export function buildFilter(
  field: string, 
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'ge' | 'le' | 'co' | 'sw' | 'ew',
  value: string | number | boolean
): string {
  const operators: Record<string, string> = {
    'eq': 'eq',
    'ne': 'ne',
    'gt': 'gt',
    'lt': 'lt',
    'ge': 'ge',
    'le': 'le',
    'co': 'contains',
    'sw': 'startswith',
    'ew': 'endswith'
  };
  
  const op = operators[operator];
  const formattedValue = typeof value === 'string' ? `'${value}'` : value;
  
  return `${op}(${field},${formattedValue})`;
}

/**
 * Combine multiple OData filters with AND
 * 
 * @example
 * const filter = combineFilters([
 *   buildFilter('statecode', 'eq', 0),
 *   buildFilter('donotemail', 'eq', false)
 * ]);
 * // 'statecode eq 0 and donotemail eq false'
 */
export function combineFilters(filters: string[], logic: 'and' | 'or' = 'and'): string {
  if (filters.length === 0) return '';
  if (filters.length === 1) return filters[0];
  
  return filters.join(` ${logic} `);
}

/**
 * Build full OData query string
 * 
 * @example
 * const query = buildQuery({
 *   select: ['name', 'emailaddress1'],
 *   filter: combineFilters([
 *     buildFilter('statecode', 'eq', 0),
 *     buildFilter('donotemail', 'eq', false)
 *   ]),
 *   orderBy: 'createdon',
 *   orderByDir: 'desc',
 *   top: 10
 * });
 * // '?$select=name,emailaddress1&$filter=...&$orderby=createdon desc&$top=10'
 */
export interface QueryOptions {
  select?: string[];
  filter?: string;
  orderBy?: string;
  orderByDir?: 'asc' | 'desc';
  top?: number;
  skip?: number;
}

export function buildQuery(options: QueryOptions): string {
  const params: string[] = [];
  
  if (options.select && options.select.length > 0) {
    params.push(`$select=${buildSelect(options.select)}`);
  }
  
  if (options.filter) {
    params.push(`$filter=${options.filter}`);
  }
  
  if (options.orderBy) {
    const dir = options.orderByDir === 'desc' ? ' desc' : '';
    params.push(`$orderby=${options.orderBy}${dir}`);
  }
  
  if (options.top) {
    params.push(`$top=${options.top}`);
  }
  
  if (options.skip) {
    params.push(`$skip=${options.skip}`);
  }
  
  return params.length > 0 ? `?${params.join('&')}` : '';
}

/**
 * Parse Dataverse datetime to Date object
 * 
 * @example
 * const date = parseDate('/Date(1704067200000)/');
 * // Date object
 */
export function parseDate(dataverseDate: string): Date | null {
  if (!dataverseDate) return null;
  
  const match = dataverseDate.match(/\/Date\((\d+)\)\//);
  if (match) {
    return new Date(parseInt(match[1], 10));
  }
  
  // Try ISO string
  const date = new Date(dataverseDate);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Convert Date to Dataverse datetime format
 * 
 * @example
 * const formatted = toDataverseDate(new Date());
 * // '/Date(1704067200000)/'
 */
export function toDataverseDate(date: Date): string {
  return `/Date(${date.getTime()})/`;
}

/**
 * Get relative time for entity date field
 * 
 * @example
 * const age = getEntityAge(account, 'createdon');
 * // '2 days ago'
 */
export function getEntityAge(
  entity: EntityBase,
  fieldName: string
): string | null {
  const value = entity[fieldName];
  if (!value) return null;
  
  const date = value instanceof Date ? value : parseDate(String(value));
  if (!date) return null;
  
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
  if (diffDay < 30) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
}
