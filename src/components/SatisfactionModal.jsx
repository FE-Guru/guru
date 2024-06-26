import axios from 'axios';
import { useState, useEffect } from 'react';
import style from '../css/Modal.module.css';
import { url } from "../store/ref";

const SatisfactionModal = ({ onClose, userEmail, item }) => {
  const [starRating, setStarRating] = useState(0);
  const [feedback, setFeedback] = useState({
    kind: 0,
    onTime: 0,
    highQuality: 0,
    unkind: 0,
    notOnTime: 0,
    lowQuality: 0,
    etc: 0,
  });
  const [otherFeedbackText, setOtherFeedbackText] = useState('');
  const [writerID, setWriterID] = useState('');
  const [emailID, setEmailID] = useState('');

  const feedbackOptions = {
    positive: ['kind', 'onTime', 'highQuality', 'etc'],
    negative: ['unkind', 'notOnTime', 'lowQuality', 'etc'],
  };

  useEffect(() => {
    if (item) {
      const matchedApplicant = item.applicants.find(
        (applicant) => applicant.status === 2 && applicant.matched === true
      );

      if (matchedApplicant) {
        setWriterID(item.emailID);
        setEmailID(matchedApplicant.emailID);
      } else {
        setWriterID(item.emailID);
        setEmailID(userEmail);
      }
    }
  }, [item, userEmail]);

  const handleStarClick = (star) => {
    setStarRating(star);
    const toReset =
      star >= 3 ? feedbackOptions.negative : feedbackOptions.positive;
    setFeedback((prevFeedback) => {
      const newFeedback = { ...prevFeedback };
      toReset.forEach((item) => (newFeedback[item] = 0));
      return newFeedback;
    });
    if (feedback.etc) {
      setFeedback((prevFeedback) => ({ ...prevFeedback, etc: 0 }));
      setOtherFeedbackText('');
    }
  };

  const handleFeedbackClick = (item) => {
    if (item === 'etc') {
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        etc: prevFeedback.etc === 1 ? 0 : 1,
      }));
      if (feedback.etc === 0) {
        setOtherFeedbackText('');
      }
    } else {
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        [item]: prevFeedback[item] === 1 ? 0 : 1,
      }));
    }
  };

  const handleOtherFeedbackChange = (e) => {
    setOtherFeedbackText(e.target.value);
  };

  const handleSubmit = async () => {
    const satisfiedData = {
      emailID,
      writerID,
      starRating,
      kind: feedback.kind,
      onTime: feedback.onTime,
      highQuality: feedback.highQuality,
      unkind: feedback.unkind,
      notOnTime: feedback.notOnTime,
      lowQuality: feedback.lowQuality,
      etc: feedback.etc,
      etcDescription: feedback.etc ? otherFeedbackText : '',
    };

    try {
      const response = await axios.post(`${url}/satisfied`, satisfiedData);
      onClose(); // 데이터 전송 후 모달 닫기
    } catch (error) {
      console.error('Error submitting feedback:', error);
      onClose(); // 에러 발생 시에도 모달 닫기
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
                feedback[item] === 1 ? style.selected : ''
              }`}
              onClick={() => handleFeedbackClick(item)}
            >
              {item === 'kind' && '친절함'}
              {item === 'onTime' && '시간 준수'}
              {item === 'highQuality' && '우수한 서비스'}
              {item === 'unkind' && '불친절함'}
              {item === 'notOnTime' && '시간 미준수'}
              {item === 'lowQuality' && '미흡한 서비스'}
              {item === 'etc' && '기타'}
            </button>
          ))}
        </div>
        {feedback.etc === 1 && (
          <textarea
            className={style.satisfaction_textarea}
            placeholder="기타 의견을 작성해 주세요"
            onChange={handleOtherFeedbackChange}
            value={otherFeedbackText}
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
