import axios from 'axios';
import { useState } from 'react';
import style from '../css/Modal.module.css';

const SatisfactionModal = ({ onClose, userEmail }) => {
  const [starRating, setStarRating] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherFeedbackText, setOtherFeedbackText] = useState(''); // 기타 의견 텍스트 상태 추가
  const emailID = userEmail;

  const feedbackOptions = {
    positive: ['친절함', '시간 준수', '우수한 서비스', '기타'],
    negative: ['불친절함', '시간 미준수', '미흡한 서비스', '기타'],
  };

  const handleStarClick = (star) => {
    setStarRating(star);
    const toRemove =
      star >= 3 ? feedbackOptions.negative : feedbackOptions.positive;
    setFeedback((prevFeedback) =>
      prevFeedback.filter((item) => !toRemove.includes(item))
    );
    if (isOtherSelected) {
      setIsOtherSelected(false);
      setFeedback((prevFeedback) =>
        prevFeedback.filter((item) => item !== '기타')
      );
    }
  };

  const handleFeedbackClick = (item) => {
    if (item === '기타') {
      setIsOtherSelected(!isOtherSelected);
      if (!isOtherSelected) {
        setFeedback([...feedback, item]);
      } else {
        setFeedback(feedback.filter((feedbackItem) => feedbackItem !== item));
        setOtherFeedbackText(''); // 기타 선택 해제 시 텍스트 초기화
      }
    } else {
      setFeedback((prevFeedback) =>
        prevFeedback.includes(item)
          ? prevFeedback.filter((feedbackItem) => feedbackItem !== item)
          : [...prevFeedback, item]
      );
    }
  };

  const handleOtherFeedbackChange = (e) => {
    const otherFeedback = e.target.value;
    setOtherFeedbackText(otherFeedback); // 기타 의견 텍스트 업데이트
    setFeedback((prevFeedback) => {
      const filteredFeedback = prevFeedback.filter((item) => item !== '기타');
      return [...filteredFeedback, otherFeedback];
    });
  };

  const handleSubmit = async () => {
    const satisfiedData = {
      emailID,
      kind: feedback.includes('친절함') ? 1 : 0,
      timeness: feedback.includes('시간 준수') ? 1 : 0,
      quality: feedback.includes('우수한 서비스') ? 1 : 0,
      unkind: feedback.includes('불친절함') ? 1 : 0,
      untimeness: feedback.includes('시간 미준수') ? 1 : 0,
      lowquality: feedback.includes('미흡한 서비스') ? 1 : 0,
      etc: isOtherSelected ? 1 : 0,
      starRating,
      etcDescription: isOtherSelected ? otherFeedbackText : '',
    };

    try {
      await axios.post('http://localhost:8000/satisfied', satisfiedData);
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const currentFeedbackOptions =
    starRating >= 3 ? feedbackOptions.positive : feedbackOptions.negative;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <h3>만족도 조사</h3>
        <p className={style.terms}>평가는 Guru 에게 큰 도움이 됩니다</p>
        <div className={style.satisfaction_rating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`fa-star ${
                starRating >= star ? 'fa-solid' : 'fa-regular'
              } fa-star`}
              onClick={() => handleStarClick(star)}
              style={{
                color: starRating >= star ? 'var(--cr-m-y)' : 'var(--cr-g3)',
                cursor: 'pointer',
              }}
              role="button"
              aria-label={`${star} stars`}
            />
          ))}
        </div>
        <p>어떤 점이 마음에 드셨나요?</p>
        <div className={style.satisfaction_btnCon}>
          {currentFeedbackOptions.map((item) => (
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
            className={style.satisfaction_textarea}
            placeholder="기타 의견을 작성해 주세요"
            onChange={handleOtherFeedbackChange}
            value={otherFeedbackText} // textarea의 value 설정
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
