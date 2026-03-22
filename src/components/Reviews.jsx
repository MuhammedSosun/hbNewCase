import React, { useState } from "react";
import "../css/reviews.css";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../redux/slice/ReviewSlice";
import { useMemo } from "react";

function Reviews({ selectedId }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const { reviewsByProductId } = useSelector((store) => store.reviews);
  const currentProductReviews = reviewsByProductId[selectedId] || [];
  const totalComments = currentProductReviews.length;

  const averageRating = useMemo(() => {
    if (currentProductReviews.length === 0) return 0;
    const total = currentProductReviews.reduce(
      (acc, curr) => acc + curr.rating,
      0,
    );
    return (total / currentProductReviews.length).toFixed(1);
  }, [currentProductReviews]);

  const [showComments, setShowComments] = useState(false);

  const handleSendComment = () => {
    const newComment = {
      id: Date.now(),
      username: "Anonymus",
      rating: rating,
      commentText: comment,
      date: new Date().toLocaleDateString("tr-TR"),
    };

    dispatch(
      addReview({
        productId: selectedId,
        review: newComment,
      }),
    );
    setComment("");
    setRating(0);
  };

  return (
    <div className="comment-write-container">
      <div className="reviews-summary-header">
        <h2 className="comment-write-title">Ürünü Değerlendir</h2>

        <div className="average-badge">
          <span className="avg-num">{averageRating}</span>
          <span className="avg-star">★</span>
          <span className="avg-text">({totalComments} Değerlendirme)</span>
        </div>
      </div>
      <button
        className="toggle-comments-btn"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments
          ? "Yorumları Gizle"
          : `Müşteri Yorumlarını Gör (${totalComments})`}
      </button>
      <div className="comment-write-card">
        <div className="rating-selector">
          <span className="rating-label">Puan Verin:</span>
          <div className="stars-wrapper">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star-dot ${(hover || rating) >= star ? "active" : ""}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            ))}
          </div>
          {rating > 0 && <span className="rating-text">{rating} Puan</span>}
        </div>

        <div className="text-area-wrapper">
          <textarea
            className="comment-text-input"
            placeholder="Ürünle ilgili deneyimlerinizi yazın..."
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <div className="submit-area">
          <button
            className="comment-send-btn"
            onClick={handleSendComment}
            disabled={!rating || !comment.trim()}
          >
            Değerlendirmeyi Gönder
          </button>
        </div>
      </div>
      {showComments && (
        <div className="comments-display-list">
          {currentProductReviews.length > 0 ? (
            currentProductReviews.map((rev) => (
              <div key={rev.id} className="user-comment-item">
                <div className="user-info">
                  <strong>{rev.username}</strong>
                  <span className="user-stars">{"★".repeat(rev.rating)}</span>
                  <span className="comment-date">{rev.date}</span>
                </div>
                <p className="user-text">{rev.commentText}</p>
              </div>
            ))
          ) : (
            <p className="no-comments">Henüz yorum yapılmamış.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Reviews;
