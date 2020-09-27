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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  allCampsites: Array<Campsite>;
  myCampsites: Array<Campsite>;
  getCategories: GetCategoriesResponse;
};


export type QueryGetCategoriesArgs = {
  campsiteId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Campsite = {
  __typename?: 'Campsite';
  id: Scalars['Int'];
  name: Scalars['String'];
  counselorId: Scalars['Int'];
  counselor: User;
  campers: Array<Camper>;
  gearCategories: Array<GearCategory>;
  startingDate: Scalars['DateTime'];
  endingDate: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Camper = {
  __typename?: 'Camper';
  userId: Scalars['Int'];
  role: Scalars['String'];
  campsiteId: Scalars['Int'];
  campsite: Campsite;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type GearCategory = {
  __typename?: 'GearCategory';
  id: Scalars['Int'];
  category: Scalars['String'];
  campsiteId: Scalars['Int'];
  campsite: Campsite;
  gears: Array<Gear>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Gear = {
  __typename?: 'Gear';
  id: Scalars['Int'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
  gearCategoryId: Scalars['Int'];
  gearCategory: GearCategory;
  gearVolunteers: Array<GearVolunteer>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type GearVolunteer = {
  __typename?: 'GearVolunteer';
  gearId: Scalars['Int'];
  userId: Scalars['Int'];
  volunteerAmount: Scalars['Int'];
  gear: Gear;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type GetCategoriesResponse = {
  __typename?: 'GetCategoriesResponse';
  gearCategories?: Maybe<Array<GearCategory>>;
  errors?: Maybe<Array<ErrorMessage>>;
};

export type ErrorMessage = {
  __typename?: 'ErrorMessage';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: UserResponse;
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  createCampsite: CampsiteResponse;
  createGearCategory: GearCategoryResponse;
  addGear: GearResponse;
  volunteerGear: GearVolunteerResponse;
};


export type MutationRegisterArgs = {
  input: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationCreateCampsiteArgs = {
  input: CampsiteInput;
};


export type MutationCreateGearCategoryArgs = {
  campsiteId: Scalars['Int'];
  category: Scalars['String'];
};


export type MutationAddGearArgs = {
  input: GearInput;
};


export type MutationVolunteerGearArgs = {
  input: VolunteerGearInput;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type CampsiteResponse = {
  __typename?: 'CampsiteResponse';
  campsite?: Maybe<Campsite>;
  errors?: Maybe<Array<FieldError>>;
};

export type CampsiteInput = {
  name: Scalars['String'];
  startingDate: Scalars['DateTime'];
  endingDate: Scalars['DateTime'];
};

export type GearCategoryResponse = {
  __typename?: 'GearCategoryResponse';
  gearCategory?: Maybe<GearCategory>;
  errors?: Maybe<Array<FieldError>>;
};

export type GearResponse = {
  __typename?: 'GearResponse';
  gear?: Maybe<Gear>;
  errors?: Maybe<Array<ErrorMessage>>;
};

export type GearInput = {
  name: Scalars['String'];
  quantity: Scalars['Int'];
  gearCategoryId: Scalars['Int'];
};

export type GearVolunteerResponse = {
  __typename?: 'GearVolunteerResponse';
  gearVolunteer?: Maybe<GearVolunteer>;
  fieldError?: Maybe<Array<FieldError>>;
};

export type VolunteerGearInput = {
  gearId: Scalars['Float'];
  userId: Scalars['Float'];
  volunteerAmount: Scalars['Float'];
};

export type UserResponseFieldsFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & Pick<FieldError, 'field' | 'message'>
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type AddGearMutationVariables = Exact<{
  input: GearInput;
}>;


export type AddGearMutation = (
  { __typename?: 'Mutation' }
  & { addGear: (
    { __typename?: 'GearResponse' }
    & { gear?: Maybe<(
      { __typename?: 'Gear' }
      & Pick<Gear, 'id' | 'name' | 'quantity' | 'gearCategoryId'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorMessage' }
      & Pick<ErrorMessage, 'message'>
    )>> }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & UserResponseFieldsFragment
  ) }
);

export type CreateGearCategoryMutationVariables = Exact<{
  campsiteId: Scalars['Int'];
  category: Scalars['String'];
}>;


export type CreateGearCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createGearCategory: (
    { __typename?: 'GearCategoryResponse' }
    & { gearCategory?: Maybe<(
      { __typename?: 'GearCategory' }
      & Pick<GearCategory, 'id' | 'category' | 'campsiteId'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & UserResponseFieldsFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'UserResponse' }
    & UserResponseFieldsFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  input: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & UserResponseFieldsFragment
  ) }
);

export type GetAllCampsitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCampsitesQuery = (
  { __typename?: 'Query' }
  & { allCampsites: Array<(
    { __typename?: 'Campsite' }
    & Pick<Campsite, 'id' | 'name' | 'startingDate' | 'endingDate'>
  )> }
);

export type GetCategoriesQueryVariables = Exact<{
  campsiteId: Scalars['Int'];
}>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { getCategories: (
    { __typename?: 'GetCategoriesResponse' }
    & { gearCategories?: Maybe<Array<(
      { __typename?: 'GearCategory' }
      & Pick<GearCategory, 'id' | 'category'>
    )>>, errors?: Maybe<Array<(
      { __typename?: 'ErrorMessage' }
      & Pick<ErrorMessage, 'message'>
    )>> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export const UserResponseFieldsFragmentDoc = gql`
    fragment UserResponseFields on UserResponse {
  errors {
    field
    message
  }
  user {
    id
    username
  }
}
    `;
export const AddGearDocument = gql`
    mutation AddGear($input: GearInput!) {
  addGear(input: $input) {
    gear {
      id
      name
      quantity
      gearCategoryId
    }
    errors {
      message
    }
  }
}
    `;

export function useAddGearMutation() {
  return Urql.useMutation<AddGearMutation, AddGearMutationVariables>(AddGearDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    ...UserResponseFields
  }
}
    ${UserResponseFieldsFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateGearCategoryDocument = gql`
    mutation CreateGearCategory($campsiteId: Int!, $category: String!) {
  createGearCategory(campsiteId: $campsiteId, category: $category) {
    gearCategory {
      id
      category
      campsiteId
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
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
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
    ...UserResponseFields
  }
}
    ${UserResponseFieldsFragmentDoc}`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: UsernamePasswordInput!) {
  register(input: $input) {
    ...UserResponseFields
  }
}
    ${UserResponseFieldsFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const GetAllCampsitesDocument = gql`
    query GetAllCampsites {
  allCampsites {
    id
    name
    startingDate
    endingDate
  }
}
    `;

export function useGetAllCampsitesQuery(options: Omit<Urql.UseQueryArgs<GetAllCampsitesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllCampsitesQuery>({ query: GetAllCampsitesDocument, ...options });
};
export const GetCategoriesDocument = gql`
    query GetCategories($campsiteId: Int!) {
  getCategories(campsiteId: $campsiteId) {
    gearCategories {
      id
      category
    }
    errors {
      message
    }
  }
}
    `;

export function useGetCategoriesQuery(options: Omit<Urql.UseQueryArgs<GetCategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCategoriesQuery>({ query: GetCategoriesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};