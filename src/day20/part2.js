import { parseInput, LOW, HIGH } from './shared.js';
import _ from "lodash-es";
import { log } from 'console';

const part2 = (rawInput) => {
  const modules = parseInput(rawInput);
  const moduleList = _.values(modules);

  modules['output'] = {
    input(pulse, sender, tick) {
      this.pulseCount[pulse]++;
      // log(sender, "-", pulse, "->", 'OUTPUT');
    },
    setup: () => [],
    pulseCount: [0, 0]
  }

  modules['rx'] = {
    input(pulse, sender, tick) {
      this.pulseCount[pulse]++;
      if (pulse === LOW) {
        log('RX', tick);
        throw new Error('Found it!');
      }
      // log(sender, "-", pulse, "->", this.id);
    },
    setup: () => [],
    pulseCount: [0, 0]
  }

  moduleList.forEach((module) => {
    module.connections.forEach((connection) => {
      // log('Setting up', module.id, '->', connection);
      modules[connection].setup(module.id);
    })
  });

  // log('Modules', modules);

  const broadcaster = modules['broadcaster'];

  let currentTick = 0;
  let messages = [];
  let newMessages = [];
  let emptyRuns = 0;

  const buttonPresses = 5000;
  for (let i = 1; i < buttonPresses; i++) {
    // Press Button!
    broadcaster.input(LOW, 'button', currentTick);
    messages = broadcaster.flush(currentTick);
    emptyRuns = 0;

    while (emptyRuns < 2) {

      messages.forEach(([pulse, dest, src, tick]) => {
        // log('SENDING',src, "-", pulse, "->", dest, "at", tick);
        try {
          modules[dest].input(pulse, src, tick);
        } catch (e) {
          log('Found it on button press', i);
          i = buttonPresses;
        }
      });

      newMessages = moduleList.flatMap((module) => {
        return module.flush(currentTick, i);
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
    if (i % 5000 === 0) {
      log('Finished Button Press', i);
    }
  }

  return countPulses(modules);
};

export default part2;

function countPulses(modules) {
  const [low, high] = Object.values(modules)
    .map((module) => module.pulseCount)
    .reduce(([a, b], [low, high]) => [a + low, b + high], [0, 0]);

  return low * high;
}