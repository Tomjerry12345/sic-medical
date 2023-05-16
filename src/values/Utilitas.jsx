// eslint-disable-next-line no-use-before-define

export const setLocal = (key, value) => localStorage.setItem(key, value);

export const getLocal = (key) => localStorage.getItem(key);

export const log = (v) => {
  let name, value;
  for (let varName in v) {
    name = varName;
    value = v[name];
  }

  console.log(`[d] ${name}`, value);
};

export const logS = (s) => console.log(s);

export const getSizeScreen = (set) => {
  set({
    x: window.innerWidth,
    y: window.innerHeight,
  });
};
