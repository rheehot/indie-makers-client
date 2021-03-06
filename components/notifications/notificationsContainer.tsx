import React from "react";
import clickOutside from "react-click-outside";
import NotificationsPresenter from "./notificationsPresenter";
import { Query, Mutation, MutationFn } from "react-apollo";
import { getNotifications, markAsRead } from "types/api";
import { GET_NOTIFICATIONS, MARK_AS_READ } from "./notificationQueries";

class GetNotificationsQuery extends Query<getNotifications> {}
class MarkAsReadMutation extends Mutation<markAsRead> {}

interface IState {
  isOpen: boolean;
}

class NotificationsContainer extends React.Component<{}, IState> {
  public markAsRead: MutationFn<markAsRead>;
  state = {
    isOpen: false
  };
  render() {
    const { isOpen } = this.state;
    return (
      <GetNotificationsQuery query={GET_NOTIFICATIONS} pollInterval={5000}>
        {({ data, loading }) => (
          <MarkAsReadMutation
            mutation={MARK_AS_READ}
            refetchQueries={[{ query: GET_NOTIFICATIONS }]}
          >
            {markAsRead => {
              this.markAsRead = markAsRead;
              return (
                <NotificationsPresenter
                  loading={loading}
                  data={data}
                  isOpen={isOpen}
                  toggleOpen={this.toggleOpen}
                />
              );
            }}
          </MarkAsReadMutation>
        )}
      </GetNotificationsQuery>
    );
  }
  public toggleOpen = (notifNumber: number) => {
    this.setState(prev => {
      return {
        isOpen: !prev.isOpen
      };
    });
    if (notifNumber > 0) {
      this.markAsRead();
    }
  };
  public handleClickOutside = () => {
    this.setState({
      isOpen: false
    });
  };
}

export default clickOutside(NotificationsContainer);
