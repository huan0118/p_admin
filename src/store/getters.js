const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  menuIds: state => state.user.ids,
  navigation: state => state.user.navigation,
  errorLogs: state => state.errorLog.logs
};
export default getters;
