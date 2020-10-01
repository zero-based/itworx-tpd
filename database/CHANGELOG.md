# Changelog

## v4

1. Rename `assignment` to `assignments` _(convention)_.
1. Rename `role` to `roles` _(convention)_.
1. Rename `employee_training` to `employee_trainings` _(convention)_.
1. Rename `certification_providers`.`certificatoin_provider_id` to `certification_provider_id` _(typo)_.
1. Rename `release_requests`.`propability` to `probability` _(typo)_.
1. Rename `resource_requests`.`propability` to `probability` _(typo)_.
1. Rename `resource_requests`.`replacenement` to `replacement` _(typo)_.
1. Rename `CONSTRAINT` `certifications_provider_id_fk` to `certification_certifications_provider_id_fk` and update its `KEY` _(convention)_.
1. Rename `CONSTRAINT` `employee_skill_history_employee_id_fk` to `employee_skills_history_employee_id_fk` _(typo)_.
1. Rename `CONSTRAINT` `Employee_ID` to `employee_skill_employee_id_fk` _(convention)_.
1. Rename `CONSTRAINT` `Skill_ID` to `employee_skill_skill_id_fk` _(convention)_.
1. Rename `CONSTRAINT` `employee_id_training` to `employee_training_employee_id_fk` _(convention)_.
1. Rename `CONSTRAINT` `manager_id_fk` to `employees_profile_direct_manager_id_fk` _(convention)_.
1. Rename `CONSTRAINT` `release_request_reference_number_fk` to `release_requests_action_release_request_reference_number_fk` and update its `KEY` _(convention)_.
1. Rename `CONSTRAINT` `resource_request_reference_number_fk` to `resource_request_action_resource_request_reference_number_fk` and update its `KEY` _(convention)_.
1. Rename `CONSTRAINT` `resource_request_skills_reference_number_fk` to `resource_request_skill_resource_request_reference_number_fk` and update its `KEY` _(convention)_.
1. Rename `CONSTRAINT` `skill_id_fk` to `resource_request_skill_skill_id_fk` and update its `KEY`.
1. Remove `KEY`s from `employee_certifications` _(existing primary key)_.
1. Remove `KEY`s from `employee_skills_history` _(existing primary key)_.
1. Remove `KEY`s from `employee_skills` _(existing primary key)_.
1. Remove `KEY`s from `employee_trainings` _(existing primary key)_.
1. Remove `KEY`s from `resource_request_skills` _(existing primary key)_.
1. Rename `KEY`s from `Skill_Name_UNIQUE` to `skill_name_unique` _(convention)_.

## v3

1. Drop `user_role` table and add its columns to `users` table, using a direct one-to-one relation with `role` table.
1. Drop `managers` table and use a self-reference to `employees_profile` for the `direct_manager` column.
1. Make `user_role`'s `role_id` not nullable.
1. Make `employees_profile`'s `direct_manager` nullable and rename it to `direct_manager_id`.

## v2

1. Add AUTO_INCREMENT to `assignment`
1. Add AUTO_INCREMENT to `certification_providers`
1. Add AUTO_INCREMENT to `certifications`
1. Add AUTO_INCREMENT to `release_requests_actions`
1. Add AUTO_INCREMENT to `release_requests`
1. Add AUTO_INCREMENT to `resource_request_actions`
1. Add AUTO_INCREMENT to `resource_requests`
1. Add AUTO_INCREMENT to `role`
1. Add AUTO_INCREMENT to `skills`
1. Add AUTO_INCREMENT to `users`

## v1

1. Add composite primary key to `employee_skills`
1. Add composite primary key to `employee_certifications`
1. Add composite primary key to `employee_training`
1. Add composite primary key to `employee_skills_history`
1. Add composite primary key to `resource_request_skills`

## v0

Initial database design
