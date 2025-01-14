package project.server.domain.bookmark.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.domain.bookmark.embed.UserInfo;
import project.server.domain.bookmark.entity.Bookmark;
import project.server.domain.bookmark.repository.BookmarkRepository;
import project.server.domain.cocktail.entity.Cocktail;
import project.server.domain.user.entity.User;
import project.server.global.exception.BusinessLogicException;
import project.server.global.exception.ExceptionCode;

@Service
public class BookmarkCreateService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkCreateService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    @Transactional
    public void create(User user, Cocktail cocktail) {
        if(user.isBookmarked(cocktail.getCocktailId())){
            throw new BusinessLogicException(ExceptionCode.ALREADY_BOOKMARKED);
        }

        Bookmark bookmark = Bookmark.builder()
                .cocktail(cocktail)
                .userInfo(new UserInfo(user.getUserId(), getUserAgeGroup(user), user.getGender()))
                .build();
        user.bookmark(bookmark);

        bookmarkRepository.save(bookmark);
    }

    private int getUserAgeGroup(User user) {
        return user.getAge() / 10 * 10;
    }
}
