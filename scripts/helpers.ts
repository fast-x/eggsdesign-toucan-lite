// TODO trim spaces at the end and beginning of words

export const splitStringToArray = (longString: string) => {
  return longString.split(',').map((word) => word.trim());
};

export const formatDateString = (longDate: string) => {
  let dateFormat = new Date(longDate);
  return dateFormat.toLocaleDateString('en-EN', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const generateSlug = (value: string) => {
  return value.toLowerCase().replace(/\s+/g, '-');
};

export const getDateDiff = (first: string, second: string) => {
  return Math.round((new Date(second).valueOf() - new Date(first).valueOf()) / (1000 * 60 * 60 * 24));
};

export const loginRedirectConfig = {
  props: { user: null, projects: null },
  redirect: {
    destination: '/signin', // TODO: Change this to '/log-in' when that page has been styled
    permanent: false,
  },
};
