package com.zos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zos.exception.CommentException;
import com.zos.exception.PostException;
import com.zos.exception.UserException;
import com.zos.model.Comments;
import com.zos.model.User;
import com.zos.response.MessageResponse;
import com.zos.services.CommentService;
import com.zos.services.UserService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	@Autowired
	private CommentService commentService;

	@Autowired
	private UserService userService;

	@PostMapping("/create/{postId}")
	public ResponseEntity<Comments> createCommentHandler(@RequestBody Comments comment,
			@PathVariable("postId") Integer postId, @RequestHeader("Authorization") String token)
			throws PostException, UserException {
		User user = userService.findUserProfile(token);

		Comments createdComment = commentService.createComment(comment, postId, user.getId());


		return new ResponseEntity<Comments>(createdComment, HttpStatus.CREATED);

	}

	@PutMapping("/like/{commentId}")
	public ResponseEntity<Comments> likeCommentHandler(@PathVariable Integer commentId,
			@RequestHeader("Authorization") String token) throws UserException, CommentException {
		User user = userService.findUserProfile(token);
		Comments likedComment = commentService.likeComment(commentId, user.getId());
		return new ResponseEntity<Comments>(likedComment, HttpStatus.OK);
	}

	@PutMapping("/unlike/{commentId}")
	public ResponseEntity<Comments> unlikeCommentHandler(@RequestHeader("Authorization") String token,
			@PathVariable Integer commentId) throws UserException, CommentException {
		User user = userService.findUserProfile(token);
		Comments likedComment = commentService.unlikeComment(commentId, user.getId());

		return new ResponseEntity<Comments>(likedComment, HttpStatus.OK);
	}

	@PutMapping("/edit")
	public ResponseEntity<MessageResponse> editCommentHandler(@RequestBody Comments comment) throws CommentException {

		commentService.editComment(comment, comment.getId());

		MessageResponse res = new MessageResponse("Comment Updated Successfully");

		return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
	}

	@DeleteMapping("/delete/{commentId}")
	public ResponseEntity<MessageResponse> deleteCommentHandler(@PathVariable Integer commentId)
			throws CommentException {

		commentService.deleteCommentById(commentId);

		MessageResponse res = new MessageResponse("Comment Delete Successfully");

		return new ResponseEntity<MessageResponse>(res, HttpStatus.ACCEPTED);
	}

	@GetMapping("/post/{postId}")
	public ResponseEntity<List<Comments>> getCommentHandler(@PathVariable Integer postId)
			throws CommentException, PostException {

		List<Comments> comments = commentService.findCommentByPostId(postId);

		MessageResponse res = new MessageResponse("Comment Updated Successfully");

		return new ResponseEntity<>(comments, HttpStatus.ACCEPTED);
	}
}
//