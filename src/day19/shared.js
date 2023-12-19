import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const [workflows, ratings] = rawInput.split("\n\n").map((raw) => raw.split("\n"));

  return {
    workflows, ratings
  };
};
