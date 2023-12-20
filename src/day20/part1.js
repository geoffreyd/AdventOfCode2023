import { parseInput, LOW, HIGH } from './shared.js';
import _ from "lodash-es";
import { log } from 'console';

const part1 = (rawInput) => {
  const modules = parseInput(rawInput);
  const moduleList = _.values(modules);


  modules['output'] = {
    input(pulse, sender, tick) {
      this.pulseCount[pulse]++;
      // log(sender, "-", pulse, "->", 'OUTPUT');
    },
    setup: () => [],
    pulseCount: [0,0]
  }

  moduleList.forEach((module) => {
    module.connections.forEach((connection) => {
      // log('Setting up', module.id, '->', connection);
      if (!modules[connection]) {
        modules[connection] = {
          input(pulse, sender, tick) {
            this.pulseCount[pulse]++;
            // log(sender, "-", pulse, "->", this.id);
          },
          setup: () => [],
          pulseCount: [0, 0]
        }
      } else {
        modules[connection].setup(module.id);
      }
    })
  });

  // log('Modules', modules);

  const broadcaster = modules['broadcaster'];

  let currentTick = 0;
  let messages = [];
  let newMessages = [];
  let emptyRuns = 0;

  const buttonPresses = 1000;
  for (let i = 0; i < buttonPresses; i++) {
    // Press Button!
    broadcaster.input(LOW, 'button', currentTick);
    messages = broadcaster.flush(currentTick);
    emptyRuns = 0;

    while (emptyRuns < 2) {

      messages.forEach(([pulse, dest, src, tick]) => {
        // log('SENDING',src, "-", pulse, "->", dest, "at", tick);
        modules[dest].input(pulse, src, tick);
      });

      newMessages = moduleList.flatMap((module) => {
        return module.flush(currentTick);
      });
      // log('New messages', newMessages);
      if (newMessages.length > 0) {
        emptyRuns = 0;
      }

      messages = [...newMessages];

      if (newMessages.length === 0) {
        emptyRuns++;
        // log('No new messages for tick', currentTick);
        currentTick++;
      }
    }
    // log('Finished Button Press', i);
  }

  const [low, high] = Object.values(modules)
    .map((module) => module.pulseCount)
    .reduce(([a, b], [low, high]) => [a + low, b + high], [0, 0]);

  return low * high;
};

export default part1;

