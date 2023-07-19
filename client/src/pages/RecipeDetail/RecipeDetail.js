import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBookmark } from '../../redux/slice/userInfoSlice';

import RecipeInfo from './RecipeInfo';
import Process from './Process';
import Community from './Community';
import Recommend from './Recommend';
import BookmarkBtn from '../../components/BookmarkButton/BookmarkBtn';
import RecipeApi from './RecipeApi';

import tw from 'tailwind-styled-components';

export default function RecipeDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cocktail, setCocktail] = useState(cocktailDetail);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [localData, setLocalData] = useState({ userId: '', IsAdmin: false });

  // const userInfo = useSelector((state) => state.userinfo);
  const isLogin = useSelector((state) => state.isLogin.isLogin);

  const location_id = useLocation().pathname.split('/')[2];

  // 시간 출력 함수
  const getTime = (createdTime = '') => {
    const currentTime = Date.now();
    const targetTime = new Date(createdTime).getTime();
    const minutesDifference = Math.floor(
      (currentTime - targetTime) / (1000 * 60)
    );
    if (isNaN(minutesDifference)) {
      return 0;
    }
    if (minutesDifference < 1) {
      return 'now';
    } else if (minutesDifference < 60) {
      return `${minutesDifference} min ago`;
    } else if (minutesDifference < 1440) {
      return `${Math.floor(minutesDifference / 60)} min ago`;
    }
    return `${Math.floor(minutesDifference / 1440)} days ago`;
  };

  const setBookmark = async () => {
    // 비로그인시 설정 불가
    if (localData.userId) {
      if (isBookmarked) {
        // 북마크 해제
        try {
          const response = await RecipeApi.deleteBookmark(cocktail.cocktailId);
        } catch (error) {
          console.log(error);
          navigate('/error');
        }
      } else {
        // 북마크 설정
        try {
          const response = await RecipeApi.postBookmark(cocktail.cocktailId);
        } catch (error) {
          console.log(error);
          navigate('/error');
        }
      }
    }
  };

  const getCocktail = async () => {
    try {
      const response = await RecipeApi.getCocktailData(location_id);
      const json = await response.json();
      setCocktail(json);
      setIsBookmarked(json.bookmarked);
      console.log(json);
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  };

  useEffect(() => {
    getCocktail();
    const local_userId = parseInt(localStorage.getItem('userId'));
    const local_IsAdmin = JSON.parse(localStorage.getItem('IsAdmin'));
    setLocalData({ userId: local_userId, IsAdmin: local_IsAdmin });
  }, [location_id]);

  const BackgroundImg = () => {
    return (
      <>
        <img
          src="/images/background/music-dynamic-gradient.png"
          alt="음표"
          className="absolute top-0 right-[-400px] pointer-events-none"
        />
        <img
          src="/images/background/star-dynamic-gradient.png"
          alt="별"
          className="absolute bottom-0 right-[900px] pointer-events-none"
        />
      </>
    );
  };
  const DrawBookmark = ({ cocktail }) => {
    const item = {
      cocktailId: cocktail.cocktailId,
      name: cocktail.name,
      imageUrl: cocktail.imageUrl,
      userRate: cocktail.userRate,
      viewCount: cocktail.viewCount,
      bookmarked: cocktail.bookmarked,
    };
    const handleBookmarkClick = async (cocktailId) => {
      const id = cocktailId;

      dispatch(updateBookmark({ id, item }));
      setBookmark();
    };
    return (
      <BookmarkBtn
        onClick={() => handleBookmarkClick(cocktail.cocktailId)}
        bookmarked={isBookmarked}
        setbookmarked={setIsBookmarked}
        absolute="true"
        top="top-0"
        right="right-14"
      />
    );
  };

  return (
    <>
      <Background>
        <BackgroundImg />
        <Container>
          <DrawBookmark cocktail={cocktail} />
          <RecipeInfo
            cocktailDetail={cocktail}
            getTime={getTime}
            isLogin={isLogin}
            localData={localData}
          />
          <Process cocktailDetail={cocktail} />
          <Community
            cocktailDetail={cocktail}
            getTime={getTime}
            isLogin={isLogin}
            localData={localData}
          />
          <Recommend cocktailDetail={cocktail.recommends} />
        </Container>
      </Background>
    </>
  );
}

const Background = tw.div`
relative
bg-gradient-to-r 
from-gradi-to
to-gradi-from
px-12
py-52
w-full
overflow-hidden
`;
const Container = tw.main`
relative
mx-auto
px-[4.6875rem]
py-32
w-[80vw]
max-w-6xl
bg-[#000000]/40
rounded-ss-[3.125rem]
rounded-ee-[3.125rem]
animate-fadeInDown1
`;
const BookmarkIcon = tw.div`
absolute
top-0 right-14
cursor-pointer
`;

const cocktailDetail = {
  cocktailId: 1,
  adminWritten: false,
  userId: 1,
  userName: '',
  name: '',
  imageUrl:
    'https://cphoto.asiae.co.kr/listimglink/1/2020051809541442224_1589763254.jpg',
  activeUserWritten: true,
  liquor: '럼',
  viewCount: 1,
  createdAt: '2023-07-02T01:01:01',
  modifiedAt: '2023-07-02T01:01:01',
  ingredients: [
    {
      ingredient: '',
    },
  ],
  recipe: [{ process: `` }],
  tags: [
    {
      tag: '',
    },
  ],
  rating: 4.5,
  comments: [
    {
      commentId: 1,
      userId: 2,
      userName: '',
      content: '',
      activeUserWritten: true,
      createdAt: '2023-07-02T01:01:01',
      modifiedAt: '2023-07-02T01:01:01',
      replies: [
        {
          replyId: 1,
          userId: 3,
          userName: '',
          content: '',
          activeUserWritten: true,
          taggedUserInfo: [
            {
              taggedUserId: 1,
              taggedUserName: '',
            },
          ],
          createdAt: '2023-07-02T01:01:01',
          modifiedAt: '2023-07-02T01:01:01',
        },
      ],
    },
  ],
  recommends: [
    //category idx 와 userinfo 리덕스 데이터와 겹쳐서 cocktailId와 isBookmarked  달리 수정했습니다.
    {
      cocktailId: 7,
      name: '',
      imageUrl: 'https://2bob.co.kr/data/recipe/20210707094952-WOE78.jpg',
      isBookmarked: false,
    },
  ],
  bookmarked: false,
};
