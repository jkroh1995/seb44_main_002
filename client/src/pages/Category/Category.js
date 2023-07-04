//import { useState } from 'react';
import Card from '../../components/Card/Card';
import Filter from './Filter';
import HoverButton from '../../common/Buttons/HoverButton';

export default function Category() {
  //선택된 카테고리조건 (카테고리&태그&정렬)
  //const [fitlerCondtion, setfitlerCondtion] = useState(null);

  //가상데이터
  const isBookmarked = true;
  const item = {
    itemid: '99',
    img: 'images/cocktailSample.jpg',
    title: '타이틀',
  };

  return (
    <div className="bg-gradient-to-r from-gradi-to to-gradi-from w-screen h-100% pt-[10rem] flex justify-center ">
      <section className="w-[55rem] ">
        {/* 레시피 등록 버튼 */}
        <div className="flex justify-end pb-5 ">
          <HoverButton
            size="w-[240px] h-[60px]"
            className="absolute bottom-0 right-0"
            radius="rounded-[30px]"
            color="text-[#BB40F1] bg-transparent"
            // border-gradient border border-solid from-red-500 to-yellow-500
            borderColor="border-[#BB40F1]"
            hoverColor="hover:text-[#BB40F1] hover:bg-[#F0F0F0]"
          >
            나만의 레시피 등록하기
          </HoverButton>
        </div>

        <div className="border-1 border-solid border-red">
          {/* 필터 setfitlerCondtion={setfitlerCondtion}*/}
          <Filter />
          {/* 필터에 따라 출력되는 데이터 */}
          <div className="w-[100%]   grid grid-cols-4 gap-10 mb-[300px]">
            <Card item={item} isBookmarked={isBookmarked} className="pr-4 " />
            <Card item={item} isBookmarked={isBookmarked} className="pr-4" />
            <Card item={item} isBookmarked={isBookmarked} className="pr-4" />
            <Card item={item} isBookmarked={isBookmarked} className="pl-2" />
            <Card item={item} isBookmarked={isBookmarked} className="pr-4" />
            <Card item={item} isBookmarked={isBookmarked} className="pr-4" />
            <Card item={item} isBookmarked={isBookmarked} className="pr-4" />
            <Card item={item} isBookmarked={isBookmarked} className="pl-2" />
          </div>
        </div>
      </section>
    </div>
  );
}
