import { apply } from 'ramda';
import { parseInput } from './shared.js';
import _ from "lodash-es";
import { log } from 'console';

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const orderedWorkflows = input.workflows.map(parseWorkflows)
  const namedWorkflows = _.fromPairs(orderedWorkflows)

  const results = input.ratings.map(rating => followWorkflow(rating, namedWorkflows))
  // return results;
  const accepted = results.filter(([result,]) => result);

  const sums = accepted.reduce((acc, [, rating]) => {
    acc.x += rating.x;
    acc.m += rating.m;
    acc.a += rating.a;
    acc.s += rating.s;
    return acc;
  }, { x: 0, m: 0, a: 0, s: 0 })


  return _.sum(Object.values(sums));
};

  export default part1;

export function parseWorkflows(str) {
  const [, name, ruleStr] = str.match(/(?<name>[a-z]+){((?<rule>.*))}/)
  const rules = ruleStr.split(',')
  return [name, rules];
}


function followWorkflow(rating, workflows) {
  eval(`rating = ${rating.replaceAll('=', ':')}`);
  let cont = true;
  let result = rating;
  let nextWorkflow = _.cloneDeep(workflows['in']);
  let loops = 0;

  // const sums = {
  //   R: 0,
  //   A: 0,
  // }

  // log('Running:', rating)

  while (cont && loops < 100) {
    // log('Checking', nextWorkflow);

    const nextStep = runRules(nextWorkflow, rating);

    switch (nextStep) {
      case 'R':
        return [false, rating];
      case 'A':
        return [true, rating];
      default:
        nextWorkflow = workflows[nextStep];
        loops++;
        break;
    }
  }
  return [result, rating];
}

function runRules(rules, rating) {
  rules = _.cloneDeep(rules);
  // log('Rules', rules, Array.isArray(rules))
  const defaultResult = rules.pop()
  for (const rule of rules) {
    const [condition, result] = rule.split(':');
    const [field, operator, value] = condition.split(/(?<operator>[<>]+)/);
    const fieldValue = rating[field];
    const conditionResult = eval(`${fieldValue}${operator}${value}`);
    // log('Condition', `${fieldValue}${operator}${value}`, '=', conditionResult)
    if (conditionResult) {
      return result;
    }
  }
  return defaultResult;
}
