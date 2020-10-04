import { CacheExchangeOpts } from "@urql/exchange-graphcache/dist/types/cacheExchange";

import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RoleDocument,
  RoleQuery,
} from "../graphql/types";
import { cacheInvalidator } from "./cacheInvalidator";
import { updateQueryWrapper } from "./updateQueryWrapper";

export const cacheExchangeOpts: CacheExchangeOpts = {
  updates: {
    Mutation: {
      login: (result, args, cache, info) => {
        updateQueryWrapper<LoginMutation, MeQuery>(
          cache,
          result,
          { query: MeDocument },
          (_result, _query) =>
            _result.login.data ? { me: _result.login.data } : _query
        );
        cache.invalidate({ __typename: "Query" }, "role");
      },
      logout: (result, args, cache, info) => {
        updateQueryWrapper<LogoutMutation, MeQuery>(
          cache,
          result,
          { query: MeDocument },
          () => ({ me: null })
        );
        updateQueryWrapper<LogoutMutation, RoleQuery>(
          cache,
          result,
          { query: RoleDocument },
          () => ({ role: null })
        );
      },

      // TODO: Invalidate cache smarter!

      // Certification
      createCertification: (result, args, cache, info) =>
        cacheInvalidator(cache, "certifications"),
      updateCertification: (result, args, cache, info) =>
        cacheInvalidator(cache, "certifications"),
      deleteCertification: (result, args, cache, info) =>
        cacheInvalidator(cache, "certifications"),

      // Certification Provider
      createCertificationProvider: (result, args, cache, info) =>
        cacheInvalidator(cache, "certificationsProviders"),
      updateCertificationProvider: (result, args, cache, info) =>
        cacheInvalidator(cache, "certificationsProviders"),
      deleteCertificationProvider: (result, args, cache, info) =>
        cacheInvalidator(cache, "certificationsProviders"),

      // Employee Certification
      createEmployeeCertification: (result, args, cache, info) =>
        cacheInvalidator(cache, "employeeCertifications"),
      updateEmployeeCertification: (result, args, cache, info) =>
        cacheInvalidator(cache, "employeeCertifications"),
      deleteEmployeeCertification: (result, args, cache, info) =>
        cacheInvalidator(cache, "employeeCertifications"),

      // Employee Skill
      createEmployeeSkill: (result, args, cache, info) =>
        cacheInvalidator(cache, "employeeSkills"),
      updateEmployeeSkill: (result, args, cache, info) =>
        cacheInvalidator(cache, "employeeSkills"),
      deleteEmployeeSkill: (result, args, cache, info) =>
        cacheInvalidator(cache, "employeeSkills"),

      // Release Request
      createReleaseRequest: (result, args, cache, info) =>
        cacheInvalidator(cache, "releaseRequests"),
      updateReleaseRequest: (result, args, cache, info) =>
        cacheInvalidator(cache, "releaseRequests"),
      deleteReleaseRequest: (result, args, cache, info) =>
        cacheInvalidator(cache, "releaseRequests"),

      // Resource Request
      createResourceRequest: (result, args, cache, info) =>
        cacheInvalidator(cache, "resourceRequests"),
      updateResourceRequest: (result, args, cache, info) =>
        cacheInvalidator(cache, "resourceRequests"),
      deleteResourceRequest: (result, args, cache, info) =>
        cacheInvalidator(cache, "resourceRequests"),

      // Skill
      createSkill: (result, args, cache, info) =>
        cacheInvalidator(cache, "skills"),
      updateSkill: (result, args, cache, info) =>
        cacheInvalidator(cache, "skills"),
      deleteSkill: (result, args, cache, info) =>
        cacheInvalidator(cache, "skills"),
    },
  },
};
