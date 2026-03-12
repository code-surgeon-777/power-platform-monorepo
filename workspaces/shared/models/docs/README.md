# Models Package

This package contains the core data models for the Power Platform monorepo.

## Structure

```
src/
├── common/
│   └── dictionary.ts          # Generic dictionary/key-value types
│
├── dataverse/
│   ├── entity.base.ts        # Base interfaces for Dataverse entities
│   ├── account.core.ts       # Account entity model
│   ├── contact.core.ts       # Contact entity model
│   └── option-set.types.ts   # OptionSet metadata types
│
└── index.ts                  # Package exports
```

## Usage

Import models from the package:

```typescript
import { Account, Contact, EntityBase, Dictionary } from '@power-platform/models';
```

## Models

### Dictionary
Generic key-value collection type for known, typed pairs like option sets and configs.

```typescript
const options: Dictionary<string> = {
  'active': 'Active',
  'inactive': 'Inactive'
};
```

### EntityBase
Base class providing common properties and methods for all Dataverse entities.

### Account
Core model representing a business account.

### Contact
Core model representing a person/contact.

### OptionSet Metadata
Types for working with Dataverse Web API OptionSet metadata:

- `OptionSetAttributeMetadata` - Attribute metadata from Web API
- `OptionSet` - Option set definition
- `Option` - Individual option value
- `extractOptionValues()` - Helper to extract value-label pairs
