/**
 * Dataverse OptionSet Metadata Types
 * 
 * Types for working with Dataverse Web API OptionSet metadata.
 * These represent the structure returned by the Dataverse Web API
 * when querying entity attribute metadata.
 * 
 * Use these types when:
 * - Building metadata-driven UIs
 * - Working with the Dataverse Web API directly
 * - Dynamically rendering option sets in forms
 * - Runtime option set introspection
 */

import { Dictionary } from '../common/dictionary';

/**
 * Localized label for an option
 */
export interface Description {
  LocalizedLabels: LocalizedLabel[];
  UserLocalizedLabel: LocalizedLabel;
}

/**
 * Individual localized label
 */
export interface LocalizedLabel {
  Label: string;
  LanguageCode: number;
  IsManaged: boolean;
  MetadataId: string | null;
}

/**
 * Individual option in an option set
 */
export interface Option {
  Value: number;
  Color: string | null;
  IsManaged: boolean;
  ExternalValue: string | null;
  ParentValues: unknown[];
  MetadataId: string | null;
  HasChanged: boolean | null;
  Label: Description;
  Description: Description;
}

/**
 * Option set definition containing all options
 */
export interface OptionSet {
  MetadataId: string;
  Name: string;
  Options: Option[];
}

/**
 * Option set attribute metadata
 * Returned when querying attribute metadata via Web API
 */
export interface OptionSetAttributeMetadata {
  LogicalName: string;
  SchemaName: string;
  DefaultFormValue: number;
  MetadataId: string;
  OptionSet: OptionSet;
  // Additional common properties
  IsValidForCreate?: boolean;
  IsValidForRead?: boolean;
  IsValidForUpdate?: boolean;
  RequiredLevel?: number;
}

/**
 * Helper type for option set values (simpler than full metadata)
 * Use when you just need the value/name pairs
 */
export type OptionSetValues = Dictionary<string>;

/**
 * Helper to extract option values from OptionSetMetadata
 * 
 * @example
 * const statusOptions = extractOptionValues(metadata.OptionSet);
 * // Returns: { '0': 'Active', '1': 'Inactive' }
 */
export function extractOptionValues(optionSet: OptionSet): OptionSetValues {
  const result: OptionSetValues = {};
  
  for (const option of optionSet.Options) {
    result[option.Value.toString()] = option.Label.UserLocalizedLabel?.Label ?? '';
  }
  
  return result;
}

/**
 * Helper to find option label by value
 * 
 * @example
 * const label = findOptionLabel(metadata.OptionSet, 1);
 * // Returns: 'Active' or undefined
 */
export function findOptionLabel(optionSet: OptionSet, value: number): string | undefined {
  const option = optionSet.Options.find(o => o.Value === value);
  return option?.Label.UserLocalizedLabel?.Label;
}
