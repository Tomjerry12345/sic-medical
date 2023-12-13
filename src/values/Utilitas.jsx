// eslint-disable-next-line no-use-before-define

export const setLocal = (key, value) => localStorage.setItem(key, value);

export const getLocal = (key) => localStorage.getItem(key);

export const log = (v, m) => {
  if (m !== undefined) {
    console.log(`[d] ${v}`, m);
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

export const convertTimestampToDate = (timestamp) => {
  const t = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  const day = t.getDate();
  const month = t.getMonth() + 1;
  const year = t.getFullYear();
  return {
    day,
    month,
    year
  }
}

export const timestamp = () => new Date().getTime();

export const getTimeTodayAndTomorrow = () => {
  // Mendapatkan tanggal hari ini
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set jam menjadi 00:00:00 untuk hari ini

  // Mendapatkan tanggal besok
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0); // Set jam menjadi 00:00:00 untuk besok

  return {
    today, tomorrow
  }
}

export const day = () => new Date().getDate();

export const month = () => new Date().getMonth() + 1;

export const year = () => new Date().getFullYear();

export const hour = () => new Date().getHours();

export const minute = () => new Date().getMinutes();
