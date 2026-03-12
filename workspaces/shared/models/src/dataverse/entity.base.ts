/**
 * Dataverse Entity Base Interfaces
 * 
 * Base interfaces that all Dataverse entities share.
 * These define the common properties across all entities.
 * 
 * Note: This is Dataverse-specific. For generic types, see common/dictionary.ts
 */

import { Dictionary } from '../common/dictionary';

/**
 * Entity reference - used for lookup relationships
 */
export interface EntityReference {
  id: string;
  name?: string;
  entityType?: string;
}

/**
 * OData metadata properties
 * Included in OData responses from Dataverse
 */
export interface EntityOData {
  '@odata.etag'?: string;
  '@odata.context'?: string;
  '@odata.nextLink'?: string;
  '@odata.count'?: number;
}

/**
 * Common audit fields present on all entities
 */
export interface EntityAudit {
  createdon?: Date;
  modifiedon?: Date;
  createdby?: EntityReference;
  modifiedby?: EntityReference;
  ownerid?: EntityReference;
  owningbusinessunitid?: EntityReference;
  owningteam?: EntityReference;
  owninguser?: EntityReference;
}

/**
 * State fields for entities that support state
 */
export interface EntityState {
  statecode?: number;
  statecodename?: string;
  statuscode?: number;
  statuscodename?: string;
}

/**
 * Property bag - for polymorphic/entity-agnostic code
 * Access any property dynamically: entity["propertykey"] = "propertyvalue"
 * 
 * @example
 * const value = entity['anyfieldname']; // unknown - must narrow before use
 */
export interface EntityKeys {
  [key: string]: unknown;
}

/**
 * Base entity interface combining common properties
 * All Dataverse entities extend this base
 */
export interface EntityBase extends EntityOData, EntityAudit, EntityKeys {
  // Empty - other interfaces extend this
}

/**
 * Helper type for create operations
 * All fields are optional since you might not set all fields
 */
export type EntityCreate<T = unknown> = Partial<T>;

/**
 * Helper type for update operations
 * All fields are optional for partial updates
 */
export type EntityUpdate<T = unknown> = Partial<T>;

/**
 * Helper type for entity selection
 * Allows picking specific fields from an entity
 */
export type EntitySelect<T, K extends keyof T = never> = Pick<T, K>;

/**
 * Formatted value helper
 * Type for accessing formatted values from Dataverse
 */
export interface FormattedValues extends Dictionary<string> {
  // Inherits [key: string]: string | undefined
}
