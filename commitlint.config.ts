// eslint-disable-next-line import/no-anonymous-default-export
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "chore", "fix", "refactor", "docs", "style"],
    ],
  },
};
