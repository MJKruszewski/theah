export const skillsToSheetData = (actorData, CONFIG) =>
  Object.entries(actorData.skills)
    .map(([s, skill]) => ({
      ...skill,
      name: s,
      label: CONFIG.SVNSEA2E.skills[s],
      desc: game.i18n.localize(`SVNSEA2E.SkillInfo_${s}`),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

export const getItems = (data, type) =>
  data.items.filter((item) => item.type === type);

/**
 * Post a themed system chat card honoring the user's current chat roll mode
 * (Public Roll / Private GM Roll / Blind GM Roll / Self Roll) from the chat-input
 * dropdown. Centralizes `ChatMessage.applyRollMode` so every card the system
 * emits — item-to-chat, Favor, Wounds, Corruption, the Raises pool, advancement,
 * Evil Act — respects the selection, not just dice-dialog rolls.
 * @param {object}  opts
 * @param {Actor}   [opts.actor]    Actor to speak as (used when `speaker` omitted).
 * @param {object}  [opts.speaker]  Explicit speaker (overrides `actor`).
 * @param {string}  opts.content    Card HTML.
 * @param {Roll[]}  [opts.rolls]    Rolls to attach (Blind mode hides their result).
 * @param {string}  [opts.sound]    Optional sound to play.
 * @returns {Promise<ChatMessage>}
 */
export function postThemedChat({ actor, speaker, content, rolls, sound } = {}) {
  const data = {
    speaker: speaker ?? ChatMessage.getSpeaker(actor ? { actor } : {}),
    content,
  };
  if (rolls && rolls.length) data.rolls = rolls;
  if (sound) data.sound = sound;
  // Applies whisper / blind / rollMode based on the chat-input dropdown.
  ChatMessage.applyRollMode(data, game.settings.get('core', 'rollMode'));
  return ChatMessage.create(data);
}

export async function getAllPackAdvantages() {
  let itemPacks = game.packs.filter((p) => p.metadata.type === 'Item');
  const bar = async (p, i) => {
    return await p.getDocument(i._id);
  };
  const foo = async (p) => {
    const items = await p.getIndex();
    return await Promise.all(
      items.filter((i) => i.type === 'advantage').map((i) => bar(p, i)),
    );
  };
  let a = await Promise.all(itemPacks.map((p) => foo(p)));
  return a.flatMap((a) => a);
}

export const GLAMOR_NATIONS = ['highland', 'avalon', 'insmore'];
export const isValidGlamorIsles = (actor) =>
  GLAMOR_NATIONS.includes(actor.system.nation);
