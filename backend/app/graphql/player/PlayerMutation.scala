package graphql.player

import graphql.player.mutations._

trait PlayerMutation
    extends SurveyEventMutation
    with SurveyInvitationMutation
    with UserAccountMutation {
  context: PlayerContext =>
}
