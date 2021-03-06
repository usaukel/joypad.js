// Tests for joypad instance

import { AXIS_MOVEMENT_THRESHOLD } from '../src/constants';
import joypad from '../src/joypad';

describe("joypad", () => {
    let changedAxisMovementThreshold;

    beforeAll(() => {
        changedAxisMovementThreshold = 0.3;
        joypad.instances = { 0: 'Gamepad' };
    });

    test('Check joypad instance', () => {
        expect(joypad.loopStarted).toEqual(false);

        expect(joypad.settings.axisMovementThreshold).toEqual(AXIS_MOVEMENT_THRESHOLD);

        joypad.set({ axisMovementThreshold: changedAxisMovementThreshold });
        expect(joypad.settings.axisMovementThreshold).toEqual(changedAxisMovementThreshold);

        joypad.remove(0);
        expect(joypad.instances).toEqual({});
    });
});