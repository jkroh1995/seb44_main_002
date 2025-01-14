package project.server.domain.follow.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.server.domain.follow.service.FollowService;
import project.server.global.auth.service.AuthManager;
import project.server.global.utils.UnsignedPermission;

@RestController
@RequestMapping("/follow")
@Slf4j
public class FollowController {

    private final FollowService followService;
    private final AuthManager authManager;

    public FollowController(FollowService followService, AuthManager authManager) {
        this.followService = followService;
        this.authManager = authManager;
    }

    @PostMapping("create/{user-id}")
    public ResponseEntity postFollow(Authentication authentication,
                                     @PathVariable("user-id") long userId){
        log.info("# FollowController#postFollow 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        followService.follow(email, userId);
        log.info("# FollowController#postFollow 완료");
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("cancel/{user-id}")
    public ResponseEntity deleteFollow(Authentication authentication,
                                       @PathVariable("user-id") long userId){
        log.info("# FollowController#deleteFollow 실행");
        String email = authManager.getEmailFromAuthentication(authentication, UnsignedPermission.NOT_PERMIT.get());
        followService.unfollow(email, userId);
        log.info("# FollowController#deleteFollow 완료");
        return ResponseEntity.noContent().build();
    }
}
