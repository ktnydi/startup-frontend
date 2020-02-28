import { Container } from 'unstated';

export default class AppContainer extends Container {
  state = {
    userSignIn: true,
    notification: false,
    popup: false,
  };

  showPopup = () => {
    this.setState({ popup: true })
  };

  closePopup = () => {
    this.setState({ popup: false })
  };
}