const IMG_COUNT = 25;
const LIKE_MIN = 15;
const LIKE_MAX = 200;
const COMMENT_MESSEAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = ['Ирина', 'Андрей', 'Николай', 'Денис', 'Вера', 'Александра', 'Михаил'];

const DESCRIPTIONS = [
  'Наша поезда на море',
  'Флексим в лесу',
  'Просто случаеное фото (нет)',
  'Немного безумия'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

let commemt = 1;
let post = 1;
const createCommemt = () => ({
  id: commemt++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: Array.from(
    new Set (
      Array.from({length:getRandomInteger(1,2)},() => COMMENT_MESSEAGE[getRandomInteger(1, COMMENT_MESSEAGE.length - 1)])
    )
  ).join(''),
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const createPosts = () => ({
  id: post++,
  url: 'photos/$({post++}).jpg',
  desription:DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger (LIKE_MIN, LIKE_MAX),
  commemts: Array.from({length:getRandomInteger(1,COMMENT_MESSEAGE.length - 1)}, createCommemt)
});

const create = () => Array.from ({length: IMG_COUNT}, createPosts);
// eslint-disable-next-line no-console
console.log(create);
