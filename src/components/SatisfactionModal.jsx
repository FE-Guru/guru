import { useState } from 'react';
import style from '../css/Modal.module.css';

const SatisfactionModal = ({ onClose, type }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleFeedbackClick = (item) => {
    setFeedback(item);
  };

  const handleSubmit = () => {
    // 제출 시 로컬 상태로 데이터 처리
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);
    onClose();
  };

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
                color: rating >= star ? `var(--cr-blue)` : 'var(--cr-g3)',
                cursor: 'pointer',
              }}
              role="button"
              aria-label={`${star} stars`}
            />
          ))}
        </div>
        <p>어떤 점이 마음에 드셨나요?</p>
        <div className={style.satisfacion_btnCon}>
          {['친절함', '시간 엄수', '서비스 품질', '기타'].map((item) => (
            <button
              key={item}
              className={` btn primary ${style.fbBtn}  ${
                feedback.includes(item) ? style.blueBtn : ''
              }`}
              onClick={() => handleFeedbackClick(item)}
            >
              {item}
            </button>
          ))}
        </div>

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
