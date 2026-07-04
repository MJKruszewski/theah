export const SOCKET_NAME = 'system.theah';
export const actions = {
  characterChange: 'characterChanged',
};

export function registerSocketListeners() {
  game.socket.on(SOCKET_NAME, (payload) => {
    switch (payload.type) {
      case actions.characterChange:
        refreshToolbox(payload);
        break;

      default:
        console.warn(
          new Error('L5R5E | This socket event is not supported'),
          payload,
        );
        break;
    }
  });
}

export function emitCharacterChange() {
  game.theah.toolbox.refresh();
  game.socket.emit(SOCKET_NAME, {
    type: actions.characterChange,
  });
}

function refreshToolbox() {
  game.theah.toolbox.refresh();
}
