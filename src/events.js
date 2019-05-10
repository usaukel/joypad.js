// Joypad events

import emmitter from './emitter';
import joypad from './joypad';
import loop from './loop';
import { EVENTS, AXIS_MOVEMENT_THRESHOLD, AXIS } from './constants';
import { loopGamepadInstances } from './helpers';

const initEventListeners = () => {
    window.addEventListener(EVENTS.CONNECT.NATIVE, e => {
        emmitter.publish(EVENTS.CONNECT.ALIAS, e);
        if (!joypad.loopStarted) {
            return loop.start();
        }
    });
    window.addEventListener(EVENTS.DISCONNECT.NATIVE, e => {
        emmitter.publish(EVENTS.DISCONNECT.ALIAS, e);
        joypad.remove(e.gamepad.index);
        if (!Object.keys(joypad.list).length) {
            joypad.loopStarted = false;
            return loop.stop(loop.id);
        }
    });
    window.addEventListener(EVENTS.BUTTON_PRESS.ALIAS, e => {
        return emmitter.publish(EVENTS.BUTTON_PRESS.ALIAS, e);
    });
};
const listenToButtonEvents = id => {
    const buttonPressEvent = eventData => new CustomEvent(EVENTS.BUTTON_PRESS.ALIAS, { detail: eventData });

    return loopGamepadInstances(gamepad => {
        gamepad.buttons.forEach((button, index) => {
            if (button.pressed) {
                const eventData = { button, index, gamepad };

                window.dispatchEvent(buttonPressEvent(eventData));
                return loop.restart(id);
            }
        });
    });
};
const listenToAxisMovements = () => {
    const axisMovementEvent = eventData => new CustomEvent(EVENTS.AXIS_MOVEMENT.ALIAS, { detail: eventData });

    return loopGamepadInstances(gamepad => {
        const { axes } = gamepad;
        const totalAxisIndexes = axes.length;
        const totalAxes = totalAxisIndexes / 2;

        axes.forEach((axis, index) => {
            if (Math.abs(axis) > AXIS_MOVEMENT_THRESHOLD) {
                let axisMovedIndex = index;
                let axisMoved = null;
                let movement = null;

                if (axisMovedIndex < totalAxes) {
                    axisMoved = AXIS.LEFT;
                } else {
                    axisMoved = AXIS.RIGHT;
                }

                if (axisMovedIndex === AXIS.X) {
                    movement = axis < 0 ? AXIS.LEFT : AXIS.RIGHT;
                }

                if (axisMovedIndex === AXIS.Y) {
                    movement = axis < 0 ? AXIS.TOP : AXIS.BOTTOM;
                }

                console.log(movement);


                // direction in which it is moving
                // direction value

                // console.log(axisMoved, axisMovedIndex);
            }
        });
    });
};

initEventListeners();
export { listenToButtonEvents, listenToAxisMovements }
