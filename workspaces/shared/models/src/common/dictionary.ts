/**
 * Generic Dictionary Type
 * 
 * A simple key-value collection type.
 * Use for known, typed key-value pairs like option sets, configs, etc.
 * 
 * For dynamic entity property access, use the property bag pattern
 * (EntityKeys with unknown values) in dataverse/entity.base.ts
 */

/**
 * Dictionary - key-value pairs where keys are strings
 * 
 * @example
 * const options: Dictionary<string> = {
 *   'active': 'Active',
 *   'inactive': 'Inactive'
 * };
 * 
 * @example
 * const config: Dictionary<boolean> = {
 *   'isenabled': true,
 *   'isvisible': false
 * };
 */
export interface Dictionary<T> {
  [key: string]: T | undefined;
}
