/* eslint-disable no-unused-vars */
const Mock = require("mockjs");

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      explain: "按钮",
      des: "@title(5, 10)",
      // forecast: "@float(0, 100, 2, 2)",
      importance: "@integer(1, 3)",
      "type|1": ["button", "other"],
      "status|1": ["take", "failure"],
      display_time: "@datetime"
      // pageviews: "@integer(300, 5000)"
    })
  );
}

module.exports = [
  {
    url: "/power-admin/query/resources",
    type: "get",
    response: query => {
      const { page = 1, limit = 10 } = query;

      const pageList = List.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      );
      return {
        code: 20000,
        data: pageList
      };
    }
  }
];
