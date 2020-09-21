const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  cookieid: state => state.user.cookieid,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  ids: state => state.user.ids,
  permission_routes: state => state.permission.routes,
  NAVIGATION: state => state.user.NAVIGATION,
  errorLogs: state => state.errorLog.logs,
  dictionaryData: state => state.dictionary.DICTIONARY_DATA
};
export default getters;
