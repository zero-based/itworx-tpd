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
};

export type CertificationProviders = {
  __typename?: 'CertificationProviders';
  certificatoinProviderId: Scalars['Float'];
  certificationProviderName: Scalars['String'];
};

export type Certifications = {
  __typename?: 'Certifications';
  certificationId: Scalars['Float'];
  certificationProviderId: Scalars['Float'];
  certificationName: Scalars['String'];
  certificationProvider: CertificationProviders;
};

export type EmployeeCertifications = {
  __typename?: 'EmployeeCertifications';
  employeeId: Scalars['String'];
  certificationId: Scalars['Float'];
  expirationDate?: Maybe<Scalars['String']>;
  certification: Certifications;
};

export type ResourceRequests = {
  __typename?: 'ResourceRequests';
  referenceNumber: Scalars['Float'];
  managerName: Scalars['String'];
  function: Scalars['String'];
  title: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  propability: Scalars['Float'];
  percentage: Scalars['Float'];
  status: Scalars['String'];
  coreTeamMember?: Maybe<Scalars['String']>;
  replacenement?: Maybe<Scalars['String']>;
  replacementFor?: Maybe<Scalars['String']>;
  requestsCount?: Maybe<Scalars['Int']>;
  relatedOpportunity?: Maybe<Scalars['String']>;
  comments?: Maybe<Scalars['String']>;
  assignedResource?: Maybe<Scalars['String']>;
  actualPercentage?: Maybe<Scalars['Int']>;
};

export type Skills = {
  __typename?: 'Skills';
  skillId: Scalars['Float'];
  skillName: Scalars['String'];
};

export type EmployeeSkills = {
  __typename?: 'EmployeeSkills';
  employeeId: Scalars['String'];
  skillId: Scalars['Float'];
  experienceLevel: Scalars['String'];
  lastUsedDate: Scalars['String'];
  skill: Skills;
};

export type ReleaseRequests = {
  __typename?: 'ReleaseRequests';
  referenceNumber: Scalars['Float'];
  managerName: Scalars['String'];
  employeeName: Scalars['String'];
  employeeId: Scalars['String'];
  employeeTitle: Scalars['String'];
  function: Scalars['String'];
  releaseDate: Scalars['String'];
  propability: Scalars['Float'];
  releasePercentage: Scalars['Float'];
  releaseReason: Scalars['String'];
  leaving: Scalars['String'];
  requestStatus: Scalars['String'];
};

export type EmployeesProfiles = {
  __typename?: 'EmployeesProfiles';
  id: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
  hiringDate: Scalars['String'];
  function: Scalars['String'];
  directManagerId?: Maybe<Scalars['String']>;
  workgroup: Scalars['String'];
  employmentType: Scalars['String'];
  allocationPercentage: Scalars['Float'];
  skillsLastUpdateDate?: Maybe<Scalars['String']>;
  employeeEmail: Scalars['String'];
  employeeProfilePicture?: Maybe<Scalars['String']>;
  mobileNumber: Scalars['String'];
  costCenter: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type CertificationProviderResponse = {
  __typename?: 'CertificationProviderResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<CertificationProviders>;
};

export type CertificationProvidersPage = {
  __typename?: 'CertificationProvidersPage';
  hasMore: Scalars['Boolean'];
  items: Array<CertificationProviders>;
};

export type PaginatedCertificationProviderResponse = {
  __typename?: 'PaginatedCertificationProviderResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<CertificationProvidersPage>;
};

export type CertificationResponse = {
  __typename?: 'CertificationResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<Certifications>;
};

export type CertificationsPage = {
  __typename?: 'CertificationsPage';
  hasMore: Scalars['Boolean'];
  items: Array<Certifications>;
};

export type PaginatedCertificationResponse = {
  __typename?: 'PaginatedCertificationResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<CertificationsPage>;
};

export type EmployeeCertificationResponse = {
  __typename?: 'EmployeeCertificationResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<EmployeeCertifications>;
};

export type EmployeeCertificationsPage = {
  __typename?: 'EmployeeCertificationsPage';
  hasMore: Scalars['Boolean'];
  items: Array<EmployeeCertifications>;
};

export type PaginatedEmployeeCertificationResponse = {
  __typename?: 'PaginatedEmployeeCertificationResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<EmployeeCertificationsPage>;
};

export type EmployeeSkillResponse = {
  __typename?: 'EmployeeSkillResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<EmployeeSkills>;
};

export type EmployeeSkillsPage = {
  __typename?: 'EmployeeSkillsPage';
  hasMore: Scalars['Boolean'];
  items: Array<EmployeeSkills>;
};

export type PaginatedEmployeeSkillResponse = {
  __typename?: 'PaginatedEmployeeSkillResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<EmployeeSkillsPage>;
};

export type ReleaseRequestsPage = {
  __typename?: 'ReleaseRequestsPage';
  hasMore: Scalars['Boolean'];
  items: Array<ReleaseRequests>;
};

export type PaginatedReleaseRequestResponse = {
  __typename?: 'PaginatedReleaseRequestResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<ReleaseRequestsPage>;
};

export type ReleaseRequestResponse = {
  __typename?: 'ReleaseRequestResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<ReleaseRequests>;
};

export type ResourceRequestsPage = {
  __typename?: 'ResourceRequestsPage';
  hasMore: Scalars['Boolean'];
  items: Array<ResourceRequests>;
};

export type PaginatedResourceRequestResponse = {
  __typename?: 'PaginatedResourceRequestResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<ResourceRequestsPage>;
};

export type ResourceRequestResponse = {
  __typename?: 'ResourceRequestResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<ResourceRequests>;
};

export type SkillsPage = {
  __typename?: 'SkillsPage';
  hasMore: Scalars['Boolean'];
  items: Array<Skills>;
};

export type PaginatedSkillResponse = {
  __typename?: 'PaginatedSkillResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<SkillsPage>;
};

export type SkillResponse = {
  __typename?: 'SkillResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<Skills>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<EmployeesProfiles>;
};

export type EmployeeCertificationInput = {
  certificateProvider: Scalars['String'];
  certificationName: Scalars['String'];
  expirationDate: Scalars['String'];
};

export type EmployeeSkillInput = {
  skillName: Scalars['String'];
  experienceLevel: Scalars['String'];
  lastUsedDate: Scalars['String'];
};

export type ReleaseRequestInput = {
  managerName: Scalars['String'];
  employeeName: Scalars['String'];
  employeeId: Scalars['String'];
  employeeTitle: Scalars['String'];
  function: Scalars['String'];
  releaseDate: Scalars['String'];
  propability: Scalars['Float'];
  releasePercentage: Scalars['Float'];
  releaseReason: Scalars['String'];
  leaving: Scalars['String'];
  requestStatus: Scalars['String'];
};

export type ResourceRequestInput = {
  managerName: Scalars['String'];
  function: Scalars['String'];
  title: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  propability: Scalars['Float'];
  percentage: Scalars['Float'];
  status: Scalars['String'];
  coreTeamMember?: Maybe<Scalars['String']>;
  replacenement?: Maybe<Scalars['String']>;
  replacementFor?: Maybe<Scalars['String']>;
  requestsCount?: Maybe<Scalars['Float']>;
  relatedOpportunity?: Maybe<Scalars['String']>;
  comments?: Maybe<Scalars['String']>;
  assignedResource?: Maybe<Scalars['String']>;
  actualPercentage?: Maybe<Scalars['Float']>;
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  certificationsProviders?: Maybe<PaginatedCertificationProviderResponse>;
  certificateProvider?: Maybe<CertificationProviderResponse>;
  certifications?: Maybe<PaginatedCertificationResponse>;
  certification?: Maybe<CertificationResponse>;
  managers: Array<EmployeesProfiles>;
  employeeCertification?: Maybe<EmployeeCertificationResponse>;
  employeeCertifications: PaginatedEmployeeCertificationResponse;
  employeeSkill?: Maybe<EmployeeSkillResponse>;
  employeeSkills: PaginatedEmployeeSkillResponse;
  releaseRequest?: Maybe<ReleaseRequestResponse>;
  releaseRequests: PaginatedReleaseRequestResponse;
  resourceRequest?: Maybe<ResourceRequestResponse>;
  resourceRequests: PaginatedResourceRequestResponse;
  skill?: Maybe<SkillResponse>;
  skills: PaginatedSkillResponse;
  me?: Maybe<EmployeesProfiles>;
  role?: Maybe<UserRole>;
};


export type QueryCertificationsProvidersArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryCertificateProviderArgs = {
  certificationProviderId: Scalars['Int'];
};


export type QueryCertificationsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryCertificationArgs = {
  certificationId: Scalars['Int'];
};


export type QueryEmployeeCertificationArgs = {
  certificationId: Scalars['Int'];
};


export type QueryEmployeeCertificationsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryEmployeeSkillArgs = {
  skillId: Scalars['Int'];
};


export type QueryEmployeeSkillsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryReleaseRequestArgs = {
  referenceNumber: Scalars['Int'];
};


export type QueryReleaseRequestsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryResourceRequestArgs = {
  referenceNumber: Scalars['Int'];
};


export type QueryResourceRequestsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QuerySkillArgs = {
  skillId: Scalars['Int'];
};


export type QuerySkillsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Manager = 'MANAGER',
  Employee = 'EMPLOYEE'
}

export type Mutation = {
  __typename?: 'Mutation';
  updateCertificationProvider?: Maybe<CertificationProviderResponse>;
  createCertificationProvider: CertificationProviderResponse;
  deleteCertificateProvider: Scalars['Boolean'];
  updateCertification?: Maybe<CertificationResponse>;
  createCertification: CertificationResponse;
  deleteCertification: Scalars['Boolean'];
  createEmployeeCertification: EmployeeCertificationResponse;
  updateEmployeeCertification?: Maybe<EmployeeCertificationResponse>;
  deleteEmployeeCertification: Scalars['Boolean'];
  createEmployeeSkill: EmployeeSkillResponse;
  updateEmployeeSkill?: Maybe<EmployeeSkillResponse>;
  deleteEmployeeSkill: Scalars['Boolean'];
  createReleaseRequest: ReleaseRequestResponse;
  updateReleaseRequest?: Maybe<ReleaseRequestResponse>;
  deleteReleaseRequest: Scalars['Boolean'];
  createResourceRequest: ResourceRequestResponse;
  updateResourceRequest?: Maybe<ResourceRequestResponse>;
  deleteResourceRequest: Scalars['Boolean'];
  createSkill: SkillResponse;
  updateSkill?: Maybe<SkillResponse>;
  deleteSkill: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationUpdateCertificationProviderArgs = {
  certificationProviderName: Scalars['String'];
  certificationProviderId: Scalars['Int'];
};


export type MutationCreateCertificationProviderArgs = {
  certificationProviderName: Scalars['String'];
};


export type MutationDeleteCertificateProviderArgs = {
  certificationProviderId: Scalars['Int'];
};


export type MutationUpdateCertificationArgs = {
  certificationName: Scalars['String'];
  certificationId: Scalars['Int'];
};


export type MutationCreateCertificationArgs = {
  certificationProviderId: Scalars['Int'];
  certificationName: Scalars['String'];
};


export type MutationDeleteCertificationArgs = {
  certificationId: Scalars['Int'];
};


export type MutationCreateEmployeeCertificationArgs = {
  input: EmployeeCertificationInput;
};


export type MutationUpdateEmployeeCertificationArgs = {
  input: EmployeeCertificationInput;
  certificationId: Scalars['Int'];
};


export type MutationDeleteEmployeeCertificationArgs = {
  certificationId: Scalars['Int'];
};


export type MutationCreateEmployeeSkillArgs = {
  input: EmployeeSkillInput;
};


export type MutationUpdateEmployeeSkillArgs = {
  input: EmployeeSkillInput;
  skillId: Scalars['Int'];
};


export type MutationDeleteEmployeeSkillArgs = {
  skillId: Scalars['Int'];
};


export type MutationCreateReleaseRequestArgs = {
  input: ReleaseRequestInput;
};


export type MutationUpdateReleaseRequestArgs = {
  input: ReleaseRequestInput;
  referenceNumber: Scalars['Int'];
};


export type MutationDeleteReleaseRequestArgs = {
  referenceNumber: Scalars['Int'];
};


export type MutationCreateResourceRequestArgs = {
  input: ResourceRequestInput;
};


export type MutationUpdateResourceRequestArgs = {
  input: ResourceRequestInput;
  referenceNumber: Scalars['Int'];
};


export type MutationDeleteResourceRequestArgs = {
  referenceNumber: Scalars['Int'];
};


export type MutationCreateSkillArgs = {
  skillName: Scalars['String'];
};


export type MutationUpdateSkillArgs = {
  skillName: Scalars['String'];
  skillId: Scalars['Int'];
};


export type MutationDeleteSkillArgs = {
  skillId: Scalars['Int'];
};


export type MutationLoginArgs = {
  input: UserInput;
};

export type EmployeeProfileFragment = (
  { __typename?: 'EmployeesProfiles' }
  & Pick<EmployeesProfiles, 'id' | 'name' | 'title' | 'hiringDate' | 'function' | 'directManagerId' | 'workgroup' | 'employmentType' | 'allocationPercentage' | 'employeeEmail' | 'mobileNumber' | 'costCenter'>
);

export type ErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorFragment
  )>>, data?: Maybe<(
    { __typename?: 'EmployeesProfiles' }
    & EmployeeProfileFragment
  )> }
);

export type ReleaseRequestFragment = (
  { __typename?: 'ReleaseRequests' }
  & Pick<ReleaseRequests, 'referenceNumber' | 'managerName' | 'employeeName' | 'employeeId' | 'employeeTitle' | 'function' | 'releaseDate' | 'propability' | 'releasePercentage' | 'releaseReason' | 'leaving' | 'requestStatus'>
);

export type ReleaseRequestResponseFragment = (
  { __typename?: 'ReleaseRequestResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorFragment
  )>>, data?: Maybe<(
    { __typename?: 'ReleaseRequests' }
    & ReleaseRequestFragment
  )> }
);

export type ResourceRequestFragment = (
  { __typename?: 'ResourceRequests' }
  & Pick<ResourceRequests, 'referenceNumber' | 'managerName' | 'function' | 'title' | 'startDate' | 'endDate' | 'propability' | 'percentage' | 'status' | 'coreTeamMember' | 'replacenement' | 'replacementFor' | 'requestsCount' | 'relatedOpportunity' | 'comments' | 'assignedResource' | 'actualPercentage'>
);

export type ResourceRequestResponseFragment = (
  { __typename?: 'ResourceRequestResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & ErrorFragment
  )>>, data?: Maybe<(
    { __typename?: 'ResourceRequests' }
    & ResourceRequestFragment
  )> }
);

export type CreateCertificationProviderMutationVariables = Exact<{
  certificationProviderName: Scalars['String'];
}>;


export type CreateCertificationProviderMutation = (
  { __typename?: 'Mutation' }
  & { createCertificationProvider: (
    { __typename?: 'CertificationProviderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, data?: Maybe<(
      { __typename?: 'CertificationProviders' }
      & Pick<CertificationProviders, 'certificatoinProviderId' | 'certificationProviderName'>
    )> }
  ) }
);

export type CreateReleaseRequestMutationVariables = Exact<{
  input: ReleaseRequestInput;
}>;


export type CreateReleaseRequestMutation = (
  { __typename?: 'Mutation' }
  & { createReleaseRequest: (
    { __typename?: 'ReleaseRequestResponse' }
    & ReleaseRequestResponseFragment
  ) }
);

export type CreateResourceRequestMutationVariables = Exact<{
  input: ResourceRequestInput;
}>;


export type CreateResourceRequestMutation = (
  { __typename?: 'Mutation' }
  & { createResourceRequest: (
    { __typename?: 'ResourceRequestResponse' }
    & ResourceRequestResponseFragment
  ) }
);

export type CreateSkillMutationVariables = Exact<{
  skillName: Scalars['String'];
}>;


export type CreateSkillMutation = (
  { __typename?: 'Mutation' }
  & { createSkill: (
    { __typename?: 'SkillResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, data?: Maybe<(
      { __typename?: 'Skills' }
      & Pick<Skills, 'skillId' | 'skillName'>
    )> }
  ) }
);

export type DeleteCertificateProviderMutationVariables = Exact<{
  certificationProviderId: Scalars['Int'];
}>;


export type DeleteCertificateProviderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCertificateProvider'>
);

export type DeleteSkillMutationVariables = Exact<{
  skillId: Scalars['Int'];
}>;


export type DeleteSkillMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSkill'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type UpdateCertificationProviderMutationVariables = Exact<{
  certificationProviderId: Scalars['Int'];
  certificationProviderName: Scalars['String'];
}>;


export type UpdateCertificationProviderMutation = (
  { __typename?: 'Mutation' }
  & { updateCertificationProvider?: Maybe<(
    { __typename?: 'CertificationProviderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, data?: Maybe<(
      { __typename?: 'CertificationProviders' }
      & Pick<CertificationProviders, 'certificatoinProviderId' | 'certificationProviderName'>
    )> }
  )> }
);

export type UpdateReleaseRequestMutationVariables = Exact<{
  referenceNumber: Scalars['Int'];
  input: ReleaseRequestInput;
}>;


export type UpdateReleaseRequestMutation = (
  { __typename?: 'Mutation' }
  & { updateReleaseRequest?: Maybe<(
    { __typename?: 'ReleaseRequestResponse' }
    & ReleaseRequestResponseFragment
  )> }
);

export type UpdateResourceRequestMutationVariables = Exact<{
  referenceNumber: Scalars['Int'];
  input: ResourceRequestInput;
}>;


export type UpdateResourceRequestMutation = (
  { __typename?: 'Mutation' }
  & { updateResourceRequest?: Maybe<(
    { __typename?: 'ResourceRequestResponse' }
    & ResourceRequestResponseFragment
  )> }
);

export type UpdateSkillMutationVariables = Exact<{
  skillId: Scalars['Int'];
  skillName: Scalars['String'];
}>;


export type UpdateSkillMutation = (
  { __typename?: 'Mutation' }
  & { updateSkill?: Maybe<(
    { __typename?: 'SkillResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, data?: Maybe<(
      { __typename?: 'Skills' }
      & Pick<Skills, 'skillId' | 'skillName'>
    )> }
  )> }
);

export type CertificateProviderQueryVariables = Exact<{
  certificationProviderId: Scalars['Int'];
}>;


export type CertificateProviderQuery = (
  { __typename?: 'Query' }
  & { certificateProvider?: Maybe<(
    { __typename?: 'CertificationProviderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, data?: Maybe<(
      { __typename?: 'CertificationProviders' }
      & Pick<CertificationProviders, 'certificatoinProviderId' | 'certificationProviderName'>
    )> }
  )> }
);

export type CertificationsProvidersQueryVariables = Exact<{
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
}>;


export type CertificationsProvidersQuery = (
  { __typename?: 'Query' }
  & { certificationsProviders?: Maybe<(
    { __typename?: 'PaginatedCertificationProviderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, data?: Maybe<(
      { __typename?: 'CertificationProvidersPage' }
      & Pick<CertificationProvidersPage, 'hasMore'>
      & { items: Array<(
        { __typename?: 'CertificationProviders' }
        & Pick<CertificationProviders, 'certificatoinProviderId' | 'certificationProviderName'>
      )> }
    )> }
  )> }
);

export type ManagersNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type ManagersNamesQuery = (
  { __typename?: 'Query' }
  & { managers: Array<(
    { __typename?: 'EmployeesProfiles' }
    & Pick<EmployeesProfiles, 'name'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'EmployeesProfiles' }
    & EmployeeProfileFragment
  )> }
);

export type ReleaseRequestQueryVariables = Exact<{
  referenceNumber: Scalars['Int'];
}>;


export type ReleaseRequestQuery = (
  { __typename?: 'Query' }
  & { releaseRequest?: Maybe<(
    { __typename?: 'ReleaseRequestResponse' }
    & ReleaseRequestResponseFragment
  )> }
);

export type ReleaseRequestsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
}>;


export type ReleaseRequestsQuery = (
  { __typename?: 'Query' }
  & { releaseRequests: (
    { __typename?: 'PaginatedReleaseRequestResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, data?: Maybe<(
      { __typename?: 'ReleaseRequestsPage' }
      & Pick<ReleaseRequestsPage, 'hasMore'>
      & { items: Array<(
        { __typename?: 'ReleaseRequests' }
        & ReleaseRequestFragment
      )> }
    )> }
  ) }
);

export type ResourceRequestsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
}>;


export type ResourceRequestsQuery = (
  { __typename?: 'Query' }
  & { resourceRequests: (
    { __typename?: 'PaginatedResourceRequestResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, data?: Maybe<(
      { __typename?: 'ResourceRequestsPage' }
      & Pick<ResourceRequestsPage, 'hasMore'>
      & { items: Array<(
        { __typename?: 'ResourceRequests' }
        & ResourceRequestFragment
      )> }
    )> }
  ) }
);

export type ResourceRequestQueryVariables = Exact<{
  referenceNumber: Scalars['Int'];
}>;


export type ResourceRequestQuery = (
  { __typename?: 'Query' }
  & { resourceRequest?: Maybe<(
    { __typename?: 'ResourceRequestResponse' }
    & ResourceRequestResponseFragment
  )> }
);

export type RoleQueryVariables = Exact<{ [key: string]: never; }>;


export type RoleQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'role'>
);

export type SkillQueryVariables = Exact<{
  skillId: Scalars['Int'];
}>;


export type SkillQuery = (
  { __typename?: 'Query' }
  & { skill?: Maybe<(
    { __typename?: 'SkillResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, data?: Maybe<(
      { __typename?: 'Skills' }
      & Pick<Skills, 'skillId' | 'skillName'>
    )> }
  )> }
);

export type SkillsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
}>;


export type SkillsQuery = (
  { __typename?: 'Query' }
  & { skills: (
    { __typename?: 'PaginatedSkillResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, data?: Maybe<(
      { __typename?: 'SkillsPage' }
      & Pick<SkillsPage, 'hasMore'>
      & { items: Array<(
        { __typename?: 'Skills' }
        & Pick<Skills, 'skillId' | 'skillName'>
      )> }
    )> }
  ) }
);

export const ErrorFragmentDoc = gql`
    fragment Error on FieldError {
  field
  message
}
    `;
export const EmployeeProfileFragmentDoc = gql`
    fragment EmployeeProfile on EmployeesProfiles {
  id
  name
  title
  hiringDate
  function
  directManagerId
  workgroup
  employmentType
  allocationPercentage
  employeeEmail
  mobileNumber
  costCenter
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...Error
  }
  data {
    ...EmployeeProfile
  }
}
    ${ErrorFragmentDoc}
${EmployeeProfileFragmentDoc}`;
export const ReleaseRequestFragmentDoc = gql`
    fragment ReleaseRequest on ReleaseRequests {
  referenceNumber
  managerName
  employeeName
  employeeId
  employeeTitle
  function
  releaseDate
  propability
  releasePercentage
  releaseReason
  leaving
  requestStatus
}
    `;
export const ReleaseRequestResponseFragmentDoc = gql`
    fragment ReleaseRequestResponse on ReleaseRequestResponse {
  errors {
    ...Error
  }
  data {
    ...ReleaseRequest
  }
}
    ${ErrorFragmentDoc}
${ReleaseRequestFragmentDoc}`;
export const ResourceRequestFragmentDoc = gql`
    fragment ResourceRequest on ResourceRequests {
  referenceNumber
  managerName
  function
  title
  startDate
  endDate
  propability
  percentage
  status
  coreTeamMember
  replacenement
  replacementFor
  requestsCount
  relatedOpportunity
  comments
  assignedResource
  actualPercentage
}
    `;
export const ResourceRequestResponseFragmentDoc = gql`
    fragment ResourceRequestResponse on ResourceRequestResponse {
  errors {
    ...Error
  }
  data {
    ...ResourceRequest
  }
}
    ${ErrorFragmentDoc}
${ResourceRequestFragmentDoc}`;
export const CreateCertificationProviderDocument = gql`
    mutation CreateCertificationProvider($certificationProviderName: String!) {
  createCertificationProvider(certificationProviderName: $certificationProviderName) {
    errors {
      ...Error
    }
    data {
      certificatoinProviderId
      certificationProviderName
    }
  }
}
    ${ErrorFragmentDoc}`;

export function useCreateCertificationProviderMutation() {
  return Urql.useMutation<CreateCertificationProviderMutation, CreateCertificationProviderMutationVariables>(CreateCertificationProviderDocument);
};
export const CreateReleaseRequestDocument = gql`
    mutation CreateReleaseRequest($input: ReleaseRequestInput!) {
  createReleaseRequest(input: $input) {
    ...ReleaseRequestResponse
  }
}
    ${ReleaseRequestResponseFragmentDoc}`;

export function useCreateReleaseRequestMutation() {
  return Urql.useMutation<CreateReleaseRequestMutation, CreateReleaseRequestMutationVariables>(CreateReleaseRequestDocument);
};
export const CreateResourceRequestDocument = gql`
    mutation CreateResourceRequest($input: ResourceRequestInput!) {
  createResourceRequest(input: $input) {
    ...ResourceRequestResponse
  }
}
    ${ResourceRequestResponseFragmentDoc}`;

export function useCreateResourceRequestMutation() {
  return Urql.useMutation<CreateResourceRequestMutation, CreateResourceRequestMutationVariables>(CreateResourceRequestDocument);
};
export const CreateSkillDocument = gql`
    mutation CreateSkill($skillName: String!) {
  createSkill(skillName: $skillName) {
    errors {
      ...Error
    }
    data {
      skillId
      skillName
    }
  }
}
    ${ErrorFragmentDoc}`;

export function useCreateSkillMutation() {
  return Urql.useMutation<CreateSkillMutation, CreateSkillMutationVariables>(CreateSkillDocument);
};
export const DeleteCertificateProviderDocument = gql`
    mutation DeleteCertificateProvider($certificationProviderId: Int!) {
  deleteCertificateProvider(certificationProviderId: $certificationProviderId)
}
    `;

export function useDeleteCertificateProviderMutation() {
  return Urql.useMutation<DeleteCertificateProviderMutation, DeleteCertificateProviderMutationVariables>(DeleteCertificateProviderDocument);
};
export const DeleteSkillDocument = gql`
    mutation DeleteSkill($skillId: Int!) {
  deleteSkill(skillId: $skillId)
}
    `;

export function useDeleteSkillMutation() {
  return Urql.useMutation<DeleteSkillMutation, DeleteSkillMutationVariables>(DeleteSkillDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const UpdateCertificationProviderDocument = gql`
    mutation UpdateCertificationProvider($certificationProviderId: Int!, $certificationProviderName: String!) {
  updateCertificationProvider(certificationProviderId: $certificationProviderId, certificationProviderName: $certificationProviderName) {
    errors {
      ...Error
    }
    data {
      certificatoinProviderId
      certificationProviderName
    }
  }
}
    ${ErrorFragmentDoc}`;

export function useUpdateCertificationProviderMutation() {
  return Urql.useMutation<UpdateCertificationProviderMutation, UpdateCertificationProviderMutationVariables>(UpdateCertificationProviderDocument);
};
export const UpdateReleaseRequestDocument = gql`
    mutation UpdateReleaseRequest($referenceNumber: Int!, $input: ReleaseRequestInput!) {
  updateReleaseRequest(referenceNumber: $referenceNumber, input: $input) {
    ...ReleaseRequestResponse
  }
}
    ${ReleaseRequestResponseFragmentDoc}`;

export function useUpdateReleaseRequestMutation() {
  return Urql.useMutation<UpdateReleaseRequestMutation, UpdateReleaseRequestMutationVariables>(UpdateReleaseRequestDocument);
};
export const UpdateResourceRequestDocument = gql`
    mutation UpdateResourceRequest($referenceNumber: Int!, $input: ResourceRequestInput!) {
  updateResourceRequest(referenceNumber: $referenceNumber, input: $input) {
    ...ResourceRequestResponse
  }
}
    ${ResourceRequestResponseFragmentDoc}`;

export function useUpdateResourceRequestMutation() {
  return Urql.useMutation<UpdateResourceRequestMutation, UpdateResourceRequestMutationVariables>(UpdateResourceRequestDocument);
};
export const UpdateSkillDocument = gql`
    mutation UpdateSkill($skillId: Int!, $skillName: String!) {
  updateSkill(skillId: $skillId, skillName: $skillName) {
    errors {
      ...Error
    }
    data {
      skillId
      skillName
    }
  }
}
    ${ErrorFragmentDoc}`;

export function useUpdateSkillMutation() {
  return Urql.useMutation<UpdateSkillMutation, UpdateSkillMutationVariables>(UpdateSkillDocument);
};
export const CertificateProviderDocument = gql`
    query CertificateProvider($certificationProviderId: Int!) {
  certificateProvider(certificationProviderId: $certificationProviderId) {
    errors {
      ...Error
    }
    data {
      certificatoinProviderId
      certificationProviderName
    }
  }
}
    ${ErrorFragmentDoc}`;

export function useCertificateProviderQuery(options: Omit<Urql.UseQueryArgs<CertificateProviderQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CertificateProviderQuery>({ query: CertificateProviderDocument, ...options });
};
export const CertificationsProvidersDocument = gql`
    query CertificationsProviders($cursor: Int, $limit: Int!) {
  certificationsProviders(cursor: $cursor, limit: $limit) {
    errors {
      field
      message
    }
    data {
      hasMore
      items {
        certificatoinProviderId
        certificationProviderName
      }
    }
  }
}
    `;

export function useCertificationsProvidersQuery(options: Omit<Urql.UseQueryArgs<CertificationsProvidersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CertificationsProvidersQuery>({ query: CertificationsProvidersDocument, ...options });
};
export const ManagersNamesDocument = gql`
    query ManagersNames {
  managers {
    name
  }
}
    `;

export function useManagersNamesQuery(options: Omit<Urql.UseQueryArgs<ManagersNamesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ManagersNamesQuery>({ query: ManagersNamesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...EmployeeProfile
  }
}
    ${EmployeeProfileFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ReleaseRequestDocument = gql`
    query ReleaseRequest($referenceNumber: Int!) {
  releaseRequest(referenceNumber: $referenceNumber) {
    ...ReleaseRequestResponse
  }
}
    ${ReleaseRequestResponseFragmentDoc}`;

export function useReleaseRequestQuery(options: Omit<Urql.UseQueryArgs<ReleaseRequestQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReleaseRequestQuery>({ query: ReleaseRequestDocument, ...options });
};
export const ReleaseRequestsDocument = gql`
    query ReleaseRequests($cursor: Int, $limit: Int!) {
  releaseRequests(cursor: $cursor, limit: $limit) {
    errors {
      ...Error
    }
    data {
      hasMore
      items {
        ...ReleaseRequest
      }
    }
  }
}
    ${ErrorFragmentDoc}
${ReleaseRequestFragmentDoc}`;

export function useReleaseRequestsQuery(options: Omit<Urql.UseQueryArgs<ReleaseRequestsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReleaseRequestsQuery>({ query: ReleaseRequestsDocument, ...options });
};
export const ResourceRequestsDocument = gql`
    query ResourceRequests($cursor: Int, $limit: Int!) {
  resourceRequests(cursor: $cursor, limit: $limit) {
    errors {
      ...Error
    }
    data {
      hasMore
      items {
        ...ResourceRequest
      }
    }
  }
}
    ${ErrorFragmentDoc}
${ResourceRequestFragmentDoc}`;

export function useResourceRequestsQuery(options: Omit<Urql.UseQueryArgs<ResourceRequestsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ResourceRequestsQuery>({ query: ResourceRequestsDocument, ...options });
};
export const ResourceRequestDocument = gql`
    query ResourceRequest($referenceNumber: Int!) {
  resourceRequest(referenceNumber: $referenceNumber) {
    ...ResourceRequestResponse
  }
}
    ${ResourceRequestResponseFragmentDoc}`;

export function useResourceRequestQuery(options: Omit<Urql.UseQueryArgs<ResourceRequestQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ResourceRequestQuery>({ query: ResourceRequestDocument, ...options });
};
export const RoleDocument = gql`
    query Role {
  role
}
    `;

export function useRoleQuery(options: Omit<Urql.UseQueryArgs<RoleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RoleQuery>({ query: RoleDocument, ...options });
};
export const SkillDocument = gql`
    query skill($skillId: Int!) {
  skill(skillId: $skillId) {
    errors {
      ...Error
    }
    data {
      skillId
      skillName
    }
  }
}
    ${ErrorFragmentDoc}`;

export function useSkillQuery(options: Omit<Urql.UseQueryArgs<SkillQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SkillQuery>({ query: SkillDocument, ...options });
};
export const SkillsDocument = gql`
    query Skills($cursor: Int, $limit: Int!) {
  skills(cursor: $cursor, limit: $limit) {
    errors {
      ...Error
    }
    data {
      hasMore
      items {
        skillId
        skillName
      }
    }
  }
}
    ${ErrorFragmentDoc}`;

export function useSkillsQuery(options: Omit<Urql.UseQueryArgs<SkillsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SkillsQuery>({ query: SkillsDocument, ...options });
};