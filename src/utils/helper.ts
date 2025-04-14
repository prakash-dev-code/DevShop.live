export const debounce = (func: any, wait = 800) => {
    let h: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(h);
      h = setTimeout(() => func(...args), wait);
    };
  };