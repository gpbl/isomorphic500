// Similar to react-intl's `getIntlMessage`
// (It receives the messages as argument)

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
