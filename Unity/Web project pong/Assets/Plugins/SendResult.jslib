mergeInto(LibraryManager.library, {
  SendResultToJS: function (score) {
    
    if (typeof window.SendResultToJS === "function") {
      window.SendResultToJS(score);
    } else {
      console.warn("SendResultToJS is not defined on the window object.");
    }
  }
});