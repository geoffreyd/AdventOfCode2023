import { log } from 'console';
import _ from "lodash-es";
import * as math from 'mathjs';

export const HIGH = 1;
export const LOW = 0;

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n")
    .map((line) => {
      // log("Parsing line", line);
      const [id, connections] = line.split(" -> ");
      if (id === "broadcaster") {
        return new Broadcast(id, connections.split(", "));
      }
      const type = id[0];
      const idWithoutType = id.slice(1);
      const module = mappings[type];
      // log("Setting up new module", id, type, idWithoutType, connections)
      return new module(idWithoutType, connections.split(", "));

    })

  return _.keyBy(input, 'id');
};

class Module {
  constructor(id, connections) {
    this.id = id;
    this.connections = connections;
    this.queue = [];
    this.pulseCount = [0,0];
  }

  setup() { }
  output() { }

  input(pulse, sender, tick) {
    this.pulseCount[pulse]++;
    this.queue.push([pulse, sender, tick]);
    // log(sender, "-", pulse, "->", this.id);
  }

  flush(currentTick, buttonPress) {
    // log("Flushing", this.id, "at", currentTick, 'with queue', this.queue);
    let messages = [];
    const futureMessages = [];
    while (this.queue.length > 0) {
      const [pulse, sender, tick] = this.queue.shift();
      if (tick <= currentTick) {
        // log("Flushing signal", pulse, "in", this.id, 'from', sender);
        messages = messages.concat(this.recieveSignal(pulse, sender, currentTick));
      } else {
        futureMessages.push([pulse, sender, tick]);
      }
    }
    this.output(buttonPress);
    this.queue = futureMessages;
    return messages;
  }
}

export class FlipFlop extends Module {
  constructor(id, connections) {
    super(id, connections);
    this.state = 'off';
  }

  recieveSignal(pulse, sender, tick) {
    if (pulse === HIGH) {
      return [];
    }
    this.state = this.state === 'off' ? 'on' : 'off';
    pulse = this.state === 'off' ? LOW : HIGH;

    return this.connections.map((connection) => [pulse, connection, this.id, tick + 1])
  }
}

export class Conjunction extends Module {
  constructor(id, connections) {
    super(id, connections);
    this.lastPulse = {}
    this.outputCycles = connections.includes('rx');
    this.hasReported = {}
  }

  setup(sender) {
    this.lastPulse[sender] = LOW;
  }

  recieveSignal(pulse, sender, tick) {
    // log("Recieving signal", pulse, "in", this.id, 'from', sender, 'last pulse', this.lastPulse[sender]);
    this.lastPulse[sender] = pulse;
    let pulseToSend = HIGH;

    if (Object.values(this.lastPulse).every((pulse) => pulse === HIGH)) {
      pulseToSend = LOW;
    }

    return this.connections.map((connection) => [pulseToSend, connection, this.id, tick + 1])
  }

  output(buttonPress) {
    if (this.outputCycles) {
      for (const sender in this.lastPulse) {
        if (this.hasReported[sender]) {
          continue;
        }
        const state = this.lastPulse[sender];
        if (state == HIGH) {
          this.hasReported[sender] = buttonPress;
          log('found cycle for', sender, '->', buttonPress);
          log('values', Object.values(this.hasReported))
          if (Object.keys(this.hasReported).length == 4) {
            log('lcm', math.lcm(...Object.values(this.hasReported)));
          }
        }
      }
    }
  }
}

export class Broadcast extends Module {
  constructor(id, connections) {
    super(id, connections);
  }

  recieveSignal(pulse, sender, tick) {
    return this.connections.map((connection) => [pulse, connection, this.id, tick + 1])
  }
}

const mappings = {
  '%': FlipFlop,
  '&': Conjunction,
  'broadcaster': Broadcast,
};