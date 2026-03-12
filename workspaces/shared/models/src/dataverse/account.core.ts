/**
 * Account Core Entity
 * 
 * Core entity for business accounts/companies in Dataverse.
 * This is a "Core" tagged entity - stable and rarely changes.
 * 
 * Base interface: EntityBase from dataverse/entity.base.ts
 * 
 * @example Extension in workspace-specific code:
 * import { Account as CoreAccount } from '@shared/models';
 * 
 * export interface Account extends CoreAccount {
 *   // Add custom fields here
 *   new_customfield?: string;
 * }
 */

import { EntityBase, EntityReference } from './entity.base';

/**
 * Account entity core fields
 * Includes commonly used fields from the Account entity
 */
export interface Account extends EntityBase {
  // Primary Key
  accountid: string;

  // Basic Information
  name: string;
  accountnumber?: string;
  description?: string;
  websiteurl?: string;

  // Contact Information
  emailaddress1?: string;
  emailaddress2?: string;
  emailaddress3?: string;
  telephone1?: string;
  telephone2?: string;
  telephone3?: string;
  fax?: string;

  // Primary Contact (Lookup)
  primarycontactid?: EntityReference;

  // Address 1
  address1_addressid?: string;
  address1_addresstypecode?: number;
  address1_addresstypecodename?: string;
  address1_city?: string;
  address1_country?: string;
  address1_county?: string;
  address1_fax?: string;
  address1_latitude?: number;
  address1_line1?: string;
  address1_line2?: string;
  address1_line3?: string;
  address1_longitude?: number;
  address1_name?: string;
  address1_postalcode?: string;
  address1_postofficebox?: string;
  address1_shippingmethodcode?: number;
  address1_shippingmethodcodename?: string;
  address1_stateorprovince?: string;
  address1_telephone1?: string;
  address1_telephone2?: string;
  address1_telephone3?: string;
  address1_utcoffset?: number;

  // Address 2
  address2_addressid?: string;
  address2_addresstypecode?: number;
  address2_addresstypecodename?: string;
  address2_city?: string;
  address2_country?: string;
  address2_county?: string;
  address2_fax?: string;
  address2_latitude?: number;
  address2_line1?: string;
  address2_line2?: string;
  address2_line3?: string;
  address2_longitude?: number;
  address2_name?: string;
  address2_postalcode?: string;
  address2_postofficebox?: string;
  address2_shippingmethodcode?: number;
  address2_shippingmethodcodename?: string;
  address2_stateorprovince?: string;
  address2_telephone1?: string;
  address2_telephone2?: string;
  address2_telephone3?: string;
  address2_utcoffset?: number;

  // Business Information
  industrycode?: number;
  industrycodename?: string;
  businesstypecode?: number;
  businesstypecodename?: string;
  ownershipcode?: number;
  ownershipcodename?: string;
  proprietorshiptype?: number;

  // Financial Information
  annualrevenue?: number;
  numberofemployees?: number;
  creditlimit?: number;
  creditonhold?: boolean;

  // Sales Information
  accountcategorycode?: number;
  accountcategorycodename?: string;
  accountclassificationcode?: number;
  accountclassificationcodename?: string;
  msdyn_segment?: string;

  // Marketing
  donotbulkemail?: boolean;
  donotemail?: boolean;
  donotfax?: boolean;
  donotphone?: boolean;
  donotpostalmail?: boolean;

  // Preferred Contact Method
  preferredcontactmethodcode?: number;
  preferredcontactmethodcodename?: string;

  // Payment Terms
  paymenttermscode?: number;
  paymenttermscodename?: string;
  freighttermscode?: number;
  freighttermscodename?: string;

  // Shipping
  shippingmethodcode?: number;
  shippingmethodcodename?: string;

  // Territory
  territorycode?: number;
  territorycodename?: string;

  // Stock Information
  ticker?: string;

  // Type
  type?: number;
  typename?: string;
}

/**
 * Account creation DTO
 * Fields required when creating a new Account
 */
export interface CreateAccountDto {
  name: string;
  emailaddress1?: string;
  telephone1?: string;
  primarycontactid?: EntityReference;
  // Add other required fields as needed
}

/**
 * Account update DTO
 * All fields optional for partial updates
 */
export interface UpdateAccountDto {
  name?: string;
  emailaddress1?: string;
  telephone1?: string;
  primarycontactid?: EntityReference;
  description?: string;
  // Add other updatable fields as needed
}

/**
 * Account reference - minimal info for lookups
 */
export interface AccountReference extends EntityReference {
  id: string;
  name: string;
  entityType: 'account';
}
