// Similar to react-intl's Mixin `getIntlMessage`, but it receives the messages
// as argument. It is used by the IntlStore the get a message from its path

function getIntlMessage(messages, path) {
  const pathParts = path.split(".");
  let message;

  try {
    message = pathParts.reduce((obj, pathPart) => obj[pathPart], messages);
  } finally {
    if (message === undefined) {
      throw new ReferenceError("Could not find Intl message: " + path);
    }
  }

  return message;
}

export default getIntlMessage;
