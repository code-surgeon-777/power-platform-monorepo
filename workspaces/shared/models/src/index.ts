/**
 * Shared Models Package
 * Contains types, interfaces, DTOs, and domain models for Power Platform/PCF development
 */

// Common / Generic types
export * from './common/dictionary';

// Dataverse entities (Core - tagged as "Core" in Dataverse)
export * from './dataverse/entity.base';
export * from './dataverse/account.core';
export * from './dataverse/contact.core';

// Dataverse metadata types
export * from './dataverse/option-set.types';
