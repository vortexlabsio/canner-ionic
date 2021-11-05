export const sleep = (n: number) => new Promise((r) => setTimeout(r, n));

export const img = (path: string) =>
  `https://ionic-react-demos.s3.amazonaws.com/${path}`;

export const msToTime = (d: number) => {
  const seconds = Math.floor((d / 1000) % 60),
    minutes = Math.floor((d / (1000 * 60)) % 60);

  return minutes + ":" + (seconds < 10 ? `0${seconds}` : seconds);
};
