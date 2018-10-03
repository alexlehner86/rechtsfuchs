function climbUpDOMtreeUntilElementOfType(eventTarget, type) {
    while (eventTarget.nodeName !== type) {
        eventTarget = eventTarget.parentElement;
    }
    return eventTarget;
}

function scrollToTheTopOfElementWithId(id, delayInMilliseconds) {
    setTimeout(() => {
      document.getElementById(id).scrollIntoView(true);
    }, delayInMilliseconds);
  }

export { climbUpDOMtreeUntilElementOfType, scrollToTheTopOfElementWithId }