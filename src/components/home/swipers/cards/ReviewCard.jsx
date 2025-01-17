import React from "react";

const ReviewCard = ({ data }) => {
  return (
    <div className="card">
      <div className="card-wrapper">
        <div className="review-details">
          <img
            loading="lazy"
            className="w-16"
            src="/media/placeholders/user-image.png"
            alt=""
          />
          <div>
            <h4>{data.studentName}</h4>
            <p>{data.studentjob}</p>
          </div>
        </div>
        <p className="review-text">{data.comment}</p>
        <div className="review-stars">
          {new Array(5).fill(0).map((item, index) => {
            return (
              <svg
                key={index}
                width="26"
                height="24"
                viewBox="0 0 26 24"
                fill={`${data.evaluation >= index ? "#F0B143" : "#a79fb3"}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.9062 0L15.8951 8.98278H25.5672L17.7423 14.5344L20.7311 23.5172L12.9062 17.9656L5.08136 23.5172L8.0702 14.5344L0.24531 8.98278H9.91741L12.9062 0Z"
                  fill=""
                />
              </svg>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
