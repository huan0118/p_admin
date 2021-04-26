const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  ids: state => state.user.ids,
  menuIds: state => state.user.ids,
  NAVIGATION: state => state.user.NAVIGATION,
  errorLogs: state => state.errorLog.logs
};
export default getters;
