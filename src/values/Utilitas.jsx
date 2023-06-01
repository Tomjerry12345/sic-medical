// eslint-disable-next-line no-use-before-define

export const setLocal = (key, value) => localStorage.setItem(key, value);

export const getLocal = (key) => localStorage.getItem(key);

export const log = (v, m) => {
  if (m !== undefined) {
    console.log("v", m);
  } else {
    let name, value;
    for (let varName in v) {
      name = varName;
      value = v[name];
    }

    console.log(`[d] ${name}`, value);
  }
};

export const logS = (s) => console.log(s);

export const getSizeScreen = (set) => {
  set({
    x: window.innerWidth,
    y: window.innerHeight,
  });
};

export const timestamp = () => new Date().getTime();
