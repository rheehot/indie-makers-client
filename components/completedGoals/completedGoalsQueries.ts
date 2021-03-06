import gql from "graphql-tag";
import { GOAL_FRAGMENT } from "../../fragments";

export const COMPLETED_GOALS = gql`
  query completedGoals {
    FilterGoals(status: COMPLETED) {
      goals {
        ...GoalParts
        maker {
          username
          profilePhoto
        }
      }
    }
  }
  ${GOAL_FRAGMENT}
`;
