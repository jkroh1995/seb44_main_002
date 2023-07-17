import Card from '../../components/Card/Card';
import tw from 'tailwind-styled-components';

export default function UserBookmarked({ userInfo }) {
  return (
    <Container>
      <Title>북마크된 레시피</Title>
      <Bookmark>
        {userInfo.bookmarkedCocktails.map((ele) => {
          return (
            <CardContainer key={ele.cocktailId}>
              <Card item={ele} />
            </CardContainer>
          );
        })}
      </Bookmark>
    </Container>
  );
}

const Container = tw.div`
mt-24
mx-12
`;
const Title = tw.p`
text-white
text-2xl
`;
const Bookmark = tw.div`
flex
flex-wrap
mt-12
max-md:justify-around
`;
const CardContainer = tw.div`
mb-12 
mr-6
`;
