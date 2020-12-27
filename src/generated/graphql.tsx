import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: any;
  /**
   * 
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   * 
   *     Note the time designator, T, that precedes the time value.
   * 
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *   
   */
  ISO8601Duration: any;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** Floats that will have a value less than 0. */
  NegativeFloat: any;
  /** Integers that will have a value less than 0. */
  NegativeInt: any;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: any;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: any;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: any;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: any;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: any;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: any;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: any;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: any;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: any;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: any;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: any;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: any;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: any;
  /** A currency string, such as $21.25 */
  USCurrency: any;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: any;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
  /** Represents NULL values */
  Void: any;
};

















































export type Query = {
  __typename?: 'Query';
  root?: Maybe<Scalars['String']>;
  me?: Maybe<User>;
  campsitePreview?: Maybe<CampsitePreview>;
  getCampsite?: Maybe<Campsite>;
  allCampsites: Array<Maybe<Campsite>>;
  myCampsites: Array<Maybe<Campsite>>;
};


export type QueryCampsitePreviewArgs = {
  campsiteId: Scalars['String'];
};


export type QueryGetCampsiteArgs = {
  campsiteId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  root?: Maybe<Scalars['String']>;
  register?: Maybe<UserResponse>;
  login?: Maybe<UserResponse>;
  logout?: Maybe<LogoutResponse>;
  forgotPassword?: Maybe<Scalars['Boolean']>;
  resetPassword?: Maybe<UserResponse>;
  createCampsite?: Maybe<CampsiteResponse>;
  createGearCategory?: Maybe<CampsiteResponse>;
  addGear?: Maybe<CampsiteResponse>;
  deleteGear?: Maybe<CampsiteResponse>;
  volunteerGear?: Maybe<CampsiteResponse>;
  undoVolunteerGear?: Maybe<CampsiteResponse>;
  inviteCamper?: Maybe<CampsiteResponse>;
  inviteResponse?: Maybe<CampsiteResponse>;
};


export type MutationRegisterArgs = {
  input: RegistrationInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationCreateCampsiteArgs = {
  input: CreateCampsiteInput;
};


export type MutationCreateGearCategoryArgs = {
  input: CreateGearCategoryInput;
};


export type MutationAddGearArgs = {
  input: AddGearInput;
};


export type MutationDeleteGearArgs = {
  input: DeleteGearInput;
};


export type MutationVolunteerGearArgs = {
  input: VolunteerGearInput;
};


export type MutationUndoVolunteerGearArgs = {
  input: UndoVolunteerGearInput;
};


export type MutationInviteCamperArgs = {
  input: InviteCamperInput;
};


export type MutationInviteResponseArgs = {
  input: InviteResponseInput;
};

export enum CampsiteRole {
  Camper = 'CAMPER',
  Counselor = 'COUNSELOR',
  Manager = 'MANAGER'
}

export type ErrorMessage = {
  __typename?: 'ErrorMessage';
  message: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ObjectID']>;
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<Maybe<ErrorMessage>>>;
};

export type RegistrationInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type ResetPasswordInput = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Campsite = {
  __typename?: 'Campsite';
  id?: Maybe<Scalars['ObjectID']>;
  name: Scalars['String'];
  startingDate: Scalars['DateTime'];
  endingDate: Scalars['DateTime'];
  manager: User;
  counselors: Array<Maybe<User>>;
  campers: Array<Maybe<User>>;
  gearCategories?: Maybe<Array<Maybe<GearCategory>>>;
  invites: Array<Maybe<CampsiteInvite>>;
};

export type GearCategory = {
  __typename?: 'GearCategory';
  id?: Maybe<Scalars['ObjectID']>;
  category: Scalars['String'];
  gear?: Maybe<Array<Maybe<Gear>>>;
};

export type Gear = {
  __typename?: 'Gear';
  id?: Maybe<Scalars['ObjectID']>;
  name: Scalars['String'];
  quantity: Scalars['Int'];
  volunteers: Array<Maybe<GearVolunteer>>;
  userHasVolunteered: Scalars['Boolean'];
};

export type GearVolunteer = {
  __typename?: 'GearVolunteer';
  userId: Scalars['ObjectID'];
  volunteerAmount: Scalars['Int'];
};

export type CampsiteResponse = {
  __typename?: 'CampsiteResponse';
  campsite?: Maybe<Campsite>;
  errors?: Maybe<Array<Maybe<FieldError>>>;
};

export type CampsitePreview = {
  __typename?: 'CampsitePreview';
  name: Scalars['String'];
  startingDate: Scalars['DateTime'];
  endingDate: Scalars['DateTime'];
  manager: User;
};

export enum InviteStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected'
}

export type CampsiteInvite = {
  __typename?: 'CampsiteInvite';
  userId?: Maybe<Scalars['ObjectID']>;
  status: InviteStatus;
  role: CampsiteRole;
};

export type CreateCampsiteInput = {
  name: Scalars['String'];
  startingDate: Scalars['DateTime'];
  endingDate: Scalars['DateTime'];
};

export type CreateGearCategoryInput = {
  category: Scalars['String'];
  campsiteId: Scalars['ObjectID'];
};

export type AddGearInput = {
  campsiteId: Scalars['ObjectID'];
  gearCategoryId: Scalars['ObjectID'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
};

export type DeleteGearInput = {
  campsiteId: Scalars['ObjectID'];
  gearCategoryId: Scalars['ObjectID'];
  gearId: Scalars['ObjectID'];
};

export type VolunteerGearInput = {
  campsiteId: Scalars['ObjectID'];
  gearCategoryId: Scalars['ObjectID'];
  gearId: Scalars['ObjectID'];
  volunteerAmount: Scalars['Int'];
};

export type UndoVolunteerGearInput = {
  campsiteId: Scalars['ObjectID'];
  gearCategoryId: Scalars['ObjectID'];
  gearId: Scalars['ObjectID'];
};

export type InviteCamperInput = {
  userEmail: Scalars['String'];
  role: CampsiteRole;
};

export type InviteResponseInput = {
  status: InviteStatus;
  token: Scalars['String'];
};

export type FullCampsiteFieldsFragment = (
  { __typename?: 'Campsite' }
  & Pick<Campsite, 'id' | 'name' | 'startingDate' | 'endingDate'>
  & { invites: Array<Maybe<(
    { __typename?: 'CampsiteInvite' }
    & Pick<CampsiteInvite, 'userId' | 'status' | 'role'>
  )>>, manager: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ), counselors: Array<Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )>>, campers: Array<Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )>>, gearCategories?: Maybe<Array<Maybe<(
    { __typename?: 'GearCategory' }
    & Pick<GearCategory, 'id' | 'category'>
    & { gear?: Maybe<Array<Maybe<(
      { __typename?: 'Gear' }
      & Pick<Gear, 'id' | 'name' | 'quantity' | 'userHasVolunteered'>
      & { volunteers: Array<Maybe<(
        { __typename?: 'GearVolunteer' }
        & Pick<GearVolunteer, 'userId' | 'volunteerAmount'>
      )>> }
    )>>> }
  )>>> }
);

export type ShallowCampsiteFieldsFragment = (
  { __typename?: 'Campsite' }
  & Pick<Campsite, 'id' | 'name' | 'startingDate' | 'endingDate'>
  & { manager: (
    { __typename?: 'User' }
    & UserFieldsFragment
  ) }
);

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'displayName' | 'email' | 'createdAt' | 'updatedAt'>
);

export type UserResponseFieldsFragment = (
  { __typename?: 'UserResponse' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'displayName' | 'email' | 'createdAt' | 'updatedAt'>
  )>, errors?: Maybe<Array<Maybe<(
    { __typename?: 'FieldError' }
    & Pick<FieldError, 'field' | 'message'>
  )>>> }
);

export type AddGearMutationVariables = Exact<{
  input: AddGearInput;
}>;


export type AddGearMutation = (
  { __typename?: 'Mutation' }
  & { addGear?: Maybe<(
    { __typename?: 'CampsiteResponse' }
    & { campsite?: Maybe<(
      { __typename?: 'Campsite' }
      & Pick<Campsite, 'id'>
      & { gearCategories?: Maybe<Array<Maybe<(
        { __typename?: 'GearCategory' }
        & Pick<GearCategory, 'id' | 'category'>
        & { gear?: Maybe<Array<Maybe<(
          { __typename?: 'Gear' }
          & Pick<Gear, 'id' | 'name' | 'quantity' | 'userHasVolunteered'>
          & { volunteers: Array<Maybe<(
            { __typename?: 'GearVolunteer' }
            & Pick<GearVolunteer, 'userId' | 'volunteerAmount'>
          )>> }
        )>>> }
      )>>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>> }
  )> }
);

export type CreateCampsiteMutationVariables = Exact<{
  input: CreateCampsiteInput;
}>;


export type CreateCampsiteMutation = (
  { __typename?: 'Mutation' }
  & { createCampsite?: Maybe<(
    { __typename?: 'CampsiteResponse' }
    & { campsite?: Maybe<(
      { __typename?: 'Campsite' }
      & ShallowCampsiteFieldsFragment
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>> }
  )> }
);

export type CreateGearCategoryMutationVariables = Exact<{
  input: CreateGearCategoryInput;
}>;


export type CreateGearCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createGearCategory?: Maybe<(
    { __typename?: 'CampsiteResponse' }
    & { campsite?: Maybe<(
      { __typename?: 'Campsite' }
      & Pick<Campsite, 'id'>
      & { gearCategories?: Maybe<Array<Maybe<(
        { __typename?: 'GearCategory' }
        & Pick<GearCategory, 'id' | 'category'>
        & { gear?: Maybe<Array<Maybe<(
          { __typename?: 'Gear' }
          & Pick<Gear, 'id' | 'name' | 'quantity' | 'userHasVolunteered'>
          & { volunteers: Array<Maybe<(
            { __typename?: 'GearVolunteer' }
            & Pick<GearVolunteer, 'userId' | 'volunteerAmount'>
          )>> }
        )>>> }
      )>>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>> }
  )> }
);

export type DeleteGearMutationVariables = Exact<{
  input: DeleteGearInput;
}>;


export type DeleteGearMutation = (
  { __typename?: 'Mutation' }
  & { deleteGear?: Maybe<(
    { __typename?: 'CampsiteResponse' }
    & { campsite?: Maybe<(
      { __typename?: 'Campsite' }
      & Pick<Campsite, 'id'>
      & { gearCategories?: Maybe<Array<Maybe<(
        { __typename?: 'GearCategory' }
        & Pick<GearCategory, 'id' | 'category'>
        & { gear?: Maybe<Array<Maybe<(
          { __typename?: 'Gear' }
          & Pick<Gear, 'id' | 'name' | 'quantity' | 'userHasVolunteered'>
          & { volunteers: Array<Maybe<(
            { __typename?: 'GearVolunteer' }
            & Pick<GearVolunteer, 'userId' | 'volunteerAmount'>
          )>> }
        )>>> }
      )>>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>> }
  )> }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserResponse' }
    & UserResponseFieldsFragment
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'LogoutResponse' }
    & Pick<LogoutResponse, 'success'>
    & { errors?: Maybe<Array<Maybe<(
      { __typename?: 'ErrorMessage' }
      & Pick<ErrorMessage, 'message'>
    )>>> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  input: RegistrationInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'UserResponse' }
    & UserResponseFieldsFragment
  )> }
);

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword?: Maybe<(
    { __typename?: 'UserResponse' }
    & UserResponseFieldsFragment
  )> }
);

export type UndoVolunteerGearMutationVariables = Exact<{
  input: UndoVolunteerGearInput;
}>;


export type UndoVolunteerGearMutation = (
  { __typename?: 'Mutation' }
  & { undoVolunteerGear?: Maybe<(
    { __typename?: 'CampsiteResponse' }
    & { campsite?: Maybe<(
      { __typename?: 'Campsite' }
      & Pick<Campsite, 'id'>
      & { gearCategories?: Maybe<Array<Maybe<(
        { __typename?: 'GearCategory' }
        & Pick<GearCategory, 'id' | 'category'>
        & { gear?: Maybe<Array<Maybe<(
          { __typename?: 'Gear' }
          & Pick<Gear, 'id' | 'name' | 'quantity' | 'userHasVolunteered'>
          & { volunteers: Array<Maybe<(
            { __typename?: 'GearVolunteer' }
            & Pick<GearVolunteer, 'userId' | 'volunteerAmount'>
          )>> }
        )>>> }
      )>>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>> }
  )> }
);

export type VolunteerGearMutationVariables = Exact<{
  input: VolunteerGearInput;
}>;


export type VolunteerGearMutation = (
  { __typename?: 'Mutation' }
  & { volunteerGear?: Maybe<(
    { __typename?: 'CampsiteResponse' }
    & { campsite?: Maybe<(
      { __typename?: 'Campsite' }
      & Pick<Campsite, 'id'>
      & { gearCategories?: Maybe<Array<Maybe<(
        { __typename?: 'GearCategory' }
        & Pick<GearCategory, 'id' | 'category'>
        & { gear?: Maybe<Array<Maybe<(
          { __typename?: 'Gear' }
          & Pick<Gear, 'id' | 'name' | 'quantity' | 'userHasVolunteered'>
          & { volunteers: Array<Maybe<(
            { __typename?: 'GearVolunteer' }
            & Pick<GearVolunteer, 'userId' | 'volunteerAmount'>
          )>> }
        )>>> }
      )>>> }
    )>, errors?: Maybe<Array<Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>> }
  )> }
);

export type GetAllCampsitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCampsitesQuery = (
  { __typename?: 'Query' }
  & { allCampsites: Array<Maybe<(
    { __typename?: 'Campsite' }
    & ShallowCampsiteFieldsFragment
  )>> }
);

export type GetCampsiteQueryVariables = Exact<{
  campsiteId: Scalars['String'];
}>;


export type GetCampsiteQuery = (
  { __typename?: 'Query' }
  & { getCampsite?: Maybe<(
    { __typename?: 'Campsite' }
    & FullCampsiteFieldsFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'displayName' | 'email' | 'createdAt' | 'updatedAt'>
  )> }
);

export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  username
  displayName
  email
  createdAt
  updatedAt
}
    `;
export const FullCampsiteFieldsFragmentDoc = gql`
    fragment FullCampsiteFields on Campsite {
  id
  name
  startingDate
  endingDate
  invites {
    userId
    status
    role
  }
  manager {
    ...UserFields
  }
  counselors {
    ...UserFields
  }
  campers {
    ...UserFields
  }
  gearCategories {
    id
    category
    gear {
      id
      name
      quantity
      userHasVolunteered
      volunteers {
        userId
        volunteerAmount
      }
    }
  }
}
    ${UserFieldsFragmentDoc}`;
export const ShallowCampsiteFieldsFragmentDoc = gql`
    fragment ShallowCampsiteFields on Campsite {
  id
  name
  startingDate
  endingDate
  manager {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export const UserResponseFieldsFragmentDoc = gql`
    fragment UserResponseFields on UserResponse {
  user {
    id
    username
    displayName
    email
    createdAt
    updatedAt
  }
  errors {
    field
    message
  }
}
    `;
export const AddGearDocument = gql`
    mutation AddGear($input: AddGearInput!) {
  addGear(input: $input) {
    campsite {
      id
      gearCategories {
        id
        category
        gear {
          id
          name
          quantity
          userHasVolunteered
          volunteers {
            userId
            volunteerAmount
          }
        }
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useAddGearMutation() {
  return Urql.useMutation<AddGearMutation, AddGearMutationVariables>(AddGearDocument);
};
export const CreateCampsiteDocument = gql`
    mutation CreateCampsite($input: CreateCampsiteInput!) {
  createCampsite(input: $input) {
    campsite {
      ...ShallowCampsiteFields
    }
    errors {
      field
      message
    }
  }
}
    ${ShallowCampsiteFieldsFragmentDoc}`;

export function useCreateCampsiteMutation() {
  return Urql.useMutation<CreateCampsiteMutation, CreateCampsiteMutationVariables>(CreateCampsiteDocument);
};
export const CreateGearCategoryDocument = gql`
    mutation CreateGearCategory($input: CreateGearCategoryInput!) {
  createGearCategory(input: $input) {
    campsite {
      id
      gearCategories {
        id
        category
        gear {
          id
          name
          quantity
          userHasVolunteered
          volunteers {
            userId
            volunteerAmount
          }
        }
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateGearCategoryMutation() {
  return Urql.useMutation<CreateGearCategoryMutation, CreateGearCategoryMutationVariables>(CreateGearCategoryDocument);
};
export const DeleteGearDocument = gql`
    mutation DeleteGear($input: DeleteGearInput!) {
  deleteGear(input: $input) {
    campsite {
      id
      gearCategories {
        id
        category
        gear {
          id
          name
          quantity
          userHasVolunteered
          volunteers {
            userId
            volunteerAmount
          }
        }
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useDeleteGearMutation() {
  return Urql.useMutation<DeleteGearMutation, DeleteGearMutationVariables>(DeleteGearDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ...UserResponseFields
  }
}
    ${UserResponseFieldsFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
    errors {
      message
    }
  }
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: RegistrationInput!) {
  register(input: $input) {
    ...UserResponseFields
  }
}
    ${UserResponseFieldsFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    ...UserResponseFields
  }
}
    ${UserResponseFieldsFragmentDoc}`;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const UndoVolunteerGearDocument = gql`
    mutation UndoVolunteerGear($input: UndoVolunteerGearInput!) {
  undoVolunteerGear(input: $input) {
    campsite {
      id
      gearCategories {
        id
        category
        gear {
          id
          name
          quantity
          userHasVolunteered
          volunteers {
            userId
            volunteerAmount
          }
        }
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useUndoVolunteerGearMutation() {
  return Urql.useMutation<UndoVolunteerGearMutation, UndoVolunteerGearMutationVariables>(UndoVolunteerGearDocument);
};
export const VolunteerGearDocument = gql`
    mutation VolunteerGear($input: VolunteerGearInput!) {
  volunteerGear(input: $input) {
    campsite {
      id
      gearCategories {
        id
        category
        gear {
          id
          name
          quantity
          userHasVolunteered
          volunteers {
            userId
            volunteerAmount
          }
        }
      }
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useVolunteerGearMutation() {
  return Urql.useMutation<VolunteerGearMutation, VolunteerGearMutationVariables>(VolunteerGearDocument);
};
export const GetAllCampsitesDocument = gql`
    query GetAllCampsites {
  allCampsites {
    ...ShallowCampsiteFields
  }
}
    ${ShallowCampsiteFieldsFragmentDoc}`;

export function useGetAllCampsitesQuery(options: Omit<Urql.UseQueryArgs<GetAllCampsitesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllCampsitesQuery>({ query: GetAllCampsitesDocument, ...options });
};
export const GetCampsiteDocument = gql`
    query GetCampsite($campsiteId: String!) {
  getCampsite(campsiteId: $campsiteId) {
    ...FullCampsiteFields
  }
}
    ${FullCampsiteFieldsFragmentDoc}`;

export function useGetCampsiteQuery(options: Omit<Urql.UseQueryArgs<GetCampsiteQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCampsiteQuery>({ query: GetCampsiteDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    displayName
    email
    createdAt
    updatedAt
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};