import { useState } from 'react';
import style from '../css/Modal.module.css';

const SatisfactionModal = ({ onClose, type }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const handleStarClick = (star) => {
    setRating(star);
    if (star >= 3 && feedback.includes('불친절함', '시간 미준수', '미흡한 서비스')) {
      setFeedback(feedback.filter(item => !['불친절함', '시간 미준수', '미흡한 서비스'].includes(item)));
    } else if (star < 3 && feedback.includes('친절함', '시간 준수', '우수한 서비스')) {
      setFeedback(feedback.filter(item => !['친절함', '시간 준수', '우수한 서비스'].includes(item)));
    }
  };

  const handleFeedbackClick = (item) => {
    setIsOtherSelected(item === '기타');
    if (feedback.includes(item)) {
      setFeedback(feedback.filter((feedbackItem) => feedbackItem !== item));
    } else {
      setFeedback([...feedback, item]);
    }
  };

  const handleOtherFeedbackChange = (e) => {
    const otherFeedback = e.target.value;
    setFeedback((prevFeedback) => {
      const filteredFeedback = prevFeedback.filter((item) => item !== '기타');
      return [...filteredFeedback, otherFeedback];
    });
  };

  const handleSubmit = () => {
    // 제출 시 로컬 상태로 데이터 처리
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    onClose();
  };

  const positiveFeedbackOptions = ['친절함', '시간 준수', '우수한 서비스', '기타'];
  const negativeFeedbackOptions = ['불친절함', '시간 미준수', '미흡한 서비스', '기타'];

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <h3>만족도 조사</h3>
        <p className={style.terms}>평가는 Guru 에게 큰 도움이 됩니다</p>
        <div className={style.satisfacion_rating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fa-star ${
                rating >= star ? 'fa-solid' : 'fa-regular'
              } fa-star`}
              onClick={() => handleStarClick(star)}
              style={{
                color: rating >= star ? `var(--cr-m-y)` : 'var(--cr-g3)',
                cursor: 'pointer',
              }}
              role="button"
              aria-label={`${star} stars`}
            />
          ))}
        </div>
        <p>어떤 점이 마음에 드셨나요?</p>
        <div className={style.satisfacion_btnCon}>
          {(rating >= 3 ? positiveFeedbackOptions : negativeFeedbackOptions).map((item) => (
            <button
              key={item}
              className={`btn primary ${style.fbBtn} ${
                feedback.includes(item) ? style.selected : ''
              }`}
              onClick={() => handleFeedbackClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {isOtherSelected && (
          <textarea
            className={style.satisfacion_textarea}
            placeholder="기타 의견을 작성해 주세요"
            onChange={handleOtherFeedbackChange}
          />
        )}
        <div className={style.modalBtn}>
          <button
            className={`btn primary yellow ${style.submitBtn}`}
            onClick={handleSubmit}
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SatisfactionModal;
