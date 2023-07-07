import * as createProject from "./create-project.graphql"
import * as createProjectUserAccount from "./create-project-user-account.graphql"
import * as deleteProject from "./delete-project.graphql"
import * as deleteProjectUserAccount from "./delete-project-user-account.graphql"
import * as inviteProjectContributors from "./invite-project-contributor.graphql"
import * as updateProject from "./update-project.graphql"

export const createProjectMutation = createProject
export const createProjectUserAccountMutation = createProjectUserAccount
export const updateProjectMutation = updateProject
export const deleteProjectMutation = deleteProject
export const deleteProjectUserAccountMutation = deleteProjectUserAccount
export const inviteProjectContributorsMutation = inviteProjectContributors
