import { mockData as mockUserData } from '../../../../onboarding/utils/api/local/localData';
const dummyPhoneNumber = 22323232323;

const mockStoriesData = [
  {
    author: {
      id: '113311313a',
      userID: '113311313a',
      stripeCustomerID: 'addddvvd',
      phone: dummyPhoneNumber,
      email: 'janejoe@doe.com',
      firstName: 'John ',
      lastName: 'James',
      postsCount: 2,
      profilePictureURL:
        'https://i.pinimg.com/originals/fb/d7/2a/fbd72a1440f9b17f09d1fb9cc5ffcef6.jpg',
    },
    authorID: '113311313',
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 884000000 },
    idx: '122',
    storyID: '122',
    storyMediaURL:
      'https://i.pinimg.com/originals/f0/15/d5/f015d58b2f4e5947180d23ac2d84fd2e.png',
    storyType: 'image',
  },
  {
    author: {
      ...mockUserData,
      postsCount: 2,
    },
    authorID: '113311313',
    storyID: '0EXvDPFRXyVI6Dq7JSvz',
    idx: '0EXvDPFRXyVI6Dq7JSvz',
    storyType: 'image',
    storyMediaURL:
      'https://firebasestorage.googleapis.com/v0/b/ios-app-templates.appspot.com/o/SocialNetwork_Posts%2F2847FE9F-76F9-4959-868F-A447ED115B3C1570782109.3707728?alt=media&token=fd34af0d-fa61-4928-aa22-c925994bc7ca',
    storyAuthorID: '0dvNKmihUtZsdHIttJS3yRdNYyG3',
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 884000000 },
  },
  {
    author: {
      id: '113311313bw',
      userID: '113311313bw',
      phone: dummyPhoneNumber,
      email: 'janejoe@doe.com',
      firstName: 'Bic',
      lastName: 'Mitchum',
      postsCount: 2,
      profilePictureURL:
        'https://upload.wikimedia.org/wikipedia/en/e/e0/Iron_Man_bleeding_edge.jpg',
    },
    authorID: '113311313bw',
    storyID: '1KDSXVA1RLSyy67vLPgqa',
    idx: '1KDSXVA1RLSyy67vLPgqa',
    storyType: 'video',
    storyMediaURL:
      'https://www.arq.ro/html/media/photos/0/9/385/big/teren-fotbal.jpg',
    storyAuthorID: '0dvNKmihUtZsdHIttJS3yRdNYyG3adda',
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 884000000 },
  },
  {
    author: {
      id: '113311313b',
      userID: '113311313b',
      stripeCustomerID: 'addddvvd',
      phone: dummyPhoneNumber,
      email: 'janejoe@doe.com',
      firstName: 'Rita ',
      lastName: 'Hades',
      postsCount: 2,
      profilePictureURL:
        'http://cdn.chaihezi.com/wp-content/uploads/2017/07/SHF-Justice-League-2.jpg',
    },
    authorID: '113311313b',
    storyID: '1KDSXVA1RLSyy67vLPgq',
    idx: '1KDSXVA1RLSyy67vLPgq',
    storyType: 'video',
    storyMediaURL:
      'https://firebasestorage.googleapis.com/v0/b/ios-app-templates.appspot.com/o/SocialNetwork_Posts%2FFFA72C0B-8242-4155-AC3C-53E262DDCFC11562611486.2431211?alt=media&token=adf9998f-1a5a-4ab4-b1b4-8ab5a3233faf',
    storyAuthorID: '0dvNKmihUtZsdHIttJS3yRdNYyG3',
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 884000000 },
  },
];

const mockPostsData = [
  {
    author: {
      id: '113311313',
      userID: '113311313',
      stripeCustomerID: 'addddvvd',
      phone: dummyPhoneNumber,
      email: 'janejoe@doe.com',
      firstName: 'John ',
      lastName: 'James',
      postsCount: 2,
      profilePictureURL:
        'https://i.pinimg.com/originals/fb/d7/2a/fbd72a1440f9b17f09d1fb9cc5ffcef6.jpg',
    },
    authorID: mockUserData.id,
    commentCount: 0,
    createdAt: { nanoseconds: 944000000, seconds: 1597890533 },
    hashtags: [],
    id: 'ApayhJmrfr6sD5uOzqWQ3d',
    location: 'Miami, FL.',
    postMedia: [
      {
        mime: 'image/jpeg',
        url:
          'https://i.pinimg.com/originals/f0/15/d5/f015d58b2f4e5947180d23ac2d84fd2e.png',
      },
    ],
    postText: 'Ghh',
    reactions: {
      angry: 0,
      cry: 0,
      laugh: 0,
      like: 2,
      love: 3,
      sad: 0,
      surprised: 0,
    },
    reactionsCount: 5,
  },
  {
    author: {
      id: '113311313',
      userID: '113311313',
      stripeCustomerID: 'addddvvd',
      phone: dummyPhoneNumber,
      email: 'janejoe@doe.com',
      firstName: 'John ',
      lastName: 'James',
      postsCount: 2,
      profilePictureURL:
        'https://i.pinimg.com/originals/fb/d7/2a/fbd72a1440f9b17f09d1fb9cc5ffcef6.jpg',
    },
    authorID: mockUserData.id,
    commentCount: 0,
    createdAt: { nanoseconds: 944000000, seconds: 1597890533 },
    hashtags: [],
    id: '12ee2eceev',
    location: 'Miami, FL.',
    postMedia: [
      {
        mime: 'image/jpeg',
        url: 'https://img.velgen20.com/medium/0156fe014ea9ed3f.jpg',
      },
    ],
    postText: 'Ghh',
    reactions: {
      angry: 1,
      cry: 0,
      laugh: 0,
      like: 0,
      love: 0,
      sad: 0,
      surprised: 1,
    },
    reactionsCount: 2,
  },
  {
    author: {
      ...mockUserData,
      postsCount: 2,
    },
    authorID: mockUserData.id,
    commentCount: 0,
    createdAt: { nanoseconds: 944000000, seconds: 1597890533 },
    hashtags: [],
    id: 'e2f2fe2vv2v',
    location: 'Houston, TX.',
    postMedia: [
      {
        mime: 'image/jpeg',
        url:
          'https://www.arq.ro/html/media/photos/0/9/385/big/teren-fotbal.jpg',
      },
    ],
    postText: 'Ghh',
    reactions: {
      angry: 0,
      cry: 0,
      laugh: 0,
      like: 0,
      love: 4,
      sad: 0,
      surprised: 0,
    },
    reactionsCount: 4,
  },
  {
    author: {
      id: '113311313',
      userID: '113311313',
      stripeCustomerID: 'addddvvd',
      phone: dummyPhoneNumber,
      email: 'janejoe@doe.com',
      firstName: 'Rita ',
      lastName: 'Hades',
      postsCount: 2,
      profilePictureURL:
        'http://cdn.chaihezi.com/wp-content/uploads/2017/07/SHF-Justice-League-2.jpg',
    },
    authorID: mockUserData.id,
    commentCount: 0,
    createdAt: { nanoseconds: 944000000, seconds: 1597890533 },
    hashtags: [],
    id: 'wvvffv33vf3v',
    location: 'Lagos, Lagos.',
    postMedia: [
      {
        mime: 'image/jpeg',
        url:
          'https://www.hdwallpapers.in/download/justice_league_artwork_4k-wide.jpg',
      },
    ],
    postText: 'Ghh',
    reactions: {
      angry: 0,
      cry: 0,
      laugh: 0,
      like: 0,
      love: 0,
      sad: 0,
      surprised: 0,
    },
    reactionsCount: 4,
  },
  {
    author: {
      ...mockUserData,
      postsCount: 2,
    },
    authorID: mockUserData.id,
    commentCount: 0,
    createdAt: { nanoseconds: 944000000, seconds: 1597890533 },
    hashtags: [],
    id: 'wvhjvk22v2v',
    location: 'Lagos, Lagos.',
    postMedia: [
      {
        mime: 'image/jpeg',
        url:
          'https://www.homestratosphere.com/wp-content/uploads/2015/11/Kitchen-with-new-white-cabinets-hs-jun28.jpg',
      },
    ],
    postText: 'Ghh',
    reactions: {
      angry: 0,
      cry: 0,
      laugh: 0,
      like: 0,
      love: 0,
      sad: 0,
      surprised: 0,
    },
    reactionsCount: 4,
  },
  {
    author: {
      ...mockUserData,
      postsCount: 2,
    },
    authorID: mockUserData.id,
    commentCount: 0,
    createdAt: { nanoseconds: 944000000, seconds: 1597890533 },
    hashtags: [],
    id: 'jwvdkj113',
    location: 'Lagos, Lagos.',
    postMedia: [
      {
        mime: 'image/jpeg',
        url:
          'http://travelbylesley.co.uk/wp-content/uploads/2019/04/bigstock-Beautiful-tropical-beach-with-68649619-Copy.jpg',
      },
    ],
    postText: 'Ghh',
    reactions: {
      angry: 0,
      cry: 0,
      laugh: 0,
      like: 0,
      love: 0,
      sad: 0,
      surprised: 0,
    },
    reactionsCount: 4,
  },
  {
    author: {
      ...mockUserData,
      postsCount: 2,
    },
    authorID: mockUserData.id,
    commentCount: 0,
    createdAt: { nanoseconds: 944000000, seconds: 1597890533 },
    hashtags: [],
    id: 'wdvwdvwdvwdvwdv',
    location: 'Lagos, Lagos.',
    postMedia: [
      {
        mime: 'image/jpeg',
        url:
          'https://firebasestorage.googleapis.com/v0/b/wpgone.appspot.com/o/IMG_20200820_032131_0.jpg?alt=media&token=1f47629c-4680-4714-826c-3a6eb4dd6492',
      },
    ],
    postText: 'Ghh',
    reactions: {
      angry: 0,
      cry: 0,
      laugh: 0,
      like: 0,
      love: 0,
      sad: 0,
      surprised: 0,
    },
    reactionsCount: 4,
  },
  {
    author: {
      ...mockUserData,
      postsCount: 2,
    },
    authorID: mockUserData.id,
    commentCount: 0,
    createdAt: { nanoseconds: 944000000, seconds: 1597890533 },
    hashtags: [],
    id: 'qddvvdwwdv',
    location: 'Lagos, Lagos.',
    postMedia: [
      {
        mime: 'image/jpeg',
        url:
          'https://firebasestorage.googleapis.com/v0/b/wpgone.appspot.com/o/IMG_20200820_032131_0.jpg?alt=media&token=1f47629c-4680-4714-826c-3a6eb4dd6492',
      },
    ],
    postText: 'Ghh',
    reactions: {
      angry: 0,
      cry: 0,
      laugh: 0,
      like: 0,
      love: 0,
      sad: 0,
      surprised: 0,
    },
    reactionsCount: 4,
  },
  {
    author: {
      id: '113311313',
      userID: '113311313',
      stripeCustomerID: 'addddvvd',
      phone: dummyPhoneNumber,
      email: 'janejoe@doe.com',
      firstName: 'John ',
      lastName: 'James',
      postsCount: 2,
      profilePictureURL:
        'https://i.pinimg.com/originals/fb/d7/2a/fbd72a1440f9b17f09d1fb9cc5ffcef6.jpg',
    },
    authorID: mockUserData.id,
    commentCount: 0,
    createdAt: { nanoseconds: 944000000, seconds: 1597890533 },
    hashtags: [],
    id: 'ApayhJmrfr6sD5uOzqWQ1',
    location: 'Miami, FL.',
    postMedia: [
      {
        mime: 'image/jpeg',
        url:
          'https://s.aolcdn.com/os/ab/_cms/2020/02/20092753/Bugatti-Chiron-Sport-Edition-Noire-Sportive-2.jpg',
      },
    ],
    postText: 'Ghh',
    reactions: {
      angry: 0,
      cry: 0,
      laugh: 0,
      like: 0,
      love: 0,
      sad: 1,
      surprised: 0,
    },
    reactionsCount: 2,
  },
];

export { mockPostsData, mockStoriesData };
