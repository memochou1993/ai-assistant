class History {
  records = [];

  write(displayName, text) {
    this.records.push(`${displayName}: ${text}`);
    return this;
  }

  toString() {
    return this.records.join('\n');
  }
}

const histories = new Map();

/**
 * @param {string} contextId
 * @returns {History}
 */
const getHistory = (contextId) => histories.get(contextId) || new History();

/**
 * @param {string} contextId
 * @param {History} history
 * @returns {History}
 */
const setHistory = (contextId, history) => histories.set(contextId, history);

/**
 * @param {string} contextId
 * @param {function(History)} callback
 */
const updateHistory = (contextId, callback) => {
  const history = getHistory(contextId);
  callback(history);
  setHistory(contextId, history);
};

/**
 * @returns {string}
 */
const getFormattedHistory = (contextId) => getHistory(contextId).toString();

const printFormattedHistories = () => {
  if (Array.from(histories.keys()).length < 1) return;
  const content = Array.from(histories.keys()).map((contextId) => `\n=== ${contextId.slice(0, 6)} ===\n\n${getFormattedHistory(contextId)}`).join('\n');
  console.info(content);
};

export {
  updateHistory,
  getFormattedHistory,
  printFormattedHistories,
};

export default histories;
