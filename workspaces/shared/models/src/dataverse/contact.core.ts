/**
 * Contact Core Entity
 * 
 * Core entity for individual people/contacts in Dataverse.
 * This is a "Core" tagged entity - stable and rarely changes.
 * 
 * Base interface: EntityBase from dataverse/entity.base.ts
 * 
 * @example Extension in workspace-specific code:
 * import { Contact as CoreContact } from '@shared/models';
 * 
 * export interface Contact extends CoreContact {
 *   // Add custom fields here
 *   new_customfield?: string;
 * }
 */

import { EntityBase, EntityReference } from './entity.base';

/**
 * Contact entity core fields
 * Includes commonly used fields from the Contact entity
 */
export interface Contact extends EntityBase {
  // Primary Key
  contactid: string;

  // Name Information
  firstname?: string;
  middlename?: string;
  lastname?: string;
  fullname?: string;
  salutation?: string;
  nickname?: string;

  // Contact Information
  emailaddress1?: string;
  emailaddress2?: string;
  emailaddress3?: string;
  telephone1?: string;
  telephone2?: string;
  telephone3?: string;
  mobilephone?: string;
  pager?: string;
  fax?: string;

  // Job Information
  jobtitle?: string;
  department?: string;

  // Company (Account) Relationship
  parentcustomerid?: EntityReference;

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

  // Home Address
  address3_addressid?: string;
  address3_city?: string;
  address3_country?: string;
  address3_line1?: string;
  address3_line2?: string;
  address3_line3?: string;
  address3_postalcode?: string;
  address3_stateorprovince?: string;

  // Marketing Preferences
  donotbulkemail?: boolean;
  donotemail?: boolean;
  donotfax?: boolean;
  donotphone?: boolean;
  donotpostalmail?: boolean;
  donotsendmm?: boolean;

  // Preferred Contact Method
  preferredcontactmethodcode?: number;
  preferredcontactmethodcodename?: string;

  // Customer Preferences
  customertypecode?: number;

  // Business Card
  businesscard?: string;
  businesscardattributes?: string;

  // Social
  linkedin?: string;
  twitter?: string;
  facebook?: string;

  // Birthdate
  birthdate?: Date;

  // Martial Status
  familystatuscode?: number;
  familystatuscodename?: string;

  // Gender
  gendercode?: number;
  gendercodename?: string;

  // Education
  educationcode?: number;
  educationcodename?: string;

  // Spouse/Partner
  spouse?: EntityReference;

  // Children
  numberofchildren?: number;

  // Interests
  interests?: string;

  // Lifestyle
  lifestylecode?: number;

  // Credit
  creditlimit?: number;
  creditonhold?: boolean;

  // Payment Terms
  paymenttermscode?: number;
  paymenttermscodename?: string;

  // Territory
  territorycode?: number;
  territorycodename?: string;

  // Account
  accountid?: string;

  // Owner
  ownerid?: EntityReference;
}

/**
 * Contact creation DTO
 * Fields required when creating a new Contact
 */
export interface CreateContactDto {
  firstname?: string;
  lastname: string;
  emailaddress1?: string;
  telephone1?: string;
  parentcustomerid?: EntityReference;
  jobtitle?: string;
  // Add other required fields as needed
}

/**
 * Contact update DTO
 * All fields optional for partial updates
 */
export interface UpdateContactDto {
  firstname?: string;
  lastname?: string;
  emailaddress1?: string;
  telephone1?: string;
  parentcustomerid?: EntityReference;
  jobtitle?: string;
  department?: string;
  // Add other updatable fields as needed
}

/**
 * Contact reference - minimal info for lookups
 */
export interface ContactReference extends EntityReference {
  id: string;
  name: string;
  entityType: 'contact';
}
