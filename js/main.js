/* const idMin = 1;
const idMax = 25;

const id = getRandomInteger(idMin, idMax);
const url = createUrl(id);
const description = getRandomString ();
const minLikes = 15;
const maxLikes = 200;
const likes = getRandomInteger(minLikes, maxLikes);
const comments = createComments(25);

console.log (comments);

function createUrl (id) {
  return `photos/${id}.jpg`;
}

function createAvatar () {
  const avatar = getRandomInteger (1,6);
  return `img/avatar-${avatar}.svg`;
}

function createPhotoDescription(id, url, description, likes, comments) {
  return {id, url, description, likes, comments};
};

//ГЕНЕРАТОР СЛУЧАЙНОГО ОПИСАНИЯ
function getRandomString () {
  const loremStrings = [
    'Lorem ipsum dolor sit amet',
    'consectetur adipiscing elit.',
    ' Phasellus vel ipsum hendrerit.',
    'dignissim est non.'
  ];
  const index = getRandomInteger(0, loremStrings.length - 1);
  return loremStrings[index];
}

function createComments (commentsNumber) {
  const messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const userNames = [
    'Spy',
    'Voin',
    'KnightDarckness',
    'Противоречия',
    'SpyVoin',
    'Sergo'
  ];

  const comments = [];
  for (let i = 0; i < commentsNumber; i++) {
    const idComment = getRandomInteger(1,100); // проверка на повторяющиеся индекс
    const avatar = createAvatar();
    const messageCount = getRandomInteger(1, 2);
    let message;
    if(messageCount === 1) {
      const messageIndex = getRandomInteger (0, messages.length - 1);
      message = messages[messageIndex];
    } else if (messageCount === 2) {
      const messageIndex = getRandomInteger (0, messages.length - 1);
      const messageIndexTwo = getRandomInteger (0, messages.length - 1); //сделать проверку на повторяющиеся индексы;
      message = messages[messageIndex] + messages[messageIndexTwo];
    };

    const nameIndex = getRandomInteger(0, userNames.length-1);
    const name = userNames[nameIndex];

    const comment = {
      id: idComment,
      avatar: avatar,
      message: message,
      name: name
    }

    comments.push (comment);
  };
  return comments;
}

//ГЕНЕРАТОР СЛУЧАЙНОГО ЧИСЛА
function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
} */
const PICTURE_COUNT = 25;
const DESCRIPTIONS = [
  'Если смогу, я сделаю это. Конец истории.',
  'Смейтесь как только умеете, любите столько, сколько живете.',
  'Помните: вы единственный человек, который может наполнить ваш мир солнечным светом.',
  'Я полностью уверена, что я — диснеевская принцесса, которую еще не придумали.',
  'Не позволяйте кому-то затушить ваши искры только потому, что их свет сияет в чьих-то глазах.',
  'Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон.',
  'Улыбка — единственный тренд в моде, который актуален всегда.',
  'Никогда не ищите свое счастье там, где вы его однажды потеряли.',
  'Жизнь похожа на фотокамеру: вам просто нужно смотреть на нее с улыбкой.',
  'Моя жизнь меняется, потому что меняю ее я.',
  'Всегда начинайте свой день с хороших людей и кофе.',
];
const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const AVATAR_COUNT = 6;
const COMMENT_COUNT = 6;
const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Эмиль',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

function createIdGenerator () {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const generateCommentId = createIdGenerator();

const createMessage = () =>
  Array.from({length: getRandomInteger(1, 2) }, () =>
    getRandomArrayElement(COMMENT_MESSAGES)).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  descriptions: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
  comments: Array.from({length: getRandomInteger(0, COMMENT_COUNT)}, createComment),
});

const similarPicture = () =>
  Array.from({length: PICTURE_COUNT }, (_, pictureIndex) => createPicture(pictureIndex + 1)
  );

similarPicture();
console.log (similarPicture())
