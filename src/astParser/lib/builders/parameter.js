import dispatch from '../dispatcher.js'

export default function buildParameter(paramNode) {
  // console.log(paramNode);
  return {
    name: paramNode.name?.escapedText,
    type: dispatch(paramNode.type),
    isRest: !!paramNode.dotDotDotToken,
    isOptional: !!paramNode.questionToken,
  };
}

