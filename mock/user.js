const Mock = require("mockjs");

module.exports = [
  // user login
  {
    url: "/power-admin/user/login",
    type: "post",
    response: config => {
      const { username } = config.body;

      return {
        code: 20000,
        data: {
          name: username,
          certificate: Mock.mock("@guid")
        }
      };
    }
  },

  // user logout
  {
    url: "/power-admin/user/logout",
    type: "post",
    // eslint-disable-next-line no-unused-vars
    response: _ => {
      return {
        code: 20000,
        data: "success"
      };
    }
  }
];
