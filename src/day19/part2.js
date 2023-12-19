import { parseInput } from './shared.js';
import _ from "lodash-es";
import { log as consoleLog } from 'console';
import { re } from 'mathjs';
import { inv } from 'mathjs';

function log(...args) {
  consoleLog(...args);
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const ranges = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  }

  const orderedWorkflows = input.workflows.map(parseWorkflows)
  // log(orderedWorkflows)
  const namedWorkflows = _.fromPairs(orderedWorkflows)

  const paths = pathsToIn(orderedWorkflows, 'A');
  const examplePaths = paths.slice(0, 1)
  // log(
  //   JSON.stringify(
  //     paths.map(({ rules, invalidRules }) => [rules, invalidRules] )
  //     , null, 2
  //   )
  // );
  // return

  return findExtremes(paths, ranges);

  return namedWorkflows;
};

export default part2;

export function parseWorkflows(str) {
  const [, name, ruleStr] = str.match(/(?<name>[a-z]+){((?<rule>.*))}/)
  const rulesStrs = ruleStr.split(',')
  const rules = rulesStrs.map(rule => {
    let [condition, result] = rule.split(':');
    if (!result) {
      result = condition;
      condition = 'default';
    }
    return { condition, result };
  })
  return [name, rules];
}

// A recursive function that returns all paths from target to 'in'
function pathsToIn(workflows, target, path = []) {
  // log('Checking', target, path);

  if (target === 'in') {
    return [{
      names: path.map(({ name }) => name),
      rules: path.flatMap(({ rules }) =>
        rules.map(({ condition, result }) => [condition, result])
      ),
      invalidRules: path.flatMap(({ invalidRules }) =>
        invalidRules.map(({ condition, result }) => [condition, result])
      )
    }];
  }

  const steps = stepsLeadingTo(workflows, target);
  const paths = steps.flatMap((step) => {
    const [name, rules, invalidRules] = step;
    return pathsToIn(workflows, name, [...path, { name, rules, invalidRules }]);
  })
  return paths;
}

/**
 * Returns all workflows that lead to the target
 * @param {Array} workflows
 * @param {String} target
 * @returns {Array<string, Array>} An array of workflows that lead to the target
 */
function stepsLeadingTo(workflows, target) {
  const options = [];

  workflows.forEach(([name, rules]) => {
    for (let idx = 0; idx < rules.length; idx++) {
      const rule = rules[idx];
      if (rule.result === target) {
        options.push([name, [rule], rules.slice(0, idx)]);
      }
    }
  })

  return options;
}

function findExtremes(paths, ranges) {
  ranges = _.cloneDeep(ranges);

  const itterations = paths.map(path => extremesForPath(path, ranges));
  // log('Itterations', itterations)
  return _.sum(itterations);
}

function extremesForPath(path, ranges) {
  ranges = _.cloneDeep(ranges);
  // log('#### - - - - PATH - - - - ####')
  // log(JSON.stringify(path.names, null, 2))
  let { rules, invalidRules } = path;

  for (const [condition, result] of rules) {
    if (condition === 'default') {
      continue;
    }
    let [field, operator, value] = condition.split(/(?<operator>[<>]+)/);
    value = _.parseInt(value);
    const [min, max] = ranges[field];
    const fieldValue = _.cloneDeep(ranges[field]);
    // log('Checking', condition, 'against', field, fieldValue, 'with', operator, value)
    switch (operator) {
      case '<':
        ranges[field][1] = Math.min(value - 1, max);
        break;
      case '>':
        ranges[field][0] = Math.max(value + 1, min);
        break;
    }
    // log('Condition:', condition, 'takes', fieldValue, 'to', field, ranges[field])
  }
  // log('- - - - - - - -')
  // now do the opposite for invalid conditions
  for (const [condition,] of invalidRules) {
    if (condition === 'default') {
      continue;
    }
    let [field, operator, value] = condition.split(/(?<operator>[<>]+)/);
    value = _.parseInt(value);
    const [min, max] = ranges[field];
    const fieldValue = _.cloneDeep(ranges[field]);
    // log('Checking', condition, 'against', field, fieldValue, 'with', operator, value)
    switch (operator) {
      case '<':
        ranges[field][0] = Math.max(value, min);
        break;
      case '>':
        ranges[field][1] = Math.min(value, max);
        break;
    }
    // log('Inverse Condition:', condition, 'takes', fieldValue, 'to', field, ranges[field])
  }

  // log('Ranges', ranges)
  const posibleIterations = Object.values(ranges)
    .map(([min, max]) => max - min + 1)
    .reduce((a, b) => a * b)
  // log('Diffs', Object.values(ranges).map(([min, max]) => max - min + 1))
  // log('Posible iterations', posibleIterations)

  return posibleIterations
}