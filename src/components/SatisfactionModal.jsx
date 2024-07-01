import axios from 'axios';
import { useState, useEffect } from 'react';
import style from '../css/Modal.module.css';
import { url } from '../store/ref';
import { useSelector } from 'react-redux';

const SatisfactionModal = ({ onClose, item, author }) => {
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
  const [writerID, setWriterID] = useState(''); // 만족도 조사를 작성한 사람 emailID
  const [matchedID, setMatchedID] = useState(''); // 만족도 조사를 작성한 사람 emailID
  const [repondentID, setRepondentID] = useState(''); // 토큰으로 받은 emailID(=조사 쓴사람)
  const [repondentNick, setRepondentNick] = useState(''); // 토큰으로 받은 닉네임(=조사 쓴사람)
  const [recipientID, setRecipientID] = useState(''); // 조사 받은 사람

  const feedbackOptions = {
    positive: ['kind', 'onTime', 'highQuality', 'etc'],
    negative: ['unkind', 'notOnTime', 'lowQuality', 'etc'],
  };

  //토큰에 있는 아이디를 찾아서 repondentID 에 할당 = 만족도 조사를 작성한 사람
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        //console.log('토큰:', token); // 토큰 확인
        if (!token) {
          console.warn('로그인하지 않은 상태입니다.');
          return;
        }

        const response = await fetch(`${url}/profile`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log('응답 상태:', response.status); // 응답 상태 확인
        if (response.ok) {
          const userInfo = await response.json();
          // console.log('받은 데이터의 아이디!!: ', userInfo); // 데이터 확인
          setRepondentID(userInfo.emailID);
          setRepondentNick(userInfo.nickName);
        } else {
          console.error('fetchProfile 에러', response.statusText); // 에러 메시지 출력
        }
      } catch (error) {
        console.error('fetchProfile 예외 에러', error); // 예외 에러 출력
      }
    };

    fetchProfile();
  }, []);

  //writerID, matchedID 할당
  useEffect(() => {
    console.log('글 작성자 정보', author);
    console.log('item--', item);
    setWriterID(author.emailID);
    //console.log('매칭인 아이디', matchedID);
    if (item) {
      const matchedApplicant = item.applicants.find(
        (applicant) => applicant.status === 2 && applicant.matched === true
      );
      //console.log('매칭인',matchedApplicant);
      if (matchedApplicant) {
        setMatchedID(matchedApplicant.emailID);
      }
    }
  }, [item, author]);

  //recipientID 할당 = writerID, matchedID 와 비교해서 repondentID와 다른 사람
  useEffect(() => {
    if (writerID !== matchedID) {
      setRecipientID(writerID);
    } else {
      setRecipientID(matchedID);
    }
  }, [writerID, matchedID]);


  //별점
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

  //피드백 버튼
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
      Post_id: item._id,
      repondentID, // 조사 쓴 사람 이메일
      repondentNick, // 조사 쓴 사람 닉네임
      matchedID,
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
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      onClose();
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