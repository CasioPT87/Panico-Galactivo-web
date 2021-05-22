type Phase = {
  index: number;
  phase: string;
  delay: number | null;
  event: Event;
};

const STATES: Array<Phase> = [
  { index: 0, phase: "initial", delay: null, event: new Event("initial") },
  {
    index: 1,
    phase: "approaching",
    delay: null,
    event: new Event("approaching"),
  },
  { index: 2, phase: "landing", delay: null, event: new Event("landing") },
  { index: 3, phase: "landed", delay: null, event: new Event("landed") },
];

class PhaseManager {
  state: Phase;
  cloudsDestroyed: number;
  numberOfClouds: number | null;

  constructor() {
    this.state = STATES[0];
    this.cloudsDestroyed = 0;
    this.numberOfClouds = null;
  }

  reset() {
    this.state = STATES[0];
    this.cloudsDestroyed = 0;
    this.numberOfClouds = null;
  }

  action(): void {
    const { delay, index } = this.state;
    if (!delay) return;
    setTimeout(() => {
      const nextPhaseIndex = index + 1;
      this.nextPhase(nextPhaseIndex);
    }, delay);
  }

  nextPhase(index: number): void {
    this.state = STATES[index];
    if (index < STATES.length - 1) {
      this.action();
    }
  }

  isPhase(phase: string): boolean {
    return phase === this.state.phase;
  }

  setPhase(phaseName: string, delay: number | null = null): void {
    const phase = STATES.find((state) => state.phase === phaseName);
    if (!phase) return;
    if (delay !== null) {
      setTimeout(() => {
        this.state = phase;
      }, delay);
    } else {
      this.state = phase;
      dispatchEvent(phase.event);
    }
  }

  cloudDestroyed(): void {
    if (this.numberOfClouds === null) return;
    this.cloudsDestroyed++;
    if (this.cloudsDestroyed >= this.numberOfClouds) {
      this.setPhase("landing", 1000);
    }
  }
}

export type { Phase, PhaseManager };
export default new PhaseManager();
