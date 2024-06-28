const TEXT = {
  introduction: "Hi everyone, my name is Kamil.",
  position: "I am a passionate WebDeveloper.",
};

function writeText(text, durationInterval, hookId) {
  const hook = document.getElementById(hookId);
  let i = 0;
  let intervalWriting = setInterval(() => {
    hook.innerHTML += text[i];
    i++;
    if (i === text.length) {
      clearInterval(intervalWriting);
    }
  }, durationInterval);
  return text.length * durationInterval;
}

function deleteText(durationInterval, hookId) {
  const hook = document.getElementById(hookId);
  let arr = hook.innerHTML.split("");
  let i = arr.length;
  intervalDeleting = setInterval(() => {
    arr.pop();
    hook.innerHTML = arr.join("");
    i--;
    if (i < 0) {
      clearInterval(intervalDeleting);
    }
  }, durationInterval);
  return durationInterval * arr.length;
}

const writeTextPromise = (duration, text, writeDuration, hookId) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(writeText(text, writeDuration, hookId));
    }, duration);
  });
  return promise;
};

const deleteTextPromise = (duration, deleteDuration, hookId) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(deleteText(deleteDuration, hookId));
    }, duration);
  });
  return promise;
};

function textStays(hookId, duration) {
  const hook = document.getElementById(hookId);
  setTimeout(() => {
    hook.innerHTML = `
    <h1 class="text-all" id="introduction_text">${TEXT.introduction}</h1>
    <h2 class="text-all" id="description__text">${TEXT.position}</h2>
    `;
  }, duration);
}

function generateTextWrting() {
  writeTextPromise(0, TEXT.introduction, 170, "introduction")
    .then((doneDuration) => {
      return deleteTextPromise(doneDuration, 100, "introduction");
    })
    .then((doneDuration) => {
      return writeTextPromise(doneDuration, TEXT.position, 170, "description");
    })
    .then((doneDuration) => {
      return deleteTextPromise(doneDuration, 100, "description");
    })
    .then((doneDuration) => {
      return textStays("text", doneDuration + 100);
    });

}

generateTextWrting();
