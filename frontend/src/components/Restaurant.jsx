import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRestaurant, analyzeReviews } from "../redux/actions/restaurantAction";

// Emoji helpers
const getSentimentEmoji = (sentiment) => {
  if (!sentiment) return "🔍";
  const s = sentiment.toLowerCase();
  if (s.includes("positive") || s.includes("good") || s.includes("great") || s.includes("excellent") || s.includes("pleasant")) return "👍";
  if (s.includes("negative") || s.includes("bad") || s.includes("poor") || s.includes("terrible") || s.includes("awful")) return "👎";
  if (s.includes("neutral") || s.includes("mixed")) return "😐";
  return "✨";
};

const getBulletEmoji = (text) => {
  if (!text) return "•";
  const t = text.toLowerCase();
  if (t.includes("taste") || t.includes("flavor") || t.includes("delicious") || t.includes("spicy") || t.includes("yummy")) return "😋";
  if (t.includes("service") || t.includes("staff") || t.includes("friendly") || t.includes("wait")) return "🤝";
  if (t.includes("price") || t.includes("cheap") || t.includes("expensive") || t.includes("value")) return "💰";
  if (t.includes("delivery") || t.includes("time") || t.includes("late") || t.includes("fast")) return "🚚";
  if (t.includes("clean") || t.includes("hygiene") || t.includes("cleanliness")) return "🧼";
  return "🔹";
};

const getMentionEmoji = (item) => {
  if (!item) return "🍽️";
  const t = item.toLowerCase();
  if (t.includes("biryani") || t.includes("rice")) return "🍚";
  if (t.includes("pizza")) return "🍕";
  if (t.includes("chicken") || t.includes("kfc")) return "🍗";
  if (t.includes("burger")) return "🍔";
  if (t.includes("cake") || t.includes("dessert")) return "🍰";
  if (t.includes("service") || t.includes("staff")) return "🤝";
  return "🍽️";
};

const Restaurant = ({ restaurant }) => {
  const dispatch = useDispatch();
  const [showAI, setShowAI] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user || {});

  //DELETE
  const handleDelete = () => {
    if (!window.confirm("Delete this restaurant?")) return;

    dispatch(deleteRestaurant(restaurant._id)).catch(() => {
      alert("Unable to delete");
    });
  };
  return (
    <div className="col-12 my-3">
    <div className="card restaurant-card p-3">

  <Link to={`/eats/stores/${restaurant._id}/menus`}>
    <img
      className="restaurant-image"
      src={restaurant.images?.[0]?.url}
      alt={restaurant.name}
    />
  </Link>

  <div className="restaurant-info">

    <h4>{restaurant.name}</h4>

    <p className="rest_address">
      {restaurant.address}
    </p>

    <div className="ratings">
      <div className="rating-outer">
        <div
          className="rating-inner"
          style={{
            width: `${(restaurant.ratings / 5) * 100}%`,
          }}
        ></div>
      </div>

      <span>
        ({restaurant.numOfReviews} Reviews)
      </span>
    </div>

    {restaurant.numOfReviews > 0 && (
      <>
        <button
          className="ai-btn"
          onClick={async () => {
            // If summary already exists, just toggle it
            if (restaurant.reviewSummaryBullets?.length > 0 || restaurant.reviewSentiment) {
              setShowAI((s) => !s);
              return;
            }

            // Otherwise trigger AI analysis
            try {
              setAnalyzing(true);
              const res = await dispatch(analyzeReviews(restaurant._id));
              setAnalyzing(false);

              if (analyzeReviews.fulfilled.match(res)) {
                setShowAI(true);
              } else {
                // show error briefly
                alert(res.payload || "AI analysis failed");
              }
            } catch (err) {
              setAnalyzing(false);
              alert(err.message || "AI analysis error");
            }
          }}
        >
          {analyzing ? "Generating summary..." : showAI ? "➖ Hide Review Summary" : "💬 View Review Summary"}
        </button>
      </>
    )}

  </div>

    {showAI && (
      <div className="ai-insights-box">
        <div className="ai-status">
          Review Summary: <strong>{getSentimentEmoji(restaurant.reviewSentiment)} {restaurant.reviewSentiment || "No summary available"}</strong>
        </div>

        <ul>
          {(restaurant.reviewSummaryBullets || []).map((point, index) => (
            <li key={index}>{getBulletEmoji(point)} {point}</li>
          ))}
        </ul>

        <div className="mentions">
          {(restaurant.reviewTopMentions || []).map((item, index) => (
            <span key={index} className="mention-tag">{getMentionEmoji(item)} #{item}</span>
          ))}
        </div>
      </div>
    )}

</div>

 {isAuthenticated && user && user.role === "admin" && (
            <button
              className="btn btn-danger btn-sm mt-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
    </div>
  );
};

export default Restaurant;