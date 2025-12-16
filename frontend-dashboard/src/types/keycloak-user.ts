type AttributeValidator = {
  'ignore.empty.value'?: boolean;
  max?: string | number;
  min?: number;
};

type Validators = {
  'username-prohibited-characters'?: AttributeValidator;
  multivalued?: AttributeValidator;
  length?: AttributeValidator;
  'up-username-not-idn-homograph'?: AttributeValidator;
  'person-name-prohibited-characters'?: AttributeValidator;
  email?: AttributeValidator;
};

type UserProfileAttribute = {
  name: string;
  displayName: string;
  required: boolean;
  readOnly: boolean;
  validators: Validators;
  multivalued: boolean;
};

type UserProfileGroup = {
  name: string;
  displayHeader: string;
  displayDescription: string;
};

type UserProfileMetadata = {
  attributes: UserProfileAttribute[];
  groups: UserProfileGroup[];
};

type Access = {
  manage: boolean;
};

export type KeyCloakUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  userProfileMetadata: UserProfileMetadata;
  enabled: boolean;
  createdTimestamp: number;
  totp: boolean;
  disableableCredentialTypes: string[];
  requiredActions: string[];
  notBefore: number;
  access: Access;
};
